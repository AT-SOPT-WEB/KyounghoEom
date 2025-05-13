import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import {
  containerStyle,
  titleStyle,
  backButtonStyle,
} from './SignupPage.styles';
import type { SignupPageProps } from './interfaces/SignupPage.interface';
import { SignupStep } from './types/SignupStep.enum';
import { saveUser } from '../../services/userService';
import IdStep from './components/IdStep';
import PasswordStep from './components/PasswordStep';
import NicknameStep from './components/NicknameStep';

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
        <IdStep id={id} onChange={setId} onNext={() => setStep(SignupStep.EnterPassword)} />
      )}
      {step === SignupStep.EnterPassword && (
        <PasswordStep
          password={password}
          confirm={confirm}
          onChangePassword={setPassword}
          onChangeConfirm={setConfirm}
          onNext={() => setStep(SignupStep.EnterNickname)}
        />
      )}
      {step === SignupStep.EnterNickname && (
        <NicknameStep
          nickname={nickname}
          onChangeNickname={setNickname}
          onComplete={handleRegister}
        />
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
          : '이전'}
      </button>
    </div>
  );
};

export default SignupPage; 