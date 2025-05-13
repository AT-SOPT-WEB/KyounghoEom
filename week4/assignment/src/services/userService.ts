export const saveUser = (id: string, password: string, nickname?: string): void => {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  users[id] = { password, nickname };
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUser = (id: string): { password: string; nickname?: string } | null => {
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  return users[id] ?? null;
};

export const loginUser = (id: string, password: string): boolean => {
  const user = getUser(id);
  return user !== null && user.password === password;
};

export const setCurrentUser = (id: string): void => {
  localStorage.setItem('userId', id);
};