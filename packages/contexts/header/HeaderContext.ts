import { createContext } from "react";

export interface HeaderContextValue {
  transparentAllowed: boolean;
  setTransparentAllowed: (value: boolean) => void;
}

export const HeaderContext = createContext<HeaderContextValue | null>(null);
