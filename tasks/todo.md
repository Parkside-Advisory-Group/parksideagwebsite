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
