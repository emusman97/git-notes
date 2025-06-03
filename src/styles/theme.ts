import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { Colors } from './colors';

export const themeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
};

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: Colors.primary,
        },
        secondary: {
          main: Colors.secondary,
        },
        searchBorder: {
          main: Colors.searchBorder,
          light: Colors.searchBorder,
          dark: Colors.white,
        },
        tableHeader: {
          main: Colors.tableHeader,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: Colors.primary,
        },
        secondary: {
          main: Colors.secondary,
        },
        searchBorder: {
          main: Colors.searchBorder,
          light: Colors.searchBorder,
          dark: Colors.white,
        },
        tableHeader: {
          main: Colors.tableHeaderDark,
        },
      },
    },
  },
  ...themeOptions,
});
