import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { containerStyle, titleStyle, inputStyle, buttonStyle } from './LoginPage.styles';
import type { LoginPageProps } from './interfaces/LoginPage.interface';
import { signIn } from '../../services/userApi';

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!id || !password) {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }
    try {
      const userId = await signIn(id, password);
      onLoginSuccess(userId.toString());
      navigate('/mypage');
    } catch (error: any) {
      const message = error instanceof Error ? error.message : '로그인에 실패했습니다';
      alert(message);
    }
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