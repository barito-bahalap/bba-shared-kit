import type { ReactNode } from "react";
// Style
import "./Eyebrow.css";
// Utils
import { cx } from "@barito-bahalap/components";
// Types
import type { Brand } from "@barito-bahalap/types";

interface EyebrowProps {
  brand?: Brand;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
}

export function Eyebrow({
  brand,
  onDark = false,
  className,
  children,
}: EyebrowProps) {
  return (
    <p
      className={cx(
        "text",
        "eyebrow",
        "eyebrow--dot",
        onDark && "on-dark",
        className,
      )}
      data-brand={brand}
    >
      {children}
    </p>
  );
}
