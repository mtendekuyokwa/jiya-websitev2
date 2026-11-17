const routes = [
  { from: "Lilongwe", to: "Blantyre", km: 311, time: "4½ h" },
  { from: "Lilongwe", to: "Mzuzu", km: 360, time: "5 h" },
  { from: "Blantyre", to: "Zomba", km: 66, time: "1 h" },
  { from: "Lilongwe", to: "Salima", km: 100, time: "1½ h" },
  { from: "Blantyre", to: "Mangochi", km: 190, time: "3 h" },
  { from: "Lilongwe", to: "Kasungu", km: 127, time: "2 h" },
  { from: "Mzuzu", to: "Karonga", km: 220, time: "3 h" },
];

export function Routes() {
  return (
    <section id="routes" aria-labelledby="routes-title" className="scroll-mt-20 pb-20 pt-32 sm:pb-32 sm:pt-48">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="t-kicker">Where people go</p>
          <h2 id="routes-title" className="t-h2 mt-3">From Karonga to Mulanje.</h2>
          <p className="t-lead mt-5 max-w-[26rem] text-ink-2">
            Post or find a trip between any two towns in Malawi. These are some of the
            long roads people travel most.
          </p>
          <img
            src="/images/road-mountains.webp"
            alt="A road through a car windscreen, heading towards mountains at dusk"
            loading="lazy"
            className="mt-10 hidden aspect-[4/3] w-full rounded-[1.75rem] object-cover lg:block"
          />
        </div>

        <ol className="lg:pt-2">
          {routes.map((r, i) => (
            <li
              key={r.from + r.to}
              className="reveal group relative grid grid-cols-[1fr_auto] items-end gap-4 py-6 sm:py-7"
            >
              {i > 0 && (
                <span aria-hidden="true" className="absolute inset-x-0 top-0 border-t-2 border-dashed border-line-strong" />
              )}
              <p className="text-[clamp(1.6rem,4vw,3.1rem)] font-bold leading-none tracking-[-0.04em]">
                {r.from}
                <span className="mx-[0.3em] inline-block text-teal transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:translate-x-2" aria-label="to">
                  →
                </span>
                {r.to}
              </p>
              <p className="tabular pb-1 text-right text-[14px] leading-snug text-ink-2 sm:text-[15px]">
                ~{r.km} km
                <br />
                {r.time}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
