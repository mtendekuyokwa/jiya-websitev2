import { useEffect, useRef, useState } from "react";
import { Phone } from "~/components/ui/phone";

const steps = [
  {
    when: "Thursday, 20:14",
    title: "Chikondi books a seat",
    body: "She searches for Blantyre and finds Thoko’s Friday trip. She pays a K2,000 hold to keep the seat and gets a booking code. Thoko’s number appears once the seat is hers.",
    screen: "seat-booked",
    alt: "Jiya app screen: Seat booked. QR booking code JY-4K82, Lilongwe to Blantyre on Friday 9 October at 07:30, driver Thoko Banda, K2,000 hold paid and K10,000 to pay on the day.",
    stop: 0,
  },
  {
    when: "Friday, 07:24",
    title: "Thoko is on the way",
    body: "Chikondi watches the car come to the pickup point by Shoprite in Area 3 and can call Thoko from the app. Her location is shared only until she’s picked up.",
    screen: "live-tracking",
    alt: "Jiya app screen: Driver on the way, 2.4 kilometres and about 6 minutes away, with the route on a map.",
    stop: 0.06,
  },
  {
    when: "Friday, 11:52",
    title: "Blantyre. Rate the trip.",
    body: "They pull into Blantyre just before noon. Chikondi gives Thoko four stars, tagged On time and Safe driving. Thoko sees the stars and tags, but not who left them.",
    screen: "rate-trip",
    alt: "Jiya app screen: How was your trip? Four stars selected with the tags On time and Safe driving.",
    stop: 1,
  },
];

const stops = ["Lilongwe", "Dedza", "Ntcheu", "Blantyre"];

export function TripStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const progress = steps[active].stop;

  return (
    <section id="how" aria-labelledby="how-title" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-[40rem]">
          <p className="t-kicker">How a trip works</p>
          <h2 id="how-title" className="t-h2 mt-3">
            Lilongwe to Blantyre, start to finish.
          </h2>
          <p className="t-lead mt-5 text-ink-2">
            Here’s one trip as it happens in the app. Drivers set their own price per seat; this one was K12,000.
          </p>
        </div>

        <div className="mt-12 grid gap-16 lg:mt-20 lg:grid-cols-[1fr_minmax(0,21.5rem)] lg:gap-24">
          <ol className="lg:border-l-2 lg:border-line">
            {steps.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-i={i}
                className="relative flex flex-col gap-7 pb-14 last:pb-0 lg:min-h-[58vh] lg:pb-0 lg:justify-center lg:pl-10 lg:last:min-h-[46vh]"
              >
                {/* Active marker on the rail */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-[3px] top-1/2 hidden h-16 w-1 -translate-y-1/2 rounded-full bg-teal transition-[opacity,transform] duration-500 lg:block ${
                    active === i ? "opacity-100" : "scale-y-50 opacity-0"
                  }`}
                />
                <div className="max-w-[30rem]">
                  <p className="tabular text-[15px] font-semibold text-teal">{s.when}</p>
                  <h3 className="mt-2 text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold leading-[1.12] tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{s.body}</p>
                </div>
                {/* Mobile: each step carries its own screen */}
                <Phone screen={s.screen} alt={s.alt} className="mx-auto w-full max-w-[12.5rem] lg:hidden" />
              </li>
            ))}
          </ol>

          {/* Desktop: one pinned phone that follows the story */}
          <div className="hidden lg:block">
            <div className="sticky top-[5.5rem]">
              <RouteBar progress={progress} />
              <Phone
                screens={steps.map(({ screen, alt }) => ({ screen, alt }))}
                active={active}
                className="mt-6 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteBar({ progress }: { progress: number }) {
  return (
    <div aria-hidden="true">
      <div className="relative h-1.5 rounded-full bg-line">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-teal-vivid transition-[width] duration-700 ease-[var(--ease-out-quint)]"
          style={{ width: `${progress * 100}%` }}
        />
        <div
          className="absolute top-1/2 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface text-teal shadow-card transition-[left] duration-700 ease-[var(--ease-out-quint)]"
          style={{ left: `${progress * 100}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 16V11l2-5h10l2 5v5M5 16h14M5 16v2M19 16v2" />
          </svg>
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[13px] font-medium text-muted">
        {stops.map((s, i) => (
          <span key={s} className={i / (stops.length - 1) <= progress ? "text-ink" : undefined}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
