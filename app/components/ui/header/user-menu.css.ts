import { style } from "@vanilla-extract/css";
import { theme } from "~/global-styles/theme.css";

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
