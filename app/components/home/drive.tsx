import { Phone } from "~/components/ui/phone";
import { PLAY_STORE_URL } from "~/components/ui/store-links";
import { ArrowRight } from "~/components/ui/icons";

const steps = [
  { title: "Add your licence", body: "Enter the number and a photo of the card. Most checks are done within a day." },
  { title: "Post the trip you’re making", body: "Where from, where to, when, and your price per seat." },
  { title: "Choose who rides", body: "See who has booked and their rating before you set off." },
];

export function Drive() {
  return (
    <section id="drive" aria-labelledby="drive-title" className="px-3 sm:px-5">
      <div className="mx-auto max-w-[1360px] overflow-hidden rounded-[2.25rem] bg-band text-on-band">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-5 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:pb-0">
          <div className="lg:pb-24">
            <p className="text-[15px] font-semibold text-on-band-2">For drivers</p>
            <h2 id="drive-title" className="t-h2 mt-3 max-w-[16ch]">
              Driving to Mzuzu anyway? Let the empty seats pay for fuel.
            </h2>
            <p className="t-lead mt-5 max-w-[32rem] text-on-band-2">
              You’re making the trip either way. Post it on Jiya, set a price per seat,
              and travel with company.
            </p>

            <ol className="mt-12 space-y-7">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="tabular grid h-8 w-8 shrink-0 place-items-center rounded-full bg-on-band/12 text-[14px] font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-0.5 text-[16px] text-on-band-2">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-12 inline-flex min-h-12 items-center gap-2 rounded-full bg-on-band px-6 font-semibold text-band transition-transform active:scale-[0.98]"
            >
              Start driving with Jiya
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="relative min-h-[22rem] sm:min-h-[30rem] lg:min-h-0">
            <img
              src="/images/driver-thumbs.webp"
              alt="A smiling driver giving a thumbs up from the window of a white minibus"
              loading="lazy"
              className="absolute inset-x-0 bottom-0 top-0 h-full w-full rounded-t-[1.75rem] object-cover object-[66%_50%] lg:top-0"
            />
            <div className="absolute -bottom-20 left-6 w-[9.5rem] sm:-bottom-24 sm:left-10 sm:w-[13rem]">
              <Phone
                screen="become-driver"
                alt="Jiya app screen: Become a driver. Fields for legal name, phone number, licence number and a photo of the licence."
                className="rotate-[-4deg]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
