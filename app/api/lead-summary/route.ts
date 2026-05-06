import { NextResponse } from "next/server";
import { generateIntakeGuidance } from "../../../lib/agents/intake-agent";
import { IntakeSubmission, validateIntakeSubmission } from "../../../lib/schemas/intake.schema";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const submission = (await request.json()) as IntakeSubmission;
    const errors = validateIntakeSubmission(submission);

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const guidance = await generateIntakeGuidance(submission);

    return NextResponse.json({
      message: guidance.aiEnabled
        ? "Lead summary generated with AI configuration available."
        : "Lead summary generated with deterministic fallback because OPENAI_API_KEY is not configured.",
      summary: guidance.summary,
      internalSummary: guidance.internalSummary,
      promptUsed: guidance.promptUsed,
      aiEnabled: guidance.aiEnabled,
      guardrails: guidance.guardrails
    });
  } catch {
    return NextResponse.json(
      { errors: ["The lead summary could not be generated. Please check the request body and try again."] },
      { status: 500 }
    );
  }
}
