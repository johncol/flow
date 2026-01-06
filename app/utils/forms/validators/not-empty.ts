export const notEmpty = (value: string): boolean => {
  return Boolean(value) && value.trim() !== "";
};
