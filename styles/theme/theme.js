'use client'
import { createTheme } from '@mui/material'
import { palette } from '@/styles/theme/palette'
import { Mui_Select } from './component'
import themeTypography from '@/styles/theme/typography'
import { ThemeMode } from './types'

export const darkTheme = createTheme({
  typography: {
    ...themeTypography(ThemeMode.Dark),
  },
  palette: palette(ThemeMode.Dark),
  components: {
    ...Mui_Select(ThemeMode.Dark),
  },
})

export const landingTheme = createTheme({
  typography: {
    ...themeTypography(ThemeMode.Landing),
  },
  palette: palette(ThemeMode.Dark),
  components: {
    ...Mui_Select(ThemeMode.Dark),
    // ...Mui_TextField(ThemeMode.Dark),
  },
})
