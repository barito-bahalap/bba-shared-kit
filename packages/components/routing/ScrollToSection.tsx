import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MAX_ATTEMPTS = 60;

function scrollToSectionId(id: string, behavior: ScrollBehavior = "smooth") {
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

export function ScrollToSection() {
  const { state, key } = useLocation();
  const id = (state as { scrollTo?: string } | null)?.scrollTo;

  useEffect(() => {
    if (!id) return;
    let frame = 0;
    let attempts = 0;

    const seek = () => {
      if (document.getElementById(id)) {
        scrollToSectionId(id, "instant");
        return;
      }
      // lazy route may still be loading
      if (attempts++ < MAX_ATTEMPTS) frame = requestAnimationFrame(seek);
    };

    frame = requestAnimationFrame(seek);
    return () => cancelAnimationFrame(frame);
  }, [id, key]);

  return null;
}
