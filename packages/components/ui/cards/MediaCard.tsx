import { Link } from "react-router-dom";
// Style
import "./MediaCard.css";
// Components
import { Avatar, Icon } from "@ampikalteng/components";
// Utils
import { formatRelativeTimeID } from "@ampikalteng/utils";
import { buildAvatarUrl, buildPlaceholderThumbnail } from "@ampikalteng/utils";
// Types
import type { MediaArticle } from "@ampikalteng/types";

export type MediaCardVariant = "default" | "tile" | "long";

type MediaCardProps = {
  article: MediaArticle;
  variant?: MediaCardVariant;
};

export function MediaCard({ article, variant = "default" }: MediaCardProps) {
  const image = article.image ?? buildPlaceholderThumbnail(article.key);
  const avatar = article.avatar ?? buildAvatarUrl(article.author);
  const timeAgo = formatRelativeTimeID(article.publishedAt);
  const href = `/media/${article.key}`;

  if (variant === "tile") {
    return (
      <Link to={href} className="card card--media is-tile">
        <div className="card__header">
          <img src={image} alt={article.title} loading="lazy" />
        </div>
        <div className="card__body">
          <h4 className="mb__title">{article.title}</h4>
          <p className="mb__desc text soft">{article.excerpt}</p>
          <div className="stack row middle gap-2">
            <Avatar src={avatar} size="sm" />
            <strong>{article.author}</strong>
            <small>• {timeAgo}</small>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "long") {
    return (
      <Link to={href} className="card card--media img-long">
        <div className="card__header">
          <img src={image} alt={article.title} loading="lazy" />
          <div className="stack row middle gap-2">
            <Avatar src={avatar} size="sm" />
            <strong>{article.author}</strong>
            <small>• {timeAgo}</small>
          </div>
        </div>
        <div className="card__body">
          <h4 className="mb__title">{article.title}</h4>
          <p className="mb__desc text soft">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={href} className="card card--media">
      <div className="card__header">
        <img src={image} alt={article.title} loading="lazy" />
        <div className="stack row middle between">
          <div className="stack row middle gap-2">
            <Avatar src={avatar} size="sm" />
            <strong>{article.author}</strong>
            <small>• {timeAgo}</small>
          </div>
        </div>
      </div>

      <div className="card__body card__body--media">
        <h4 className="mb__title">{article.title}</h4>
        <p className="mb__desc text soft">{article.excerpt}</p>
      </div>

      <div className="card__footer card__footer--media stack middle end">
        <span className="media-card__cta text sm muted">Baca selengkapnya</span>
        <Icon iconName="chevronRight" fill="var(--clr-ink-soft)" size={10} />
      </div>
    </Link>
  );
}
