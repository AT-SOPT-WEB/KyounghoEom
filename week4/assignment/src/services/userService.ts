import { STORAGE_KEYS } from '../constants';

export const saveUser = (id: string, password: string, nickname?: string): void => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
  users[id] = { password, nickname };
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getUser = (id: string): { password: string; nickname?: string } | null => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '{}');
  return users[id] ?? null;
};

export const loginUser = (id: string, password: string): boolean => {
  const user = getUser(id);
  return user !== null && user.password === password;
};

export const setCurrentUser = (id: string): void => {
  localStorage.setItem(STORAGE_KEYS.USER_ID, id);
};