import { useTheme } from '@emotion/react';
import { inputStyle, signupButtonStyle } from '../SignupPage.styles';

interface NicknameInputProps {
  nickname: string;
  onChangeNickname: (value: string) => void;
  onComplete: () => void;
}

const NicknameInput = ({ nickname, onChangeNickname, onComplete }: NicknameInputProps) => {
  const theme = useTheme();
  const disabled = !nickname;

  return (
    <>
      <input
        css={inputStyle(theme)}
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => onChangeNickname(e.target.value)}
      />
      <button
        css={signupButtonStyle(theme)}
        disabled={disabled}
        onClick={onComplete}
      >
        완료
      </button>
    </>
  );
};

export default NicknameInput; 