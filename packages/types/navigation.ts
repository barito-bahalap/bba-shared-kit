export interface NavLink {
  label: string;
  href: string;
  section?: string;
}

export interface FooterGroup {
  title: string;
  links: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
}
