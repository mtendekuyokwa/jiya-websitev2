import type { Route } from "./+types/about";
import { ArrowRight } from "~/components/ui/icons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Jiya" },
    {
      name: "description",
      content:
        "Jiya is a Malawian company making it simple and safe to share a ride with someone going the same way.",
    },
  ];
}

const values = [
  {
    title: "Trust",
    body: "Drivers’ licences are checked, every phone number is verified and every trip is rated. Trust comes from being open about who is who.",
  },
  {
    title: "Company",
    body: "A trip to Blantyre doesn’t have to be four hours alone with the radio. Jiya turns the same road into shared time with people from your own town.",
  },
  {
    title: "Fair cost",
    body: "Splitting the cost of a trip that’s happening anyway makes travel cheaper for passengers and drivers, without giving up comfort or safety.",
  },
];

export default function About() {
  return (
    <main>
      {/* Opening: airy, one statement */}
      <section className="pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <p className="t-kicker rise">About Jiya</p>
          <h1 className="t-hero rise mt-4 max-w-[15ch]" style={{ ["--d" as string]: "60ms" }}>
            We’re filling Malawi’s <span className="text-teal">empty seats.</span>
          </h1>
        </div>
      </section>

      <div className="px-3 sm:px-5">
        <img
          src="/images/road-golden.webp"
          alt="Cars driving down a two-lane highway towards a low golden sun"
          fetchPriority="high"
          className="float-in mx-auto aspect-[16/9] w-full max-w-[1360px] rounded-[2.25rem] object-cover sm:aspect-[21/9]"
        />
      </div>

      {/* Story */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <h2 className="t-h2 reveal">
            Cars travel between our cities every day with empty seats.
          </h2>
          <div className="space-y-6 text-[18px] leading-relaxed text-ink-2">
            <p>
              Meanwhile, people making the same trip struggle with expensive,
              unreliable transport. Jiya started from that simple observation.
            </p>
            <p>
              By connecting drivers who have empty seats with passengers heading the
              same way, we turn unused space into shared journeys. People save money,
              there are fewer cars on the road, and strangers become travel companions.
            </p>
            <p>
              What began as an idea to make commuting more affordable has grown into an
              app that makes travel social, sustainable and within reach for more people
              in Malawi.
            </p>
            <p className="rounded-[1.25rem] bg-sand p-6 text-ink">
              <strong className="font-semibold">Our mission</strong> is to make travel
              affordable, social and sustainable by filling empty seats and connecting
              the people who share the road.
            </p>
          </div>
        </div>
      </section>

      {/* Faces */}
      <section aria-label="People who ride with Jiya" className="px-5 sm:px-8">
        <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-4 sm:gap-5">
          <img
            src="/images/friends-group.webp"
            alt="Four friends posing together outdoors and smiling"
            loading="lazy"
            className="reveal col-span-12 aspect-[4/3] w-full rounded-[1.75rem] object-cover sm:col-span-7"
          />
          <img
            src="/images/friends-car.webp"
            alt="Two friends laughing together beside a parked car"
            loading="lazy"
            className="reveal col-span-12 aspect-[4/5] w-full rounded-[1.75rem] object-cover object-[50%_30%] sm:col-span-5 sm:mt-24"
          />
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <h2 id="values-title" className="t-h2">What we care about</h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.title} className="reveal rounded-[1.75rem] bg-sand p-8">
                <h3 className="text-[26px] font-bold tracking-[-0.03em]">{v.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Company */}
      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="mx-auto max-w-[1360px] rounded-[2.25rem] bg-band text-on-band">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="t-h2 max-w-[14ch]">The company behind Jiya</h2>
              <p className="t-lead mt-5 max-w-[34rem] text-on-band-2">
                Jiya is operated by Mulinda Enterprises, a company registered in Malawi.
                For press, partnerships or anything else, we’d like to hear from you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@jiya.mw"
                className="inline-flex min-h-12 items-center rounded-full bg-on-band px-6 font-semibold text-band transition-transform active:scale-[0.98]"
              >
                info@jiya.mw
              </a>
              <a
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold ring-1 ring-inset ring-on-band/40 transition-colors hover:bg-on-band/10"
              >
                Send a message
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
