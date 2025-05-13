import React from 'react';
import { useTheme } from '@emotion/react';
import {
  containerStyle,
  titleStyle,
  backButtonStyle,
} from './SignupPage.styles';
import type { SignupPageProps } from './interfaces/SignupPage.interface';
import { useSignupForm } from '../../hooks/useSignupForm';
import IdStep from './components/IdStep';
import PasswordStep from './components/PasswordStep';
import NicknameStep from './components/NicknameStep';

const SignupPage: React.FC<SignupPageProps> = ({ onBack }) => {
  const theme = useTheme();
  const {
    id, setId,
    password, setPassword,
    confirm, setConfirm,
    nickname, setNickname,
    isIdStep,
    isPasswordStep,
    isNicknameStep,
    nextStep,
    prevStep,
    prevLabel,
    handleRegister,
  } = useSignupForm(onBack);

  return (
    <div css={containerStyle(theme)}>
      <h1 css={titleStyle(theme)}>회원가입</h1>
      {isIdStep && <IdStep id={id} onChange={setId} onNext={nextStep} />}
      {isPasswordStep && (
        <PasswordStep
          password={password}
          confirm={confirm}
          onChangePassword={setPassword}
          onChangeConfirm={setConfirm}
          onNext={nextStep}
        />
      )}
      {isNicknameStep && (
        <NicknameStep
          nickname={nickname}
          onChangeNickname={setNickname}
          onComplete={handleRegister}
        />
      )}
      <button
        css={backButtonStyle(theme)}
        onClick={prevStep}
      >
        {prevLabel}
      </button>
    </div>
  );
};

export default SignupPage; 