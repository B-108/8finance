import color from "src/themes/color";

const theme = {
  color,
  
} as const;

export type AppTheme = typeof theme;

export default theme;
