import { Hero } from "~/components/hero/hero";
import { Manifesto } from "~/components/home/manifesto";
import { TripStory } from "~/components/home/trip-story";
import { Safety } from "~/components/home/safety";
import { Drive } from "~/components/home/drive";
import { Routes } from "~/components/home/routes";
import { Faq } from "~/components/faq/faq";
import { Closing } from "~/components/home/closing";

export function Welcome() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <TripStory />
      <Safety />
      <Drive />
      <Routes />
      <Faq />
      <Closing />
    </main>
  );
}
