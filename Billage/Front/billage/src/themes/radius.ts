const radius = {
  L_20 : '20px',
  M_15: '15px',
  S_10: '10px',
  DF_8: '8px',
  XS_5 : '5px'
} as const;

export type radiusKey = keyof typeof radius;

export default radius;