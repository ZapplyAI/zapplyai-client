import { PaletteOptions, Palette } from '@mui/material/styles/createPalette'
import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypeBackground {
    default_secondary: string
  }
  interface TypeText {
    caption: string
    button: string
  }
  interface PaletteOptions {
    icon?: {
      main?: string
      light?: string
    }
  }

  interface Theme {
    customSpacing?: {
      sides: {
        desktop: string
        mobile: string
      }
    }
  }
  interface ThemeOptions {
    customSpacing?: {
      sides?: {
        desktop?: string
        mobile?: string
      }
    }
  }
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  Landing = 'landing',
}
