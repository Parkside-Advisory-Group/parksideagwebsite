# Parkside Advisory Group

Vercel-ready Next.js scaffold for Parkside Advisory Group, including public marketing pages, brand documentation, and the first version of Parkside Intake Advisor.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Key Structure

- `app/` - Next.js app router pages and API routes.
- `components/` - shared UI components.
- `lib/content.ts` - offer ladder and use-case content.
- `lib/intake/` - intake validation, lead scoring, summary, and record creation.
- `lib/integrations/` - Resend and Supabase placeholders.
- `lib/prompts/` - AI prompt files for intake, scoring, summaries, and proposal drafts.
- `public/` - copied brand assets and current-site photography.
- `current-site/` - preserved static prototype reference.
- `source-docs/` - brand source files and guidelines.

## Environment Variables

Copy `.env.example` to `.env.local` and fill values as integrations are connected.

Required placeholders:

- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `PARKSIDE_NOTIFY_EMAIL` - use `info@parksideag.com` for inbound intake notifications.
- `NEXT_PUBLIC_BOOKING_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Contact Addresses

- `amora@parksideag.com` - direct work email.
- `info@parksideag.com` - general public inbox and intake notification target.

## Working Now

- Home, Services, AI Operations Blueprint, Use Cases, About, Intake, and Privacy pages.
- Intake form validation.
- Lead scoring from 0-100.
- Lead tiering.
- Internal lead summary generation.
- API route at `/api/intake`.

## Scaffolded

- Resend notification module.
- Supabase storage module.
- Prompt files for future AI-backed intake and proposal drafting.
- Booking URL environment placeholder.
