import type { Division } from "@barito-bahalap/types";
import { resolveLocale } from "./i18n";

export const divisions: Division[] = [
  {
    id: "bbt",
    brand: "tech",
    name: "Barito Bahalap Tech",
    href: "https://tech.baritobahalap.com",
    shortName: "BBT",
    descriptor: "Technology and digital infrastructure",
  },
  {
    id: "bbm",
    brand: "media",
    name: "Barito Bahalap Media",
    href: "https://media.baritobahalap.com",
    shortName: "BBM",
    descriptor: "Media and strategic communications",
  },
];

const indonesianDescriptors: Record<string, string> = {
  bbt: "Teknologi dan infrastruktur digital",
  bbm: "Media dan komunikasi strategis",
};

export function getDivisions(locale: string): Division[] {
  if (resolveLocale(locale) === "en") return divisions;
  return divisions.map((division) => ({
    ...division,
    descriptor: indonesianDescriptors[division.id] ?? division.descriptor,
  }));
}
