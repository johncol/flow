const breakpoints = {
  small: 520,
  large: 1024,
};

const container = {
  minSmall: `(min-width: ${breakpoints.small}px)`,
  minLarge: `(min-width: ${breakpoints.large}px)`,
};

export const queries = {
  breakpoints,
  container,
};
