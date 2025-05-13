import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';

export const headerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  padding: ${theme.spacing.large} ${theme.spacing.large};
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

export const containerStyle = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${theme.spacing.medium};
  background-color: ${theme.colors.background};
`;

export const titleStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.title};
  color: ${theme.colors.primary};
`;

export const listStyle = (theme: Theme) => css`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin-top: ${theme.spacing.medium};
  li {
    padding: ${theme.spacing.small} 0;
    border-bottom: 1px solid ${theme.colors.divider};
  }
`;

export const navStyle = (theme: Theme, open: boolean) => css`
  display: flex;
  gap: ${theme.spacing.large};
  @media (max-width: 600px) {
    flex-direction: column;
    overflow: hidden;
    max-height: ${open ? '200px' : '0'};
    transition: max-height 0.3s ease;
    width: 100%;
    background-color: ${theme.colors.primary};
    position: absolute;
    top: 100%;
    left: 0;
  }
`;

export const menuIconStyle = (theme: Theme) => css`
  display: none;
  font-size: ${theme.fontSizes.title};
  color: ${theme.colors.white};
  cursor: pointer;
  @media (max-width: 600px) {
    display: block;
  }
`; 