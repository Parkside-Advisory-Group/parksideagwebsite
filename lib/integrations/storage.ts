import { IntakeRecord } from "../intake/types";

/**
 * Persists intake records when Supabase is connected.
 * This placeholder keeps storage concerns out of the API route.
 */
export async function saveIntakeRecord(record: IntakeRecord): Promise<{ saved: boolean; reason?: string }> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { saved: false, reason: "Supabase environment variables are not configured." };
  }

  // TODO: Install @supabase/supabase-js and insert into an intake_leads table
  // matching the schema documented in INTAKE.md.
  void record;
  return { saved: false, reason: "Supabase integration is scaffolded but not connected." };
}
