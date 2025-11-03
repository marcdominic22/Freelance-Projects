import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#111827',
      paper: '#1f2937'
    },
    primary: {
      main: '#16a34a'
    },
    secondary: {
      main: '#22d3ee'
    },
    warning: {
      main: '#f59e0b'
    },
    error: {
      main: '#ef4444'
    },
    success: {
      main: '#22c55e'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none'
        }
      }
    }
  }
});

export default theme;
