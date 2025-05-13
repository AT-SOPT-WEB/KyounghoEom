import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('userId'));

  const login = useCallback((id: string) => {
    localStorage.setItem('userId', id);
    setUserId(id);
    navigate('/mypage');
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('userId');
    setUserId(null);
    navigate('/login');
  }, [navigate]);

  return { userId, login, logout };
} 