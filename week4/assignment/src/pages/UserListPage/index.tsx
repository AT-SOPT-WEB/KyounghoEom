import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import PageHeader from './PageHeader';
import { containerStyle, titleStyle, listStyle } from './UserListPage.styles';
import { inputStyle, signupButtonStyle } from '../SignupPage/SignupPage.styles';
import { getAllUsers, searchUsers } from '../../services/userApi';

interface PageHeaderProps {
  userId: string;
  onLogout: () => void;
  onNavigateInfo: () => void;
  onNavigateUserList: () => void;
}

const UserListPage = ({ userId, onLogout, onNavigateInfo, onNavigateUserList }: PageHeaderProps) => {
  const theme = useTheme();
  const [users, setUsers] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query?: string) => {
    setLoading(true);
    try {
      const data = query ? await searchUsers(query) : await getAllUsers();
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
      <PageHeader
        userId={userId}
        onLogout={onLogout}
        onNavigateInfo={onNavigateInfo}
        onNavigateUserList={onNavigateUserList}
      />
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
            {users.map((nickname, idx) => (
              <li key={idx}>{nickname}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default UserListPage; 