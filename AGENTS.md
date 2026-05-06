# AGENTS.md

These instructions apply to all code generation, refactoring, and review work in this repository.

## Engineering Standards

- Follow Apple HIG principles for user experience: clear hierarchy, accessible controls, Dynamic Type-friendly sizing, and visible interaction feedback.
- Follow Google style guidance: readable names, single-responsibility functions, and clear public comments for exported classes/functions where behavior is not obvious.
- Follow Airbnb React/TypeScript conventions: functional components, hooks where needed, explicit interfaces, and no `any`.
- Follow Microsoft REST guidance for APIs: version intentionally when externalized, use standard status codes, and return actionable errors.
- Follow AWS-style security posture: no hardcoded secrets, environment variables for credentials, validation on client and server, and graceful failure for external calls.

## Project Rules

- Keep `current-site/` intact as the original static prototype unless explicitly asked otherwise.
- Treat `source-docs/` as the brand source of truth. The actual folder is `source-docs/guidelines/`.
- Do not publicly describe Parkside as small, solo, boutique, freelancer, side project, beta, experimental, or new.
- Do not publish fixed pricing.
- Do not promise exact savings or guaranteed technical feasibility.
- Keep implementation practical and launchable; avoid admin portals, dashboards, auth, payments, or CRM complexity until requested.

## Completion Checks

- No magic numbers or hardcoded business logic where a named constant is more readable.
- Logic is DRY at the appropriate scope.
- UI feels premium, clear, native, and accessible.
- Intake prevents empty submissions, pricing promises, and credential requests.
