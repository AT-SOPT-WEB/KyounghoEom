export interface NicknameStepProps {
  nickname: string;
  onChangeNickname: (value: string) => void;
  onComplete: () => void;
} 