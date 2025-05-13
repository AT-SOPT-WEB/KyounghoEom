import React from 'react';
import { useTheme } from '@emotion/react';
import { containerStyle, titleStyle, messageStyle } from './Mypage.styles';
import type { MypageProps } from './interfaces/Mypage.interface';

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