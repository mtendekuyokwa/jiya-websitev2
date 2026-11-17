import type { Route } from "./+types/careers";
import { roles, CAREERS_EMAIL, type Role } from "~/content/careers";
import { sortedPosts } from "~/content/posts";
import { ArrowRight, Check } from "~/components/ui/icons";
import { btnPrimary } from "~/components/ui/store-links";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Careers - Jiya" },
    {
      name: "description",
      content: "Work at Jiya and help people across Malawi share the road. Engineering, design, operations and community.",
    },
  ];
}

const areas = [
  {
    title: "The app",
    body: "A Flutter app riders and drivers use on everyday Android phones and mobile data. Booking, live tracking, ratings and an offline-first network layer.",
  },
  {
    title: "The platform",
    body: "The backend behind every trip: matching rides going the same way, bookings and payments, notifications and the checks that keep drivers trustworthy.",
  },
  {
    title: "The road",
    body: "Drivers, passengers and towns. Bringing people on board, answering them when something goes wrong and learning what they need next.",
  },
];

const practices = [
  {
    title: "Tests first",
    body: "Changes start with a failing test. The app’s suite runs to hundreds of tests, and it stays green.",
  },
  {
    title: "Checked by eye",
    body: "Anything that passes its tests is still checked on a real device, in light and dark mode and on a narrow screen, before we call it done.",
  },
  {
    title: "Plain words",
    body: "We write the way people talk: sentence case, second person, and what will happen rather than warnings. It’s written down so everyone can follow it.",
  },
  {
    title: "Built for here",
    body: "Patchy signal, shared phones and long roads between towns are the normal case for us, not the edge case.",
  },
];

export default function Careers() {
  const eng = sortedPosts.filter((p) => p.category === "Engineering").slice(0, 2);

  return (
    <main>
      {/* Opening: drenched, like the home hero */}
      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[2.25rem] bg-band text-on-band">
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_85%_20%,color-mix(in_oklab,var(--teal-vivid)_35%,transparent),transparent_70%)]" />
          <div aria-hidden="true" className="grain absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay" />
          <div className="px-6 pb-12 pt-20 sm:px-12 sm:pb-16 sm:pt-28 lg:px-16">
            <p className="rise text-[15px] font-semibold text-on-band-2">Careers at Jiya</p>
            <h1 className="t-display mt-4 max-w-[12ch]">
              <span className="line-mask"><span style={{ ["--i" as string]: 0 }}>Help Malawi</span></span>
              <span className="line-mask"><span style={{ ["--i" as string]: 1 }}>travel <span className="text-[#fcd34d]">together.</span></span></span>
            </h1>
            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <p className="rise max-w-[34rem] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-on-band-2" style={{ ["--d" as string]: "500ms" }}>
                We’re a small team building the easiest way to share a trip between
                Malawi’s towns and cities. Everyone here works close to the people who
                use what we make.
              </p>
              <div className="rise flex flex-wrap items-center gap-x-6 gap-y-3" style={{ ["--d" as string]: "600ms" }}>
                <a href="#roles" className="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-on-band px-6 py-3.5 font-semibold text-band transition-transform hover:-translate-y-0.5">
                  See {roles.length} open {roles.length === 1 ? "role" : "roles"}
                </a>
                <a href="/blog" className="group inline-flex min-h-12 items-center gap-2 font-semibold">
                  Read the engineering blog
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faces */}
      <div className="mx-auto grid max-w-[1360px] grid-cols-12 gap-3 px-3 sm:gap-4 sm:px-5" aria-label="Photos of people sharing rides">
        <img src="/images/friends-group.webp" alt="Four friends posing together outdoors" loading="eager" className="float-in col-span-12 aspect-[16/10] w-full rounded-[1.75rem] object-cover sm:col-span-6" />
        <img src="/images/driver-woman.webp" alt="A woman smiling at the wheel of a car" loading="lazy" className="float-in col-span-6 aspect-[4/5] h-full w-full rounded-[1.75rem] object-cover sm:col-span-3" style={{ ["--d" as string]: "90ms" }} />
        <img src="/images/rider-smile.webp" alt="A young man grinning from the back seat of a car" loading="lazy" className="float-in col-span-6 aspect-[4/5] h-full w-full rounded-[1.75rem] object-cover object-[50%_25%] sm:col-span-3" style={{ ["--d" as string]: "180ms" }} />
      </div>

      {/* What you'd work on */}
      <section aria-labelledby="areas-title" className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <h2 id="areas-title" className="t-h2 max-w-[18ch]">What you’d work on</h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {areas.map((a) => (
              <li key={a.title} className="reveal rounded-[1.75rem] bg-sand p-8">
                <h3 className="text-[24px] font-bold tracking-[-0.03em]">{a.title}</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section aria-labelledby="how-title" className="px-3 sm:px-5">
        <div className="mx-auto max-w-[1360px] rounded-[2.25rem] bg-band text-on-band">
          <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <h2 id="how-title" className="t-h2">How we work</h2>
              <p className="t-lead mt-5 max-w-[26rem] text-on-band-2">
                A few habits that show up in every change we ship.
              </p>
            </div>
            <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {practices.map((p) => (
                <li key={p.title}>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-on-band/12">
                    <Check className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-[19px] font-semibold tracking-[-0.015em]">{p.title}</h3>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-on-band-2">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" aria-labelledby="roles-title" className="scroll-mt-24 py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.8fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="roles-title" className="t-h2">Open roles</h2>
            <p className="t-lead mt-5 max-w-[24rem] text-ink-2">
              {roles.length > 0
                ? "Don’t see your role? Send us an open application at info@jiya.mw."
                : "Nothing listed right now, but we always read what people send us."}
            </p>
          </div>

          {roles.length > 0 ? (
            <ul>
              {roles.map((r, i) => (
                <RoleRow key={r.id} role={r} first={i === 0} />
              ))}
            </ul>
          ) : (
            <div className="rounded-[1.75rem] bg-sand p-8 sm:p-10">
              <h3 className="text-[24px] font-bold tracking-[-0.03em]">Send us an open application</h3>
              <p className="mt-3 max-w-[34rem] text-[17px] leading-relaxed text-ink-2">
                Tell us what you’d like to work on and share something you’ve made: an
                app, a repository, a design, or a community you’ve helped grow. We read
                every one.
              </p>
              <a
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Open application")}`}
                className={`${btnPrimary} mt-8`}
              >
                Email {CAREERS_EMAIL}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* From the blog */}
      {eng.length > 0 && (
        <section aria-labelledby="eng-title" className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <div className="flex items-end justify-between gap-6">
              <h2 id="eng-title" className="t-h2">From the engineering blog</h2>
              <a href="/blog" className="group hidden shrink-0 items-center gap-2 font-semibold text-teal sm:inline-flex">
                All posts <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {eng.map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-[1.75rem] bg-sand p-8 transition-colors hover:bg-raised">
                    <p className="text-[14px] font-semibold text-teal">{p.readMinutes} min read</p>
                    <h3 className="mt-3 text-[22px] font-bold leading-snug tracking-[-0.025em]">{p.title}</h3>
                    <p className="mt-2 flex-1 text-[16px] leading-relaxed text-ink-2">{p.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-teal">
                      Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

function RoleRow({ role, first }: { role: Role; first: boolean }) {
  return (
    <li className="reveal relative">
      {!first && <span aria-hidden="true" className="absolute inset-x-0 top-0 border-t-2 border-dashed border-line-strong" />}
      <a href={role.applyHref} className="group grid gap-3 py-7 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
        <div>
          <p className="flex flex-wrap gap-2 text-[13px] font-semibold">
            <span className="rounded-full bg-teal-soft px-2.5 py-1 text-on-teal-soft">{role.team}</span>
            <span className="rounded-full bg-raised px-2.5 py-1 text-ink-2">{role.type}</span>
            <span className="rounded-full bg-raised px-2.5 py-1 text-ink-2">{role.location}</span>
          </p>
          <h3 className="mt-4 text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] transition-colors group-hover:text-teal">
            {role.title}
          </h3>
          <p className="mt-2 max-w-[38rem] text-[16px] leading-relaxed text-ink-2">{role.summary}</p>
        </div>
        <span className="inline-flex items-center gap-2 font-semibold text-teal">
          Apply
          <span className="grid h-10 w-10 place-items-center rounded-full bg-teal text-on-teal transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </span>
        </span>
      </a>
    </li>
  );
}
