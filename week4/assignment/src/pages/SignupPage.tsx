import React from 'react';
import { css, useTheme } from '@emotion/react';
import type { Theme } from '@emotion/react';

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

const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  gap: 1rem;
  background-color: ${theme.colors.background};
`;

const titleStyle = (theme: Theme) => css`
  font-size: 2rem;
  color: ${theme.colors.primary};
`;

const backButtonStyle = (theme: Theme) => css`
  padding: 0.7rem 1.2rem;
  background-color: ${theme.colors.secondary};
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.primary};
  }
`; 