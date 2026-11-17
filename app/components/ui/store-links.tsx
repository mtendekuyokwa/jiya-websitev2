import { Apple, GooglePlay } from "./icons";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mtendekuyokwa.jiya&hl=en";
export const APP_STORE_URL = "/app-store";

export const btnPrimary =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-teal px-6 text-[16px] font-semibold text-on-teal shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] transition-[background-color,transform] duration-200 hover:bg-teal-hover active:scale-[0.98]";
export const btnSecondary =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-surface px-6 text-[16px] font-semibold text-ink ring-1 ring-inset ring-line-strong transition-[background-color,transform] duration-200 hover:bg-raised active:scale-[0.98]";

export function StoreLinks({ className = "", onBand = false }: { className?: string; onBand?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noreferrer"
        className={
          onBand
            ? "inline-flex min-h-12 items-center gap-2.5 rounded-full bg-on-band px-6 font-semibold text-band transition-transform hover:opacity-95 active:scale-[0.98]"
            : btnPrimary
        }
      >
        <GooglePlay className="h-[18px] w-[18px]" />
        Get it on Google Play
      </a>
      <a
        href={APP_STORE_URL}
        className={
          onBand
            ? "inline-flex min-h-12 items-center gap-2.5 rounded-full px-6 font-semibold text-on-band ring-1 ring-inset ring-on-band/40 transition-colors hover:bg-on-band/10"
            : btnSecondary
        }
      >
        <Apple className="h-[18px] w-[18px]" />
        iPhone: coming soon
      </a>
    </div>
  );
}
