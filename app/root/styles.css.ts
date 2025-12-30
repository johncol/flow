import { globalStyle, style } from "@vanilla-extract/css";

globalStyle('body', {
  margin: 0
});

export const root = style({
  minHeight: "100dvh",
});
