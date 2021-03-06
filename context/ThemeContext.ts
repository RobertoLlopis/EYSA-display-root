import React, { useContext } from "react";

export type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export function useThemeContext() {
  return useContext(ThemeContext);
}
