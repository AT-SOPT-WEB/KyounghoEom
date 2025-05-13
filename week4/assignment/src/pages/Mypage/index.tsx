import React from 'react';
import { useTheme } from '@emotion/react';
import { containerStyle, headerStyle, tabStyle, nicknameStyle, titleStyle, messageStyle } from './Mypage.styles';
import type { MypageProps } from './interfaces/Mypage.interface';
import { getUser } from '../../services/userService';

const Mypage: React.FC<MypageProps> = ({ userId, onLogout, onNavigateInfo, onNavigateUserList }) => {
  const theme = useTheme();
  const user = getUser(userId);
  const nickname = user?.nickname || userId;

  return (
    <>
      <header css={headerStyle(theme)}>
        <nav>
          <span css={tabStyle(theme)} onClick={onNavigateInfo}>내 정보</span>
          <span css={tabStyle(theme)} onClick={onNavigateUserList}>회원 조회</span>
          <span css={tabStyle(theme)} onClick={() => { localStorage.removeItem('userId'); onLogout(); }}>로그아웃</span>
        </nav>
        <div css={nicknameStyle(theme)}>{nickname}님</div>
      </header>
      <div css={containerStyle(theme)}>
        <h1 css={titleStyle(theme)}>마이페이지</h1>
        <p css={messageStyle(theme)}>환영합니다, {nickname}님</p>
      </div>
    </>
  );
};

export default Mypage; 