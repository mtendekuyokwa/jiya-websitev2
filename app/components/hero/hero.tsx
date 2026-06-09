import { useRef, useEffect, useState } from "react";
import { Phone } from "~/components/ui/phone";
import { TweetCard } from "./tweet-card";

const tweetTexts = [
  "Saved ₹800 this week alone using Jiya 🚗",
  "Finally found a carpool buddy for my daily commute!",
  "No more solo rides - Jiya made it easy to split costs",
  "The app's matching algorithm is amazing! Found my ideal partner",
  "Reduced my weekly transport budget by 50%",
  "Love how Jiya handles all the payment splitting",
];

const avatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
];

const tweetLayout = [
  { xFrac: 0.04, yFrac: 0.06, rotation: -10 },
  { xFrac: 0.82, yFrac: 0.04, rotation: 8 },
  { xFrac: 0.02, yFrac: 0.28, rotation: -6 },
  { xFrac: 0.85, yFrac: 0.24, rotation: 12 },
  { xFrac: 0.06, yFrac: 0.5, rotation: -14 },
  { xFrac: 0.84, yFrac: 0.48, rotation: 7 },
];

interface TweetData {
  id: string;
  avatar: string;
  username: string;
  handle: string;
  text: string;
  likes: number;
  retweets: number;
  startX: number;
  startY: number;
  rotation: number;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [target, setTarget] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function init() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const count = window.matchMedia("(max-width: 768px)").matches ? 3 : 6;
      setTweets(
        tweetLayout.slice(0, count).map((t, i) => ({
          id: `tweet-${i}`,
          avatar: avatars[i % avatars.length],
          username: `user${i + 1}`,
          handle: `@user${i + 1}`,
          text: tweetTexts[i % tweetTexts.length],
          likes: Math.floor(Math.random() * 1000),
          retweets: Math.floor(Math.random() * 500),
          startX: t.xFrac * w,
          startY: t.yFrac * h,
          rotation: t.rotation,
        })),
      );
      setTarget({ x: w / 2, y: h / 2 + 20 });
    }

    init();
    window.addEventListener("resize", init);
    return () => window.removeEventListener("resize", init);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height - viewportH;
      const scrolled = -rect.top;
      setScrollProgress(
        Math.max(0, Math.min(1, scrolled / Math.max(1, total))),
      );
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[154vh] bg-[var(--color-hero-bg)] overflow-x-hidden"
    >
      <div className="sticky top-0 h-screen mx-1.5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)]" />

        <div className="absolute inset-0 flex gap-8 flex-col items-center px-6 py-16">
          <div className="flex flex-col items-center text-center max-w-lg mt-[15vh] shrink-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Find Passengers,
              <br />
              <span className="text-yellow-400">Find Rides.</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-gray-400 max-w-md">
              Save money, find reliable carpool partners, and reduce your carbon
              footprint
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
              >
                <GooglePlayIcon />
                Google Play
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-medium"
              >
                <AppStoreIcon />
                App Store
              </a>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center w-full">
            <div className="w-full max-w-[340px]">
              <Phone src="/landingpage.jpg" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {target.x > 0 &&
            tweets.map((tweet, i) => (
              <TweetCard
                key={tweet.id}
                tweet={tweet}
                scrollProgress={scrollProgress}
                index={i}
                targetX={target.x}
                targetY={target.y + 8}
              />
            ))}
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
