import React, { useState } from 'react';
import { css, useTheme } from '@emotion/react';
import type { Theme } from '@emotion/react';

interface LoginPageProps {
  onLoginSuccess: (userId: string) => void;
  onNavigateSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateSignup }) => {
  const theme = useTheme();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }
    localStorage.setItem('userId', id);
    onLoginSuccess(id);
  };

  return (
    <div css={containerStyle(theme)}>
      <h1 css={titleStyle(theme)}>로그인</h1>
      <input
        css={inputStyle}
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        css={inputStyle}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button css={loginButtonStyle(theme)} onClick={handleLogin}>
        로그인
      </button>
      <button css={signupButtonStyle(theme)} onClick={onNavigateSignup}>
        회원가입
      </button>
    </div>
  );
};

export default LoginPage;

const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  gap: 1rem;
  background-color: ${theme.colors.background};
`;

const titleStyle = (theme: Theme) => css`
  font-size: 2rem;
  color: ${theme.colors.primary};
`;

const inputStyle = css`
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const loginButtonStyle = (theme: Theme) => css`
  width: 320px;
  padding: 0.7rem;
  background-color: ${theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const signupButtonStyle = (theme: Theme) => css`
  width: 320px;
  padding: 0.7rem;
  background-color: ${theme.colors.secondary};
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.primary};
  }
`; 