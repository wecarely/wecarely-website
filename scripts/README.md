# scripts/

Operational scripts that run outside the deployed Next.js app. These are
**not** part of the build; they're standalone utilities triggered by GitHub
Actions or run manually.

## hot_lead_watcher.py

Polls Gmail for WeCarely outreach replies and forwards an alert email when a
hot reply is detected. Runs every ~30 minutes during Houston business hours
via `.github/workflows/hot-lead-watcher.yml`.

### What it does

1. IMAP-connects to `wecarely.ops@gmail.com` using a Google app password.
2. Reads recent (last ~40 min) messages without marking them as read.
3. Classifies each message:
   - **HOT** — contains WeCarely context AND a buy signal ("yes",
     "interested", "tell me more", "sign me up", "how much", etc.)
   - **WARM** — WeCarely context but no clear hot/cold signal, OR a polite
     decline reply (informational)
   - **IGNORE** — not WeCarely-related (Vercel notifications, GitHub mail,
     newsletters)
4. For HOT or WARM: forwards a notification email (with sender, subject,
   body excerpt) to `NOTIFY_TO_EMAIL`.

### Why this exists

Bruce runs the business from Taipei (UTC+8). Houston home care agencies are
13 hours behind. A reply landing in inbox at 4 PM Houston (= 5 AM Taipei)
would otherwise wait until Bruce wakes up — a 5-7 hour delay before
acknowledgment. For a hot B2B reply, that delay can cost a close.

This watcher pushes the alert into Bruce's *personal* Gmail
(`agesmyth@gmail.com`), where his phone notifications fire immediately.
He sees "🔥 HOT WeCarely reply" the moment it arrives.

### One-time setup

#### 1. Generate a Gmail app password (Bruce's task)

App passwords let scripts log in via IMAP/SMTP even with 2FA enabled.

1. Go to <https://myaccount.google.com/apppasswords>
   *(must be signed in as `wecarely.ops@gmail.com`)*
2. If 2-Step Verification isn't enabled, enable it first
3. Create a new app password — name it `WeCarely Hot Lead Watcher`
4. Copy the 16-character password (looks like `abcd efgh ijkl mnop`)
   — save it; this is the **last time** you can see it

#### 2. Add three GitHub Secrets to the wecarely-website repo

Go to <https://github.com/wecarely/wecarely-website/settings/secrets/actions>

| Secret name | Value |
|---|---|
| `GMAIL_USER` | `wecarely.ops@gmail.com` |
| `GMAIL_APP_PASSWORD` | the 16-char string from step 1 (paste **without spaces**) |
| `NOTIFY_TO_EMAIL` | `agesmyth@gmail.com` (Bruce's personal Gmail — gets the alerts) |

Click "Add secret" for each one.

#### 3. Verify it runs

Go to <https://github.com/wecarely/wecarely-website/actions/workflows/hot-lead-watcher.yml>
and click "Run workflow" to trigger a manual run. Within ~30 sec you should
see a green check. If there are recent unread WeCarely-related replies in
the inbox, alert emails will appear in `agesmyth@gmail.com`.

The schedule will then fire automatically every 30 min during Houston
business hours.

### Tuning detection

If Bruce wants to tweak what counts as HOT vs WARM, edit the keyword lists
at the top of `hot_lead_watcher.py`:

- `HOT_PATTERNS` — buy signals
- `COLD_PATTERNS` — decline signals
- `WECARELY_CONTEXT` — tokens that mark a message as WeCarely-related
  (filters out non-outreach noise)

Patterns are regular expressions, evaluated case-insensitively.

### Running manually for testing

```bash
export GMAIL_USER=wecarely.ops@gmail.com
export GMAIL_APP_PASSWORD='abcd efgh ijkl mnop'
export NOTIFY_TO_EMAIL=agesmyth@gmail.com
python scripts/hot_lead_watcher.py
```

### Cost

GitHub Actions on a public repo: **free**, unlimited minutes.
This workflow uses ~5-10 minutes per business day = trivial.
