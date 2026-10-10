import type { HTMLAttributes, ReactNode } from "react";
// Style
import "./Eyebrow.css";
// Utils
import { cx } from "@barito-bahalap/components";
// Types
import type { Brand } from "@barito-bahalap/types";

export type EyebrowProps = {
  label?: string;
  brand?: Brand;
  onDark?: boolean;
  dot?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLParagraphElement>, "children">;

export function Eyebrow({
  label,
  brand,
  onDark = false,
  dot = false,
  className,
  children,
  ...rest
}: EyebrowProps) {
  const text = label ?? children;

  return (
    <p
      className={cx(
        "text",
        "eyebrow",
        dot && "eyebrow--dot",
        onDark && "on-dark",
        className,
      )}
      data-brand={brand}
      {...rest}
    >
      {text}
    </p>
  );
}
