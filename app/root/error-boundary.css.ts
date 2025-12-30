import { style } from "@vanilla-extract/css";
import { theme } from "~/theme.css";

export const container = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
  gap: "1rem",
});

export const errorCode = style({
  fontSize: "4rem",
  fontWeight: 700,
  color: theme.color.surface.inverse,
  margin: 0,
});

export const title = style({
  fontSize: "2rem",
  fontWeight: 500,
  margin: 0,
});

export const description = style({
  color: "#64748B",
  margin: 0,
});

export const homeLink = style({
  color: theme.color.surface.inverse,
  fontWeight: 500,
  margin: 0,
});

export const stackContainer = style({
  padding: "1rem",
  backgroundColor: "#F1F5F9",
  borderRadius: "0.5rem",
  maxWidth: "500px",
  maxHeight: "150px",
  overflowY: "auto",
  margin: 0,
});

export const stackCode = style({
  fontFamily: "monospace",
  fontSize: "0.75rem",
  color: "#475569",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  margin: 0,
});
