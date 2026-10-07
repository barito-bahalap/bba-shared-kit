import type {
  FooterLinkGroup,
  HeaderCta,
  NavItem,
  SocialLink,
} from "@bba/types";

export const mainNav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Divisions", href: "/#divisions" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/#contact" },
];

export const headerCta: HeaderCta = {
  label: "Get in touch",
  href: "/#contact",
};

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const socialLinks: SocialLink[] = [];

export const footerGroups: FooterLinkGroup[] = [
  { title: "Company", links: mainNav },
  { title: "Legal", links: legalNav },
];
