'use client'
import { createTheme } from '@mui/material'
import { palette } from '@/styles/theme/palette'
import { Mui_Select } from './component'
import { typography_dark, typography_landing } from '@/styles/theme/typography'
import { ThemeMode } from './types'

export const darkTheme = createTheme({
  typography: typography_dark,
  palette: palette(ThemeMode.Dark),
  components: {
    ...Mui_Select(ThemeMode.Dark),
  },
})

export const landingTheme = createTheme({
  typography: typography_landing,
  palette: palette(ThemeMode.Dark),
  components: {
    ...Mui_Select(ThemeMode.Dark),
  },
  customSpacing: {
    sides: { desktop: '12vw', mobile: '20px' },
  },
})
