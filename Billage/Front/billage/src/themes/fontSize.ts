const fontSize = {
  XL_28: "1.75rem",    /* 28px / 16px = 1.75rem */
  L_24: "1.5rem",      /* 24px / 16px = 1.5rem */
  M_20: "1.25rem",     /* 20px / 16px = 1.25rem */
  DF_16: "1rem",       /* 16px / 16px = 1rem */
  S_14: "0.875rem",    /* 14px / 16px = 0.875rem */
  XS_12: "0.75rem",    /* 12px / 16px = 0.75rem */
  XXS_10: "0.625rem",  /* 10px / 16px = 0.625rem */
} as const;

export type fontSizeThemeKey = keyof typeof fontSize;

export default fontSize;