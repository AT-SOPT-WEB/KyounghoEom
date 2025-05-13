export interface StepProps {
  onNext: () => void;
}

export interface UsernameInputProps extends StepProps {
  id: string;
  onChange: (value: string) => void;
}

export interface PasswordConfirmationProps extends StepProps {
  password: string;
  confirm: string;
  onChangePassword: (value: string) => void;
  onChangeConfirm: (value: string) => void;
}

export interface NicknameInputProps {
  nickname: string;
  onChangeNickname: (value: string) => void;
  onComplete: () => void;
} 