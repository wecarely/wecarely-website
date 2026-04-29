"""
daily_standup.py — Daily morning briefing for Bruce.

Runs once per day at 00:00 UTC (= 08:00 Asia/Taipei). Pulls a quick
snapshot from Gmail + Supabase, composes a plain-text email, and sends
it to NOTIFY_TO_EMAIL (Bruce's personal Gmail). The goal: Bruce opens
his phone every morning and gets the one summary that tells him what
needs attention today, without scraping 4 dashboards.

Sections:
  - Action items (hot replies pending, warm replies pending)
  - Inbox status (since last standup, 24h window)
  - Sponsor status (count + MRR)
  - Quick links (GA4, GSC, inbox, Supabase)
  - Health (Wise / W-8BEN / watcher status — hardcoded for now)

Env vars (GitHub Secrets):
  GMAIL_USER, GMAIL_APP_PASSWORD, NOTIFY_TO_EMAIL — same as watcher
  SUPABASE_URL, SUPABASE_SERVICE_KEY — for sponsor count
"""

from __future__ import annotations

import email
import imaplib
import json
import os
import re
import smtplib
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from email.utils import parseaddr, parsedate_to_datetime
from zoneinfo import ZoneInfo

GMAIL_USER = os.environ["GMAIL_USER"]
GMAIL_APP_PASSWORD = os.environ["GMAIL_APP_PASSWORD"]
NOTIFY_TO_EMAIL = os.environ["NOTIFY_TO_EMAIL"]
SUPABASE_URL = os.environ.get("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")

DEFAULT_SPONSOR_FEE = 149  # USD per month per sponsor (until per-row pricing exists)
LOOKBACK_HOURS = 24

# Same heuristics as hot_lead_watcher (kept inline for clarity)
HOT_PATTERNS = [
    r"\byes\b", r"\binterested\b", r"sign me up", r"\bsign up\b",
    r"let'?s do it", r"let'?s talk", r"tell me more",
    r"send (?:me )?(?:the )?details", r"send (?:me )?(?:the )?info",
    r"how much", r"what'?s the (?:price|cost|fee)",
    r"i agree", r"sounds good", r"sounds great",
    r"would like to", r"i'?d like to", r"\bcount me in\b",
]
COLD_PATTERNS = [
    r"not interested", r"unsubscribe", r"please remove",
    r"\bremove me\b", r"no thanks", r"no thank you",
    r"pass on this", r"not (?:a )?fit",
]
WECARELY_CONTEXT = [
    r"wecarely", r"sponsored placement", r"sponsored spot",
    r"founding sponsor", r"home care directory", r"your listing",
    r"placement spots?", r"bruce he",
]


def has_match(text: str, patterns: list[str]) -> bool:
    return any(re.search(p, text, re.IGNORECASE) for p in patterns)


def extract_text(msg) -> str:
    plain, html = [], []
    if msg.is_multipart():
        for part in msg.walk():
            ctype = part.get_content_type()
            disp = str(part.get("Content-Disposition", "")).lower()
            if "attachment" in disp:
                continue
            payload = part.get_payload(decode=True)
            if not payload:
                continue
            try:
                text = payload.decode(part.get_content_charset() or "utf-8", errors="ignore")
            except Exception:
                text = payload.decode("utf-8", errors="ignore")
            if ctype == "text/plain":
                plain.append(text)
            elif ctype == "text/html":
                html.append(text)
    else:
        payload = msg.get_payload(decode=True)
        if payload:
            plain.append(payload.decode(msg.get_content_charset() or "utf-8", errors="ignore"))
    if plain:
        return "\n".join(plain)
    if html:
        return re.sub(r"<[^>]+>", " ", "\n".join(html))
    return ""


def classify(msg) -> str:
    """Return 'HOT', 'WARM', or 'IGNORE'."""
    subject = msg.get("Subject", "") or ""
    body = extract_text(msg)
    full = f"{subject}\n{body}"
    has_ctx = has_match(full, WECARELY_CONTEXT) or (
        subject.lower().startswith("re:")
        and re.search(r"sponsor|placement|home care|wecarely", subject, re.IGNORECASE)
    )
    if not has_ctx:
        return "IGNORE"
    if has_match(full, HOT_PATTERNS):
        return "HOT"
    return "WARM"


def gmail_summary() -> dict:
    """Counts of HOT/WARM/IGNORE replies in the last LOOKBACK_HOURS,
    plus total INBOX unread."""
    summary = {
        "hot": [],
        "warm": [],
        "ignored": 0,
        "unread_total": 0,
        "error": None,
    }
    try:
        imap = imaplib.IMAP4_SSL("imap.gmail.com", 993)
        imap.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        imap.select("INBOX")

        # Total unread (inbox-wide)
        typ, data = imap.search(None, "UNSEEN")
        if typ == "OK" and data and data[0]:
            summary["unread_total"] = len(data[0].split())

        # Recent messages — scan and classify
        since = (datetime.now(timezone.utc) - timedelta(days=2)).strftime("%d-%b-%Y")
        typ, data = imap.search(None, f"(SINCE {since})")
        msg_ids = data[0].split() if (typ == "OK" and data and data[0]) else []

        cutoff = datetime.now(timezone.utc) - timedelta(hours=LOOKBACK_HOURS)
        for mid in reversed(msg_ids[-100:]):
            typ, data = imap.fetch(mid, "(BODY.PEEK[])")
            if typ != "OK" or not data or not data[0]:
                continue
            msg = email.message_from_bytes(data[0][1])
            date_str = msg.get("Date")
            if not date_str:
                continue
            try:
                msg_date = parsedate_to_datetime(date_str)
            except Exception:
                continue
            if msg_date.tzinfo is None:
                msg_date = msg_date.replace(tzinfo=timezone.utc)
            if msg_date < cutoff:
                break

            level = classify(msg)
            if level == "IGNORE":
                summary["ignored"] += 1
                continue
            sender_name, sender_email = parseaddr(msg.get("From", ""))
            entry = {
                "from": sender_name or sender_email,
                "email": sender_email,
                "subject": (msg.get("Subject", "") or "")[:80],
            }
            if level == "HOT":
                summary["hot"].append(entry)
            else:
                summary["warm"].append(entry)

        imap.logout()
    except Exception as e:
        summary["error"] = str(e)
    return summary


def sponsor_summary() -> dict:
    """Read sponsor count from Supabase via REST API."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        return {"count": None, "mrr": None, "error": "Supabase secrets not set"}
    try:
        # PostgREST count via Prefer: count=exact + HEAD for fast count, but REST
        # also returns count in Content-Range when count=exact is requested.
        # Easier: just SELECT id with count, then len() the array.
        url = f"{SUPABASE_URL}/rest/v1/agencies?is_sponsored=eq.true&select=id"
        req = urllib.request.Request(
            url,
            headers={
                "apikey": SUPABASE_SERVICE_KEY,
                "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
            },
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            rows = json.loads(resp.read().decode())
        count = len(rows)
        return {
            "count": count,
            "mrr": count * DEFAULT_SPONSOR_FEE,
            "error": None,
        }
    except Exception as e:
        return {"count": None, "mrr": None, "error": str(e)}


def compose_body(gmail: dict, sponsor: dict) -> str:
    today_taipei = datetime.now(ZoneInfo("Asia/Taipei"))
    weekday = today_taipei.strftime("%A")
    date_str = today_taipei.strftime("%Y-%m-%d")

    lines = []
    lines.append(f"WeCarely Daily Standup — {weekday}, {date_str}")
    lines.append("")
    lines.append("─" * 56)

    # ============ Action items ============
    lines.append("")
    lines.append("🎯 ACTION ITEMS TODAY")
    lines.append("")
    if gmail["error"]:
        lines.append(f"  ⚠️  Could not read inbox: {gmail['error']}")
    elif not gmail["hot"] and not gmail["warm"]:
        lines.append("  ✓  No new outreach replies — nothing urgent.")
    else:
        if gmail["hot"]:
            lines.append(f"  🔥 Reply to {len(gmail['hot'])} HOT lead(s):")
            for h in gmail["hot"]:
                lines.append(f"      → {h['from']}  ({h['email']})")
                lines.append(f"        \"{h['subject']}\"")
        if gmail["warm"]:
            lines.append(f"  📨 Review {len(gmail['warm'])} WARM reply(ies):")
            for w in gmail["warm"]:
                lines.append(f"      → {w['from']}  ({w['email']})")
                lines.append(f"        \"{w['subject']}\"")
    lines.append("")

    # ============ Inbox status ============
    lines.append("─" * 56)
    lines.append("")
    lines.append("📥 INBOX (last 24h)")
    lines.append("")
    if gmail["error"]:
        lines.append("  (skipped — see action items)")
    else:
        lines.append(f"  HOT replies     :  {len(gmail['hot'])}")
        lines.append(f"  WARM replies    :  {len(gmail['warm'])}")
        lines.append(f"  Ignored noise   :  {gmail['ignored']}")
        lines.append(f"  Total unread    :  {gmail['unread_total']}")
    lines.append("")

    # ============ Sponsor / revenue ============
    lines.append("─" * 56)
    lines.append("")
    lines.append("💰 SPONSOR STATUS")
    lines.append("")
    if sponsor["error"]:
        lines.append(f"  ⚠️  Could not read Supabase: {sponsor['error']}")
    else:
        cnt = sponsor["count"]
        mrr = sponsor["mrr"]
        lines.append(f"  Active sponsors :  {cnt} / 4 slots")
        lines.append(f"  MRR (estimate)  :  ${mrr} USD  ({cnt} × ${DEFAULT_SPONSOR_FEE})")
        lines.append(f"  Slots available :  {max(0, 4 - cnt)}")
    lines.append("")

    # ============ Quick links ============
    lines.append("─" * 56)
    lines.append("")
    lines.append("🔗 QUICK LINKS")
    lines.append("")
    lines.append("  Inbox       https://mail.google.com/mail/u/0/#inbox")
    lines.append("  GA4         https://analytics.google.com/analytics/web/")
    lines.append("  GSC         https://search.google.com/search-console")
    lines.append("  Supabase    https://supabase.com/dashboard/project/oyiscanwalgstffskcvt/editor")
    lines.append("  Site live   https://www.wecarely.com/")
    lines.append("")

    # ============ Operations health ============
    lines.append("─" * 56)
    lines.append("")
    lines.append("🔧 OPS HEALTH")
    lines.append("")
    lines.append("  W-8BEN          ✅ filed (2026-04-10, valid for US clients)")
    lines.append("  PayPal Business ✅ ready to invoice")
    lines.append("  Wise Business   ⏳ pending application — wise.com/business")
    lines.append("  Hot Lead Watcher ✅ running every 30 min during US biz hours")
    lines.append("")
    lines.append("─" * 56)
    lines.append("")
    lines.append("Reply playbook:")
    lines.append("  home-care-directory/outreach_reply_playbook.md")
    lines.append("Sponsor agreement template:")
    lines.append("  home-care-directory/sponsor_agreement_template.md")
    lines.append("")
    lines.append(f"Generated {today_taipei.isoformat(timespec='minutes')} (Asia/Taipei)")
    return "\n".join(lines)


def send_standup(body_text: str) -> None:
    today_taipei = datetime.now(ZoneInfo("Asia/Taipei"))
    msg = EmailMessage()
    msg["From"] = GMAIL_USER
    msg["To"] = NOTIFY_TO_EMAIL
    msg["Subject"] = f"☀ WeCarely standup — {today_taipei.strftime('%a %b %d')}"
    msg.set_content(body_text)
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        smtp.send_message(msg)


def main() -> int:
    print("Pulling Gmail...")
    gmail = gmail_summary()
    print(f"  HOT={len(gmail['hot'])}  WARM={len(gmail['warm'])}  ignored={gmail['ignored']}  unread_total={gmail['unread_total']}  err={gmail['error']}")

    print("Pulling Supabase...")
    sponsor = sponsor_summary()
    print(f"  sponsors={sponsor['count']}  mrr=${sponsor['mrr']}  err={sponsor['error']}")

    body = compose_body(gmail, sponsor)
    print("Composed standup body:")
    print(body)
    print()
    print("Sending...")
    try:
        send_standup(body)
        print("✓ Standup sent.")
        return 0
    except Exception as e:
        print(f"✗ Send failed: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
