import { useCallback, useEffect, useRef, useState } from "react";

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: "auto" | "light" | "dark";
      language?: string;
      appearance?: "always" | "execute" | "interaction-only";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ): string;
  reset(widgetId: string): void;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null; // allow a retry after e.g. an ad blocker is disabled
      reject(new Error("turnstile_load_failed"));
    };
    document.head.appendChild(script);
  });
  return loading;
}

export type TurnstileState = "idle" | "ready" | "error";

/**
 * Renders an "interaction-only" Turnstile widget into `containerRef` while `enabled`.
 * `token` is null until the check passes, and again after it expires or is reset.
 * Tokens are single-use: call `reset()` after every submit attempt that reached the server.
 */
export function useTurnstile(
  siteKey: string,
  enabled: boolean,
  language: string,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState<TurnstileState>("idle");

  useEffect(() => {
    if (!enabled || !siteKey) return;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        const container = containerRef.current;
        if (cancelled || !container || !window.turnstile) return;
        widgetId.current = window.turnstile.render(container, {
          sitekey: siteKey,
          theme: "auto",
          language,
          appearance: "interaction-only",
          callback: (value) => setToken(value),
          "expired-callback": () => setToken(null),
          "error-callback": () => {
            setToken(null);
            setState("error");
          },
        });
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile)
        window.turnstile.remove(widgetId.current);
      widgetId.current = null;
      setToken(null);
    };
  }, [enabled, siteKey, language]);

  const reset = useCallback(() => {
    setToken(null);
    if (widgetId.current && window.turnstile)
      window.turnstile.reset(widgetId.current);
  }, []);

  return { containerRef, token, state, reset };
}
