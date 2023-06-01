import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1F3425',
      light: '#76897B',
      dark: '#1F3425',
    },
    secondary: {
      main: '#505661',
      light: '#626E71',
      dark: '#313D40',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#586c5d',
    },
  },
  typography: {
    fontSize: 16,
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '20px 20px',
        margin: '0px',
        height: '100%',
        minHeight: 'auto'
      },
    },
    MuiButton: {
      root: {
        margin: '5px',
      },
    },
    MuiContainer: {
      root: {
        textAlign: 'center',
        height: 'auto',
        minHeight: 'auto'
      }
    },
    MuiTableRow: {
      root: {
        borderColor: '#1F3425'
      }
    }

  },
});
export default theme;