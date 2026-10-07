export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavItem[];
}

export interface HeaderCta {
  label: string;
  href: string;
}
