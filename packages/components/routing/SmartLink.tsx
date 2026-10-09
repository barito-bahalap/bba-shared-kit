import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SmartLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  href: string;
}

const EXTERNAL = /^(https?:|mailto:|tel:)/;

export const isExternalHref = (href: string) => EXTERNAL.test(href);

export function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function SmartLink({
  href,
  onClick,
  children,
  ...rest
}: SmartLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();

  if (isExternalHref(href)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const [path, hash] = href.split("#");
  const targetPath = path || location.pathname;

  if (hash !== undefined) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || isModifiedClick(event)) return;
      event.preventDefault();
      if (location.pathname === targetPath) {
        scrollToHash(hash);
        window.history.replaceState(null, "", `${targetPath}#${hash}`);
      } else {
        navigate({ pathname: targetPath, hash: `#${hash}` });
      }
    };

    return (
      <a href={`${targetPath}#${hash}`} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
