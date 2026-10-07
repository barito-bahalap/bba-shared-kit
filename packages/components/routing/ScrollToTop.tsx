import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "./SmartLink";

export function ScrollToTop() {
  const { key, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const frame = requestAnimationFrame(() => scrollToHash(hash));
    return () => cancelAnimationFrame(frame);
  }, [key, hash]);

  return null;
}
