# Architecture — Capture Layer vs. Delivery Layer

## Overview

The Parkside system is split into two distinct layers. They communicate at a single point — the intake submission — and must not be mixed.

---

## Layer 1: Public Website (Capture Layer)

**Location:** This repository (`parksideadvisorycodex`)  
**Role:** Explain offers, qualify prospects, capture intake submissions, send owner notifications.

### What the website does

- Describes the Growth Audit and related offers
- Presents intake forms to qualified prospects
- Validates form submissions server-side
- Posts intake records to `/api/intake`
- Stores records via Supabase (when connected)
- Notifies the owner via Resend email (when connected)
- Shows a clean confirmation to the submitter

### What the website does NOT do

- Does not run the audit
- Does not execute lead scoring beyond initial tier assignment
- Does not generate Blueprints
- Does not expose audit prompts, scoring rubrics, or delivery logic to the public
- Does not contain client files, assessment notes, or completed Blueprints

---

## Layer 2: Company Workspace (Delivery Layer)

**Location:** `/00-ParksideAdvisoryGroup` (local operating system)  
**Role:** Run the audit, generate Blueprints, store client files, manage delivery.

### What the workspace does

- Stores completed client intake files under `02-Clients/Active/[client-name]/`
- Runs the audit framework (`03-Products/audit-offer/02-delivery/audit-framework.md`)
- Executes the master audit prompt (`04-Tools/audit-agent/master-prompt.md`)
- Generates the Advisory Blueprint using `blueprint-template.md`
- Archives completed engagements under `02-Clients/Past/[client-name]/`

### What the workspace does NOT do

- Does not serve public traffic
- Does not handle form submissions
- Does not contain client-facing UI

---

## The Handoff Point

When a prospect submits the Growth Audit intake form on the website:

1. The API route validates and stores the record (Supabase) and notifies the owner (Resend).
2. The owner receives the notification email with the `internal_summary`.
3. **Manual step:** The owner copies the intake submission into the company workspace at `02-Clients/Active/[client-name]/intake-completed.md`.
4. The audit agent is run against the completed intake file to produce the assessment and Blueprint.
5. The Blueprint is delivered to the client via the agreed channel.

This handoff is intentionally manual. The audit involves judgment that should not be automated before delivery.

---

## Entry Points

| URL | Purpose | Posts to |
|-----|---------|----------|
| `/growth-audit` | Growth Audit intake — simple form, new prospects | `/api/intake` |
| `/intake` | Full workflow audit form — existing Intake Advisor flow | `/api/intake` |

Both entry points post to the same `/api/intake` route. The `source` field on the submission distinguishes them:
- Growth Audit form: `source: "growth-audit"`
- Original intake form: `source` is undefined

---

## Key Environment Variables

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend email API key for owner notifications |
| `PARKSIDE_NOTIFY_EMAIL` | Owner email address for intake notifications |
| `SUPABASE_URL` | Supabase project URL for intake record storage |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

When these variables are not set, the API route still returns success to the submitter — it logs that the integrations are not configured but does not fail the request.

---

## Files To Never Make Public

The following files live in the delivery layer and must never be committed to this repository or served via any public endpoint:

- Audit agent prompts (`04-Tools/audit-agent/`)
- Scoring frameworks and rubrics
- Client intake files (`02-Clients/`)
- Blueprint documents
- Internal assessment notes
