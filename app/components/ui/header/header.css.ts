import { style } from "@vanilla-extract/css";
import { theme } from "~/global-styles/theme.css";

export const header = style({
  containerName: "header",
  containerType: "inline-size",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2rem 1.5rem",
  backgroundColor: theme.color.surface.inverse,
  color: theme.color.text.inverse,
  fontWeight: "700",
});
