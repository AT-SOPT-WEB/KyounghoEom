import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { containerStyle, titleStyle, inputStyle, buttonStyle } from './LoginPage.styles';
import type { LoginPageProps } from './interfaces/LoginPage.interface';
import { loginUser, setCurrentUser } from '../../services/userService';

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }
    if (!loginUser(id, password)) {
      alert('아이디 또는 비밀번호가 틀렸습니다');
      return;
    }
    setCurrentUser(id);
    onLoginSuccess(id);
  };

  return (
    <div css={containerStyle(theme)}>
      <h1 css={titleStyle(theme)}>로그인</h1>
      <input
        css={inputStyle(theme)}
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        css={inputStyle(theme)}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button css={buttonStyle(theme)} onClick={handleLogin}>
        로그인
      </button>
      <button css={buttonStyle(theme)} onClick={() => navigate('/signup')}>
        회원가입
      </button>
    </div>
  );
};

export default LoginPage; 