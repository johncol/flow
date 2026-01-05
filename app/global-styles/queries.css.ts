import { style } from "@vanilla-extract/css";

const breakpoints = {
  small: 520,
  large: 1024,
};

const container = {
  minSmall: `(min-width: ${breakpoints.small}px)`,
  minLarge: `(min-width: ${breakpoints.large}px)`,
};

const styles = {
  minSmall: style({
    display: "none",
    "@container": {
      [container.minSmall]: {
        display: "initial",
      },
    },
  }),
  minLarge: style({
    display: "none",
    "@container": {
      [container.minLarge]: {
        display: "initial",
      },
    },
  }),
};

export const queries = {
  breakpoints,
  container,
  styles,
};
