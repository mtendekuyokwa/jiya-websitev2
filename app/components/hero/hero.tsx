import { useEffect, useRef } from "react";
import { PLAY_STORE_URL } from "~/components/ui/store-links";
import { ArrowRight, GooglePlay } from "~/components/ui/icons";

/**
 * Hero: the ride ticket is Jiya's signature object, so the hero is a sky of them.
 * Tickets float at different depths and lean towards the cursor. Decorative only:
 * the same information is summarised for screen readers.
 */
type T = {
  from: string; to: string; when: string; seats: number; price?: string;
  face: string; pos: string; x: string; y: string; depth: number; rot: number; dur: number;
  /** left position on phones, so the ticket isn't cut off at the edge */
  xm?: string;
};

const tickets: T[] = [
  { from: "Lilongwe", to: "Blantyre", when: "Fri · 07:30", seats: 2, price: "K12,000", face: "/images/driver-thumbs.webp", pos: "66% 40%", x: "50%", xm: "30%", y: "8%", depth: 1, rot: -4, dur: 9 },
  { from: "Mzuzu", to: "Lilongwe", when: "Sat · 06:00", seats: 3, face: "/images/driver-woman.webp", pos: "35% 30%", x: "74%", y: "22%", depth: 0.7, rot: 5, dur: 11 },
  { from: "Zomba", to: "Blantyre", when: "Today · 17:15", seats: 1, face: "/images/rider-smile.webp", pos: "48% 25%", x: "60%", xm: "40%", y: "44%", depth: 1.25, rot: 3, dur: 8 },
  { from: "Lilongwe", to: "Salima", when: "Sun · 09:00", seats: 3, face: "/images/friends-car.webp", pos: "30% 30%", x: "82%", y: "56%", depth: 0.55, rot: -6, dur: 12 },
  { from: "Blantyre", to: "Mangochi", when: "Fri · 14:00", seats: 2, face: "/images/friends-group.webp", pos: "40% 30%", x: "40%", y: "-4%", depth: 0.45, rot: -8, dur: 13 },
  { from: "Kasungu", to: "Mzuzu", when: "Mon · 08:30", seats: 2, face: "/images/hero-friends.webp", pos: "60% 35%", x: "90%", y: "-3%", depth: 0.4, rot: 7, dur: 10 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor parallax for fine pointers; skipped when the visitor prefers less motion
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", String((e.clientX - r.left) / r.width - 0.5));
        el.style.setProperty("--my", String((e.clientY - r.top) / r.height - 0.5));
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div
        ref={ref}
        className="relative isolate mx-auto min-h-[calc(100svh-5.5rem)] max-w-[1360px] overflow-hidden rounded-[2.25rem] bg-band text-on-band"
      >
        <p className="sr-only">
          Example trips on Jiya: Lilongwe to Blantyre, Mzuzu to Lilongwe, Zomba to Blantyre,
          Lilongwe to Salima, Blantyre to Mangochi and Kasungu to Mzuzu.
        </p>

        {/* Soft light so the tickets have something to float in */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_75%_30%,color-mix(in_oklab,var(--teal-vivid)_38%,transparent),transparent_70%)]" />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay" />

        {/* Ticket sky */}
        <ul aria-hidden="true" className="absolute inset-x-0 top-0 h-[34%] sm:h-full">
          {tickets.map((t, i) => (
            <li
              key={t.from + t.to}
              className={`ticket-float absolute max-sm:!left-[var(--xm)] ${i > 3 ? "hidden md:block" : i === 1 || i === 3 ? "hidden sm:block" : i === 2 ? "[@media(max-width:639px)_and_(max-height:700px)]:hidden" : ""}`}
              style={{
                left: t.x,
                ["--xm" as string]: t.xm ?? t.x,
                top: t.y,
                ["--depth" as string]: t.depth,
                ["--rot" as string]: `${t.rot}deg`,
                ["--dur" as string]: `${t.dur}s`,
                ["--delay" as string]: `${i * -1.7}s`,
                ["--d" as string]: `${300 + i * 110}ms`,
                zIndex: Math.round(t.depth * 10),
              }}
            >
              <div className="ticket-bob">
                <HeroTicket t={t} />
              </div>
            </li>
          ))}
        </ul>

        {/* Words */}
        <div className="relative z-20 flex min-h-[calc(100svh-5.5rem)] flex-col justify-end px-6 pb-10 pt-[78%] max-[380px]:pt-[90%] [@media(max-width:639px)_and_(max-height:700px)]:!pt-[50%] sm:px-12 sm:pb-14 sm:pt-40 lg:px-16 lg:pb-16">
          <h1 className="t-display max-w-[11ch]">
            <span className="line-mask"><span style={{ ["--i" as string]: 0 }}>Someone’s</span></span>
            <span className="line-mask"><span style={{ ["--i" as string]: 1 }}>already going</span></span>
            <span className="line-mask"><span style={{ ["--i" as string]: 2 }} className="text-[#fcd34d]">your way.</span></span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 [@media(max-width:639px)_and_(max-height:700px)]:mt-6 [@media(max-width:639px)_and_(max-height:700px)]:gap-5 lg:flex-row lg:items-end lg:justify-between">
            <p className="rise max-w-[32rem] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-on-band-2" style={{ ["--d" as string]: "650ms" }}>
              Jiya matches people driving between Malawi’s towns with people who need a
              seat. The trip costs less, and nobody rides alone.
            </p>
            <div className="rise flex flex-wrap items-center gap-x-6 gap-y-3" style={{ ["--d" as string]: "750ms" }}>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-on-band px-6 py-3.5 text-[16px] font-semibold text-band transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <GooglePlay className="h-[18px] w-[18px]" />
                Get it on Google Play
              </a>
              <a href="#how" className="group inline-flex min-h-12 items-center gap-2 font-semibold text-on-band">
                See how a trip works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroTicket({ t }: { t: T }) {
  return (
    <div className="ticket-card float-in ticket w-[12.5rem] rounded-[1.1rem] bg-[#fefcf8] p-3.5 text-[#1f1b18] sm:w-[16.5rem] sm:p-4" style={{ ["--notch-y" as string]: "66%" }}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-[#4a433b] sm:text-[12px]">{t.when}</span>
        <span className="rounded-full bg-[#fce7b2] px-2 py-0.5 text-[10px] font-semibold text-[#6b3f00] sm:text-[11px]">
          {t.seats} {t.seats === 1 ? "seat" : "seats"} left
        </span>
      </div>
      <div className="mt-2.5 flex items-end justify-between gap-2">
        <div className="leading-tight">
          <p className="text-[15px] font-bold tracking-[-0.02em] sm:text-[17px]">{t.from}</p>
          <p className="flex items-center gap-1.5 text-[15px] font-bold tracking-[-0.02em] sm:text-[17px]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#0d9488]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            {t.to}
          </p>
        </div>
        {t.price && <p className="tabular text-[16px] font-bold tracking-[-0.02em] sm:text-[18px]">{t.price}</p>}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-dashed border-[#d3c8b6] pt-3">
        <img src={t.face} alt="" className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8" style={{ objectPosition: t.pos }} loading="lazy" />
        <span className="text-[11px] font-medium text-[#4a433b] sm:text-[12px]">Driver · licence checked</span>
      </div>
    </div>
  );
}
