import { createTheme } from "@vanilla-extract/css";

const [themeClass, themeVars] = createTheme({
  color: {
    surface: {
      primary: "#FFFFFF",
      inverse: "#6339EB",
    },
    text: {
      primary: "#000000",
      inverse: "#FFFFFF",
    },
  },
});

export const theme = {
  ...themeVars,
  className: themeClass,
};
