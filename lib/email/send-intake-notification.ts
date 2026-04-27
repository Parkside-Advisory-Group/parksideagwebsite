import { IntakeRecord } from "../schemas/lead.schema";

export interface IntakeNotificationResult {
  sent: boolean;
  reason?: string;
}

const resendEmailEndpoint = "https://api.resend.com/emails";
const notificationSender = "Parkside Intake <intake@parksideag.com>";

/**
 * Sends internal intake notifications when Resend environment variables are configured.
 */
export async function sendIntakeNotification(record: IntakeRecord): Promise<IntakeNotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const notificationRecipient = process.env.PARKSIDE_NOTIFY_EMAIL;

  if (!apiKey || !notificationRecipient) {
    return { sent: false, reason: "Resend environment variables are not configured." };
  }

  try {
    const response = await fetch(resendEmailEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: notificationSender,
        to: notificationRecipient,
        subject: `New Parkside intake: ${record.business_name}`,
        text: record.internal_summary
      })
    });

    if (!response.ok) {
      return { sent: false, reason: `Resend returned status ${response.status}.` };
    }

    return { sent: true };
  } catch {
    return { sent: false, reason: "Resend notification failed before completion." };
  }
}
