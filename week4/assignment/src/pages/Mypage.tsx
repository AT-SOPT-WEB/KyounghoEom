import React from 'react';
import { css, useTheme } from '@emotion/react';
import type { Theme } from '@emotion/react';

interface MypageProps {
  userId: string;
}

const Mypage: React.FC<MypageProps> = ({ userId }) => {
  const theme = useTheme();
  return (
    <div css={containerStyle(theme)}>
      <h1 css={titleStyle(theme)}>마이페이지</h1>
      <p css={messageStyle(theme)}>안녕하세요, {userId}님</p>
    </div>
  );
};

export default Mypage;

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

const messageStyle = (theme: Theme) => css`
  font-size: 1.2rem;
  color: ${theme.colors.text};
`; 