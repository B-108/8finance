const color = {
  green : "#93C90F",
  lightGrey : "#BDBDBD",
  darkGrey : "#979797",
  black : "#000000",
  white : "#FFFFFF",
  
} as const;

export type colorThemeKey = keyof typeof color;

export default color;
