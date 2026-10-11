// Style
import "./sections.css";
import "./CtaBand.css";
// Components
import { Button } from "@barito-bahalap/components";
// Types
import type { Brand } from "@barito-bahalap/types";

export interface CtaBandProps {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  brand?: Brand;
}

export function CtaBand({
  title,
  description,
  primary,
  secondary,
  brand = "tech",
}: CtaBandProps) {
  return (
    <section
      className={brand === "media" ? "cta-band cta-band--ink" : "cta-band"}
    >
      <div className="container cta-band__inner">
        <div className="cta-band__copy">
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__text">{description}</p>
        </div>
        <div className="cta-band__actions">
          <Button href={primary.href} variant="light" brand={brand}>
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="outline-light" brand={brand}>
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
