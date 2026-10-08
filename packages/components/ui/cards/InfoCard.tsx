// Style
import "./InfoCard.css";
// Components
import { Badge, Icon, type BadgeVariants } from "@ampikalteng/components";
// Types
import type { IconsType } from "@ampikalteng/types";

type InfoCardProps = {
  title: string;
  description: string;
  iconName?: IconsType;
  iconSize?: number | string;
  category?: string;
  badgeLabel?: string;
  badgeVariant?: BadgeVariants;
  categoryAfter?: boolean;
  headerReverse?: boolean;
};

export function InfoCard({
  title,
  description,
  iconName,
  iconSize,
  category,
  badgeLabel,
  badgeVariant,
  categoryAfter = false,
  headerReverse = false,
}: InfoCardProps) {
  return (
    <article className="card program-card stack col gap-3">
      <div
        className={`card__header stack ${headerReverse ? "row-reverse" : "row"} middle gap-3`}
      >
        {!categoryAfter && category && (
          <span className="text caption muted">{category}</span>
        )}
        {iconName && (
          <Icon iconName={iconName} size={iconSize} fill="var(--clr-primary)" />
        )}
        {badgeLabel && <Badge label={badgeLabel} variant={badgeVariant} />}
      </div>

      <div className="card__body">
        <h6>{title}</h6>
        <small>{description}</small>
      </div>

      <div className="card__footer">
        {categoryAfter && category && (
          <span className="text caption muted">{category}</span>
        )}
      </div>
    </article>
  );
}
