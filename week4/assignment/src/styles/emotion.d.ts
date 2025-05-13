import '@emotion/react';
import { theme } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof theme.colors;
    sizes: typeof theme.sizes;
    spacing: typeof theme.spacing;
    fontSizes: typeof theme.fontSizes;
    borderRadius: typeof theme.borderRadius;
  }
} 