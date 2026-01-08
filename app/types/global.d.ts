declare global {
  interface Window {
    /**
     * Enables user to control a fake latency (in ms) to test slow internet connections.
     * Set via browser console: window.LATENCY_MS = 3000
     */
    LATENCY_MS?: number;
  }
}

export {};
