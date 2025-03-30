import React from 'react'
import '@/styles/main.scss'
import { LandingProvider } from '@/contexts/LandingProvider'
import { dashboardTheme } from '@/styles/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import StoreProvider from '@/app_legacy/StoreProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import Auth0ClientProvider from './components/Auth0ClientProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ background: '#0A090E' }}>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={dashboardTheme}>
              <LandingProvider>
                <Auth0ClientProvider>
                  {children}
                </Auth0ClientProvider>
              </LandingProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
