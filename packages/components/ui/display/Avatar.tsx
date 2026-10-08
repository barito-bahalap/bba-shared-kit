// Style
import "./Avatar.css";
// Utils
import { getInitials } from "@ampikalteng/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  online?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Avatar({
  src,
  name = "",
  size = "md",
  online,
  className = "",
  onClick,
}: AvatarProps) {
  return (
    <div
      className={`avatar avatar--${size} ${onClick ? "avatar--clickable interactive" : ""} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {src ? (
        <img src={src} alt={name || "Avatar"} className="avatar__img" />
      ) : (
        <span className="avatar__initials">
          {name ? getInitials(name) : "?"}
        </span>
      )}
      {online != null && (
        <span
          className={`avatar__dot ${online ? "avatar__dot--online" : "avatar__dot--offline"}`}
        />
      )}
    </div>
  );
}
