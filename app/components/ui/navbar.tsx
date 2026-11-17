import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Wordmark } from "./wordmark";
import { ThemeToggle } from "./theme-toggle";
import { PLAY_STORE_URL, btnPrimary } from "./store-links";
import {
  ArrowRight, Briefcase, Car, ChevronDown, Code, GooglePlay, Help, Mail, MapPin, Search, Shield, Users,
} from "./icons";
import { sortedPosts } from "~/content/posts";
import { roles } from "~/content/careers";

type Item = { href: string; label: string; desc: string; Icon: (p: { className?: string }) => React.ReactElement; badge?: string };
type Group = { id: string; label: string; items: Item[]; feature: "app" | "post" };

const groups: Group[] = [
  {
    id: "use",
    label: "Use Jiya",
    feature: "app",
    items: [
      { href: "/#how", label: "Find a ride", desc: "Book a seat on a trip already going your way", Icon: Search },
      { href: "/#drive", label: "Offer a ride", desc: "Post your trip and let empty seats cover fuel", Icon: Car },
      { href: "/#routes", label: "Popular routes", desc: "Distances and drive times between towns", Icon: MapPin },
      { href: "/#safety", label: "Safety", desc: "How we check drivers and protect riders", Icon: Shield },
    ],
  },
  {
    id: "company",
    label: "Company",
    feature: "post",
    items: [
      { href: "/about", label: "About us", desc: "Who we are and why we started Jiya", Icon: Users },
      {
        href: "/careers",
        label: "Careers",
        desc: "Help Malawi travel together",
        Icon: Briefcase,
        badge: roles.length > 0 ? `${roles.length} open` : undefined,
      },
      { href: "/blog", label: "Engineering blog", desc: "How we build the app, in detail", Icon: Code },
      { href: "/contact", label: "Contact", desc: "Press, partnerships and support", Icon: Mail },
    ],
  },
];

const plainLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything when the route changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenId(null);
  }, [pathname, hash]);

  // Lock the page behind the open mobile menu (native scroll and smooth scroll)
  useEffect(() => {
    if (!mobileOpen) return;
    type L = { stop?: () => void; start?: () => void };
    const lenis = (window as unknown as { __lenis?: L }).__lenis;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    lenis?.stop?.();
    return () => {
      root.style.overflow = prev;
      lenis?.start?.();
    };
  }, [mobileOpen]);

  // Escape closes and returns focus; clicking outside closes
  useEffect(() => {
    if (!openId && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openId) document.getElementById(`trigger-${openId}`)?.focus();
      setOpenId(null);
      setMobileOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [openId, mobileOpen]);

  // Hover intent for mouse users only; touch and keyboard use click
  const hoverOpen = (id: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenId(id), 80);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenId(null), 160);
  };

  const solid = scrolled || mobileOpen || openId !== null;
  const latest = sortedPosts[0];

  return (
    <header
      className={`sticky top-0 z-[var(--z-nav)] transition-[background-color,box-shadow] duration-300 ${
        solid ? "bg-page/90 shadow-[0_1px_0_var(--line)] backdrop-blur-xl backdrop-saturate-150" : "bg-page"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[var(--z-menu)] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:font-semibold focus:text-on-teal"
      >
        Skip to content
      </a>

      <div ref={navRef} className="relative mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-5 sm:px-8">
        <a href="/" className="shrink-0 text-teal transition-opacity hover:opacity-80">
          <Wordmark className="h-[26px] w-auto" title="Jiya home" />
        </a>

        <nav aria-label="Main" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-0.5">
            {groups.map((g) => {
              const open = openId === g.id;
              return (
                <li
                  key={g.id}
                  onPointerEnter={hoverOpen(g.id)}
                  onPointerLeave={hoverClose}
                  onBlur={(e) => {
                    // Close when keyboard focus moves outside this menu
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setOpenId((cur) => (cur === g.id ? null : cur));
                    }
                  }}
                >
                  <button
                    id={`trigger-${g.id}`}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`panel-${g.id}`}
                    onClick={() => setOpenId(open ? null : g.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:text-ink ${
                      open ? "bg-raised text-ink" : "text-ink-2"
                    }`}
                  >
                    {g.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                  </button>

                  <div
                    id={`panel-${g.id}`}
                    hidden={!open}
                    className="absolute left-5 right-5 top-[calc(100%-4px)] sm:left-8 sm:right-auto sm:w-[46rem]"
                  >
                    <div className="panel-in mt-2 grid grid-cols-[1.35fr_1fr] gap-2 rounded-[1.5rem] bg-surface p-2 shadow-float ring-1 ring-line">
                      <ul className="p-2">
                        {g.items.map(({ href, label, desc, Icon, badge }) => (
                          <li key={href}>
                            <a
                              href={href}
                              onClick={() => setOpenId(null)}
                              className="group flex gap-3.5 rounded-2xl p-3 transition-colors hover:bg-raised focus-visible:bg-raised"
                            >
                              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-soft text-on-teal-soft">
                                <Icon className="h-5 w-5" />
                              </span>
                              <span>
                                <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                                  {label}
                                  {badge && (
                                    <span className="rounded-full bg-amber-soft px-2 py-0.5 text-[11px] font-semibold text-on-amber-soft">
                                      {badge}
                                    </span>
                                  )}
                                </span>
                                <span className="mt-0.5 block text-[14px] leading-snug text-ink-2">{desc}</span>
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                      {g.feature === "post" && latest ? (
                        <a
                          href={`/blog/${latest.slug}`}
                          onClick={() => setOpenId(null)}
                          className="group flex flex-col overflow-hidden rounded-[1.1rem] bg-sand"
                        >
                          <img src={latest.cover.src} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                          <span className="flex flex-1 flex-col p-4">
                            <span className="text-[12px] font-semibold text-teal">Latest from the blog</span>
                            <span className="mt-1.5 text-[15px] font-semibold leading-snug text-ink">{latest.title}</span>
                            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13px] font-semibold text-ink-2 group-hover:text-ink">
                              Read · {latest.readMinutes} min <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </span>
                        </a>
                      ) : (
                        <div className="flex flex-col justify-between overflow-hidden rounded-[1.1rem] bg-band p-5 text-on-band">
                          <div>
                            <p className="text-[12px] font-semibold text-on-band-2">The Jiya app</p>
                            <p className="mt-1.5 text-[17px] font-semibold leading-snug">
                              Free on Android. iPhone is coming soon.
                            </p>
                          </div>
                          <a
                            href={PLAY_STORE_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-on-band px-4 text-[14px] font-semibold text-band"
                          >
                            <GooglePlay className="h-4 w-4" /> Get it on Google Play
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
            {plainLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                  className="rounded-full px-3.5 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <a
            href="/#faq"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink lg:inline-flex"
          >
            <Help className="h-[18px] w-[18px]" /> Help
          </a>
          <ThemeToggle />
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className={`${btnPrimary} ml-1 !min-h-10 whitespace-nowrap !px-4 !text-[15px] max-[379px]:!hidden`}
          >
            <GooglePlay className="h-4 w-4" />
            Get the app
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-raised lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <span className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-300 ${mobileOpen ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-300 ${mobileOpen ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        data-lenis-prevent
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-page lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1200px] px-5 pb-10 pt-4 sm:px-8">
          {groups.map((g) => (
            <section key={g.id} className="mt-4 first:mt-0">
              <h2 className="px-3 text-[13px] font-semibold text-muted">{g.label}</h2>
              <ul className="mt-1">
                {g.items.map(({ href, label, desc, Icon, badge }) => (
                  <li key={href}>
                    <a href={href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3.5 rounded-2xl p-3 active:bg-raised">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-soft text-on-teal-soft">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="flex items-center gap-2 text-[17px] font-semibold">
                          {label}
                          {badge && <span className="rounded-full bg-amber-soft px-2 py-0.5 text-[11px] font-semibold text-on-amber-soft">{badge}</span>}
                        </span>
                        <span className="block text-[14px] text-ink-2">{desc}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <a href="/#faq" onClick={() => setMobileOpen(false)} className="mt-4 flex items-center gap-3.5 rounded-2xl p-3 text-[17px] font-semibold active:bg-raised">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-raised text-ink-2"><Help className="h-5 w-5" /></span>
            Help and questions
          </a>
          <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" className={`${btnPrimary} mt-6 w-full`}>
            <GooglePlay className="h-[18px] w-[18px]" />
            Get it on Google Play
          </a>
        </nav>
      </div>
    </header>
  );
};
