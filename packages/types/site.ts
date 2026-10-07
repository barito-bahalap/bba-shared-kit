import type { DivisionId } from "./enums";

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  location: string;
  contactEmail: string;
  legalName: string;
}

export interface DivisionConfig {
  id: DivisionId;
  name: string;
  shortName: string;
  pitch: string;
  externalUrl: string;
  accentVar: string;
}
