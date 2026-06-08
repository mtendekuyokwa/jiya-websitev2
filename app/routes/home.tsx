import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jiya - Carpooling Made Simple" },
    { name: "description", content: "Find reliable carpool partners and save on transportation costs with Jiya" },
  ];
}

export default function Home() {
  return <Welcome />;
}
