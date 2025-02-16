import { palette } from '@/styles/theme/palette'
import { ThemeMode } from './types'
import { TypographyOptions } from '@mui/material/styles/createTypography'

export const typography_dark: TypographyOptions = {
  h1: {
    fontWeight: 400,
    fontSize: '3rem', // Desktop 48px, Mobile 42px
    color: palette(ThemeMode.Dark).text?.primary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h2: {
    fontWeight: 400,
    fontSize: '1.55rem', // Desktop 25px, Mobile 21.7px
    color: palette(ThemeMode.Dark).text?.caption,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.35rem', // Desktop 21.6px, Mobile 19px
    color: palette(ThemeMode.Dark).text?.secondary,
    marginBottom: '15px',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h4: {
    fontWeight: 500,
    fontSize: '1rem', // Desktop 16px, Mobile 14px
    color: palette(ThemeMode.Dark).text?.primary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h5: {
    fontWeight: 600,
    fontSize: '0.875rem', // Desktop 14px, Mobile 12.25px
    color: palette(ThemeMode.Dark).text?.secondary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  body1: {
    fontWeight: 400,
    fontSize: '0.875rem', // Desktop 14px, Mobile 12.25px
    color: palette(ThemeMode.Dark).text?.primary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  body2: {
    fontWeight: 400,
    fontSize: '0.875rem', // Desktop 14px, Mobile 12.25px
    color: '#717177',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  button: {
    fontWeight: 500,
    fontSize: '0.875rem', // Desktop 14px, Mobile 12.25px
    color: '#ACABB7',
    fontFamily: 'Kanit, sans-serif',
  },
  caption: {
    fontWeight: 300,
    fontSize: '0.625rem', // Desktop 10px, Mobile 8.75px
    color: palette(ThemeMode.Dark).text?.caption,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
}

export const typography_landing: TypographyOptions = {
  h1: {
    fontWeight: 500,
    fontSize: '3rem', // Desktop 48px, Mobile 42px
    color: palette(ThemeMode.Landing).text?.primary,
    textAlign: 'left',
    fontFamily: 'Orbitron, sans-serif',
  },
  h2: {
    fontWeight: 400,
    fontSize: '1.55rem', // Desktop 25px, Mobile 21.7px
    color: palette(ThemeMode.Landing).text?.caption,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.35rem', // Desktop 21.6px, Mobile 19px
    color: palette(ThemeMode.Landing).text?.secondary,
    marginBottom: '15px',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h4: {
    fontWeight: 500,
    fontSize: '1rem', // Desktop 16px, Mobile 14px
    color: palette(ThemeMode.Landing).text?.primary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h5: {
    fontWeight: 400,
    fontSize: '1rem', // Desktop 14px, Mobile 12.25px
    color: palette(ThemeMode.Landing).text?.secondary,
    textAlign: 'left',
    fontFamily: 'JetBrains Mono, sans-serif',
  },
  body1: {
    fontWeight: 300,
    fontSize: '0.875rem', // Desktop 14px, Mobile 12.25px
    color: palette(ThemeMode.Landing).text?.primary,
    textAlign: 'left',
    fontFamily: 'JetBrains Mono, sans-serif',
  },
  body2: {
    fontWeight: 200,
    fontSize: '0.715rem',
    color: '#AEAEAE',
    textAlign: 'left',
    fontFamily: 'JetBrains Mono, sans-serif',
  },
  button: {
    fontWeight: 400,
    fontSize: '1rem', // Desktop 14px, Mobile 12.25px
    color: '#fff',
    textTransform: 'none',
    fontFamily: 'Tektur, sans-serif',
  },
  caption: {
    fontWeight: 500,
    fontSize: '0.675rem', // Desktop 10px, Mobile 8.75px
    color: palette(ThemeMode.Landing).text?.caption,
    textAlign: 'left',
    fontFamily: 'Tektur, sans-serif',
  },
}

export const typography_dashboard: TypographyOptions = {
  h1: {
    fontWeight: 500,
    fontSize: '3rem', // Desktop 48px, Mobile 42px
    color: palette(ThemeMode.Landing).text?.primary,
    textAlign: 'left',
    fontFamily: 'Orbitron, sans-serif',
  },
  h2: {
    fontWeight: 400,
    fontSize: '1.55rem', // Desktop 25px, Mobile 21.7px
    color: palette(ThemeMode.Landing).text?.caption,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h3: {
    fontWeight: 300,
    fontSize: '1.25rem', // Desktop 21.6px, Mobile 19px
    color: palette(ThemeMode.Landing).text?.secondary,
    marginBottom: '15px',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h4: {
    fontWeight: 200,
    fontSize: '1rem', // Desktop 16px, Mobile 14px
    color: '#E5E5E5',
    textAlign: 'left',
    fontFamily: 'JetBrains Mono, sans-serif',
  },
  h5: {
    fontWeight: 500,
    fontSize: '1rem',
    color: '#D0D0D0',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  body1: {
    fontWeight: 300,
    fontSize: '0.875rem',
    color: '#D0D0D0',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  body2: {
    fontWeight: 200,
    fontSize: '0.875rem',
    color: '#8B8B8B',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  button: {
    fontWeight: 400,
    fontSize: '1rem', // Desktop 14px, Mobile 12.25px
    color: '#fff',
    textTransform: 'none',
    fontFamily: 'Tektur, sans-serif',
  },
  caption: {
    fontWeight: 500,
    fontSize: '0.675rem', // Desktop 10px, Mobile 8.75px
    color: palette(ThemeMode.Landing).text?.caption,
    textAlign: 'left',
    fontFamily: 'Tektur, sans-serif',
  },
}
