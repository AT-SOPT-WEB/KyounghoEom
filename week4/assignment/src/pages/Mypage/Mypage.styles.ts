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

export const messageStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.message};
  color: ${theme.colors.text};
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

export const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${theme.sizes.fullWidth};
  padding: ${theme.spacing.small} ${theme.spacing.large};
  background-color: ${theme.colors.primary};
`;

export const tabStyle = (theme: Theme) => css`
  margin-right: ${theme.spacing.large};
  color: ${theme.colors.white};
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
`;

export const nicknameStyle = (theme: Theme) => css`
  color: ${theme.colors.white};
  font-weight: bold;
`; 