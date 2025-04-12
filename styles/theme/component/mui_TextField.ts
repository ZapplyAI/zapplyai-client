import { palette } from '@/styles/theme/palette'
import { ThemeMode } from '../types'
import { Components } from '@mui/material/styles'

export const Mui_TextField = (theme: ThemeMode): Components => ({
  MuiTextField: {
    defaultProps: {
      variant: 'standard', // Ensures the default variant is "standard"
    },
    styleOverrides: {
      root: {
        marginBottom: '8px', // Reduced margin
      }
    }
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
        padding: '6px 12px', // Reduced padding for more compact appearance
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '16px', // Slightly smaller font size
        fontWeight: '400',
        color: '#7E7E7E', // Label color
        transform: 'translate(0, -6px) scale(1)', // Adjusted position
        '&.Mui-focused': {
          transform: 'translate(0, -15px) scale(0.85)', // Adjusted position when focused
        },
        '&.MuiFormLabel-filled': {
          transform: 'translate(0, -15px) scale(0.85)', // Adjusted position when filled
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#5E5E5E',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#7E7E7E',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#775EFF',
        },
      },
      input: {
        padding: '10px 14px', // Reduced padding for outlined variant
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginTop: '2px', // Reduced margin
        fontSize: '12px', // Smaller font size for helper text
      },
    },
  },
});
