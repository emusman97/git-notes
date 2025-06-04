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
        fileNameContainerBg: {
          main: Colors.fileNameContainerBg,
        },
        addFileButton: {
          main: Colors.addFileButton,
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
        fileNameContainerBg: {
          main: Colors.fileNameContainerBgDark,
        },
        addFileButton: {
          main: Colors.addFileButtonDark,
        },
      },
    },
  },
  ...themeOptions,
});
