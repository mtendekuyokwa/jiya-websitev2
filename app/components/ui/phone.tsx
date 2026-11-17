type Screen = { screen: string; alt: string };

/**
 * A slim device frame around app screens from /public/screens.
 * Shows the light or dark screenshot to match the site theme.
 * Pass several `screens` with an `active` index to crossfade between them.
 */
export function Phone({
  screen,
  alt,
  screens,
  active = 0,
  className = "",
  style,
  loading = "lazy",
}: {
  screen?: string;
  alt?: string;
  screens?: Screen[];
  active?: number;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
}) {
  const list: Screen[] = screens ?? [{ screen: screen!, alt: alt! }];

  return (
    <div
      className={`relative aspect-[390/844] rounded-[2.6rem] bg-[#151513] p-[7px] shadow-float ring-1 ring-black/10 dark:bg-[#34312d] dark:ring-white/10 ${className}`}
      style={style}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-sand">
        {list.map((s, i) => (
          <div
            key={s.screen}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] ${
              i === active ? "opacity-100" : "scale-[0.985] opacity-0"
            }`}
          >
            <img
              src={`/screens/${s.screen}-light.webp`}
              alt={i === active ? s.alt : ""}
              loading={loading}
              decoding="async"
              className="only-light h-full w-full object-cover object-top"
            />
            <img
              src={`/screens/${s.screen}-dark.webp`}
              alt={i === active ? s.alt : ""}
              loading={loading}
              decoding="async"
              className="only-dark h-full w-full object-cover object-top"
            />
          </div>
        ))}
      </div>
      <span aria-hidden="true" className="absolute -left-[2px] top-[22%] h-10 w-[3px] rounded-l bg-[#151513] dark:bg-[#34312d]" />
      <span aria-hidden="true" className="absolute -right-[2px] top-[28%] h-16 w-[3px] rounded-r bg-[#151513] dark:bg-[#34312d]" />
    </div>
  );
}
