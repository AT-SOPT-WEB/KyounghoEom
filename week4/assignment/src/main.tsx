import { createRoot } from 'react-dom/client'
import { ThemeProvider, Global } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';
import { theme } from './styles/theme';
import { resetStyles } from './styles/reset';
import { globalStyles } from './styles/global';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Global styles={resetStyles} />
    <Global styles={globalStyles} />
    <RouterProvider router={router} />
  </ThemeProvider>
)
