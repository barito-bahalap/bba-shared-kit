import { useContext, useEffect } from "react";
import { HeaderContext, type HeaderContextValue } from "./HeaderContext";

export function useHeaderContext(): HeaderContextValue {
  const ctx = useContext(HeaderContext);
  if (!ctx)
    throw new Error("useHeaderContext must be used within HeaderProvider");
  return ctx;
}

export function useTransparentHeader() {
  const { setTransparentAllowed } = useHeaderContext();

  useEffect(() => {
    setTransparentAllowed(true);
    return () => setTransparentAllowed(false);
  }, [setTransparentAllowed]);
}
