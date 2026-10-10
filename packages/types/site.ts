import type { DivisionBrand, DivisionId } from "./enums";

export interface SiteConfig {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  contactEmail: string;
  location: string;
  foundedYear: number;
  locale: string;
  ogImage?: string;
}

export interface Division {
  id: DivisionId;
  brand: DivisionBrand;
  name: string;
  href: string;
  shortName: string;
  descriptor: string;
  externalUrl?: string;
}
