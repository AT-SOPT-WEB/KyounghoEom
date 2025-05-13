import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { containerStyle, headerStyle, tabStyle, nicknameStyle, titleStyle, messageStyle } from './Mypage.styles';
import type { PageHeaderProps } from '../PageHeaderProps';
import { getUser } from '../../services/userService';
import { inputStyle, signupButtonStyle } from '../SignupPage/SignupPage.styles';

const Mypage: React.FC<PageHeaderProps> = ({ userId, onLogout, onNavigateInfo, onNavigateUserList }) => {
  const theme = useTheme();
  const user = getUser(userId);
  const [displayNickname, setDisplayNickname] = useState(user?.nickname || userId);
  const [newNickname, setNewNickname] = useState('');

  return (
    <>
      <header css={headerStyle(theme)}>
        <nav>
          <span css={tabStyle(theme)} onClick={onNavigateInfo}>내 정보</span>
          <span css={tabStyle(theme)} onClick={onNavigateUserList}>회원 조회</span>
          <span css={tabStyle(theme)} onClick={() => { localStorage.removeItem('userId'); onLogout(); }}>로그아웃</span>
        </nav>
        <div css={nicknameStyle(theme)}>{displayNickname}님</div>
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
          disabled={!newNickname}
          onClick={() => {
            if (!newNickname) {
              alert('닉네임을 입력하세요');
              return;
            }
            setDisplayNickname(newNickname);
            alert('닉네임이 성공적으로 변경되었습니다');
            setNewNickname('');
          }}
        >
          저장
        </button>
      </div>
    </>
  );
};

export default Mypage; 