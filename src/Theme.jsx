// theme.jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    common: {
      white: '#fff',
      black: '#000',
    },
    primary: {
      main: '#e83283', // $pink
    },
    secondary: {
      main: 'rgba(255, 255, 255, 0.4)', // $secondary
    },
    success: {
      main: '#41d7a7', // $green
    },
    info: {
      main: '#39cbfb', // $cyan
    },
    warning: {
      main: '#ffc107', // $yellow
    },
    danger: {
      main: '#fd7e14', // $orange
    },
    background: {
      default: '#686dc3', // $body-bg
      paper: '#343a40', // $gray-800
    },
    text: {
      primary: '#fff', // $body-color
      secondary: 'rgba(255, 255, 255, 0.7)', // $text-muted
    },
    grey: {
      100: '#f8f9fa', // $gray-100
      200: '#e9e9e8', // $gray-200
      300: '#dee2e6', // $gray-300
      400: '#ced4da', // $gray-400
      500: '#adb5bd', // $gray-500
      600: '#6c757d', // $gray-600
      700: '#495057', // $gray-700
      800: '#343a40', // $gray-800
      900: '#212529', // $gray-900
    },
  },
  spacing: 8, // equivalent to $spacer / 4 if $spacer is 2rem
  shape: {
    borderRadius: 8, // equivalent to $border-radius
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(0, 0, 0, 0.1)', // $box-shadow-sm
    '1px 3px 24px -1px rgba(0, 0, 0, 0.15)', // $box-shadow
  ],
  typography: {
    fontFamily: 'Segoe UI, Arial, sans-serif',
    fontWeightBold: 700, // $headings-font-weight
    fontSize: 14, // Taille de police par défaut
    h1: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
    },
    h2: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
    },
    h3: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
    },
    body1: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
    },
    body2: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
    },
    button: {
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '1px 3px 24px -1px rgba(0, 0, 0, 0.15)', // $btn-box-shadow
          borderRadius: '0.5rem', // $border-radius
          padding: '0.75rem 1.5rem', // $input-btn-padding-y, $input-btn-padding-x
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent', // $input-bg
          borderColor: 'rgba(255, 255, 255, 0.4)', // $input-border-color
          borderWidth: '1px', // $input-border-width
          '&:focus': {
            borderColor: 'rgba(255, 255, 255, 0.4)', // $input-focus-border-color
            boxShadow: 'none', // $input-focus-box-shadow
          },
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.7)', // $input-placeholder-color
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent', // $card-bg
          borderColor: 'rgba(255, 255, 255, 0.2)', // $card-border-color
          borderRadius: '0.5rem', // $border-radius
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          opacity: 0.7, // $tooltip-opacity
        },
      },
    },
  },
});

export default theme;
