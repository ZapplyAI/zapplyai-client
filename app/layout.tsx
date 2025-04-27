import React from 'react'
import '@/styles/main.scss'
import '@/styles/global.css'
import { dashboardTheme } from '@/styles/theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { Toaster } from 'sonner'

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
        <AppRouterCacheProvider>
          <ThemeProvider theme={dashboardTheme}>
            <Toaster position="top-right" richColors />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
