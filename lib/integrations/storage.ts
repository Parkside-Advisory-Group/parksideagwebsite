import { IntakeRecord } from "../schemas/lead.schema";

type StorageResult = { saved: boolean; reason?: string };

function buildStoragePayload(record: IntakeRecord, includeCorrelationId = true): Record<string, unknown> {
  if (includeCorrelationId) {
    return record as unknown as Record<string, unknown>;
  }

  const { correlation_id: _correlationId, ...recordWithoutCorrelationId } = record;
  return recordWithoutCorrelationId as unknown as Record<string, unknown>;
}

function looksLikeMissingCorrelationIdColumn(errorText: string): boolean {
  return /correlation_id/i.test(errorText) && /(column|schema cache|could not find)/i.test(errorText);
}

async function insertPayload(
  supabaseUrl: string,
  serviceRoleKey: string,
  payload: Record<string, unknown>
): Promise<Response> {
  return fetch(`${supabaseUrl}/rest/v1/intake_leads`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });
}

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
    const response = await insertPayload(supabaseUrl, serviceRoleKey, buildStoragePayload(record));

    if (!response.ok) {
      const errorText = await response.text();

      if (looksLikeMissingCorrelationIdColumn(errorText)) {
        const fallbackResponse = await insertPayload(
          supabaseUrl,
          serviceRoleKey,
          buildStoragePayload(record, false)
        );

        if (fallbackResponse.ok) {
          return {
            saved: true,
            reason: "Saved without dedicated correlation_id column; traceability is preserved in summary and follow-up notes."
          };
        }

        const fallbackErrorText = await fallbackResponse.text();
        return {
          saved: false,
          reason: `Supabase insert failed (${fallbackResponse.status}): ${fallbackErrorText || fallbackResponse.statusText}`
        };
      }

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
