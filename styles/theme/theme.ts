'use client'
import { createTheme, Theme } from '@mui/material/styles'
import { palette } from '@/styles/theme/palette'
import { Mui_Select, Mui_TextField } from './component'
import themeTypography from '@/styles/theme/typography'
import { ThemeMode } from './types'

export const darkTheme: Theme = createTheme({
  typography: {
    ...themeTypography(ThemeMode.Dark),
  },
  palette: palette(ThemeMode.Dark),
  components: {
    ...Mui_Select(ThemeMode.Dark),
  },
})

export const landingTheme: Theme = createTheme({
  typography: {
    ...themeTypography(ThemeMode.Landing),
  },
  palette: palette(ThemeMode.Dark),
  components: {
    ...Mui_Select(ThemeMode.Dark),
    // ...Mui_TextField(ThemeMode.Dark),
  },
})
