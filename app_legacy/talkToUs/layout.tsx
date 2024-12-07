import React from 'react'
import type { Metadata } from 'next'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'

import '@/styles/main.scss'
import darkTheme from '@/styles/theme/theme'
import StoreProvider from '@/app_legacy/StoreProvider'

export const metadata: Metadata = {
  title: 'ElasticApp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            <body style={{ background: '#000' }}>{children}</body>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </StoreProvider>
    </html>
  )
}
