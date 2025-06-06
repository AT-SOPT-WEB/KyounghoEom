import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Mypage from './pages/Mypage';
import UserListPage from './pages/UserListPage';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './constants';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { login, logout } = useAuth();
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: (
      <AuthWrapper>
        <LoginPageWrapper />
      </AuthWrapper>
    ),
  },
  {
    path: ROUTES.SIGNUP,
    element: (
      <AuthWrapper>
        <SignupPage />
      </AuthWrapper>
    ),
  },
  {
    path: ROUTES.MYPAGE,
    element: (
      <AuthWrapper>
        <ProtectedRoute>
          <MypageWrapper />
        </ProtectedRoute>
      </AuthWrapper>
    ),
  },
  {
    path: ROUTES.USERS,
    element: (
      <AuthWrapper>
        <ProtectedRoute>
          <UserListPageWrapper />
        </ProtectedRoute>
      </AuthWrapper>
    ),
  },
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '*',
    element: <RootRedirect />,
  },
]);

const LoginPageWrapper = () => {
  const { login } = useAuth();
  return <LoginPage onLoginSuccess={login} />;
};

const MypageWrapper = () => {
  const { userId, logout } = useAuth();
  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  return (
    <Mypage
      userId={userId!}
      onLogout={logout}
      onNavigateInfo={() => navigate(ROUTES.MYPAGE)}
      onNavigateUserList={() => navigate(ROUTES.USERS)}
    />
  );
};

const UserListPageWrapper = () => {
  const { userId, logout } = useAuth();
  const navigate = (path: string) => {
    window.location.href = path;
  };
  
  return (
    <UserListPage
      userId={userId!}
      onLogout={logout}
      onNavigateInfo={() => navigate(ROUTES.MYPAGE)}
      onNavigateUserList={() => navigate(ROUTES.USERS)}
    />
  );
};

const RootRedirect = () => {
  const { userId } = useAuth();
  return <Navigate to={userId ? ROUTES.MYPAGE : ROUTES.LOGIN} />;
}; 