import { NextResponse } from "next/server";
import { contactEmail } from "../../../lib/content";
import { createIntakeRecord } from "../../../lib/agents/intake-agent";
import { sendIntakeNotification } from "../../../lib/email/send-intake-notification";
import { saveIntakeRecord } from "../../../lib/integrations/storage";
import { IntakeSubmission, validateIntakeSubmission } from "../../../lib/schemas/intake.schema";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const submission = (await request.json()) as IntakeSubmission;
    const errors = validateIntakeSubmission(submission);

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const record = await createIntakeRecord(submission);
    const [storageResult, emailResult] = await Promise.all([
      saveIntakeRecord(record),
      sendIntakeNotification(record)
    ]);

    return NextResponse.json({
      message:
        "Thanks. Parkside has enough context to review the workflow and recommend the right next step.",
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
