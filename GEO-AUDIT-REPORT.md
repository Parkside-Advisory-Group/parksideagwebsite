# GEO Audit Report: Parkside Advisory Group

**Audit Date:** April 27, 2026  
**URL:** https://parksideag.com  
**Business Type:** Agency/Services  
**Pages Analyzed:** 7 public Next.js pages, plus `robots.txt`, `sitemap.xml`, and `llms.txt`

---

## Executive Summary

**Overall Code-Level GEO Score: 64/100 (Fair)**  
**Public Availability Gate: Critical - `parksideag.com` did not resolve via DNS during audit**

Parkside has a credible GEO foundation in the local Next.js implementation: server-rendered static pages, a sitemap, permissive robots rules, `llms.txt`, descriptive metadata, and baseline Organization/ProfessionalService schema. The biggest blocker is public availability: `curl`, `dig`, and `nslookup` could not resolve `parksideag.com`, which means AI crawlers cannot currently discover or cite the live site. Once DNS is fixed, the main optimization work is strengthening brand authority, E-E-A-T proof, page-level schema, and AI-citable answer blocks.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---:|---:|---:|
| AI Citability | 72/100 | 25% | 18.0 |
| Brand Authority | 46/100 | 20% | 9.2 |
| Content E-E-A-T | 64/100 | 20% | 12.8 |
| Technical GEO | 78/100 | 15% | 11.7 |
| Schema & Structured Data | 55/100 | 10% | 5.5 |
| Platform Optimization | 66/100 | 10% | 6.6 |
| **Overall GEO Score** | | | **64/100** |

---

## Critical Issues (Fix Immediately)

1. **Public domain does not resolve**
   - Affected URL: `https://parksideag.com/`
   - Evidence: `curl https://parksideag.com/`, `curl https://parksideag.com/robots.txt`, `dig parksideag.com`, and `nslookup parksideag.com` returned DNS resolution failure/no answer.
   - Impact: Search engines and AI crawlers cannot fetch the site, sitemap, robots file, or `llms.txt`.
   - Recommended fix: Configure DNS records for the apex domain and `www`, point them to the deployment provider, then verify `https://parksideag.com/`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt` return `200`.

2. **`llms.txt` conflicted with project positioning rules during audit**
   - Affected file: `public/llms.txt`
   - Evidence: The first paragraph described Parkside as helping "small and mid-sized businesses." Repository rules say not to publicly describe Parkside as small.
   - Impact: Public AI-readable guidance contradicted the brand constraints.
   - Status: Corrected during audit by changing the phrasing to "businesses."

## High Priority Issues

1. **Brand authority is mostly first-party**
   - Affected pages: `/about`, sitewide footer, schema graph.
   - Details: The site has no visible LinkedIn company link, founder/leadership profile, third-party mentions, client examples, public proof, or external entity anchors.
   - Recommended fix: Add verified `sameAs` links once available, add qualified leadership/experience signals, and build at least one external profile that reinforces the Parkside entity.

2. **About page lacks strong E-E-A-T proof**
   - Affected page: `/about`
   - Details: The page explains the operating philosophy but does not name accountable leadership, credentials, relevant experience, methodology, location context, or trust principles in enough detail for AI systems to assess expertise.
   - Recommended fix: Add a concise authority section covering leadership, AI operations experience, review principles, service area, and how Parkside evaluates automation risk.

3. **No page-level structured data**
   - Affected pages: `/`, `/services`, `/blueprint`, `/use-cases`, `/about`, `/intake`, `/privacy`
   - Details: The global graph includes `Organization`, `ProfessionalService`, `OfferCatalog`, and `WebSite`, but individual pages do not expose `WebPage`, `AboutPage`, `Service`, `BreadcrumbList`, or `FAQPage` nodes.
   - Recommended fix: Add route-specific JSON-LD that reflects visible page content and links back to the sitewide organization node.

4. **Per-page metadata is too generic for sharing and AI extraction**
   - Affected files: `app/layout.tsx`, route-level `page.tsx` metadata exports.
   - Details: Open Graph metadata is global. Route pages only define title and description. No canonical URLs, route-specific Open Graph URLs, route-specific social descriptions, or OG image are declared.
   - Recommended fix: Add `alternates.canonical`, page-specific Open Graph metadata, Twitter card metadata, and a branded OG image.

## Medium Priority Issues

1. **Service and use-case content is clear but thin**
   - Affected pages: `/services`, `/use-cases`
   - Details: Cards summarize offers and use cases, but AI systems have limited concrete detail to quote.
   - Recommended fix: Add "best fit," "required inputs," "outputs delivered," "guardrails," and "not a fit when" sections.

2. **Few direct answer blocks**
   - Affected pages: `/`, `/blueprint`, `/services`, `/use-cases`
   - Details: The copy is strong editorially, but GEO benefits from concise Q&A passages answering what Parkside does, who the Blueprint is for, what it includes, and when automation is appropriate.
   - Recommended fix: Add visible FAQ-style sections and matching `FAQPage` schema only where those questions appear on the page.

3. **No explicit security or canonical host headers**
   - Affected files: `next.config.mjs`, `vercel.json`
   - Details: Local headers show `X-Powered-By: Next.js`; no explicit security headers, asset cache headers, or canonical host redirect rules were found.
   - Recommended fix: Configure security headers, static asset caching, `X-Powered-By` removal, and apex/`www` redirect behavior.

4. **Google Fonts CSS import is less optimal than `next/font`**
   - Affected file: `app/globals.css`
   - Details: CSS imports add an external font dependency and are less privacy/performance friendly than self-hosted Next font handling.
   - Recommended fix: Move fonts to `next/font` in `app/layout.tsx`.

## Low Priority Issues

1. **Sitemap freshness is static**
   - Affected file: `app/sitemap.ts`
   - Details: All routes use the same fixed `lastModified` date.
   - Recommended fix: Keep this for launch if needed, but update it intentionally when content changes.

2. **Services and use cases do not have dedicated deep pages**
   - Affected pages: `/services`, `/use-cases`
   - Details: Current pages are adequate for a lean launch, but dedicated pages would improve long-tail citability.
   - Recommended fix: Add only after the core authority/schema work is complete.

3. **Limited external links**
   - Affected sitewide footer and About page.
   - Details: The only external links found are email links. This is clean, but weak for entity corroboration.
   - Recommended fix: Add only verified profiles or references that can be maintained.

---

## Category Deep Dives

### AI Citability (72/100)

Strengths:
- The site explains the core offer in plain language: practical AI and automation for intake, follow-up, handoffs, reporting, and workflow visibility.
- The homepage has about 730 words, a single H1, clear H2 structure, and descriptive list content.
- `llms.txt` exists and points AI systems to the core routes and service concepts.

Gaps:
- `/services`, `/use-cases`, and `/about` are short: rendered text counts were about 365, 291, and 176 words respectively.
- The most citable facts are implied rather than written as direct answers.
- There are no FAQ blocks or comparison tables.

Rewrite opportunities:
- Add "Parkside Advisory Group helps businesses..." answer blocks on Home and About.
- Add "The AI Operations Blueprint includes..." on `/blueprint`.
- Add "A workflow is a good fit when..." and "Parkside will not automate..." on `/use-cases`.

### Brand Authority (46/100)

Strengths:
- Brand naming is consistent: Parkside Advisory Group.
- The domain, schema, footer, title metadata, and `llms.txt` all reinforce the same entity.
- The site avoids fixed pricing, guaranteed savings, and credential collection.

Gaps:
- Public search did not find strong brand corroboration for Parkside Advisory Group in AI automation.
- No visible LinkedIn, YouTube, GitHub, Reddit, press, client examples, or founder profile links were found in the site.
- About page does not provide enough entity-defining detail.

Recommendations:
- Add verified external profiles to `sameAs`.
- Add accountable leadership and qualifications if approved.
- Publish one or two non-promissory case-study style examples or "workflow examples" that show methodology without guaranteeing outcomes.

### Content E-E-A-T (64/100)

Strengths:
- Strong practical judgment: the site repeatedly says automation should follow clear ownership, data readiness, and human review.
- Intake and Privacy pages include trust guardrails around credentials, pricing promises, and data use.
- Service definitions are grounded in real operating problems rather than generic AI hype.

Gaps:
- About lacks expertise markers.
- Service pages lack proof, examples, and detailed methodology.
- No citations, credentials, author attribution, or update history appear on informational pages.

Recommendations:
- Add a "How Parkside evaluates workflow automation" methodology section.
- Add "What we need from your team" and "What we will not automate" style trust content to Services and Blueprint.
- Add a visible last-updated date only where content is maintained as guidance.

### Technical GEO (78/100)

Strengths:
- `npm run build` passed.
- Next generated static pages for `/`, `/about`, `/blueprint`, `/intake`, `/privacy`, `/robots.txt`, `/services`, `/sitemap.xml`, and `/use-cases`.
- Local rendered pages returned `200`.
- `robots.txt` allows all crawlers and points to the sitemap.
- `sitemap.xml` includes all main public routes.
- Homepage images use `next/image`, WebP assets, and meaningful alt text.

Gaps:
- Public DNS is not resolving.
- No canonical metadata.
- No explicit security headers.
- No custom cache headers for static assets.
- Fonts are imported through CSS rather than `next/font`.

### Schema & Structured Data (55/100)

Strengths:
- Global JSON-LD exists and validates structurally at a basic level.
- Schema types include `Organization`, `ProfessionalService`, `OfferCatalog`, and `WebSite`.
- The service taxonomy matches visible service names.

Gaps:
- `Organization` lacks `description`, `sameAs`, `contactPoint`, richer location/service-area detail, and stronger logo/reference assets.
- `OfferCatalog` items lack descriptions and URLs.
- No page-level schemas are present.
- No `BreadcrumbList`, `FAQPage`, or route-level `Service` schemas.

Recommendations:
- Build a small schema helper to avoid duplicating JSON-LD logic.
- Add only schema that matches visible page content.
- Link every page-level node back to `https://parksideag.com/#organization`.

### Platform Optimization (66/100)

Strengths:
- Google/Bing-style crawling foundation is good once DNS resolves.
- ChatGPT/Claude/Perplexity can benefit from `llms.txt`, clear route names, rendered HTML, and concise service pages.
- Mobile/accessibility basics are strong in navigation and forms.

Gaps:
- AI platforms rely on corroborating sources; those are absent or not linked.
- No OG image reduces share preview quality.
- No YouTube, LinkedIn, Reddit, GitHub, or public knowledge-base footprint is visible.
- Public DNS failure blocks all platform discovery.

---

## Quick Wins (Implement This Week)

1. Fix DNS and verify public `200` responses for `/`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt`.
2. Expand `public/llms.txt` with best citation facts and keep brand-rule-compliant positioning.
3. Add canonical URLs and route-specific Open Graph/Twitter metadata.
4. Add an About authority section with approved leadership, expertise, service area, and trust principles.
5. Add page-level schema for Home, About, Blueprint, Services, and Use Cases.

## 30-Day Action Plan

### Week 1: Availability and Metadata
- [ ] Configure DNS for apex and `www`.
- [ ] Verify HTTPS, sitemap, robots, and `llms.txt` publicly.
- [ ] Add canonical metadata and route-specific Open Graph/Twitter fields.
- [ ] Add a branded OG image.
- [x] Remove prohibited wording from `llms.txt`.

### Week 2: Schema and AI Readability
- [ ] Add `WebPage` and `BreadcrumbList` schema.
- [ ] Add `Service` schema for Blueprint and Services.
- [ ] Enrich Organization schema with approved `description`, `contactPoint`, and `sameAs`.
- [ ] Expand `llms.txt` with concise citation-ready facts.

### Week 3: E-E-A-T and Authority
- [ ] Strengthen About with approved leadership and qualification details.
- [ ] Add methodology content explaining review points, failure paths, data readiness, and human oversight.
- [ ] Add verified external profile links once live.
- [ ] Add non-promissory proof examples or sample workflow scenarios.

### Week 4: Content Depth
- [ ] Add FAQ sections to Blueprint, Services, and Use Cases.
- [ ] Add "best fit / not a fit / inputs / outputs / guardrails" blocks.
- [ ] Consider dedicated pages for the strongest service or use-case clusters.
- [ ] Re-run the GEO audit after deployment and public crawl verification.

---

## Appendix: Pages Analyzed

| URL | Title | GEO Issues |
|---|---|---:|
| `/` | Parkside Advisory Group \| AI Automation for Business Workflows | 4 |
| `/services` | Services \| Parkside Advisory Group | 6 |
| `/blueprint` | AI Operations Blueprint \| Parkside Advisory Group | 5 |
| `/use-cases` | Use Cases \| Parkside Advisory Group | 5 |
| `/about` | About \| Parkside Advisory Group | 6 |
| `/intake` | Intake \| Parkside Advisory Group | 3 |
| `/privacy` | Privacy Policy \| Parkside Advisory Group | 2 |

## Appendix: Verification Performed

| Check | Result |
|---|---|
| `npm run build` | Passed |
| Local rendered route crawl on `localhost:3010` | Passed for 7 public pages |
| Local `/robots.txt` | `200`, allows `/`, references sitemap |
| Local `/sitemap.xml` | `200`, includes 7 public pages |
| Local `/llms.txt` | `200`, text/plain |
| Public `https://parksideag.com/` | Failed DNS resolution |
| Public `https://parksideag.com/robots.txt` | Failed DNS resolution |
| Public `https://parksideag.com/sitemap.xml` | Failed DNS resolution |
| Public `https://parksideag.com/llms.txt` | Failed DNS resolution |
