const color = {

  black : "#000000",
  white : "#FFFFFF",

  green : {
    100 : "#205D38",
    50 : "#6E960D",
    0 : "#93C90F",
  },
  
  gray : {
    100 : "#979797",
    85 : "#747474",
    70 : "#BDBDBD",
    55 : "#A4A4A4",
    40 : "#C8C8C8",
    25 : "#EAEAEA",
  },

  // 그라데이션
  mix : {
    border: "linear-gradient(90deg, #0FC95C -15.06%, #8EC915 14.47%, #28EDD5 48.21%, #8EC915 81.95%, #93C90F 111.96%)",
    background : "linear-gradient(125deg, rgba(147, 201, 15, 0.00) -153.76%, #93C90F 80.37%)",    
  },

} as const;

export type colorThemeKey = keyof typeof color;

export default color;