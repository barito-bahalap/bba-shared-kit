import type { ReactNode } from "react";
// Style
import "./PageHero.css";

export interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  className,
}: PageHeroProps) {
  return (
    <header className={["page-hero", className].filter(Boolean).join(" ")}>
      <div className="page-hero__inner container">
        <div className="page-hero__copy">
          {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
          <h1 className="page-hero__title">{title}</h1>
          {description ? (
            <p className="page-hero__description">{description}</p>
          ) : null}
          {actions ? <div className="page-hero__actions">{actions}</div> : null}
        </div>
        {aside ? <div className="page-hero__aside">{aside}</div> : null}
      </div>
    </header>
  );
}
