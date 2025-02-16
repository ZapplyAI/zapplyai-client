import React from 'react'
import '@/styles/main.scss'
import { LandingProvider } from '@/contexts/LandingProvider'
import { dashboardTheme } from '@/styles/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import StoreProvider from '@/app_legacy/StoreProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ background: '#0A090E' }}>
      <StoreProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={dashboardTheme}>
            <LandingProvider>
              <UserProvider>
                <body
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    minHeight: '100vh',
                    width: '100vw',
                  }}
                >
                  {children}
                </body>
              </UserProvider>
            </LandingProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </StoreProvider>
    </html>
  )
}
