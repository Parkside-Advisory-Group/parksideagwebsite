# Security

## Secrets

Never hardcode secrets or API keys. Use environment variables:

- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `PARKSIDE_NOTIFY_EMAIL` - route intake notifications to `info@parksideag.com`.
- `NEXT_PUBLIC_BOOKING_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Public contact addresses are not secrets:

- `amora@parksideag.com` - direct work email.
- `info@parksideag.com` - general public inbox and intake notification target.

## Intake Guardrails

The intake route validates required fields and rejects submissions that appear to include pricing promises, guaranteed savings language, passwords, logins, API secrets, private keys, or credentials.

## Integration Posture

Resend and Supabase are scaffolded but not connected. When connected:

- use server-only keys only in server modules
- do not expose service role keys to the browser
- implement rate limiting or spam protection
- add retry with exponential backoff for network calls
- log operational errors without logging sensitive content

## Privacy

Submitted intake information should be used for workflow evaluation and follow-up only. Do not sell intake data.
