import { NextResponse } from "next/server";
import { contactEmail } from "../../../lib/content";
import { createIntakeRecord } from "../../../lib/agents/intake-agent";
import { sendIntakeNotification } from "../../../lib/email/send-intake-notification";
import { saveIntakeRecord } from "../../../lib/integrations/storage";
import {
  type IntakeSubmission,
  normalizeIntakeSubmission,
  validateIntakeSubmission
} from "../../../lib/schemas/intake.schema";

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { errors: ["Intake must be sent as JSON."] },
      { status: 400 }
    );
  }

  const errors = validateIntakeSubmission(payload);
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    const submission = normalizeIntakeSubmission(payload as IntakeSubmission);
    const record = await createIntakeRecord(submission);
    const [storageResult, emailResult] = await Promise.all([
      saveIntakeRecord(record),
      sendIntakeNotification(record)
    ]);

    return NextResponse.json({
      message:
        "Thanks. Parkside has enough context to review the workflow and recommend the right next step.",
      correlationId: record.correlation_id,
      record,
      integrations: {
        storage: storageResult,
        email: emailResult
      }
    });
  } catch {
    return NextResponse.json(
      { errors: [`The intake could not be processed. Please try again or email ${contactEmail}.`] },
      { status: 500 }
    );
  }
}
