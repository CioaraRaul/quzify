import React, { createContext, useContext, useState } from "react";

const ColorModeContext = createContext({
  colorMode: "light",
  setColorMode: (_: "light" | "dark") => {},
  toggleColorMode: () => {},
});

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const toggleColorMode = () =>
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  return (
    <ColorModeContext.Provider
      value={{ colorMode, setColorMode, toggleColorMode }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ColorModeContext);
}
