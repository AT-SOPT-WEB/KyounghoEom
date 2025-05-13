import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import type { PageHeaderProps } from './interfaces/PageHeaderProps';
import { headerStyle, tabStyle, nicknameStyle, navStyle, menuIconStyle } from './UserListPage.styles';

const PageHeader: React.FC<PageHeaderProps> = ({ userId, onLogout, onNavigateInfo, onNavigateUserList }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <header css={headerStyle(theme)}>
      <div css={menuIconStyle(theme)} onClick={() => setOpen((o) => !o)}>☰</div>
      <nav css={navStyle(theme, open)}>
        <span css={tabStyle(theme)} onClick={onNavigateInfo}>내 정보</span>
        <span css={tabStyle(theme)} onClick={onNavigateUserList}>회원 조회</span>
        <span css={tabStyle(theme)} onClick={() => { localStorage.removeItem('userId'); onLogout(); }}>로그아웃</span>
      </nav>
      <div css={nicknameStyle(theme)}>{userId}님</div>
    </header>
  );
};

export default PageHeader; 