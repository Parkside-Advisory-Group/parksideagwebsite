# Canonical Host Monitoring

`https://parksideag.com/` is the canonical public host. `https://www.parksideag.com/` should redirect directly to the apex so crawlers, search engines, and AI indexing systems resolve one source of truth.

## DNS Expectations

- Apex `A`: `76.76.21.21`
- Apex `AAAA`: no record unless Vercel adds IPv6 support for this project.
- `www`: either `A` records returned by DNS flattening or a CNAME managed by Vercel.

Confirm these records at the registrar and in Vercel whenever domains are changed.

## Verification

Run this check after DNS, Vercel, or domain changes:

```bash
npm run monitor:canonical-host
```

The check verifies Cloudflare, Google, Quad9, and OpenDNS DNS answers for the apex and `www`, then confirms:

- `https://www.parksideag.com/` redirects to `https://parksideag.com/`.
- `https://parksideag.com/` returns `2xx`.
- `https://parksideag.com/robots.txt` returns `2xx`.
- `https://parksideag.com/sitemap.xml` returns `2xx`.
- `https://parksideag.com/llms.txt` returns `2xx`.

## Scheduled Monitoring

`.github/workflows/canonical-host-monitor.yml` runs the same verification every 15 minutes and can also be triggered manually with `workflow_dispatch`. Configure repository notification routing so failed runs alert the site owner.

The local Codex automation `parkside-canonical-host-monitor` also runs this check hourly from `/Users/amm13/ParksideAdvisoryCodex`.

## Current Verification

Verified on April 27, 2026 after production deployment:

- Vercel production alias: `https://parksideag.com`.
- `https://www.parksideag.com/` returns `308` to `https://parksideag.com/`.
- `https://parksideag.com/`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt` return `200`.
- Cloudflare zone `parksideag.com` is active on `joan.ns.cloudflare.com` and `lloyd.ns.cloudflare.com`.
- Cloudflare DNS has DNS-only `A` records for `parksideag.com` and `www.parksideag.com`, both pointing to `76.76.21.21`.
- Public DNS checks passed from Cloudflare, Google, Quad9, and OpenDNS.
