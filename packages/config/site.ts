import type { SiteConfig } from "@barito-bahalap/types";
import { resolveLocale } from "./i18n";

export const siteConfig: SiteConfig = {
  name: "Barito Bahalap Agency",
  shortName: "BBA",
  legalName: "PT Barito Bahalap Agency",
  tagline:
    "Technology and strategic communications for institutional partners.",
  description:
    "Barito Bahalap Agency is an independent holding organization in Palangka Raya, Central Kalimantan, overseeing two separate operating brands: Barito Bahalap Tech and Barito Bahalap Media.",
  url: "https://baritobahalap.com",
  contactEmail: "info@baritobahalap.com",
  location: "Palangka Raya, Central Kalimantan, Indonesia",
  foundedYear: 2026,
  locale: "en_US",
};

const indonesian: Pick<
  SiteConfig,
  "tagline" | "description" | "location" | "locale"
> = {
  tagline: "Teknologi dan komunikasi strategis untuk mitra institusional.",
  description:
    "Barito Bahalap Agency adalah organisasi induk independen di Palangka Raya, Kalimantan Tengah, yang menaungi dua merek operasional yang terpisah: Barito Bahalap Tech dan Barito Bahalap Media.",
  location: "Palangka Raya, Kalimantan Tengah, Indonesia",
  locale: "id_ID",
};

export function getSiteConfig(locale: string): SiteConfig {
  return resolveLocale(locale) === "en"
    ? siteConfig
    : { ...siteConfig, ...indonesian };
}
