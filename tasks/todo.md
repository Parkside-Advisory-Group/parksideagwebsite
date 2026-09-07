# Parkside — Astra redesign

## Intent and design specification
Complete redesign with the existing Parkside palette. Architectural, expressive art direction: a metallic gold ribbon sculpture suspended in a deep burgundy world, oversized typographic composition, warm paper editorial sections, generous whitespace, tactile controls, and purposeful scroll choreography. Preserve the actual business, service journey, intake, estimator, metadata and analytics. Current user's autonomous creative authorization governs; no design approval interruption.

## Plan
- [x] Inspect current palette, content, routes, working features, and repository boundary.
- [x] Build the new visual foundation, responsive navigation and footer.
- [x] Create original art assets and a real-time 3D sculpture with motion fallbacks.
- [x] Implement the complete home experience and cohesive secondary pages.
- [x] Pass 1: inspect full desktop composition and refine hierarchy, art, type and pacing.
- [x] Pass 2: inspect phone/tablet and interactions; improve layouts, navigation and touch behavior.
- [x] Pass 3: fine-tooth final design critique and polish; verify reduced motion, keyboard access, routes, forms, performance and production build.
- [x] Deliver a running reviewable preview and evidence with limitations documented.

## Verification
Run lint, typecheck, tests, production build; browser check representative routes and primary workflow with no real lead submission. Capture desktop/mobile screenshots at each pass; keep a concrete iteration log.

## Review
Three complete visual reviews are documented in tasks/astra-iterations.md. Production build, lint, TypeScript, and 10 tests passed. Automated WCAG scans passed six desktop/mobile combinations. All 15 grouped browser checks passed against the final rebuilt production preview at http://localhost:3017. Both final navigation fixes were independently reproduced and verified. Four intake recovery scenarios used intercepted requests; ten secondary-page viewport combinations had no overflow. Source is saved on redesign/astra-atelier. Screenshots and the handoff report are in the projectless task outputs folder. No production publication or real lead delivery test was performed.

## SEO / GEO hardening
- [x] Strengthen accurate search positioning and answer-first business content.
- [x] Correct sitemap, article metadata, structured data and crawler resources.
- [x] Measure production mobile performance and address material issues.
- [x] Verify build, automated checks, browser behavior and crawlable output.
- [ ] Commit and push the verified redesign branch; confirm remote revision.

The approved scope preserves the visual design and adds useful search content without invented results or ranking promises. Public search indexing and field performance require external observation after release.

### SEO / GEO review
All 17 canonical sitemap URLs return indexable server-rendered HTML; all seven articles have visible authorship and original publication metadata. Useful FAQs and an illustrative workflow now answer buyer questions. No fabricated results or modification dates. Missing articles return 404 with noindex. Public www redirects to apex with HTTP 308.

Mobile Lighthouse baseline → release: performance 49 → 94; accessibility 96 → 100; best practices 96 → 100; SEO 100 → 100. LCP 5.8s → 3.0s; blocking time 2550ms → 10ms; layout shift 0. These are local simulated-mobile lab results, not production field Core Web Vitals. Desktop retains live 3D; touch/data-saving devices start with artwork and have an opt-in control.

Production build, lint, typecheck, 14 tests, 16 browser groups and six WCAG scans passed. Final font changes received an additional viewport check at 320/390/820/1440 and accessibility rerun. Next 16.3.4 and patched transitive dependencies produce zero npm audit findings. Site quality CI now repeats build/test/browser checks. Search indexing and AI citations remain external outcomes, not verified guarantees.
