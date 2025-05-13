import React from 'react';
import { useTheme } from '@emotion/react';
import { containerStyle, titleStyle, backButtonStyle } from './SignupPage.styles';

interface SignupPageProps {
  onBack: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onBack }) => {
  const theme = useTheme();
  return (
    <div css={containerStyle(theme)}>
      <h1 css={titleStyle(theme)}>회원가입</h1>
      {/* 회원가입 폼은 추후 구현 */}
      <button css={backButtonStyle(theme)} onClick={onBack}>
        뒤로
      </button>
    </div>
  );
};

export default SignupPage; 