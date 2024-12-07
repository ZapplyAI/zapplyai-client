import { palette } from '@/styles/theme/palette'

enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
  Landing = 'landing',
}

const typography_dark = {
  h1: {
    fontWeight: 400,
    fontSize: '3rem', // Desktop 48px, Mobile 42px
    color: palette(ThemeMode.Dark).text.primary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h2: {
    fontWeight: 400,
    fontSize: '1.55rem', // Desktop 25px, Mobile 21.7px
    color: palette(ThemeMode.Dark).text.caption,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.35rem', // Desktop 21.6px, Mobile 19px
    color: palette(ThemeMode.Dark).text.secondary,
    marginBottom: '15px',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h4: {
    fontWeight: 500,
    fontSize: '1rem', // Desktop 16px, Mobile 14px
    color: palette(ThemeMode.Dark).text.primary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h5: {
    fontWeight: 600,
    fontSize: '0.875rem', // Desktop 14px, Mobile 12.25px
    color: palette(ThemeMode.Dark).text.secondary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  body1: {
    fontWeight: 400,
    fontSize: '0.875rem', // Desktop 14px, Mobile 12.25px
    color: palette(ThemeMode.Dark).text.primary,
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
    color: palette(ThemeMode.Dark).text.caption,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
}

const typography_landing = {
  h1: {
    fontWeight: 500,
    fontSize: '3rem', // Desktop 48px, Mobile 42px
    color: palette(ThemeMode.Landing).text.primary,
    textAlign: 'left',
    fontFamily: 'Orbitron, sans-serif',
  },
  h2: {
    fontWeight: 400,
    fontSize: '1.55rem', // Desktop 25px, Mobile 21.7px
    color: palette(ThemeMode.Landing).text.caption,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h3: {
    fontWeight: 500,
    fontSize: '1.35rem', // Desktop 21.6px, Mobile 19px
    color: palette(ThemeMode.Landing).text.secondary,
    marginBottom: '15px',
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h4: {
    fontWeight: 500,
    fontSize: '1rem', // Desktop 16px, Mobile 14px
    color: palette(ThemeMode.Landing).text.primary,
    textAlign: 'left',
    fontFamily: 'Kanit, sans-serif',
  },
  h5: {
    fontWeight: 400,
    fontSize: '1rem', // Desktop 14px, Mobile 12.25px
    color: palette(ThemeMode.Landing).text.secondary,
    textAlign: 'left',
    fontFamily: 'JetBrains Mono, sans-serif',
  },
  body1: {
    fontWeight: 300,
    fontSize: '0.875rem', // Desktop 14px, Mobile 12.25px
    color: palette(ThemeMode.Landing).text.primary,
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
    color: palette(ThemeMode.Landing).text.caption,
    textAlign: 'left',
    fontFamily: 'Tektur, sans-serif',
  },
}

const themeTypography = (theme: ThemeMode) => ({
  h1: theme === ThemeMode.Dark ? typography_dark.h1 : typography_landing.h1,
  h2: theme === ThemeMode.Dark ? typography_dark.h2 : typography_landing.h2,
  h3: theme === ThemeMode.Dark ? typography_dark.h3 : typography_landing.h3,
  h4: theme === ThemeMode.Dark ? typography_dark.h4 : typography_landing.h4,
  h5: theme === ThemeMode.Dark ? typography_dark.h5 : typography_landing.h5,
  body1:
    theme === ThemeMode.Dark ? typography_dark.body1 : typography_landing.body1,
  body2:
    theme === ThemeMode.Dark ? typography_dark.body2 : typography_landing.body2,
  button:
    theme === ThemeMode.Dark
      ? typography_dark.button
      : typography_landing.button,
  caption:
    theme === ThemeMode.Dark
      ? typography_dark.caption
      : typography_landing.caption,
})

export default themeTypography
