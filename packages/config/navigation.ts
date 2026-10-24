import type { FooterGroup, NavLink, SocialLink } from "@barito-bahalap/types";
import { resolveLocale, type ConfigLocale } from "./i18n";

const text = {
  about: { en: "About", id: "Tentang" },
  divisions: { en: "Divisions", id: "Divisi" },
  approach: { en: "Approach", id: "Pendekatan" },
  careers: { en: "Careers", id: "Karier" },
  contact: { en: "Contact", id: "Kontak" },
  company: { en: "Company", id: "Perusahaan" },
  legal: { en: "Legal", id: "Legal" },
  privacy: { en: "Privacy Policy", id: "Kebijakan Privasi" },
  terms: { en: "Terms of Use", id: "Ketentuan Penggunaan" },
} as const satisfies Record<string, Record<ConfigLocale, string>>;

function link(
  key: keyof typeof text,
  href: string,
  locale: ConfigLocale,
  section?: string,
): NavLink {
  return { label: text[key][locale], href, section };
}

export function getMainNav(locale: string): NavLink[] {
  const l = resolveLocale(locale);
  return [
    link("about", "/", l, "about"),
    link("divisions", "/", l, "divisions"),
    link("approach", "/", l, "approach"),
    link("careers", "/careers", l),
  ];
}

export function getHeaderCta(locale: string): NavLink {
  return link("contact", "/", resolveLocale(locale), "contact");
}

export function getFooterGroups(locale: string): FooterGroup[] {
  const l = resolveLocale(locale);
  return [
    {
      title: text.company[l],
      links: [
        link("about", "/", l, "about"),
        link("approach", "/", l, "approach"),
        link("careers", "/careers", l),
        link("contact", "/", l, "contact"),
      ],
    },
    {
      title: text.legal[l],
      links: [
        link("privacy", "https://baritobahalap.com/privacy", l),
        link("terms", "https://baritobahalap.com/terms", l),
      ],
    },
  ];
}

export const mainNav: NavLink[] = getMainNav("en");

export const headerCta: NavLink = getHeaderCta("en");

export const footerGroups: FooterGroup[] = getFooterGroups("en");

export const socialLinks: SocialLink[] = [];
