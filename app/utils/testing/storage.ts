/**
 * Mock Storage object that implements the Web Storage API.
 * Use this to mock localStorage or sessionStorage in tests.
 */
const createStorageMock = (): Storage => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
};

let originalLocalStorage: Storage | undefined;
let originalSessionStorage: Storage | undefined;

/**
 * Replaces window.localStorage and window.sessionStorage with mock implementations.
 * Call this in beforeEach to isolate storage state between tests.
 */
export const setupStorageMocks = (): void => {
  originalLocalStorage = window.localStorage;
  originalSessionStorage = window.sessionStorage;

  Object.defineProperty(window, "localStorage", {
    value: createStorageMock(),
    writable: true,
    configurable: true,
  });

  Object.defineProperty(window, "sessionStorage", {
    value: createStorageMock(),
    writable: true,
    configurable: true,
  });
};

/**
 * Restores the original localStorage and sessionStorage.
 * Call this in afterEach to clean up after tests.
 */
export const restoreStorageMocks = (): void => {
  if (originalLocalStorage) {
    Object.defineProperty(window, "localStorage", {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
    originalLocalStorage = undefined;
  }

  if (originalSessionStorage) {
    Object.defineProperty(window, "sessionStorage", {
      value: originalSessionStorage,
      writable: true,
      configurable: true,
    });
    originalSessionStorage = undefined;
  }
};
