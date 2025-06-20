import { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { containerStyle, headerStyle, tabStyle, nicknameStyle, titleStyle, messageStyle, navStyle, menuIconStyle } from './Mypage.styles';
import { getMyProfile, updateMyNickname } from '../../services/userApi';
import { inputStyle, signupButtonStyle } from '../SignupPage/SignupPage.styles';
import { STORAGE_KEYS } from '../../constants';

interface PageHeaderProps {
  userId: string;
  onLogout: () => void;
  onNavigateInfo: () => void;
  onNavigateUserList: () => void;
}

const Mypage = ({ userId, onLogout, onNavigateInfo, onNavigateUserList }: PageHeaderProps) => {
  const theme = useTheme();
  const [displayNickname, setDisplayNickname] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getMyProfile()
      .then((nickname) => setDisplayNickname(nickname))
      .catch(() => alert('프로필을 불러오는 데 실패했습니다'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header css={headerStyle(theme)}>
        <div css={menuIconStyle(theme)} onClick={() => setOpen((o) => !o)}>☰</div>
        <nav css={navStyle(theme, open)}>
          <span css={tabStyle(theme)} onClick={onNavigateInfo}>내 정보</span>
          <span css={tabStyle(theme)} onClick={onNavigateUserList}>회원 조회</span>
          <span css={tabStyle(theme)} onClick={() => { localStorage.removeItem(STORAGE_KEYS.USER_ID); onLogout(); }}>로그아웃</span>
        </nav>
        {loading ? <p>로딩 중...</p> : <div css={nicknameStyle(theme)}>{displayNickname}님</div>}
      </header>
      <div css={containerStyle(theme)}>
        <h1 css={titleStyle(theme)}>내 정보</h1>
        <p css={messageStyle(theme)}>환영합니다, {displayNickname}님</p>
        <input
          css={inputStyle(theme)}
          type="text"
          placeholder="새 닉네임"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
        />
        <button
          css={signupButtonStyle(theme)}
          disabled={!newNickname || loading}
          onClick={async () => {
            if (!newNickname) {
              alert('닉네임을 입력하세요');
              return;
            }
            setLoading(true);
            try {
              const success = await updateMyNickname(newNickname);
              if (success) {
                setDisplayNickname(newNickname);
                alert('닉네임이 변경되었습니다');
                setNewNickname('');
              } else {
                alert('닉네임 변경에 실패했습니다');
              }
            } catch {
              alert('닉네임 변경에 실패했습니다');
            } finally {
              setLoading(false);
            }
          }}
        >
          저장
        </button>
      </div>
    </>
  );
};

export default Mypage; 