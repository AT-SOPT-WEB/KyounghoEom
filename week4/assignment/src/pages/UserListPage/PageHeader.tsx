import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { headerStyle, tabStyle, nicknameStyle, navStyle, menuIconStyle } from './UserListPage.styles';
import { getMyProfile } from '../../services/userApi';
import { STORAGE_KEYS } from '../../constants';

interface PageHeaderProps {
  userId: string;
  onLogout: () => void;
  onNavigateInfo: () => void;
  onNavigateUserList: () => void;
}

const PageHeader = ({ userId, onLogout, onNavigateInfo, onNavigateUserList }: PageHeaderProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState<string>(userId);
  useEffect(() => {
    getMyProfile()
      .then((name) => setNickname(name))
      .catch(() => console.error('닉네임 조회 실패'));
  }, []);
  return (
    <header css={headerStyle(theme)}>
      <div css={menuIconStyle(theme)} onClick={() => setOpen((o) => !o)}>☰</div>
      <nav css={navStyle(theme, open)}>
        <span css={tabStyle(theme)} onClick={onNavigateInfo}>내 정보</span>
        <span css={tabStyle(theme)} onClick={onNavigateUserList}>회원 조회</span>
        <span css={tabStyle(theme)} onClick={() => { localStorage.removeItem(STORAGE_KEYS.USER_ID); onLogout(); }}>로그아웃</span>
      </nav>
      <div css={nicknameStyle(theme)}>{nickname}님</div>
    </header>
  );
};

export default PageHeader; 