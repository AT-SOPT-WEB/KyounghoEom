import { css } from '@emotion/react';
import { theme } from './theme';

export const globalStyles = css`
  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  }
`;
