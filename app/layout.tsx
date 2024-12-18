import React from 'react'
import '@/styles/main.scss'
import { LandingProvider } from '@/contexts/LandingProvider'
import { landingTheme } from '@/styles/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import StoreProvider from '@/app_legacy/StoreProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ background: '#0A090E' }}>
      <StoreProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={landingTheme}>
            <LandingProvider>
              <body style={{position:'relative'}}>{children}</body>
            </LandingProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </StoreProvider>
    </html>
  )
}
