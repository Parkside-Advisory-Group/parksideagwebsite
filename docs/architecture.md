# Architecture — Capture Layer vs. Delivery Layer

## Overview

The Parkside system is split into two distinct layers. They communicate at a single point — the intake submission — and must not be mixed.

---

## Layer 1: Public Website (Capture Layer)

**Location:** This repository (`parkside-website`)  
**Role:** Explain the Snapshot funnel, qualify prospects, capture intake submissions, send owner notifications, and collect conversion analytics.

### What the website does

- Presents the Free AI Workflow Savings Snapshot as the primary CTA
- Explains the paid AI Operations Blueprint and related implementation offers
- Presents intake forms to qualified prospects
- Validates form submissions server-side
- Posts intake records to `/api/intake`
- Stores records via Supabase when connected
- Notifies the owner via Resend email when connected
- Tracks navigation, CTA clicks, form attempts, form success, form errors, and performance via Vercel Analytics / Speed Insights
- Shows a clean confirmation to the submitter

### What the website does NOT do

- Does not generate completed Snapshots automatically
- Does not run paid Blueprint delivery
- Does not expose delivery prompts, scoring rubrics, or client assessment logic to the public
- Does not contain client files, assessment notes, or completed Blueprints
- Does not promise exact savings or guaranteed feasibility before review

---

## Layer 2: Company OS / Delivery Layer

**Location:** `/Users/amm13/Library/Mobile Documents/com~apple~CloudDocs/parkside-os`  
**Role:** Run Snapshot review, generate Blueprints, store client/prospect files, manage delivery, and improve the operating loop.

### What the OS does

- Stores company context, SOPs, templates, and delivery workflows
- Stores the Snapshot report template
- Stores marketing/content/analytics loop SOPs
- Stores client/prospect records in the appropriate private lane
- Runs delivery outside the public website repository

### What the OS does NOT do

- Does not serve public traffic
- Does not contain public website source code
- Does not handle live form submissions directly
- Does not expose private client context to GitHub

---

## Handoff Point

When a prospect submits a Snapshot intake form on the website:

1. The API route validates and stores the record when integrations are configured.
2. The owner receives the notification email with the internal summary when Resend is configured.
3. Manual step: copy/reconcile the intake into Parkside OS under the correct prospect/client lane.
4. Run the Snapshot report workflow using the OS template.
5. Deliver the Snapshot to the prospect.
6. If fit is strong, offer the paid AI Operations Blueprint.

This handoff is intentionally controlled. The Snapshot involves judgment and should not create external promises before review.

---

## Entry Points

- `/intake`: primary Snapshot intake / Intake Advisor flow
- `/growth-audit`: permanently redirects to `/intake`
- `/blueprint`: explains the free Snapshot, kept separate from the paid Blueprint
- `/opportunity-estimator`: readiness check; a strong result can pass context into `/intake`

Intake posts to `/api/intake`. The `source` field distinguishes a direct Snapshot request from an estimator handoff.

---

## Key Environment Variables

- `RESEND_API_KEY`: Resend email API key for owner notifications
- `PARKSIDE_NOTIFY_EMAIL`: owner email address for intake notifications
- `SUPABASE_URL`: Supabase project URL for intake record storage
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key

When these variables are not set, the API route still returns success to the submitter — it logs that the integrations are not configured but does not fail the request.

---

## Files To Never Make Public

The following belong in the delivery layer and must never be committed to this repository or served via any public endpoint:

- delivery prompts
- scoring frameworks and rubrics
- client/prospect intake files
- completed Snapshot reports
- Blueprint documents
- internal assessment notes
- secrets, API keys, credentials, private customer data
