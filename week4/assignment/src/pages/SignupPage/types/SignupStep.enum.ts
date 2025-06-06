export const SignupStep = {
  EnterId: 0,
  EnterPassword: 1,
  EnterNickname: 2,
} as const;

export type SignupStep = typeof SignupStep[keyof typeof SignupStep]; 