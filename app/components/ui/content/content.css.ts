import { style } from "@vanilla-extract/css";
import { theme } from "~/global-styles/theme.css";

export const curvedContainer = style({
  backgroundColor: theme.color.surface.inverse,
});

export const content = style({
  backgroundColor: theme.color.surface.primary,
  borderRadius: "2rem 2rem 0 0",
  padding: "2rem 1.5rem",
});