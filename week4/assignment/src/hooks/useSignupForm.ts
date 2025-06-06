import { useState } from 'react';
import { SignupStep } from '../pages/SignupPage/types/SignupStep.enum';
import axios from 'axios';
import { signUp } from '../services/userApi';
import { ROUTES } from '../constants';

export function useSignupForm(onBack: () => void) {
  const [step, setStep] = useState<SignupStep>(SignupStep.EnterId);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const isIdStep = step === SignupStep.EnterId;
  const isPasswordStep = step === SignupStep.EnterPassword;
  const isNicknameStep = step === SignupStep.EnterNickname;

  const canNextFromId = id !== '';
  const canNextFromPassword = password !== '' && confirm !== '' && password === confirm;

  const nextStep = () => {
    if (isIdStep && canNextFromId) setStep(SignupStep.EnterPassword);
    else if (isPasswordStep && canNextFromPassword) setStep(SignupStep.EnterNickname);
  };

  const prevStepMap: Record<SignupStep, SignupStep | null> = {
    [SignupStep.EnterId]: null,
    [SignupStep.EnterPassword]: SignupStep.EnterId,
    [SignupStep.EnterNickname]: SignupStep.EnterPassword,
  };
  const prevLabelMap: Record<SignupStep, string> = {
    [SignupStep.EnterId]: '로그인으로',
    [SignupStep.EnterPassword]: '이전',
    [SignupStep.EnterNickname]: '이전',
  };

  const prevStep = () => {
    const prev = prevStepMap[step];
    if (prev === null) onBack();
    else setStep(prev);
  };
  const prevLabel = prevLabelMap[step];

  const handleRegister = async () => {
    if (!nickname) {
      alert('닉네임을 입력하세요');
      return;
    }
    try {
      await signUp(id, password, nickname);
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        alert('이미 사용 중인 아이디입니다');
      } else if (error instanceof Error) {
        alert(`회원가입에 실패했습니다: ${error.message}`);
      } else {
        alert('회원가입에 실패했습니다');
      }
      return;
    }
    alert(`회원가입이 완료되었습니다: ${nickname}`);
    onBack();
  };

  return {
    id,
    setId,
    password,
    setPassword,
    confirm,
    setConfirm,
    nickname,
    setNickname,
    isIdStep,
    isPasswordStep,
    isNicknameStep,
    nextStep,
    prevStep,
    prevLabel,
    handleRegister,
  };
} 