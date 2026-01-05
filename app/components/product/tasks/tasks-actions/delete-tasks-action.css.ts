import { style } from "@vanilla-extract/css";
import { queries } from "~/global-styles/queries.css";

export const largeContainer = style({
  display: "none",
  "@container": {
    [queries.container.minSmall]: {
      display: "block",
    },
  },
});
