'use client'
import { createTheme, Theme } from '@mui/material/styles'
import { palette } from '@/styles/theme/palette'
import { MUI_Select } from './component/select'
import themeTypography from '@/styles/theme/typography'
import { ThemeMode } from './types'

export const darkTheme: Theme = createTheme({
  typography: {
    ...themeTypography(ThemeMode.Dark),
  },
  palette: palette(ThemeMode.Dark),
  components: {
    ...MUI_Select(ThemeMode.Dark),
  },
})

export const landingTheme: Theme = createTheme({
  typography: {
    ...themeTypography(ThemeMode.Landing),
  },
  palette: palette(ThemeMode.Dark),
  components: {
    ...MUI_Select(ThemeMode.Dark),
  },
})
