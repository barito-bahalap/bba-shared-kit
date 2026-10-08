// Style
import "./HighlightCard.css";
// Components
import { Icon } from "@ampikalteng/components";
// Types
import type { IconsType } from "@ampikalteng/types";

interface HighlightCardProps {
  title: string;
  description: string;
  iconName?: IconsType;
  bgImg?: string;
  onClick: () => void;
}

export function HighlightCard({
  title = "Title",
  description = "Describe what the card shows.",
  iconName = "codeSlash",
  bgImg,
  onClick,
}: HighlightCardProps) {
  return (
    <div
      className="card card--highlight"
      style={bgImg ? { backgroundImage: `url(${bgImg})` } : undefined}
      onClick={onClick}
    >
      <div className="image-mask--dark" />

      <div className="card__header card__header--ha">
        <Icon iconName={iconName} fill="var(--clr-accent-hover)" size={42} />
      </div>

      <div className="card__body card__body--ha">
        <h4 className="ha__title">{title}</h4>
        <p className="text on-dark soft">{description}</p>

        <div className="stack row middle end gap-0">
          <small className="text on-dark soft">Baca selengkapnya</small>
          <Icon
            iconName="chevronRight"
            fill="var(--clr-ink-on-dark-soft)"
            size={10}
          />
        </div>
      </div>
    </div>
  );
}
