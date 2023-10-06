import color from "src/themes/color";
import fontSize from "src/themes/fontSize";
import radius from "src/themes/radius";

const theme = {
  color,
  fontSize,
  radius
} as const;

export type AppTheme = typeof theme;

export default theme;
