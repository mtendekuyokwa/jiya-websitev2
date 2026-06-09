import { Hero } from "~/components/hero/hero";
import { Features } from "~/components/features/features";
import { ShareBar } from "~/components/share-bar/share-bar";

export function Welcome() {
  return (
    <>
      <Hero />
      <ShareBar />
      <Features />
    </>
  );
}
