export const STORAGE_KEYS = {
  USER_ID: 'userId',
  USERS: 'users'
} as const;

export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  MYPAGE: '/mypage',
  USERS: '/users'
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/v1/auth/signup',
    SIGNIN: '/api/v1/auth/signin'
  },
  USERS: {
    ME: '/api/v1/users/me',
    ALL: '/api/v1/users'
  }
} as const; 