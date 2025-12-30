import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html", {
  fontSize: "10px",
});

globalStyle("body", {
  margin: 0,
  fontSize: "1.6rem"
});

export const root = style({
  minHeight: "100dvh",
});
