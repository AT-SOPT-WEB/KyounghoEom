import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { containerStyle, titleStyle, inputStyle, loginButtonStyle, signupButtonStyle } from './LoginPage.styles';

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