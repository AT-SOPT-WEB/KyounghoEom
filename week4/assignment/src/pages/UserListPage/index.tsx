  import React, { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import type { PageHeaderProps } from '../PageHeaderProps';
import { headerStyle, tabStyle, nicknameStyle, containerStyle, titleStyle, listStyle } from './UserListPage.styles';
import { inputStyle, signupButtonStyle } from '../SignupPage/SignupPage.styles';
import { listUsers, searchUsers, User } from '../../services/userApi';

const UserListPage: React.FC<PageHeaderProps> = ({ userId, onLogout, onNavigateInfo, onNavigateUserList }) => {
  const theme = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query?: string) => {
    setLoading(true);
    try {
      const data = query ? await searchUsers(query) : await listUsers();
      setUsers(data);
    } catch {
      alert('회원 목록 조회에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <header css={headerStyle(theme)}>
        <nav>
          <span css={tabStyle(theme)} onClick={onNavigateInfo}>내 정보</span>
          <span css={tabStyle(theme)} onClick={onNavigateUserList}>회원 조회</span>
          <span css={tabStyle(theme)} onClick={() => { localStorage.removeItem('userId'); onLogout(); }}>로그아웃</span>
        </nav>
        <div css={nicknameStyle(theme)}>{userId}님</div>
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
        <button css={signupButtonStyle(theme)} onClick={() => fetchUsers(search)} disabled={loading}>
          확인
        </button>
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <ul css={listStyle(theme)}>
            {users.map((user) => (
              <li key={user.id}>{user.nickname || user.id} ({user.id})</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UserListPage; 