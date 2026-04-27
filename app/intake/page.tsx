import { IntakeAdvisor } from "../../components/IntakeAdvisor";

export const metadata = {
  title: "Intake",
  description: "Start the Blueprint Audit with Parkside Advisory Group."
};

export default function IntakePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container intake-shell">
          <div>
            <p className="eyebrow">Parkside Intake Advisor</p>
            <h1 className="page-title">Start the Blueprint Audit.</h1>
            <p className="lede">
              Share the workflow that feels manual, repetitive, or hard to keep up with. Parkside Intake Advisor will
              organize the context, score fit, and recommend the next step without quoting final pricing or making
              implementation promises before discovery.
            </p>
          </div>
          <IntakeAdvisor />
        </div>
      </section>
    </main>
  );
}
