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
export const signUp = async (loginId: string, password: string, nickname: string): Promise<number> => {
  const res = await axiosInstance.post<ApiResponse<{ userId: number; nickname: string }>>(
    '/api/v1/auth/signup',
    { loginId, password, nickname }
  );
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data.userId;
};

// 로그인
export const signIn = async (loginId: string, password: string): Promise<number> => {
  const res = await axiosInstance.post<ApiResponse<{ userId: number }>>(
    '/api/v1/auth/signin',
    { loginId, password }
  );
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data.userId;
};

// 내 닉네임 조회
export const getMyProfile = async (): Promise<string> => {
  const res = await axiosInstance.get<ApiResponse<{ nickname: string }>>('/api/v1/users/me');
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data.nickname;
};

// 닉네임 조회
export const getAllUsers = async (): Promise<string[]> => {
  const res = await axiosInstance.get<ApiResponse<{ nicknameList: string[] }>>('/api/v1/users');
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data.nicknameList;
};

// 닉네임 수정
export const updateMyNickname = async (nickname: string): Promise<boolean> => {
  const res = await axiosInstance.patch<ApiResponse<null>>('/api/v1/users', { nickname });
  return res.data.success;
};

// 검색 (query 파라미터 사용)
export const searchUsers = async (keyword: string): Promise<string[]> => {
  const res = await axiosInstance.get<ApiResponse<{ nicknameList: string[] }>>(
    '/api/v1/users?keyword=' + encodeURIComponent(keyword)
  );
  if (!res.data.success) throw new Error(res.data.message);
  return res.data.data.nicknameList;
}; 