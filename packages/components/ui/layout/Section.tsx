import type { ReactNode } from "react";
// Style
import "./Section.css";
// Utils
import { cx } from "@barito-bahalap/components";
// Types
import type { Brand } from "@barito-bahalap/types";

type SectionTone = "canvas" | "surface" | "paper" | "dark";
type SectionWidth = "content" | "narrow" | "wide";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  width?: SectionWidth;
  brand?: Brand;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

const TONE_CLASS: Record<SectionTone, string | false> = {
  canvas: false,
  surface: "surface",
  paper: "paper",
  dark: "dark",
};

export function Section({
  id,
  tone = "canvas",
  width = "content",
  brand,
  labelledBy,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cx("section", TONE_CLASS[tone], className)}
      data-brand={brand}
      aria-labelledby={labelledBy}
    >
      <div className={cx("container", width)}>{children}</div>
    </section>
  );
}
