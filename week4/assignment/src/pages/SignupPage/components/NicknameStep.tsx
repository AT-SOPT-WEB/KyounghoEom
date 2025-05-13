import React from 'react';
import { useTheme } from '@emotion/react';
import { inputStyle, signupButtonStyle } from '../SignupPage.styles';
import type { NicknameStepProps } from '../interfaces/NicknameStep.interface';

const NicknameStep: React.FC<NicknameStepProps> = ({ nickname, onChangeNickname, onComplete }) => {
  const theme = useTheme();
  const disabled = !nickname;

  return (
    <>
      <input
        css={inputStyle(theme)}
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => onChangeNickname(e.target.value)}
      />
      <button
        css={signupButtonStyle(theme)}
        disabled={disabled}
        onClick={onComplete}
      >
        완료
      </button>
    </>
  );
};

export default NicknameStep; 