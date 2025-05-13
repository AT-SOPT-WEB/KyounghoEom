import type { StepProps } from './Step.interface';

export interface PasswordStepProps extends StepProps {
  password: string;
  confirm: string;
  onChangePassword: (value: string) => void;
  onChangeConfirm: (value: string) => void;
} 