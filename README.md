# Parkside Advisory Group

Vercel-ready Next.js site for Parkside Advisory Group, including public marketing pages, the Parkside Intake Advisor flow, intake persistence/notification integrations, and supporting operational docs.

## Astra redesign — Room for what matters

The `redesign/astra-atelier` branch rebuilds the public visual experience around the existing burgundy, cream, and gold palette. It includes a live Three.js ribbon sculpture, original architectural artwork, responsive editorial layouts, a workflow explorer, and consistent secondary-page styling.

- `components/experience/` owns the WebGL, progressive reveals, workflow explorer, and motion preference control.
- `app/styles/atelier.css` and `atelier-pages.css` define the new visual system.
- `public/assets/atelier/` contains optimized, local artwork and the social-sharing image. The sculpture still is rendered from the actual geometry.
- `tasks/astra-iterations.md` records the three design passes and final navigation fixes.

Motion respects the operating-system preference and a visitor pause control. The 3D renderer pauses offscreen and falls back to a static image when WebGL is unavailable. Run `npm run build` followed by `npm run start -- --port 3017` for the production-build preview. This branch has not been published to the live site.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify the system

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

With a local server running on port 3017, run `npm run test:browser` for the 15 grouped browser regression checks. Set `PREVIEW_URL` to test another local preview. Playwright Chromium must be installed. These checks do not submit a real lead.

## Key structure

- `app/` - Next.js app router pages and API routes.
- `components/` - shared UI components.
- `lib/agents/intake-agent.ts` - lead-summary generation, scoring, and intake record creation.
- `lib/integrations/` - Resend and Supabase integration modules.
- `lib/prompts/intake-system.md` - internal intake prompt reference.
- `public/` - brand assets, photography, generated hero assets, and public LLM guidance files.
- `source-docs/` - brand source files and guidelines.
- `docs/architecture.md` - canonical boundary between the public website and the private Parkside OS delivery layer.
- `docs/operations/` - internal operating references for offers, intake, sales, security, monitoring, and roadmap.
- `docs/reports/` - historical GEO audits and related reports.
- `tests/` - node-based regression tests for intake logic and integrations.

## Environment variables

Copy `.env.example` to `.env.local` and fill values as integrations are connected.

- `OPENAI_API_KEY`
- `RESEND_API_KEY`
- `PARKSIDE_NOTIFY_EMAIL` - use `info@parksideag.com` for inbound intake notifications.
- `NEXT_PUBLIC_BOOKING_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Current live system

- Home, Services, Blueprint, Use Cases, About, Intake, Growth Audit, and Privacy pages.
- Primary intake route at `/api/intake`.
- Server-side intake validation and guardrail enforcement.
- Lead scoring and tiering.
- Correlation-ID generation for intake submissions.
- Resend notification support with correlation-ID subject tagging.
- Supabase storage support with safe fallback if `correlation_id` is not yet present on `public.intake_leads`.
- Canonical host monitoring script at `npm run monitor:canonical-host`.

## Database migration note

To persist correlation IDs in a dedicated Supabase column, run:

- `docs/intake-correlation-id-migration.sql`

## Contact addresses

- `amora@parksideag.com` - direct work email.
- `info@parksideag.com` - general public inbox and intake notification target.

## Search readiness and quality checks

Public pages are prerendered with canonical URLs, shared Organization/Service data,
and article-specific authorship and publication metadata. The sitemap covers all
17 public pages and articles. FAQs and illustrative workflows are visible HTML.
`llms.txt` is a supplementary directory, not a requirement or ranking guarantee.

Touch screens and data-saving connections receive the sculpture artwork first;
visitors can enable the full 3D renderer with the visible control. Desktop retains
live 3D. Reduced-motion preferences and graphics failure fallbacks are supported.
The site uses only the Newsreader weight it renders and avoids preloading the
secondary monospace font. Analytics components run in Vercel environments, where
their first-party collection endpoints exist.

`npm test` includes sitemap inventory and metadata/schema regression checks.
`npm run test:browser` verifies the production server on port 3017 (override with
`PREVIEW_URL`). GitHub's Site quality workflow runs lint, tests, build, typecheck,
and browser verification on pushes and pull requests.

Search Console indexing, search traffic, AI citations, and real-user Core Web
Vitals must be evaluated on the deployed domain. Local Lighthouse scores are lab
measurements and do not establish rankings or field performance.
