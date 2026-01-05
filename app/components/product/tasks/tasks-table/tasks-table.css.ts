import { style } from "@vanilla-extract/css";

export const tableRoot = style({
  containerName: "tasksTable",
  containerType: "inline-size",
});

export const tableTitle = style({
  fontSize: "3rem",
  fontWeight: "700",
});

export const tableHeaderCell = style({
  verticalAlign: "middle",
});

export const dueDateText = style({
  textWrap: "nowrap",
});

export const emptyTableCell = style({
  padding: "4rem 2rem",
  boxShadow: "none",
});
