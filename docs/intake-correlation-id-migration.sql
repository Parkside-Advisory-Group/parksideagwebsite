-- Parkside intake correlation ID migration
-- Safe to run on public.intake_leads before enabling dedicated correlation_id persistence.

alter table public.intake_leads
  add column if not exists correlation_id text;

create index if not exists intake_leads_correlation_id_idx
  on public.intake_leads (correlation_id);
