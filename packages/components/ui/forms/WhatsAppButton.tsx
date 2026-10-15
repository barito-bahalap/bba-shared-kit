import type { ComponentProps } from "react";
// Components
import { Button } from "@barito-bahalap/components";
// Types
import type { Brand } from "@barito-bahalap/types";
import {
  whatsappCopy,
  type InquiryDivision,
  type InquiryLocale,
} from "./inquiryCopy";

export function buildWhatsAppHref(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

interface WhatsAppButtonProps {
  /** International format, e.g. "+62 812 3456 7890". Renders nothing when empty. */
  phone: string | undefined;
  division: InquiryDivision;
  locale: InquiryLocale;
  brand?: Brand;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
  /** Override the default label / prefilled message. */
  label?: string;
  message?: string;
}

/** Division-specific click-to-chat button. Opens WhatsApp in a new tab with a prefilled message. */
export function WhatsAppButton({
  phone,
  division,
  locale,
  brand,
  variant = "outline",
  size = "md",
  className,
  label,
  message,
}: WhatsAppButtonProps) {
  if (!phone || phone.replace(/\D/g, "").length < 8) return null;
  const copy = whatsappCopy[locale];

  return (
    <Button
      href={buildWhatsAppHref(phone, message ?? copy.message[division])}
      label={label ?? copy.label[division]}
      variant={variant}
      size={size}
      brand={brand}
      className={className}
    />
  );
}
