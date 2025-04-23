import { ThemeColors } from "./themeColorsModel";

export interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}