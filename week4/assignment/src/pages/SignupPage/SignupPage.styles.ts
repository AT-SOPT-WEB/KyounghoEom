import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';

export const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${theme.sizes.fullWidth};
  height: ${theme.sizes.fullHeight};
  gap: ${theme.spacing.medium};
  background-color: ${theme.colors.background};
`;

export const titleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.title};
  color: ${theme.colors.primary};
`;

export const inputStyle = (theme: Theme) => css`
  width: ${theme.sizes.inputWidth};
  padding: ${theme.spacing.xsmall};
  border: 1px solid #ccc;
  border-radius: ${theme.borderRadius};
  font-size: ${theme.fontSizes.input};
  margin-bottom: ${theme.spacing.xsmall};
`;

export const signupButtonStyle = (theme: Theme) => css`
  width: ${theme.sizes.buttonWidth};
  padding: ${theme.spacing.small};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  margin-bottom: ${theme.spacing.small};
  &:hover {
    background-color: ${theme.colors.secondary};
  }
  border-radius: ${theme.borderRadius};
`;

export const backButtonStyle = (theme: Theme) => css`
  padding: ${theme.spacing.small} ${theme.spacing.large};
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.primary};
  }
`; 