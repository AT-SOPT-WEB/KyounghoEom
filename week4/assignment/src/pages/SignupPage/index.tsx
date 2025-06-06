import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import {
  containerStyle,
  titleStyle,
  backButtonStyle,
} from './SignupPage.styles';
import { useSignupForm } from '../../hooks/useSignupForm';
import UsernameInput from './components/UsernameInput';
import PasswordConfirmation from './components/PasswordConfirmation';
import NicknameInput from './components/NicknameInput';
import { ROUTES } from '../../constants';

const SignupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    id, setId,
    password, setPassword,
    confirm, setConfirm,
    nickname, setNickname,
    isIdStep,
    isPasswordStep,
    isNicknameStep,
    nextStep,
    prevStep,
    prevLabel,
    handleRegister,
  } = useSignupForm(() => navigate(ROUTES.LOGIN));

  return (
    <div css={containerStyle(theme)}>
      <h1 css={titleStyle(theme)}>회원가입</h1>
      {isIdStep && <UsernameInput id={id} onChange={setId} onNext={nextStep} />}
      {isPasswordStep && (
        <PasswordConfirmation
          password={password}
          confirm={confirm}
          onChangePassword={setPassword}
          onChangeConfirm={setConfirm}
          onNext={nextStep}
        />
      )}
      {isNicknameStep && (
        <NicknameInput
          nickname={nickname}
          onChangeNickname={setNickname}
          onComplete={handleRegister}
        />
      )}
      <button
        css={backButtonStyle(theme)}
        onClick={prevStep}
      >
        {prevLabel}
      </button>
    </div>
  );
};

export default SignupPage; 