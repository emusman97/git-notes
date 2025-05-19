import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { Colors } from './colors';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },
};

export const theme = createTheme(themeOptions);
