const SIMULATED_DELAY_MS = 100;

export const delay = (millis: number = SIMULATED_DELAY_MS) => {
  return new Promise((resolve) => setTimeout(resolve, millis));
};

const SIMULATED_ERROR = "Simulated error";

export const fail = (message: string = SIMULATED_ERROR) => {
  return new Promise((_, reject) => {
    reject(new Error(message));
  });
};

export const generateTaskId = () => {
  return "task_" + crypto.randomUUID();
};

export const generateUserId = () => {
  return "user_" + crypto.randomUUID();
};
