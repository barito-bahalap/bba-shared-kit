import { useMemo, useState, type ReactNode } from "react";
import { HeaderContext } from "./HeaderContext";

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [transparentAllowed, setTransparentAllowed] = useState(false);

  const value = useMemo(
    () => ({ transparentAllowed, setTransparentAllowed }),
    [transparentAllowed],
  );

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
