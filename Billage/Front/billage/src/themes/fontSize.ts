const fontSize = {
  XL: "1.75rem",    /* 28px / 16px = 1.75rem */
  L: "1.5rem",      /* 24px / 16px = 1.5rem */
  M: "1.25rem",     /* 20px / 16px = 1.25rem */
  DF: "1rem",       /* 16px / 16px = 1rem */
  S: "0.875rem",    /* 14px / 16px = 0.875rem */
  XS: "0.75rem",    /* 12px / 16px = 0.75rem */
  XXS: "0.625rem",  /* 10px / 16px = 0.625rem */
} as const;

export type fontSizeThemeKey = keyof typeof fontSize;

export default fontSize;