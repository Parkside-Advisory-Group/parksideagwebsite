import { NextResponse } from "next/server";
import { notifyParkside } from "../../../lib/integrations/email";
import { saveIntakeRecord } from "../../../lib/integrations/storage";
import { createIntakeRecord } from "../../../lib/intake/record";
import { IntakeSubmission } from "../../../lib/intake/types";
import { validateIntakeSubmission } from "../../../lib/intake/validation";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const submission = (await request.json()) as IntakeSubmission;
    const errors = validateIntakeSubmission(submission);

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const record = createIntakeRecord(submission);
    const [storageResult, emailResult] = await Promise.all([
      saveIntakeRecord(record),
      notifyParkside(record)
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
      { errors: ["The intake could not be processed. Please try again or email info@parksideag.com."] },
      { status: 500 }
    );
  }
}
