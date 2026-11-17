import { ArrowRight } from "~/components/ui/icons";

type Token = string | { img: string; alt: string; pos?: string; wide?: boolean };

const line: Token[] = [
  "Every", "day,", "cars", "leave",
  { img: "/images/road-golden.webp", alt: "", wide: true },
  "Lilongwe", "with", "empty", "seats,", "while",
  { img: "/images/friends-group.webp", alt: "", pos: "45% 30%" },
  "people", "wait", "for", "a", "minibus", "to", "fill.",
  "Jiya", "puts", "the", "driver", { img: "/images/driver-woman.webp", alt: "", pos: "30% 35%" },
  "and", "the", "passenger", { img: "/images/rider-smile.webp", alt: "", pos: "50% 25%" },
  "in", "the", "same", "car.",
];

const faces = [
  { src: "/images/driver-woman.webp", alt: "A woman smiling at the wheel", pos: "40% 35%" },
  { src: "/images/friends-car.webp", alt: "Two friends laughing beside a car", pos: "50% 30%" },
  { src: "/images/hero-friends.webp", alt: "Friends sharing a ride", pos: "55% 40%" },
  { src: "/images/driver-thumbs.webp", alt: "A driver giving a thumbs up", pos: "68% 45%" },
  { src: "/images/rider-smile.webp", alt: "A passenger grinning from the back seat", pos: "50% 25%" },
  { src: "/images/friends-group.webp", alt: "Four friends together", pos: "45% 35%" },
];

export function Manifesto() {
  let w = 0;
  return (
    <section aria-label="Why Jiya exists" className="overflow-hidden py-20 sm:py-40">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="manifesto text-[clamp(2rem,4.6vw,3.9rem)] font-bold leading-[1.12] tracking-[-0.035em]">
          {line.map((t, i) => {
            if (typeof t === "string") {
              const idx = w++;
              return (
                <span key={i} className="word" style={{ ["--w" as string]: idx }}>
                  {t}{" "}
                </span>
              );
            }
            const idx = w++;
            return (
              <span
                key={i}
                aria-hidden="true"
                className={`word inline-block h-[0.82em] overflow-hidden rounded-full align-[-0.08em] ${t.wide ? "w-[2.1em]" : "w-[1.35em]"} mr-[0.25em]`}
                style={{ ["--w" as string]: idx }}
              >
                <img src={t.img} alt={t.alt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: t.pos }} />
              </span>
            );
          })}
        </p>
        <a href="/about" className="group mt-10 inline-flex items-center gap-2 text-[17px] font-semibold text-teal">
          Read our story
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* A slow drift of faces: the people who share the road */}
      <div className="mt-14 sm:mt-28" role="group" aria-label="People riding with Jiya">
        <ul className="face-track flex w-max gap-4 motion-safe:animate-[drift_60s_linear_infinite] hover:[animation-play-state:paused] sm:gap-5">
          {[...faces, ...faces].map((f, i) => (
            <li key={i} aria-hidden={i >= faces.length} className={i % 2 ? "mt-10" : ""}>
              <img
                src={f.src}
                alt={i >= faces.length ? "" : f.alt}
                loading="lazy"
                className={`${i % 3 === 0 ? "w-[13rem] sm:w-[22rem]" : "w-[9rem] sm:w-[15rem]"} h-[11rem] rounded-[1.5rem] object-cover sm:h-[19rem] sm:rounded-[1.75rem]`}
                style={{ objectPosition: f.pos }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
