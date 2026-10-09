// Style
import "./PersonCard.css";
// Components
import { Avatar } from "@barito-bahalap/components";

interface PersonCardProps {
  name: string;
  title: string;
  bio?: string;
  photoSrc?: string;
  photoAlt?: string;
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function PersonCard({
  name,
  title,
  bio,
  photoSrc,
  photoAlt,
}: PersonCardProps) {
  return (
    <article className="card not-hoverable flat person-card">
      <div className="person-card__photo image-block">
        {photoSrc ? (
          <img src={photoSrc} alt={photoAlt ?? name} loading="lazy" />
        ) : (
          <span className="person-card__placeholder" aria-hidden="true">
            {initialsOf(name)}
          </span>
        )}
      </div>
      <div className="person-card__body">
        <div className="person-card__head">
          <Avatar
            name={name}
            size="sm"
            src={photoSrc}
            className="person-card__avatar"
          />
          <div>
            <h3 className="person-card__name">{name}</h3>
            <p className="person-card__title">{title}</p>
          </div>
        </div>
        {bio && <p className="person-card__bio">{bio}</p>}
      </div>
    </article>
  );
}
