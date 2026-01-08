import type { EncryptedString } from "~/types/users";

export const delay = (millis: number = (window.LATENCY_MS ?? 1000)) => {
  return new Promise((resolve) => setTimeout(resolve, millis));
};

const SIMULATED_ERROR = "Simulated error";

export const fail = (message: string = SIMULATED_ERROR) => {
  return new Promise((_, reject) => {
    reject(new Error(message));
  });
};

export const generateTaskId = () => {
  return "task-" + crypto.randomUUID();
};

export const generateUserId = () => {
  return "user-" + crypto.randomUUID();
};

export const encryptPassword = (password: string): Promise<EncryptedString> => {
  return crypto.subtle
    .digest("SHA-256", new TextEncoder().encode(password))
    .then((hash) => {
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    });
};
