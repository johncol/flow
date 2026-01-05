import { style } from "@vanilla-extract/css";
import { theme } from "~/global-styles/theme.css";

export const container = style({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.color.surface.inverse,
  padding: "2rem",
});

export const formCard = style({
  backgroundColor: theme.color.surface.primary,
  maxWidth: "400px",
  width: "100%",
});
