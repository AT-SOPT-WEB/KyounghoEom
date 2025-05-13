import React from 'react';
import { useTheme } from '@emotion/react';
import { inputStyle, signupButtonStyle } from '../SignupPage.styles';
import type { PasswordStepProps } from '../interfaces/PasswordStep.interface';

const PasswordStep: React.FC<PasswordStepProps> = ({
  password,
  confirm,
  onChangePassword,
  onChangeConfirm,
  onNext,
}) => {
  const theme = useTheme();
  const disabled = !password || !confirm || password !== confirm;
  return (
    <>
      <input
        css={inputStyle(theme)}
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => onChangePassword(e.target.value)}
      />
      <input
        css={inputStyle(theme)}
        type="password"
        placeholder="비밀번호 확인"
        value={confirm}
        onChange={(e) => onChangeConfirm(e.target.value)}
      />
      <button
        css={signupButtonStyle(theme)}
        disabled={disabled}
        onClick={onNext}
      >
        다음
      </button>
    </>
  );
};

export default PasswordStep; 