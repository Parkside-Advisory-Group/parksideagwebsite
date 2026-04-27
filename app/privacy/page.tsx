import type { Metadata } from "next";
import { JsonLd } from "../../components/JsonLd";
import { contactEmail } from "../../lib/content";
import { createRouteMetadata } from "../../lib/metadata";
import { createPageBreadcrumbItems, createPageStructuredData, siteUrl } from "../../lib/structured-data";

export const metadata: Metadata = createRouteMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Parkside Advisory Group.",
  path: "/privacy"
});

const structuredData = createPageStructuredData({
  id: `${siteUrl}/privacy#webpage`,
  path: "/privacy",
  name: "Privacy Policy",
  description: "Privacy Policy for Parkside Advisory Group intake information and contact handling.",
  breadcrumbItems: createPageBreadcrumbItems("Privacy Policy", "/privacy")
});

export default function PrivacyPage() {
  return (
    <main>
      <JsonLd data={structuredData} />
      <section className="page-hero">
        <div className="container" style={{ maxWidth: 850 }}>
          <p className="eyebrow">Privacy Policy</p>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="lede">
            Parkside Advisory Group collects information submitted through the intake form so we can understand workflow
            needs, respond to inquiries, and recommend appropriate next steps.
          </p>
          <div className="panel" style={{ marginTop: 34 }}>
            <h2>Information collected</h2>
            <p>
              Intake may collect name, email, phone, business name, website, industry, workflow details, tools used,
              estimated impact, urgency, and follow-up permission.
            </p>
            <h2>How information is used</h2>
            <p>
              Information is used to evaluate fit, prepare internal lead summaries, respond to inquiries, and improve
              Parkside services. Parkside does not sell submitted intake information.
            </p>
            <h2>Credentials</h2>
            <p>
              Do not submit passwords, private API keys, login credentials, or sensitive access details through the
              website intake flow.
            </p>
            <h2>Contact</h2>
            <p>
              Questions can be sent to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
