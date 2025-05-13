import { useState } from 'react';
import { SignupStep } from '../pages/SignupPage/types/SignupStep.enum';
import { saveUser } from '../services/userService';

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

  const handleRegister = () => {
    if (!nickname) {
      alert('닉네임을 입력하세요');
      return;
    }
    try {
      saveUser(id, password, nickname);
    } catch (error) {
      console.error(error);
      alert('회원가입에 실패했습니다.');
      return;
    }
    alert('회원가입이 완료되었습니다');
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