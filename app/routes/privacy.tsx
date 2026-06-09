import type { Route } from "./+types/privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - Jiya" },
    {
      name: "description",
      content:
        "JIYA Privacy Policy - Learn how we collect, use, and protect your personal data.",
    },
  ];
}

export default function Privacy() {
  return (
    <main className="bg-[var(--color-hero-bg)] min-h-screen">
      <div className="mx-auto max-w-[680px] px-6 pt-32 pb-24">
        <div className="mb-12">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mt-3">
            Last updated: April 26, 2026
          </p>
        </div>

        <div className="space-y-12">
          <Section num="1" title="Introduction">
            <p>
              JIYA (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you use the JIYA mobile application and related services
              (collectively, the &quot;Platform&quot;).
            </p>
            <p className="mt-4">
              By using the Platform, you consent to the collection and use of
              your information in accordance with this Policy. If you do not
              agree with our practices, please do not use the Platform.
            </p>
          </Section>

          <Section num="2" title="Scope of This Policy">
            <p>
              This Privacy Policy applies to all users of the Platform,
              including Drivers who offer rides and Passengers who request rides
              in Malawi. It covers information collected through the JIYA mobile
              application, website, and any communications associated with the
              Platform.
            </p>
          </Section>

          <Section num="3" title="Information We Collect">
            <p className="mb-3">
              We collect the following categories of personal data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Identity Data:</strong> Name, profile picture, phone
                number, email address, and date of birth.
              </li>
              <li>
                <strong>Vehicle Data:</strong> Driver&apos;s license, vehicle
                registration, insurance documents, and vehicle details.
              </li>
              <li>
                <strong>Location Data:</strong> Pickup and drop-off points,
                route information, and travel schedules.
              </li>
              <li>
                <strong>Usage Data:</strong> Rides posted, rides booked,
                ratings, and communication records.
              </li>
              <li>
                <strong>Device Data:</strong> Device type, operating system, and
                app usage patterns.
              </li>
            </ul>
          </Section>

          <Section num="4" title="How We Use Your Information">
            <p className="mb-3">
              Your personal data is used for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Facilitating ride matching between Drivers and Passengers.</li>
              <li>Verifying Driver identities and vehicle credentials.</li>
              <li>Processing ride bookings and coordinating travel arrangements.</li>
              <li>Enabling communication between matched Users.</li>
              <li>Ensuring Platform safety and preventing fraud.</li>
              <li>Improving our services and user experience.</li>
              <li>Complying with legal obligations.</li>
            </ul>
          </Section>

          <Section num="5" title="Legal Basis for Processing">
            <p className="mb-3">
              We process your personal data under the following legal bases:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Consent:</strong> You provide explicit consent for the
                collection and use of your data as outlined in this Policy.
              </li>
              <li>
                <strong>Contract Performance:</strong> Processing is necessary
                to fulfill our agreement to provide the Platform services.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> Processing supports
                Platform operations, safety, and service improvement.
              </li>
              <li>
                <strong>Legal Compliance:</strong> Processing may be required to
                comply with applicable Malawian laws.
              </li>
            </ul>
          </Section>

          <Section num="6" title="Information Sharing and Disclosure">
            <p className="mb-3">
              <strong>Between Users:</strong> When a ride is booked, Drivers and
              Passengers may share relevant contact information and ride details
              to coordinate travel.
            </p>
            <p className="mb-3">
              <strong>Third-Party Service Providers:</strong> Data may be shared
              with providers who assist in ride coordination, cloud storage, and
              analytics.
            </p>
            <p className="mb-3">
              <strong>Legal Requirements:</strong> Data may be disclosed to
              authorities when required by law or to protect Platform integrity.
            </p>
            <p>
              We do not sell your personal data to third parties.
            </p>
          </Section>

          <Section num="7" title="Data Retention">
            <p>
              We retain your personal data for as long as your account is active
              or as necessary to provide services. Account-related data may be
              retained for up to 7 years after account closure for legal
              compliance. You may request deletion of your data subject to legal
              retention requirements.
            </p>
          </Section>

          <Section num="8" title="Data Security">
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access, alteration,
              disclosure, or destruction. However, no internet transmission or
              electronic storage is completely secure, and we cannot guarantee
              absolute security.
            </p>
          </Section>

          <Section num="9" title="Your Rights">
            <p className="mb-3">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of your personal data
                held by us.
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete data.
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                data, subject to legal limitations.
              </li>
              <li>
                <strong>Withdrawal of Consent:</strong> Withdraw consent for
                data processing where applicable.
              </li>
              <li>
                <strong>Data Portability:</strong> Request your data in a
                portable format.
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@jiya.mw"
                className="text-yellow-400 hover:underline"
              >
                privacy@jiya.mw
              </a>
              .
            </p>
          </Section>

          <Section num="10" title="Data Controller">
            <p>
              JIYA is operated by Mulinda Enterprises, a company registered in
              Malawi.
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        {num}. {title}
      </h2>
      <div className="text-gray-400 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}
