import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import {
  containerStyle,
  titleStyle,
  backButtonStyle,
  inputStyle,
  signupButtonStyle,
} from './SignupPage.styles';
import type { SignupPageProps } from './interfaces/SignupPage.interface';
import { SignupStep } from './types/SignupStep.enum';
import { saveUser } from '../../services/userService';

const SignupPage: React.FC<SignupPageProps> = ({ onBack }) => {
  const theme = useTheme();
  const [step, setStep] = useState<SignupStep>(SignupStep.EnterId);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const handleRegister = () => {
    if (!nickname) {
      alert('닉네임을 입력하세요');
      return;
    }
    saveUser(id, password, nickname);
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
          <input
            css={inputStyle(theme)}
            type="password"
            placeholder="비밀번호 확인"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button
            css={signupButtonStyle(theme)}
            disabled={!password || !confirm || password !== confirm}
            onClick={() => setStep(SignupStep.EnterNickname)}
          >
            다음
          </button>
        </>
      )}
      {step === SignupStep.EnterNickname && (
        <>
          <input
            css={inputStyle(theme)}
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            css={signupButtonStyle(theme)}
            disabled={!nickname}
            onClick={handleRegister}
          >
            완료
          </button>
        </>
      )}
      <button
        css={backButtonStyle(theme)}
        onClick={
          step === SignupStep.EnterId
            ? onBack
            : step === SignupStep.EnterPassword
            ? () => setStep(SignupStep.EnterId)
            : () => setStep(SignupStep.EnterPassword)
        }
      >
        {step === SignupStep.EnterId
          ? '로그인으로'
          : step === SignupStep.EnterPassword
          ? '이전'
          : '이전'}
      </button>
    </div>
  );
};

export default SignupPage; 