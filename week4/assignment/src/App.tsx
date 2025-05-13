import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage/LoginPage.index';
import SignupPage from './pages/SignupPage/SignupPage.index';
import Mypage from './pages/Mypage/MyPage.index';

const App: React.FC = () => {
  const [page, setPage] = useState<'login' | 'signup' | 'mypage'>('login');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('userId');
    if (stored) {
      setUserId(stored);
      setPage('mypage');
    }
  }, []);

  const handleLoginSuccess = (id: string) => {
    setUserId(id);
    setPage('mypage');
  };

  const handleNavigateSignup = () => {
    setPage('signup');
  };

  const handleBackToLogin = () => {
    setPage('login');
  };

  return (
    <>
      {page === 'login' && <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateSignup={handleNavigateSignup} />}
      {page === 'signup' && <SignupPage onBack={handleBackToLogin} />}
      {page === 'mypage' && <Mypage userId={userId} />}
    </>
  );
};

export default App;
