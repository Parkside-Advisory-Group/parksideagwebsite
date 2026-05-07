import Image from "next/image";

const diagnosticSignals = ["Lead leak", "Follow-up gap", "Manual report", "Owner missing"];

export function HomeHeroVisual() {
  return (
    <div className="home-hero-visual" aria-label="Premium workflow diagnostic image" role="img">
      <div className="home-hero-visual-panel" aria-hidden="true">
        <Image
          src="/assets/generated/ai-workflow-snapshot-hero.png"
          alt=""
          fill
          priority
          sizes="(max-width: 900px) 86vw, 36vw"
        />
        <div className="home-hero-visual-overlay">
          <span className="home-hero-visual-kicker">Snapshot Output</span>
          <strong>One workflow. Clear leaks. First useful system.</strong>
          <div className="home-hero-visual-chips">
            {diagnosticSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
