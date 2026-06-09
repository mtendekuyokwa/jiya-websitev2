import { Hero } from "~/components/hero/hero";
import { Features } from "~/components/features/features";
import { ShareBar } from "~/components/share-bar/share-bar";
import { Faq } from "~/components/faq/faq";

export function Welcome() {
  return (
    <>
      <Hero />
      <ShareBar />
      <Features />
      <Faq />
    </>
  );
}
