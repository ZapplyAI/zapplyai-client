import { ThemeMode } from './types'
import { PaletteOptions } from '@mui/material/styles'

export const palette = (mode: ThemeMode): PaletteOptions => ({
  primary: {
    main: '#775EFF',
    light: '#6A6A6A',
  },
  action: {
    hover: '#202023',
  },
  // secondary: {
  //   main: '#CF6BC2',
  // },
  // error: {
  //   main: '#DC3535',
  // },
  // warning: {
  //   main: '#dc8e35',
  // },
  // info: {
  //   main: '#35aadc',
  // },
  // success: {
  //   main: '#35aadc',
  // },
  background: {
    default: '#161618',
    default_secondary: '#181818',
    paper: '#201F23',
  },
  text: {
    primary: '#DDDCE9',
    secondary: '#D0D0D0',
    caption: '#8B8B8B',
    button: '#858585',
    // disabled: 'rgba(0, 0, 0, 0.38)',
  },
  icon: {
    main: '#807F89',
    light: '#6A6A6A',
  },
})
