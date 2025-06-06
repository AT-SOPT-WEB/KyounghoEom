import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS, ROUTES } from '../constants';

export function useAuth() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem(STORAGE_KEYS.USER_ID));

  const login = useCallback((id: string) => {
    localStorage.setItem(STORAGE_KEYS.USER_ID, id);
    setUserId(id);
    navigate(ROUTES.MYPAGE);
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    setUserId(null);
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  return { userId, login, logout };
} 