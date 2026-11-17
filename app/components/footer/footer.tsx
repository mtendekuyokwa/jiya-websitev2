import { Wordmark } from "~/components/ui/wordmark";
import { PLAY_STORE_URL, APP_STORE_URL } from "~/components/ui/store-links";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#safety", label: "Safety" },
      { href: "/#drive", label: "Drive with Jiya" },
      { href: "/#routes", label: "Popular routes" },
      { href: "/#faq", label: "Help" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Engineering blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Download",
    links: [
      { href: PLAY_STORE_URL, label: "Google Play", external: true },
      { href: APP_STORE_URL, label: "iPhone (coming soon)" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/data-deletion", label: "Delete your data" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="pb-10 pt-20 sm:pt-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Wordmark className="h-8 w-auto text-teal" title="Jiya" />
            <p className="mt-5 max-w-[19rem] text-[15px] leading-relaxed text-ink-2">
              Shared rides between Malawi’s towns and cities.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <h2 className="text-[14px] font-semibold text-ink">{c.title}</h2>
                <ul className="mt-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...("external" in l ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="inline-block py-1.5 text-[15px] text-ink-2 transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-1 text-[14px] text-muted sm:flex-row sm:justify-between">
          <p>Jiya is operated by Mulinda Enterprises, registered in Malawi.</p>
          <p>&copy; {new Date().getFullYear()} Jiya</p>
        </div>
      </div>
    </footer>
  );
}
