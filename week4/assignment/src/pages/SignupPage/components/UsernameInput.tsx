import { useTheme } from '@emotion/react';
import { inputStyle, signupButtonStyle } from '../SignupPage.styles';

interface StepProps {
  onNext: () => void;
}

interface UsernameInputProps extends StepProps {
  id: string;
  onChange: (value: string) => void;
}

const UsernameInput = ({ id, onChange, onNext }: UsernameInputProps) => {
  const theme = useTheme();
  const isTooLong = id.length > 20;
  return (
    <>
      <input
        css={inputStyle(theme)}
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => onChange(e.target.value)}
      />
      {isTooLong && (
        <p style={{ color: 'red', margin: '0.5rem 0' }}>
          아이디는 20자 이하로 입력하세요
        </p>
      )}
      <button
        css={signupButtonStyle(theme)}
        disabled={!id || isTooLong}
        onClick={onNext}
      >
        다음
      </button>
    </>
  );
};

export default UsernameInput; 