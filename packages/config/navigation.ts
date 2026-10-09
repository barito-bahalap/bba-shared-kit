import type { FooterGroup, NavLink, SocialLink } from "@barito-bahalap/types";

export const mainNav: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Divisions", href: "/#divisions" },
  { label: "Approach", href: "/#approach" },
  { label: "Leadership", href: "/#leadership" },
  { label: "Careers", href: "/careers" },
];

export const headerCta: NavLink = { label: "Contact", href: "/#contact" };

export const footerGroups: FooterGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Approach", href: "/#approach" },
      { label: "Leadership", href: "/#leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

export const socialLinks: SocialLink[] = [];
