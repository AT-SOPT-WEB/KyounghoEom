import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';

export const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  gap: 1rem;
  background-color: ${theme.colors.background};
`;

export const titleStyle = (theme: Theme) => css`
  font-size: 2rem;
  color: ${theme.colors.primary};
`;

export const backButtonStyle = (theme: Theme) => css`
  padding: 0.7rem 1.2rem;
  background-color: ${theme.colors.secondary};
  color: #fff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

export const inputStyle = css`
  width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const signupButtonStyle = (theme: Theme) => css`
  width: 320px;
  padding: 0.7rem;
  background-color: ${theme.colors.primary};
  color: #fff;
  border: none;
  cursor: pointer;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: ${theme.colors.secondary};
  }
`; 