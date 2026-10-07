import type { SiteConfig } from "@barito-bahalap/types";

export const siteConfig: SiteConfig = {
  name: "Barito Bahalap Agency",
  shortName: "BBA",
  legalName: "Barito Bahalap Agency",
  tagline:
    "Digital infrastructure and strategic communications, built in Kalimantan.",
  description:
    "Barito Bahalap Agency is an independent holding company operating two divisions: Barito Bahalap Tech and Barito Bahalap Media.",
  location: "Palangka Raya, Central Kalimantan, Indonesia",
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? "",
};
