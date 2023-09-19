const radius = {
  L : '20px',
  M: '15px',
  S: '10px',
  DF: '8px',
  XS : '5px'
} as const;

export type radiusKey = keyof typeof radius;

export default radius;