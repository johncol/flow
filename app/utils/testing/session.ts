import type { Session } from "~/types/session";

export const createLoggedInSession = (): Session => ({
  user: {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
  },
  loginTime: new Date(),
});
