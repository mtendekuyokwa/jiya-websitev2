import { useRef, useEffect, useState } from "react";
import { Phone } from "~/components/ui/phone";

const features = [
  {
    title: "Search Rides",
    subtitle: "Find your way",
    description:
      "Search for rides by city or location. Find carpool partners heading your way with ease.",
    image: "/search-ride.jpg",
    stat: "Available in 15+ cities",
  },
  {
    title: "Book & Ride",
    subtitle: "Seamless booking",
    description:
      "View driver details, route information, and pricing. Book your seat in seconds.",
    image: "/bookride.jpg",
    stat: "Avg. 30s to book",
  },
  {
    title: "Post a Ride",
    subtitle: "Offer seats",
    description:
      "List your ride in minutes. Set your route, schedule, available seats, and price.",
    image: "/more-edit-ride.jpg",
    stat: "Set your own price",
  },
  {
    title: "Manage as Driver",
    subtitle: "Your offers",
    description:
      "See who booked your ride, manage listings, and track your earnings at a glance.",
    image: "/manage-ride.jpg",
    stat: "Real-time updates",
  },
  {
    title: "Manage as Passenger",
    subtitle: "Your trips",
    description:
      "Keep track of upcoming and past rides. Everything organized in one place.",
    image: "/manage-ride-passenger.jpg",
    stat: "All your trips",
  },
  {
    title: "Your Profile",
    subtitle: "Stats & wallet",
    description:
      "View your ride statistics, CO₂ saved, wallet balance, and ride history.",
    image: "/profile.jpg",
    stat: "Know your impact",
  },
];

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center px-6 md:px-16"
    >
      <div
        className={`w-full flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16 max-w-6xl mx-auto transition-all duration-700 ease-out`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0)"
            : `translateY(${isEven ? 40 : -40}px)`,
        }}
      >
        <div className="w-48 sm:w-56 md:w-2/5 max-w-[280px] shrink-0">
          <Phone src={feature.image} />
        </div>
        <div className="w-full md:w-3/5 max-w-lg">
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase">
            {feature.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 leading-tight">
            {feature.title}
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            {feature.description}
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            {feature.stat}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-[var(--color-hero-bg)]">
      {features.map((f, i) => (
        <FeatureRow key={i} feature={f} index={i} />
      ))}
    </section>
  );
}
