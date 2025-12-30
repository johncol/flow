import { style } from "@vanilla-extract/css";
import { theme } from "~/theme.css";

export const curvedContainer = style({
  backgroundColor: theme.color.surface.inverse,
});

export const content = style({
  backgroundColor: theme.color.surface.primary,
  borderRadius: "2rem 2rem 0 0",
  padding: "1rem",
});