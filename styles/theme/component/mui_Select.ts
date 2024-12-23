import { palette } from '@/styles/theme/palette'
import { ThemeMode } from '../types'
import { Components } from '@mui/material/styles';

export const Mui_Select = (theme: ThemeMode) => ({
  MuiFormControl: {
    styleOverrides: {
      root: {
        minWidth: '0 !important',
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        backgroundColor: palette(theme).background.paper,
        color: palette(theme).text.button,
        fontStyle: 'normal',
        '& .MuiSelect-select': {
          padding: '8px 12px',
          fontStyle: 'normal',
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiSvgIcon-root': {
          color: palette(theme).text.button,
          fontStyle: 'normal',
        },
        '&.Mui-focused': {
          backgroundColor: palette(theme).background.paper,
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#29292E',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#29292E',
        },
      },
    },
  },
})
