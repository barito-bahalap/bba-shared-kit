import type { ReactNode } from "react";
// Style
import "./SectionHeader.css";
// Components
import { Eyebrow } from "@barito-bahalap/components";
// Utils
import { cx } from "@barito-bahalap/components";
// Types
import type { Brand } from "@barito-bahalap/types";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
  id?: string;
  brand?: Brand;
  onDark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "start",
  as: Heading = "h2",
  id,
  brand,
  onDark = false,
}: SectionHeaderProps) {
  return (
    <header
      className={cx(
        "section-header",
        align === "center" && "section-header--center",
      )}
    >
      {eyebrow && (
        <Eyebrow brand={brand} onDark={onDark}>
          {eyebrow}
        </Eyebrow>
      )}
      <Heading id={id} className="section-header__title">
        {title}
      </Heading>
      {intro && <p className="section-header__intro">{intro}</p>}
    </header>
  );
}
