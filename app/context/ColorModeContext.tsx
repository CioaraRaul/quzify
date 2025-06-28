import React, { createContext, useContext, useState } from "react";

const ColorModeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ColorModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
