import axiosInstance from './axiosInstance';

export interface User {
  id: string;
  nickname: string;
}

export interface AuthResponse {
  token: string;
}

export interface ApiResponse<T> { success: boolean; code: string; message: string; data: T; }

// 회원가입
export const signUp = async (id: string, password: string, nickname: string): Promise<boolean> => {
  const res = await axiosInstance.post<ApiResponse<null>>('/api/v1/auth/signup', { id, password, nickname });
  return res.data.success;
};

// 로그인
export const signIn = async (id: string, password: string): Promise<string> => {
  const res = await axiosInstance.post<ApiResponse<{ token: string }>>('/api/v1/auth/signin', { id, password });
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data.token;
};

// 내 닉네임 조회
export const getMyProfile = async (): Promise<User> => {
  const res = await axiosInstance.get<ApiResponse<User>>('/api/v1/users/me');
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data;
};

// 닉네임 조회
export const getAllUsers = async (): Promise<User[]> => {
  const res = await axiosInstance.get<ApiResponse<User[]>>('/api/v1/users');
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data;
};

// 닉네임 수정
export const updateMyNickname = async (nickname: string): Promise<boolean> => {
  const res = await axiosInstance.patch<ApiResponse<null>>('/api/v1/users', { nickname });
  return res.data.success;
};

// 검색 (query 파라미터 사용)
export const searchUsers = async (query: string): Promise<User[]> => {
  const res = await axiosInstance.get<ApiResponse<User[]>>('/api/v1/users?search=' + encodeURIComponent(query));
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data;
}; 