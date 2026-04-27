# GEO Audit Report: Parkside Advisory Group

**Audit Date:** April 27, 2026  
**URL:** https://parksideag.com  
**Audit Target:** Current local Next.js render at `http://localhost:3000`, with live host spot checks  
**Business Type:** Agency/Services  
**Pages Analyzed:** 7 public HTML routes plus `robots.txt`, `sitemap.xml`, `llms.txt`, and `llms-full.txt`

---

## Executive Summary

**Overall GEO Score: 76/100 (Good)**  
**Previous Score:** 66/100 (Fair)  
**Net Change:** +10 points

Parkside has improved from a fair GEO foundation to a good one. The strongest gains came from route-level canonical metadata, richer direct-answer content, expanded About/E-E-A-T proof, page-specific structured data, explicit AI crawler guidance, `llms-full.txt`, and security headers. The remaining gap is mostly off-site authority and content footprint: AI systems can now understand Parkside much better on the site, but they still have limited third-party corroboration and no resource/article library to cite.

### Score Breakdown

| Category | Previous | Current | Weight | Weighted Score |
|---|---:|---:|---:|---:|
| AI Citability | 68/100 | 78/100 | 25% | 19.5 |
| Brand Authority | 45/100 | 52/100 | 20% | 10.4 |
| Content E-E-A-T | 62/100 | 76/100 | 20% | 15.2 |
| Technical GEO | 80/100 | 90/100 | 15% | 13.5 |
| Schema & Structured Data | 64/100 | 84/100 | 10% | 8.4 |
| Platform Optimization | 92/100 | 94/100 | 10% | 9.4 |
| **Overall GEO Score** | **66/100** | **76/100** | | **76/100** |

---

## Critical Issues (Fix Immediately)

No current critical issues were found in the local render.

The previous canonical-host risk is resolved in the current checks. `npm run monitor:canonical-host` verified Cloudflare, Google, Quad9, and OpenDNS all resolving `parksideag.com` and `www.parksideag.com` to `76.76.21.21`; `https://www.parksideag.com/` returns HTTP 308 to `https://parksideag.com/`; and `/`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt` returned HTTP 200.

## High Priority Issues

1. **Live deployment appears behind local code for crawler guidance**
   - Affected URLs: `https://parksideag.com/robots.txt`, `https://parksideag.com/llms.txt`
   - Evidence: Local `robots.txt` renders explicit allow groups for GPTBot, ClaudeBot, PerplexityBot, Googlebot, Bingbot, Google-Extended, Applebot, and Applebot-Extended. The live spot check returned a shorter 68-byte `robots.txt`, indicating the deployed site may not yet include the local update. Local `llms.txt` is 2,888 characters and links to `llms-full.txt`; live `llms.txt` returned 1,205 bytes.
   - Impact: The codebase is improved, but AI crawlers will only see the deployed version.
   - Recommended fix: Deploy the current build, then recheck live `/robots.txt`, `/llms.txt`, `/llms-full.txt`, and route canonical tags.

2. **Brand authority is still lightly corroborated off-site**
   - Affected area: entity recognition across Google, ChatGPT web search, Perplexity, Gemini, and Bing Copilot.
   - Evidence: Web search for exact Parkside Advisory Group / `parksideag.com` signals surfaced weak or noisy third-party results. The new About page and Person schema help, but external corroboration is still limited.
   - Impact: AI systems can parse the site, but may hesitate to recommend or cite Parkside when stronger third-party entities compete.
   - Recommended fix: Add approved LinkedIn company profile links, leadership profile links, partner references, guest posts, podcast appearances, directory profiles, or other legitimate entity corroboration.

3. **No durable resource/article footprint yet**
   - Affected pages: sitewide.
   - Evidence: The sitemap still has 7 public pages and no article/resource URLs.
   - Impact: Parkside now has better direct-answer blocks on core pages, but lacks topic-specific citation assets for searches like AI follow-up automation, intake automation, workflow triage, service business reporting, and automation guardrails.
   - Recommended fix: Publish 6-10 tightly scoped resources before scaling volume.

## Medium Priority Issues

1. **Homepage remains the strongest broad citation page, but secondary pages are still compact**
   - Current word counts: homepage 730, services 674, blueprint 709, use cases 520, about 697, intake 315, privacy 189.
   - Recommendation: Keep expanding with concise answer blocks, examples, and implementation guardrails where they answer real questions.

2. **About page is much stronger, but proof is mostly first-party**
   - Evidence: About now names Anthony Mora, includes 10+ years of operating experience, and links to LinkedIn.
   - Recommendation: Add externally verifiable credentials or references as they become available.

3. **No FAQ schema yet**
   - Evidence: Pages now include direct-answer sections and representative questions, but no FAQPage JSON-LD.
   - Recommendation: Add FAQPage schema only where the visible page has true FAQ-style question/answer content.

4. **Sitemap last-modified date is still static**
   - Evidence: all sitemap entries use `2026-04-24T00:00:00.000Z`.
   - Recommendation: Update intentionally when major content changes are published.

## Low Priority Issues

1. **No IndexNow support**
   - Impact: Bing/Copilot discovery may be slower after future publishing.
   - Recommendation: Add after the first content expansion.

2. **Route imagery is concentrated on the homepage**
   - Impact: Not a core GEO blocker, but richer page-specific social previews can improve link sharing and crawler context.
   - Recommendation: Add route-specific OG images when brand assets are ready.

---

## Category Deep Dives

### AI Citability (78/100)

Parkside improved substantially. The core pages now include direct-answer blocks for what Parkside does, services, Blueprint, use cases, inputs, outputs, fit criteria, not-a-fit guidance, and guardrails. These passages are much easier for AI systems to extract and cite than the prior shorter route copy.

Evidence from the local render:

- `/services`: 674 words with direct answer, examples, inputs, outputs, guardrails, and not-a-fit content.
- `/blueprint`: 709 words with a clear explanation of the audit, productive inputs, outputs, and failure/review points.
- `/use-cases`: 520 words with use-case criteria, inputs, outputs, and representative questions.
- `/about`: 697 words with leadership, methodology, operating proof, fit criteria, and service area.

Remaining opportunity: publish dedicated resource pages that answer narrow, high-intent questions in 700-1,200 words each.

### Brand Authority (52/100)

The on-site entity base is better: Organization schema, ProfessionalService schema, AboutPage schema, Person schema, a LinkedIn profile link, consistent brand language, and `llms.txt` guidance are all meaningful improvements.

The score remains constrained because search results still show limited third-party confirmation for Parkside Advisory Group as an AI automation/workflow operations entity. For GEO, the next lift will come less from more site metadata and more from trusted external mentions.

Recommended authority actions:

- Add LinkedIn company `sameAs` once approved.
- Add additional leadership/profile URLs where appropriate.
- Build 3-5 credible public references: guest posts, partner pages, podcast notes, directory listings, or local business profiles.
- Use consistent phrasing: "Parkside Advisory Group", "AI automation", "workflow automation", "AI Operations Blueprint".

### Content E-E-A-T (76/100)

This is one of the clearest improvements. The About page now provides named leadership, operating experience, concrete methodology, proof points, and service-area context. The Services and Use Cases pages now explain inputs, outputs, boundaries, and where Parkside will slow down or recommend a different path.

This helps AI systems understand that Parkside is not making broad AI claims; it is presenting a practical workflow discipline with constraints.

Remaining gaps:

- No public case studies or anonymized examples.
- No article bylines or reviewed dates because there is no resource library yet.
- External proof is still limited.

### Technical GEO (90/100)

The current local render is strong:

- Server-rendered HTML returns meaningful content.
- All public routes returned HTTP 200 locally.
- `robots.txt`, `sitemap.xml`, `llms.txt`, and `llms-full.txt` return successfully locally.
- AI crawlers are explicitly allowed in `app/robots.ts`.
- Canonical metadata is rendered on every public route.
- Security headers are configured in `next.config.mjs`: CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and X-Frame-Options.
- Typecheck and lint pass.

The main caveat is deployment parity. Live spot checks show the canonical host and core endpoints are healthy, but live `robots.txt` and `llms.txt` appear older than local output.

### Schema & Structured Data (84/100)

The prior report identified global-only schema as a major gap. That is now largely fixed.

Current schema types rendered locally:

| Route | Schema Types |
|---|---|
| `/` | Organization, ProfessionalService, OfferCatalog, WebSite, WebPage, BreadcrumbList |
| `/services` | Organization, ProfessionalService, OfferCatalog, WebSite, WebPage, BreadcrumbList, Service |
| `/blueprint` | Organization, ProfessionalService, OfferCatalog, WebSite, WebPage, BreadcrumbList, Service |
| `/use-cases` | Organization, ProfessionalService, OfferCatalog, WebSite, WebPage, BreadcrumbList, ItemList |
| `/about` | Organization, ProfessionalService, OfferCatalog, WebSite, AboutPage, BreadcrumbList, Person |
| `/intake` | Organization, ProfessionalService, OfferCatalog, WebSite, ContactPage, BreadcrumbList |
| `/privacy` | Organization, ProfessionalService, OfferCatalog, WebSite, WebPage, BreadcrumbList |

Remaining schema opportunities:

- Add ContactPoint to Organization if the public contact policy is approved.
- Add FAQPage schema where visible Q&A content exists.
- Add Article schema when resource pages launch.
- Add `sameAs` to Organization for company profile URLs once approved.

### Platform Optimization (94/100)

Parkside is now well prepared for crawler access and AI interpretation:

- `llms.txt` includes citation-ready facts, preferred positioning, representative questions, and guardrails.
- `llms-full.txt` adds a fuller AI content guide with citation rules by page.
- The sitemap lists all core public pages.
- The robots implementation explicitly allows major AI/search crawlers locally.
- Rendered HTML includes canonical tags and schema.

Remaining platform risk is authority, not access. Google AI Overviews, ChatGPT search, Perplexity, Gemini, and Bing Copilot can understand the site, but recommendations will improve when there are more high-quality third-party corroboration signals and focused resources.

---

## Improvement Summary Since Prior Audit

| Prior Finding | Current Status |
|---|---|
| Canonical host behavior needed verification | Improved: DNS and canonical endpoint checks now pass |
| No route-specific canonical metadata | Fixed locally: canonical links render on every route |
| Schema was sitewide but not page-specific | Fixed/improved: route-level WebPage/AboutPage/ContactPage/Breadcrumb/Service/Person schema added |
| About page lacked E-E-A-T proof | Improved: leadership, operating proof, methodology, profile link, and Person schema added |
| Secondary pages were thin | Improved: services, blueprint, use cases, and about all expanded |
| Robots did not explicitly name AI crawlers | Fixed locally: explicit AI crawler allow rules added |
| `llms.txt` was incomplete | Improved locally: richer `llms.txt` plus `llms-full.txt` |
| Security headers were partial | Improved: CSP and related security headers configured |

---

## Quick Wins (Implement This Week)

1. Deploy the current local build and verify live parity for `/robots.txt`, `/llms.txt`, `/llms-full.txt`, canonical tags, and security headers.
2. Add Organization `sameAs` links for approved company and leadership profiles.
3. Add `ContactPoint` schema if the public email/contact policy is acceptable.
4. Add visible "Last updated" dates to future resource-style pages.
5. Create the first resource page: "What is an AI Operations Blueprint?"

## 30-Day Action Plan

### Week 1: Deployment Parity

- [ ] Deploy the current Next build.
- [ ] Re-run `npm run monitor:canonical-host`.
- [ ] Verify live `/robots.txt` includes explicit AI crawler groups.
- [ ] Verify live `/llms.txt` links to `/llms-full.txt`.
- [ ] Verify live route canonical tags.

### Week 2: Entity Authority

- [ ] Add approved LinkedIn company/profile links.
- [ ] Add Organization `sameAs` values.
- [ ] Add ContactPoint if approved.
- [ ] Create 2-3 legitimate external profiles or directory references with consistent brand wording.

### Week 3: Citation Content

- [ ] Publish "What is an AI Operations Blueprint?"
- [ ] Publish "What workflows are good candidates for AI automation?"
- [ ] Publish "How service businesses can prevent missed follow-up."
- [ ] Add Article schema, author/reviewer, and updated dates to each resource.

### Week 4: Depth and Distribution

- [ ] Publish 2-3 more practical workflow resources.
- [ ] Add FAQPage schema where visible Q&A blocks exist.
- [ ] Submit updated sitemap through Search Console/Bing Webmaster Tools.
- [ ] Consider IndexNow after resource publishing begins.

---

## Appendix: Pages Analyzed

| URL | Title | Status | Word Count | Key GEO Issues |
|---|---|---:|---:|---|
| `http://localhost:3000/` | Parkside Advisory Group | 200 | 730 | Strong; add route-specific OG image later |
| `http://localhost:3000/services` | Services | 200 | 674 | Stronger; can support FAQ schema if Q&A expands |
| `http://localhost:3000/blueprint` | AI Operations Blueprint | 200 | 709 | Stronger; ideal first resource topic |
| `http://localhost:3000/use-cases` | Use Cases | 200 | 520 | Good; could add deeper examples |
| `http://localhost:3000/about` | About | 200 | 697 | Much improved; needs external corroboration |
| `http://localhost:3000/intake` | Intake | 200 | 315 | Good guardrails; keep credential warnings |
| `http://localhost:3000/privacy` | Privacy Policy | 200 | 189 | Adequate for purpose |
| `http://localhost:3000/robots.txt` | robots.txt | 200 | n/a | Strong locally; deploy parity needed |
| `http://localhost:3000/sitemap.xml` | sitemap.xml | 200 | n/a | Static dates |
| `http://localhost:3000/llms.txt` | llms.txt | 200 | n/a | Strong locally; deploy parity needed |
| `http://localhost:3000/llms-full.txt` | llms-full.txt | 200 | n/a | Strong local addition |

## Verification Commands

- `npm run typecheck` passed.
- `npm run lint` passed.
- `npm run monitor:canonical-host` passed.
- Local rendered route audit confirmed canonical links, route metadata, page-level JSON-LD, and image alt coverage.
