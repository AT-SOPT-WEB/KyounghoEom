import React from 'react';
import { useTheme } from '@emotion/react';
import { inputStyle, signupButtonStyle } from '../SignupPage.styles';
import type { IdStepProps } from '../interfaces/IdStep.interface';

const IdStep: React.FC<IdStepProps> = ({ id, onChange, onNext }) => {
  const theme = useTheme();
  return (
    <>
      <input
        css={inputStyle(theme)}
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        css={signupButtonStyle(theme)}
        disabled={!id}
        onClick={onNext}
      >
        다음
      </button>
    </>
  );
};

export default IdStep; 