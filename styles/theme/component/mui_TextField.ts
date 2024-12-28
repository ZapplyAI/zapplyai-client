import { palette } from '@/styles/theme/palette'
import { ThemeMode } from '../types'
import { Components } from '@mui/material/styles'

export const Mui_TextField = (theme: ThemeMode): Components => ({
  MuiTextField: {
    defaultProps: {
      variant: 'standard', // Ensures the default variant is "standard"
    },
  },
  MuiInput: {
    styleOverrides: {
      root: {
        '&:before': {
          borderBottom: `1px solid #BDBDBD`, // Default gray underline
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `1px solid #9E9E9E`, // Slightly darker gray on hover
        },
        '&:after': {
          borderBottom: `1px solid #757575`, // Lighter color when active (focused)
        },
      },
      input: {
        padding: '10px 16px', // Custom padding inside the input field
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '18px',
        fontWeight: '400', // Fixed typo (was "fontWeigh")
        color: '#7E7E7E', // Label color
      },
    },
  },
});
