import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Mypage from './pages/Mypage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { userId, login, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLoginSuccess={login} />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/mypage"
        element={
          userId ? (
            <Mypage
              userId={userId}
              onLogout={logout}
              onNavigateInfo={() => navigate('/mypage')}
              onNavigateUserList={() => navigate('/users')}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to={userId ? '/mypage' : '/login'} />} />
    </Routes>
  );
};

export default App;
