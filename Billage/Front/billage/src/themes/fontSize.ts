const fontSize = {
  extraLarge: '28px',
  large: '26px',
  medium: '18px',
  default: '16px',
  small: '14px',
  extraSmall: '13px',
} as const;

export type fontSizeThemeKey = keyof typeof fontSize;

export default fontSize;