import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MAX_ATTEMPTS = 60;

export function ScrollToTop() {
  const { pathname, hash, key, state } = useLocation();
  const hasSection = Boolean((state as { scrollTo?: string } | null)?.scrollTo);

  useEffect(() => {
    if (hasSection) return;

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let frame = 0;

    const seek = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "auto" });
        return;
      }
      attempts += 1;
      if (attempts < MAX_ATTEMPTS) {
        frame = requestAnimationFrame(seek);
      } else {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    frame = requestAnimationFrame(seek);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key, hasSection]);

  return null;
}
