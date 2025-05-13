import type { StepProps } from './Step.interface';

export interface IdStepProps extends StepProps {
  id: string;
  onChange: (value: string) => void;
} 