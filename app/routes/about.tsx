import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Jiya" },
    {
      name: "description",
      content:
        "Learn about Jiya — our mission to make carpooling in Malawi simple, safe, and social.",
    },
  ];
}

export default function About() {
  return (
    <main className="bg-[var(--color-hero-bg)] min-h-screen">
      <div className="mx-auto max-w-[680px] px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="mb-12">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            About Jiya
          </h1>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <div className="text-gray-400 leading-relaxed space-y-4">
              <p>
                Jiya was born from a simple observation: countless cars travel
                between Malawian cities every day with empty seats, while
                passengers struggle with expensive, unreliable transport.
              </p>
              <p>
                We started Jiya to solve this. By connecting drivers with empty
                seats to passengers heading the same way, we turn unused space
                into shared journeys — saving money, reducing congestion, and
                building community along the way.
              </p>
              <p>
                What began as an idea to make commuting more affordable has
                grown into a platform that makes travel social, sustainable, and
                accessible for everyone in Malawi.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              Make travel affordable, social, and sustainable by filling empty
              seats and connecting people who share the road.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
            <div className="space-y-8">
              <ValueBlock
                title="Trust"
                description="Every user is verified, every ride is rated, and every journey is backed by our community. We build trust through transparency and accountability."
              />
              <ValueBlock
                title="Community"
                description="Travel doesn't have to be solitary. Jiya turns commutes into conversations, creating connections between people who share routes and destinations."
              />
              <ValueBlock
                title="Affordability"
                description="By splitting fuel costs and filling empty seats, we make travel accessible to more people. Saving money shouldn't mean sacrificing comfort or safety."
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Company</h2>
            <div className="text-gray-400 leading-relaxed space-y-2">
              <p>
                Jiya is operated by Mulinda Enterprises, a company registered in
                Malawi.
              </p>
              <p>
                For inquiries, contact us at{" "}
                <a
                  href="mailto:info@jiya.mw"
                  className="text-yellow-400 hover:underline"
                >
                  info@jiya.mw
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ValueBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
