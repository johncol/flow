const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const formatDate = (date: Date): string => {
  const userLocale = navigator.language;
  return date.toLocaleDateString(userLocale, dateOptions);
};
