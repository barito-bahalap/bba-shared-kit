// Style
import "./InfoCard.css";
// Components
import { Icon } from "@barito-bahalap/components";
// Utils
import { cx } from "@barito-bahalap/components";
// Types
import type { Brand, IconsType } from "@barito-bahalap/types";

interface InfoCardProps {
  iconName?: IconsType;
  title: string;
  description: string;
  brand?: Brand;
  className?: string;
}

export function InfoCard({
  iconName,
  title,
  description,
  brand,
  className,
}: InfoCardProps) {
  return (
    <article
      className={cx("card", "not-hoverable", "info-card", className)}
      data-brand={brand}
    >
      {iconName && (
        <span className="info-card__icon">
          <Icon iconName={iconName} size={22} />
        </span>
      )}
      <h3 className="info-card__title">{title}</h3>
      <p className="info-card__text">{description}</p>
    </article>
  );
}
