import { Phone } from "~/components/ui/phone";

export function Hero() {
  return (
    <section className="relative h-[154vh] bg-[var(--color-hero-bg)] overflow-hidden">
      <div className="sticky top-0 h-screen mx-1.5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)]" />

        <div className="absolute inset-0 flex gap-6 sm:gap-8 flex-col items-center px-6 py-16">
          <div className="flex flex-col items-center text-center max-w-lg mt-[10vh] sm:mt-[15vh] shrink-0">
            <h1 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Find Passengers,
              <br />
              <span className="text-yellow-400">Find Rides.</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-400 max-w-md">
              Save money, find reliable carpool partners, and reduce your carbon
              footprint
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-xs sm:text-sm font-medium"
              >
                <GooglePlayIcon />
                Google Play
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-xs sm:text-sm font-medium"
              >
                <AppStoreIcon />
                App Store
              </a>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center w-full">
            <div className="w-full max-w-[200px] sm:max-w-[340px]">
              <Phone src="/landingpage.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.488 1.488 0 0 0-.338 1.037v19.954c0 .379.128.726.338 1.037L11.99 12 1.337.924zm13.211 10.142l-3.53-3.507L2.337.924l12.211 10.142zm-3.53 3.493l3.53-3.507L2.337 23.076l10.681-8.517z" />
    </svg>
  );
}

function AppStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
