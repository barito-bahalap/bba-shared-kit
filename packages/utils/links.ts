import { WHATSAPP_CONTACTS } from "./contact";
import type { WhatsAppContact } from "@ampikalteng/types";

export const openExternalLink = (url: string, newTab = true): void => {
  if (typeof window === "undefined") return;
  window.open(url, newTab ? "_blank" : "_self", "noopener,noreferrer");
};

export const buildGoogleMapsUrl = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const buildWhatsAppUrl = (phone: string, message?: string): string => {
  const digits = phone.replace(/\D/g, ""); // strip +, spaces, dashes -> "6281234567689"
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

export function buildWhatsAppLink(
  message: string,
  contactKey: WhatsAppContact["key"] = "kemitraan",
) {
  const contact =
    WHATSAPP_CONTACTS.find((c) => c.key === contactKey) ?? WHATSAPP_CONTACTS[0];
  return `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`;
}

// Placeholder-generation helpers: license-free, stable services.
// Once real photos/avatars exist, set `article.image` explicitly and it
// overrides the generated placeholder automatically. No data migration needed.

export function buildPlaceholderThumbnail(seed: string): string {
  return `https://picsum.photos/seed/${seed}/800/600`;
}

export function buildAvatarUrl(name: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
}
