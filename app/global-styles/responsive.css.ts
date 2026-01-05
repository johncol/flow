import { style } from "@vanilla-extract/css";

const breakpoints = {
  small: 520,
  large: 1024,
};

const containerQueries = {
  minSmall: `(min-width: ${breakpoints.small}px)`,
  minLarge: `(min-width: ${breakpoints.large}px)`,
};

const containerStyles = {
  visibleOnMinSmall: style({
    display: "none",
    "@container": {
      [containerQueries.minSmall]: {
        display: "revert",
      },
    },
  }),
  visibleOnMinLarge: style({
    display: "none",
    "@container": {
      [containerQueries.minLarge]: {
        display: "revert",
      },
    },
  }),
};

export const container = {
  breakpoints,
  queries: containerQueries,
  styles: containerStyles,
};
