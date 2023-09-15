const color = {
  green : "#93C90F",
  lightgrey : "#BDBDBD",
  black : "#000000",
  white : "FFFFFF",
  
} as const;

export type colorThemeKey = keyof typeof color;

export default color;
