import type { Route } from "./+types/terms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service - Jiya" },
    {
      name: "description",
      content:
        "JIYA Terms of Service - Read our terms and conditions for using the platform.",
    },
  ];
}

export default function Terms() {
  return (
    <main className="bg-[var(--color-hero-bg)] min-h-screen">
      <div className="mx-auto max-w-[680px] px-6 pt-32 pb-24">
        <div className="mb-12">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Terms of Service
          </h1>
          <p className="text-gray-500 text-sm mt-3">Last updated: 2025</p>
        </div>

        <div className="space-y-12">
          <Section
            num="1"
            title="Introduction and Acceptance of Terms"
          >
            <p>
              These Terms of Service constitute a legally binding agreement
              between you and the operator of the JIYA mobile application. By
              accessing or using the Platform, you acknowledge that you have
              read, understood, and agree to be bound by these Terms.
            </p>
          </Section>

          <Section num="2" title="Nature of the Platform">
            <p>
              JIYA is a technology intermediary platform that facilitates
              connections between users for private, non-commercial ride-sharing
              arrangements. JIYA does not provide transportation services,
              operate vehicles, or employ drivers.
            </p>
          </Section>

          <Section num="3" title="Prohibition of Commercial Use">
            <p>
              Users agree that the Platform shall not be used for commercial
              passenger transport services. All ride arrangements must be for
              non-commercial purposes.
            </p>
          </Section>

          <Section num="4" title="User Obligations">
            <p>
              Users shall provide accurate information, comply with applicable
              laws, and act in good faith. Drivers warrant their vehicles are
              roadworthy with valid insurance.
            </p>
          </Section>

          <Section num="5" title="Booking and Coordination">
            <p>
              JIYA may facilitate booking confirmations but all ride
              arrangements remain non-binding agreements between Users.
            </p>
          </Section>

          <Section num="6" title="Limitation of Liability">
            <p>
              JIYA shall not be liable for any injury, death, or damage arising
              from a ride. The Platform is provided &quot;as is&quot; without
              warranties.
            </p>
          </Section>

          <Section num="7" title="Indemnity">
            <p>
              Users agree to indemnify JIYA from any claims arising from use of
              the Platform.
            </p>
          </Section>

          <Section num="8" title="Suspension and Termination">
            <p>
              JIYA reserves the right to suspend or terminate access for
              breaches of these Terms.
            </p>
          </Section>

          <Section num="9" title="Governing Law">
            <p>
              These Terms shall be governed by the laws of the Republic of
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
