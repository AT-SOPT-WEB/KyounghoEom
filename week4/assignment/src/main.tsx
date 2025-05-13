import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, Global } from '@emotion/react';
import { theme } from './styles/theme';
import { resetStyles } from './styles/reset';
import { globalStyles } from './styles/global';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={resetStyles} />
      <Global styles={globalStyles} />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
