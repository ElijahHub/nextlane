import { createContext, useEffect, useState, ReactNode } from "react";

import { DarkModeContextType } from "../types";

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const DarkModeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode") || "false")
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
