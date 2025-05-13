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

// 추가적으로 필요 시 getUser, removeUser 등의 함수도 이곳에 구현 가능합니다. 