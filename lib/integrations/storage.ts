import { IntakeRecord } from "../schemas/lead.schema";

type StorageResult = { saved: boolean; reason?: string };

/**
 * Persists intake records through Supabase's REST API.
 * Uses fetch instead of the Supabase client so the route stays lightweight.
 */
export async function saveIntakeRecord(record: IntakeRecord): Promise<StorageResult> {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { saved: false, reason: "Supabase environment variables are not configured." };
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/intake_leads`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(record)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        saved: false,
        reason: `Supabase insert failed (${response.status}): ${errorText || response.statusText}`
      };
    }

    return { saved: true };
  } catch (error) {
    return {
      saved: false,
      reason: `Supabase insert failed: ${error instanceof Error ? error.message : "Unknown error"}`
    };
  }
}
