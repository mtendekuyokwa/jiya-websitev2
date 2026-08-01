import type { Route } from "./+types/app-store";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mtendekuyokwa.jiya&hl=en";

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
    <main className="relative min-h-screen bg-[var(--color-hero-bg)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.12)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-[680px] px-6 pt-32 sm:pt-40 pb-20 sm:pb-28 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-medium mb-8 motion-reduce:animate-none animate-[float_3s_ease-in-out_infinite]">
          <AppStoreIcon className="w-4 h-4 fill-current" />
          iOS
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
          Jiya is coming
          <br />
          to <span className="text-yellow-400">iPhone.</span>
        </h1>

        <p className="text-gray-400 leading-relaxed max-w-md mb-10">
          We're putting the finishing touches on the iOS app. In the meantime,
          grab Jiya on Android and start finding passengers and rides today.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 transition-colors text-black text-sm font-medium"
          >
            <AppStoreIcon className="w-5 h-5 fill-current" />
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-wide text-black/60">
                Coming soon on
              </span>
              <span className="font-semibold">the App Store</span>
            </span>
          </a>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-colors text-black text-sm font-semibold"
          >
            <GooglePlayIcon className="w-5 h-5 fill-current" />
            Get it on Google Play
          </a>
        </div>

        <p className="mt-10 text-xs text-gray-500">
          Free to download · Available on Android today
        </p>
      </div>
    </main>
  );
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.488 1.488 0 0 0-.338 1.037v19.954c0 .379.128.726.338 1.037L11.99 12 1.337.924zm13.211 10.142l-3.53-3.507L2.337.924l12.211 10.142zm-3.53 3.493l3.53-3.507L2.337 23.076l10.681-8.517z" />
    </svg>
  );
}
