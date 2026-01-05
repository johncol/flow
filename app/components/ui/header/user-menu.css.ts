import { style } from "@vanilla-extract/css";
import { theme } from "~/global-styles/theme.css";

export const userMenuTrigger = style({
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
  backgroundColor: "#572FDE",
  padding: "0.6rem 1rem 0.6rem 0.7rem",
  borderRadius: "2rem",
  fontWeight: "inherit",
  fontSize: "inherit",
  border: "none",
  cursor: "pointer",
  color: "inherit",
});

export const userAvatar = style({
  backgroundColor: theme.color.surface.primary,
});

export const menuContent = style({
  minWidth: "18rem",
});
