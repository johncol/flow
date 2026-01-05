import { useNavigationType } from "react-router";

export const useIsDirectAccess = (): boolean => {
  const navigationType = useNavigationType();

  return navigationType === "POP";
};
