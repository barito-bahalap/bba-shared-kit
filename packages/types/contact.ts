// Types
import type { IconsType } from "@ampikalteng/types";

export type ContactInfo = {
  key: string;
  iconName: IconsType;
  content: string | readonly string[];
  onClick: () => void;
};

export type WhatsAppContact = {
  key: string;
  label: string;
  number: string;
  display: string;
};