import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/react';
import { inputStyle, signupButtonStyle } from '../SignupPage.styles';

interface StepProps {
  onNext: () => void;
}

interface PasswordConfirmationProps extends StepProps {
  password: string;
  confirm: string;
  onChangePassword: (value: string) => void;
  onChangeConfirm: (value: string) => void;
}

const passwordContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const toggleButtonStyle = css`
  padding: 8px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
`;

const errorMessageStyle = css`
  color: red;
  margin: 0.5rem 0;
`;

const PasswordConfirmation = ({
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
      <div css={passwordContainerStyle}>
        <input
          css={inputStyle(theme)}
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
        <button type="button" onClick={() => setShowPassword((s) => !s)} css={toggleButtonStyle}>
          {showPassword ? '숨기기' : '보기'}
        </button>
      </div>
      <div css={passwordContainerStyle}>
        <input
          css={inputStyle(theme)}
          type={showConfirm ? 'text' : 'password'}
          placeholder="비밀번호 확인"
          value={confirm}
          onChange={(e) => onChangeConfirm(e.target.value)}
        />
        <button type="button" onClick={() => setShowConfirm((s) => !s)} css={toggleButtonStyle}>
          {showConfirm ? '숨기기' : '보기'}
        </button>
      </div>
      {isLengthExceeded && (
        <p css={errorMessageStyle}>
          비밀번호는 20자 이하로 입력하세요
        </p>
      )}
      {!isLengthExceeded && isMismatch && (
        <p css={errorMessageStyle}>
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