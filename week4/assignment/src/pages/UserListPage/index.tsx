import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import type { PageHeaderProps } from '../PageHeaderProps';
import { headerStyle, tabStyle, nicknameStyle, containerStyle, titleStyle, listStyle } from './UserListPage.styles';
import { getUser } from '../../services/userService';
import { inputStyle, signupButtonStyle } from '../SignupPage/SignupPage.styles';

const UserListPage: React.FC<PageHeaderProps> = ({ userId, onLogout, onNavigateInfo, onNavigateUserList }) => {
  const theme = useTheme();
  const usersObj = JSON.parse(localStorage.getItem('users') || '{}');
  const users = Object.entries(usersObj) as [string, { password: string; nickname?: string }][];
  const current = getUser(userId);
  const nickname = current?.nickname || userId;
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = () => {
    if (!search.trim()) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(([id, user]) =>
          id.includes(search) || user.nickname?.includes(search)
        )
      );
    }
  };

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
        <h1 css={titleStyle(theme)}>회원 조회</h1>
        <input
          css={inputStyle(theme)}
          type="text"
          placeholder="검색어 입력"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button css={signupButtonStyle(theme)} onClick={handleSearch}>
          확인
        </button>
        <ul css={listStyle(theme)}>
          {filteredUsers.map(([id, user]) => (
            <li key={id}>{user.nickname || id} ({id})</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserListPage; 