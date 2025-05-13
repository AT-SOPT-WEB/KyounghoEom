import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { containerStyle, titleStyle, backButtonStyle, inputStyle, signupButtonStyle } from './SignupPage.styles';
import type { SignupPageProps } from './interfaces/SignupPage.interface';
import { SignupStep } from './types/SignupStep.enum';
import { saveUser } from '../../services/userService';

const SignupPage: React.FC<SignupPageProps> = ({ onBack }) => {
  const theme = useTheme();
  const [step, setStep] = useState<SignupStep>(SignupStep.EnterId);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!id || !password) {
      alert('모든 필드를 입력하세요');
      return;
    }
    saveUser(id, password);
    alert('회원가입이 완료되었습니다');
    onBack();
  };

  return (
    <div css={containerStyle(theme)}>
      <h1 css={titleStyle(theme)}>회원가입</h1>
      {step === SignupStep.EnterId && (
        <>
          <input
            css={inputStyle(theme)}
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button
            css={signupButtonStyle(theme)}
            disabled={!id}
            onClick={() => setStep(SignupStep.EnterPassword)}
          >
            다음
          </button>
        </>
      )}
      {step === SignupStep.EnterPassword && (
        <>
          <input
            css={inputStyle(theme)}
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            css={signupButtonStyle(theme)}
            disabled={!password}
            onClick={handleSignup}
          >
            회원가입
          </button>
        </>
      )}
      <button
        css={backButtonStyle(theme)}
        onClick={
          step === SignupStep.EnterId ? onBack : () => setStep(SignupStep.EnterId)
        }
      >
        {step === SignupStep.EnterId ? '로그인으로' : '이전'}
      </button>
    </div>
  );
};

export default SignupPage; 