import type { Route } from "./+types/app-store";
import { Phone } from "~/components/ui/phone";
import { PLAY_STORE_URL, btnPrimary } from "~/components/ui/store-links";
import { GooglePlay } from "~/components/ui/icons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coming Soon to the App Store - Jiya" },
    {
      name: "description",
      content:
        "Jiya for iOS is coming soon. Download Jiya on Google Play to start carpooling today.",
    },
  ];
}

export default function AppStoreComingSoon() {
  return (
    <main className="px-3 pb-3 pt-6 sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[1360px] overflow-hidden rounded-[2.25rem] bg-sand">
        <div className="mx-auto grid max-w-[1200px] items-end gap-12 px-5 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-[1.2fr_1fr]">
          <div className="pb-4 lg:pb-32">
            <p className="t-kicker rise">iPhone</p>
            <h1 className="t-hero rise mt-3 max-w-[12ch]" style={{ ["--d" as string]: "60ms" }}>
              Jiya is coming to iPhone.
            </h1>
            <p className="t-lead rise mt-6 max-w-[32rem] text-ink-2" style={{ ["--d" as string]: "120ms" }}>
              We’re putting the finishing touches on the iOS app. Until it’s ready,
              Jiya is on Android, and you can find rides and passengers today.
            </p>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className={`${btnPrimary} rise mt-9`}
              style={{ ["--d" as string]: "180ms" }}
            >
              <GooglePlay className="h-[18px] w-[18px]" />
              Get it on Google Play
            </a>
          </div>
          <div className="float-in mx-auto w-full max-w-[19rem] translate-y-16" style={{ ["--d" as string]: "250ms" }}>
            <Phone
              screen="seat-booked"
              alt="Jiya app screen: Seat booked, with a QR booking code and the trip details."
              loading="eager"
              className="rotate-[4deg]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
