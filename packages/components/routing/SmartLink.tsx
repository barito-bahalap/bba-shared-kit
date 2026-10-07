import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SmartLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function SmartLink({ href, onClick, children, ...rest }: SmartLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();

  if (isExternal(href)) {
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
  const targetPath = path || "/";

  if (hash !== undefined) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      if (location.pathname === targetPath) {
        scrollToHash(hash);
        window.history.replaceState(null, "", `${targetPath}#${hash}`);
      } else {
        navigate({ pathname: targetPath, hash: `#${hash}` });
      }
    };

    return (
      <a href={href} onClick={handleClick} {...rest}>
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
