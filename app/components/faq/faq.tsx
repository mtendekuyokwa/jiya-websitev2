import { Plus } from "~/components/ui/icons";

const faqs = [
  {
    q: "How does Jiya work?",
    a: "Drivers who are already making a trip post it with the seats they have free. Passengers going the same way book a seat, meet at the pickup point and travel together.",
  },
  {
    q: "How much does a seat cost?",
    a: "Each driver sets their own price per seat, and you see it before you book. You pay a small hold in the app to keep the seat, and the rest to the driver on the day.",
  },
  {
    q: "How do I know a driver is safe?",
    a: "Drivers can’t post a trip until we’ve checked their licence, and every account has a verified phone number. You see the driver’s name, car, plate and rating before you book, and you can report a problem from the trip itself.",
  },
  {
    q: "When do I get the driver’s phone number?",
    a: "As soon as your seat is booked. Numbers stay hidden while you browse, so nobody can collect them from listings.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes. The cancellation terms for each trip are shown before you confirm.",
  },
  {
    q: "How do I start driving?",
    a: "Open your profile in the app and choose Become a driver. Add your licence number and a photo of the card; most checks are done within a day.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 py-20 sm:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <h2 id="faq-title" className="t-h2">Questions, answered.</h2>
          <p className="t-lead mt-5 max-w-[22rem] text-ink-2">
            Can’t find yours?{" "}
            <a href="/contact" className="font-semibold text-teal underline decoration-1 underline-offset-4 hover:decoration-2">
              Ask us
            </a>
            .
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-[1.25rem] transition-colors open:bg-sand hover:bg-sand">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-[18px] font-semibold tracking-[-0.015em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-raised text-ink-2 transition-transform duration-300 ease-[var(--ease-out-quint)] group-open:rotate-45 group-open:bg-surface"
                >
                  <Plus />
                </span>
              </summary>
              <p className="max-w-[60ch] px-5 pb-6 text-[17px] leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
