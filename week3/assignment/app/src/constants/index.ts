export const COLORS = {
  PRIMARY: '#1976d2',
  SECONDARY: '#888',
  WHITE: '#fff',
  LIGHT_GRAY: '#eee',
  BORDER: '#ccc',
} as const;

export const TIMING = {
  SUCCESS_RESET: 3000,
  FAILURE_RESET: 5000,
  COUNTDOWN_INTERVAL: 1000,
} as const;

export const Z_INDEX = {
  CLOSE_BUTTON: 2,
} as const;

export const LIMITS = {
  MAX_RECENT_SEARCHES: 3,
  MAX_ATTEMPTS: 10,
  NUMBER_LENGTH: 3,
} as const; 