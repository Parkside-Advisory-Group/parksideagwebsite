import { IntakeRecord } from "../intake/types";

/**
 * Sends an internal lead notification when Resend is connected.
 * The first pass intentionally avoids hard failing when credentials are absent.
 */
export async function notifyParkside(record: IntakeRecord): Promise<{ sent: boolean; reason?: string }> {
  if (!process.env.RESEND_API_KEY || !process.env.PARKSIDE_NOTIFY_EMAIL) {
    return { sent: false, reason: "Resend environment variables are not configured." };
  }

  // TODO: Install and wire the Resend SDK, then send record.internal_summary
  // to PARKSIDE_NOTIFY_EMAIL from a verified sending domain.
  return { sent: false, reason: "Resend integration is scaffolded but not connected." };
}
