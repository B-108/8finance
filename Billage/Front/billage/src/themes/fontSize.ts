const fontSize = {
  XL: '28px',
  L: '24px',
  M: '20px',
  DF: '16px',
  S: '14px',
  XS: '12px',
  XXS: '10px',
} as const;

export type fontSizeThemeKey = keyof typeof fontSize;

export default fontSize;

