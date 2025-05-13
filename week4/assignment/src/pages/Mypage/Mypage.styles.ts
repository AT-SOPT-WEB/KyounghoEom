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