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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  custom: {
    searchBorder: {
      light: Colors.searchBorder,
      dark: Colors.white,
    },
    tableHeader: {
      main: Colors.tableHeader,
    },
  },
};

export const theme = createTheme(themeOptions);
