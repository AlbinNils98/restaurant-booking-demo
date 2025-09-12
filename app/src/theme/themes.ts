import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f1f1f",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#fff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e0e0e0",
      contrastText: "#121212",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#fff",
      secondary: "#bbb",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#bfbfbf",
          },
        },
      },
    },
  },
});