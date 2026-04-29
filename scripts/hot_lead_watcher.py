"""
hot_lead_watcher.py — Gmail IMAP scanner for WeCarely outreach replies.

Run via GitHub Actions every ~30 min during US business hours.
Sends an alert email to NOTIFY_TO_EMAIL when a hot reply is detected.

Detection logic:
    1. Pull unread/recent (last LOOKBACK_MINUTES) messages from INBOX
    2. For each message: classify as HOT / WARM / IGNORE
       - HOT: contains WeCarely context (e.g. "wecarely.com",
         "Sponsored placement") AND a buy signal ("yes", "interested",
         "tell me more", "sign me up", "how much", etc.)
       - WARM: WeCarely context but no clear hot/cold signal — still
         worth flagging (probably a "let me think about it" reply)
       - IGNORE: not WeCarely-related (Vercel notifications, GitHub
         emails, newsletters, etc.)
    3. For HOT/WARM, send a notification email to NOTIFY_TO_EMAIL with
       sender, subject, and body excerpt
    4. Messages are read with BODY.PEEK so the inbox state is unchanged
       (Bruce sees them as unread)

Env vars (set as GitHub Secrets):
    GMAIL_USER           — wecarely.ops@gmail.com
    GMAIL_APP_PASSWORD   — 16-char Google app password
    NOTIFY_TO_EMAIL      — where to forward alerts (e.g. agesmyth@gmail.com)
"""

from __future__ import annotations

import email
import imaplib
import os
import re
import smtplib
import sys
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from email.utils import parseaddr, parsedate_to_datetime

GMAIL_USER = os.environ["GMAIL_USER"]
GMAIL_APP_PASSWORD = os.environ["GMAIL_APP_PASSWORD"]
NOTIFY_TO_EMAIL = os.environ["NOTIFY_TO_EMAIL"]

# How far back to scan. Slightly larger than the cron interval (30 min)
# to avoid gaps if a run is delayed.
LOOKBACK_MINUTES = 40

# Buy signals — strong intent to engage. Triggers HOT alert.
HOT_PATTERNS = [
    r"\byes\b",
    r"\binterested\b",
    r"sign me up",
    r"\bsign up\b",
    r"let'?s do it",
    r"let'?s talk",
    r"tell me more",
    r"send (?:me )?(?:the )?details",
    r"send (?:me )?(?:the )?info",
    r"how much",
    r"what'?s the (?:price|cost|fee)",
    r"what is the (?:price|cost|fee)",
    r"i agree",
    r"sounds good",
    r"sounds great",
    r"would like to",
    r"i'?d like to",
    r"\bcount me in\b",
    r"\bgo ahead\b",
    r"please proceed",
    r"happy to",
    r"go ahead and",
]

# Decline signals — flag as WARM with note (still worth knowing about)
COLD_PATTERNS = [
    r"not interested",
    r"unsubscribe",
    r"please remove",
    r"\bremove me\b",
    r"no thanks",
    r"no thank you",
    r"pass on this",
    r"not (?:a )?fit",
    r"won'?t be (?:able|interested)",
    r"do not (?:contact|email)",
]

# Anything matching one of these means the reply IS related to WeCarely
# (filtering out non-outreach mail like Vercel notifications, etc.)
WECARELY_CONTEXT = [
    r"wecarely",
    r"sponsored placement",
    r"sponsored spot",
    r"founding sponsor",
    r"home care directory",
    r"your listing",
    r"placement spots?",
    # The catch-all: anything mentioning Bruce by name in a reply context
    r"bruce he",
]


def has_match(text: str, patterns: list[str]) -> bool:
    return any(re.search(p, text, flags=re.IGNORECASE) for p in patterns)


def get_message_text(msg) -> str:
    """Extract plain-text body from an email.Message, falling back to HTML."""
    plain_parts: list[str] = []
    html_parts: list[str] = []
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
                plain_parts.append(text)
            elif ctype == "text/html":
                html_parts.append(text)
    else:
        payload = msg.get_payload(decode=True)
        if payload:
            text = payload.decode(msg.get_content_charset() or "utf-8", errors="ignore")
            plain_parts.append(text)

    if plain_parts:
        return "\n".join(plain_parts)
    if html_parts:
        # Strip HTML tags crudely for keyword matching
        return re.sub(r"<[^>]+>", " ", "\n".join(html_parts))
    return ""


def fetch_recent_messages():
    """Connect to Gmail IMAP and return [(msg, msg_date)] from last LOOKBACK_MINUTES."""
    imap = imaplib.IMAP4_SSL("imap.gmail.com", 993)
    imap.login(GMAIL_USER, GMAIL_APP_PASSWORD)
    imap.select("INBOX")

    # IMAP date filter is day-precision. Search the last 2 days, then filter
    # in Python by exact timestamp.
    since = (datetime.now(timezone.utc) - timedelta(days=2)).strftime("%d-%b-%Y")
    typ, data = imap.search(None, f"(SINCE {since})")
    if typ != "OK":
        imap.logout()
        return []

    msg_ids = data[0].split()
    cutoff = datetime.now(timezone.utc) - timedelta(minutes=LOOKBACK_MINUTES)

    messages = []
    # Scan from most-recent backwards, cap at 80 to avoid wasted IO
    for mid in reversed(msg_ids[-80:]):
        typ, data = imap.fetch(mid, "(BODY.PEEK[])")  # PEEK = don't mark read
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
            # We're past the lookback window. Since we iterate most-recent-first,
            # we can break early.
            break
        messages.append((msg, msg_date))

    imap.logout()
    return messages


def classify(msg) -> tuple[str, str]:
    """Return (level, reason) where level is 'HOT' / 'WARM' / 'IGNORE'."""
    subject = msg.get("Subject", "") or ""
    body = get_message_text(msg)
    full = f"{subject}\n{body}"

    if not has_match(full, WECARELY_CONTEXT):
        # Last-chance heuristic: subject starts with "Re:" AND mentions
        # "placement" or "sponsor" — covers cases where context phrases
        # are slightly different from our patterns
        if not (subject.lower().startswith("re:") and re.search(r"sponsor|placement|home care|wecarely", subject, re.IGNORECASE)):
            return ("IGNORE", "no WeCarely context")

    if has_match(full, HOT_PATTERNS):
        return ("HOT", "buy signal detected")

    if has_match(full, COLD_PATTERNS):
        return ("WARM", "decline reply (informational alert)")

    return ("WARM", "WeCarely-related reply, unclassified intent")


def send_alert(level: str, reason: str, msg) -> None:
    """Forward a notification email to NOTIFY_TO_EMAIL via Gmail SMTP."""
    sender_name, sender_email = parseaddr(msg.get("From", ""))
    msg_subject = msg.get("Subject", "(no subject)") or "(no subject)"
    body = get_message_text(msg)
    excerpt = body.strip()[:1200]

    # Truncate sender name for header
    display = sender_name or sender_email or "(unknown)"
    if len(display) > 50:
        display = display[:50] + "…"

    icon = "🔥" if level == "HOT" else "📨"
    alert = EmailMessage()
    alert["From"] = GMAIL_USER
    alert["To"] = NOTIFY_TO_EMAIL
    alert["Subject"] = f"{icon} {level} WeCarely reply — {display}"

    body_text = (
        f"WeCarely outreach reply detected. Detection level: {level}\n"
        f"Reason: {reason}\n\n"
        f"────────────────\n"
        f"From:    {sender_name} <{sender_email}>\n"
        f"Subject: {msg_subject}\n"
        f"────────────────\n\n"
        f"{excerpt}\n\n"
        f"────────────────\n"
        f"Open inbox: https://mail.google.com/mail/u/0/#inbox\n"
        f"Playbook:   home-care-directory/outreach_reply_playbook.md\n"
        f"Agreement:  home-care-directory/sponsor_agreement_template.md\n"
    )
    alert.set_content(body_text)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(GMAIL_USER, GMAIL_APP_PASSWORD)
        smtp.send_message(alert)


def main() -> int:
    try:
        messages = fetch_recent_messages()
    except imaplib.IMAP4.error as e:
        print(f"[error] IMAP login/fetch failed: {e}", file=sys.stderr)
        return 1
    except Exception as e:
        print(f"[error] Unexpected: {e}", file=sys.stderr)
        return 1

    print(f"Scanned {len(messages)} recent message(s) (last {LOOKBACK_MINUTES} min)")

    hot = warm = ignored = 0
    for msg, msg_date in messages:
        level, reason = classify(msg)
        sender_name, sender_email = parseaddr(msg.get("From", ""))
        subject_short = (msg.get("Subject", "") or "")[:60]
        if level == "IGNORE":
            ignored += 1
            print(f"  [ignore] {sender_email}  ::  {subject_short}")
            continue
        try:
            send_alert(level, reason, msg)
        except Exception as e:
            print(f"  [error] Could not send alert: {e}", file=sys.stderr)
            continue
        if level == "HOT":
            hot += 1
            print(f"  [HOT]    {sender_email}  ::  {subject_short}  ::  {reason}")
        else:
            warm += 1
            print(f"  [warm]   {sender_email}  ::  {subject_short}  ::  {reason}")

    print(f"\nDone. {hot} HOT  /  {warm} WARM  /  {ignored} ignored.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
