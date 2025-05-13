import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { containerStyle, titleStyle, backButtonStyle, inputStyle, signupButtonStyle } from './SignupPage.styles';

interface SignupPageProps {
  onBack: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onBack }) => {
  const theme = useTheme();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignup = () => {
    if (!id || !password || !nickname) {
      alert('모든 필드를 입력하세요');
      return;
    }
    // 로컬스토리지
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[id] = { password, nickname };
    localStorage.setItem('users', JSON.stringify(users));
    alert('회원가입이 완료되었습니다');
    onBack();
  };

  return (
    <div css={containerStyle(theme)}>
      <h1 css={titleStyle(theme)}>회원가입</h1>
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
      <input
        css={inputStyle}
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button css={signupButtonStyle(theme)} onClick={handleSignup}>
        회원가입
      </button>
      <button css={backButtonStyle(theme)} onClick={onBack}>
        로그인으로
      </button>
    </div>
  );
};

export default SignupPage; 