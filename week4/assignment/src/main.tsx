import { createRoot } from 'react-dom/client'
import { ThemeProvider, Global } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './styles/theme';
import { resetStyles } from './styles/reset';
import { globalStyles } from './styles/global';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Global styles={resetStyles} />
        <Global styles={globalStyles} />
        <App />
      </ThemeProvider>
    </BrowserRouter>
)
