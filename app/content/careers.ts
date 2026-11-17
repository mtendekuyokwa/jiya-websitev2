/**
 * Open roles. Add an entry to `roles` to list a job; the careers page and the
 * nav update automatically. Leave it empty to show the open-application message.
 *
 * Example:
 * {
 *   id: "flutter-engineer",
 *   title: "Flutter engineer",
 *   team: "Engineering",
 *   location: "Lilongwe or remote (Malawi)",
 *   type: "Full-time",
 *   summary: "Build the Jiya app riders and drivers use every day.",
 *   applyHref: "mailto:info@jiya.mw?subject=Flutter%20engineer",
 * }
 */
export type Role = {
  id: string;
  title: string;
  team: "Engineering" | "Design" | "Operations" | "Community" | "Business";
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  summary: string;
  applyHref: string;
};

export const roles: Role[] = [
  {
    id: "social-media-marketing-lead",
    title: "Social media marketing lead",
    team: "Community",
    location: "Lilongwe or Blantyre",
    type: "Full-time",
    summary: "Own Jiya’s voice on WhatsApp, Facebook, TikTok and Instagram, and grow the number of people sharing rides across Malawi.",
    applyHref: "mailto:info@jiya.mw?subject=Social%20media%20marketing%20lead",
  },
  {
    id: "junior-flutter-developer",
    title: "Junior Flutter developer",
    team: "Engineering",
    location: "Malawi, hybrid",
    type: "Full-time",
    summary: "Build features in the Jiya app riders and drivers use every day, with tests first and reviews from the team.",
    applyHref: "mailto:info@jiya.mw?subject=Junior%20Flutter%20developer",
  },
  {
    id: "backend-developer",
    title: "Backend developer",
    team: "Engineering",
    location: "Malawi, hybrid",
    type: "Full-time",
    summary: "Work on the platform behind every trip: matching, bookings, payments, notifications and live tracking.",
    applyHref: "mailto:info@jiya.mw?subject=Backend%20developer",
  },
];

export const CAREERS_EMAIL = "info@jiya.mw";
