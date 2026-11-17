import { Phone } from "~/components/ui/phone";
import { StoreLinks } from "~/components/ui/store-links";

export function Closing() {
  return (
    <>
      {/* Final call: answers the usual hesitation */}
      <section aria-labelledby="closing-title" className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="mx-auto max-w-[1360px] overflow-hidden rounded-[2.25rem] bg-sand">
          <div className="mx-auto grid max-w-[1200px] items-end gap-10 px-5 pt-20 sm:px-8 sm:pt-24 lg:grid-cols-[1.2fr_1fr]">
            <div className="pb-6 lg:pb-24">
              <h2 id="closing-title" className="t-h2 max-w-[15ch]">
                Going somewhere this week? Bring someone along.
              </h2>
              <p className="t-lead mt-5 max-w-[30rem] text-ink-2">
                Jiya is free on Android. Finding a seat takes a minute, and posting a
                trip takes two.
              </p>
              <StoreLinks className="mt-9" />
            </div>
            <div className="relative mx-auto h-[24rem] w-full max-w-[24rem] sm:h-[28rem]">
              <div className="absolute left-0 top-6 w-[56%]">
                <Phone
                  screen="profile"
                  alt="Jiya app profile screen for Chikondi Phiri: 23 rides, 1,240 kilometres travelled, 86 kilograms of CO2 saved, rated 4.8."
                  className="rotate-[-5deg]"
                />
              </div>
              <div className="absolute right-0 top-0 w-[56%]">
                <Phone
                  screen="live-tracking"
                  alt="Jiya app screen: Driver on the way, about 6 minutes away."
                  className="rotate-[4deg]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
