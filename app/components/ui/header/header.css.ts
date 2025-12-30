import { style } from "@vanilla-extract/css";
import { theme } from "~/theme.css";

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2rem",
  backgroundColor: theme.color.surface.inverse,
  color: theme.color.text.inverse,
  fontWeight: "700",
});

export const logo = style({
  height: "4rem",
});

export const userMenu = style({
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
  backgroundColor: "#572FDE",
  padding: "2rem 1rem 2rem 0.7rem",
  borderRadius: "2rem",
  fontWeight: "inherit",
  fontSize: "inherit",
});

export const userAvatar = style({
  borderRadius: "50%",
  border: `2px solid ${theme.color.text.inverse}`,
});
