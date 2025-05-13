import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { inputStyle, signupButtonStyle } from '../SignupPage.styles';
import type { PasswordConfirmationProps } from '../interfaces/SignupStepProps';

const PasswordConfirmation: React.FC<PasswordConfirmationProps> = ({
  password,
  confirm,
  onChangePassword,
  onChangeConfirm,
  onNext,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isLengthExceeded = password.length > 20 || confirm.length > 20;
  const isMismatch = password !== confirm;
  const disabled = !password || !confirm || isMismatch || isLengthExceeded;
  return (
    <>
      <div>
        <input
          css={inputStyle(theme)}
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? '숨기기' : '보기'}
        </button>
      </div>
      <div>
        <input
          css={inputStyle(theme)}
          type={showConfirm ? 'text' : 'password'}
          placeholder="비밀번호 확인"
          value={confirm}
          onChange={(e) => onChangeConfirm(e.target.value)}
        />
        <button type="button" onClick={() => setShowConfirm((s) => !s)}>
          {showConfirm ? '숨기기' : '보기'}
        </button>
      </div>
      {isLengthExceeded && (
        <p style={{ color: 'red', margin: '0.5rem 0' }}>
          비밀번호는 20자 이하로 입력하세요
        </p>
      )}
      {!isLengthExceeded && isMismatch && (
        <p style={{ color: 'red', margin: '0.5rem 0' }}>
          비밀번호가 일치하지 않습니다
        </p>
      )}
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

export default PasswordConfirmation; 