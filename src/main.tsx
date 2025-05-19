import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import '@/index.css';
import { store } from '@/state';
import { MainRoutes } from '@/routes';
import { theme } from '@/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainRoutes />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
