/**
 * GapMyClub Theme
 *
 * Central location for app colors and fonts.
 */

import { Platform } from "react-native";

const gapGreen = "#0B6623";
const gapGreenDark = "#064A19";
const gapGreenLight = "#DDEFE3";

export const Colors = {
  light: {
    text: "#1F2933",
    background: "#FFFFFF",

    tint: gapGreen,

    icon: "#667085",
    tabIconDefault: "#667085",
    tabIconSelected: gapGreen,

    // GapMyClub custom colors
    primary: gapGreen,
    primaryDark: gapGreenDark,
    primaryLight: gapGreenLight,

    card: "#FFFFFF",
    surface: "#F5F7F5",
    border: "#D0D5DD",
  },

  dark: {
    text: "#ECEDEE",
    background: "#151718",

    tint: gapGreenLight,

    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: gapGreenLight,

    // GapMyClub custom colors
    primary: gapGreenLight,
    primaryDark: gapGreen,
    primaryLight: gapGreenDark,

    card: "#1F2933",
    surface: "#25292E",
    border: "#344054",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const FontSizes = {
  small: 14,
  medium: 16,
  large: 22,
  xlarge: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },

  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },

  web: {
    sans:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});