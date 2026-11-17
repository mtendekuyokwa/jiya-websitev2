import { Bell, Check, Flag, Lock, PhoneIcon, Star } from "~/components/ui/icons";

/** A tile: sand ground with app-style UI floating on it, the way the app layers cards. */
function Tile({
  title,
  body,
  className = "",
  children,
}: {
  title: string;
  body: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <li className={`reveal flex flex-col overflow-hidden rounded-[1.75rem] bg-sand ${className}`}>
      <div className="relative flex min-h-[9.5rem] flex-1 items-center justify-center px-6 pt-6 sm:min-h-[13rem] sm:pt-8" aria-hidden="true">
        {children}
      </div>
      <div className="px-6 pb-6 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
        <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em]">{title}</h3>
        <p className="mt-1.5 text-[16px] leading-relaxed text-ink-2">{body}</p>
      </div>
    </li>
  );
}

const card = "rounded-2xl bg-surface shadow-card";

export function Safety() {
  return (
    <section id="safety" aria-labelledby="safety-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-[44rem]">
          <p className="t-kicker">Safety</p>
          <h2 id="safety-title" className="t-h2 mt-3">
            Nobody drives on Jiya until we’ve checked their licence.
          </h2>
          <p className="t-lead mt-5 text-ink-2">
            Getting into a stranger’s car takes trust. Here is everything the app does
            so you know who you’re riding with, before, during and after the trip.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-6 lg:mt-16">
          <Tile
            className="md:col-span-4"
            title="See who’s driving before you book"
            body="Name, car, plate and rating are on every trip. Drivers can’t post until their licence is checked."
          >
            <div className={`${card} w-full max-w-[25rem] p-4`}>
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-teal-soft text-[15px] font-semibold text-on-teal-soft">TB</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">Thoko Banda</p>
                  <p className="mt-0.5 truncate text-[13px] text-muted">Silver Toyota Fielder · LL 4821</p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal-soft text-on-teal-soft">
                  <PhoneIcon className="h-[18px] w-[18px]" />
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1.5 text-[13px] font-semibold text-on-teal-soft">
                  <Check className="h-3.5 w-3.5" /> Licence checked
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3 py-1.5 text-[13px] font-semibold text-on-teal-soft">
                  <Check className="h-3.5 w-3.5" /> Phone verified
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-raised px-3 py-1.5 text-[13px] font-semibold">
                  <Star className="h-3.5 w-3.5 text-star" /> 4.9
                </span>
              </div>
            </div>
          </Tile>

          <Tile
            className="md:col-span-2"
            title="Numbers stay private"
            body="Phone numbers stay hidden until a seat is booked, so nobody can collect them from listings."
          >
            <div className={`${card} flex w-full max-w-[15rem] items-center gap-3 p-4`}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-raised text-ink-2">
                <Lock className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="tabular font-semibold tracking-wide">+265 99 ••• ••67</p>
                <p className="text-[13px] text-muted">Shown after booking</p>
              </div>
            </div>
          </Tile>

          <Tile
            className="md:col-span-2"
            title="Pay a little to book"
            body="A small hold keeps your seat. The rest goes to the driver on the day."
          >
            <div className={`${card} tabular w-full max-w-[16rem] divide-y divide-line px-4 text-[14px]`}>
              <p className="flex justify-between py-3"><span>Seat hold paid</span><span>K2,000</span></p>
              <p className="flex justify-between py-3"><span>Pay on the day</span><span>K10,000</span></p>
              <p className="flex justify-between py-3 font-semibold"><span>Seat price</span><span>K12,000</span></p>
            </div>
          </Tile>

          <Tile
            className="md:col-span-2"
            title="Everyone gets rated"
            body="Drivers and passengers rate each other after every trip, so the good ones stand out."
          >
            <div className={`${card} w-full max-w-[16rem] p-4 text-center`}>
              <div className="flex justify-center gap-1 text-star">
                {[0, 1, 2, 3].map((i) => <Star key={i} className="h-6 w-6" />)}
                <Star className="h-6 w-6 text-line-strong" />
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 text-[12px] font-semibold">
                <span className="rounded-full bg-teal-soft px-2.5 py-1 text-on-teal-soft">On time</span>
                <span className="rounded-full bg-teal-soft px-2.5 py-1 text-on-teal-soft">Safe driving</span>
                <span className="rounded-full bg-raised px-2.5 py-1">Friendly</span>
              </div>
            </div>
          </Tile>

          <Tile
            className="md:col-span-2"
            title="Report a problem in seconds"
            body="A no-show, a wrong detail or feeling unsafe: report it straight from the trip."
          >
            <div className={`${card} w-full max-w-[16rem] divide-y divide-line px-4 text-[14px]`}>
              <p className="py-2.5 text-ink-2">Driver isn’t answering</p>
              <p className="flex items-center justify-between py-2.5 font-semibold">
                Driver didn’t show up <Check className="h-4 w-4 text-teal" />
              </p>
              <p className="py-2.5 text-ink-2">I felt unsafe</p>
            </div>
            <Flag className="absolute right-6 top-6 h-5 w-5 text-muted" />
          </Tile>

          <Tile
            className="md:col-span-6"
            title="Your location, shared only until pickup"
            body="Passengers see the car coming. Once you’re in, location sharing stops."
          >
            <MiniMap />
          </Tile>
        </ul>

        <p className="mt-8 flex items-center gap-2 text-[15px] text-ink-2">
          <Bell className="h-[18px] w-[18px] shrink-0 text-teal" />
          Set ride alerts for the routes you take and hear about new trips first.
        </p>
      </div>
    </section>
  );
}

function MiniMap() {
  const route = "M40 150 C 140 150, 160 60, 300 70 S 520 140, 640 60 S 820 40, 900 90";
  return (
    <div className="relative h-[13rem] w-full max-w-[56rem] overflow-hidden rounded-2xl bg-surface shadow-card">
      <svg viewBox="0 0 940 210" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <g fill="var(--raised)">
          <rect x="60" y="20" width="120" height="70" rx="10" />
          <rect x="360" y="120" width="140" height="70" rx="10" />
          <rect x="560" y="10" width="110" height="40" rx="10" />
          <rect x="720" y="120" width="160" height="70" rx="10" />
        </g>
        <path d="M0 110 H940 M460 0 V210" stroke="var(--line)" strokeWidth="14" />
        <path d={route} fill="none" stroke="var(--teal-vivid)" strokeWidth="5" strokeLinecap="round" />
        <circle cx="40" cy="150" r="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="892" y="82" width="16" height="16" rx="4" fill="var(--ink)" />
        <g
          className="car-on-route"
          style={{
            offsetPath: `path("${route}")`,
            offsetRotate: "0deg",
            animation: "drive 9s cubic-bezier(0.45,0,0.55,1) infinite alternate",
          }}
        >
          <circle r="26" fill="var(--teal-vivid)" opacity="0.18" />
          <circle r="17" fill="var(--teal)" />
          <path
            d="M5 16V11l2-5h10l2 5v5M5 16h14M5 16v2M19 16v2"
            transform="translate(-10.5 -11) scale(0.875)"
            fill="none"
            stroke="var(--on-teal)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-[13px] font-semibold shadow-card">
        <span className="h-2 w-2 rounded-full bg-teal-vivid" />
        Driver on the way · about 6 min
      </div>
    </div>
  );
}
