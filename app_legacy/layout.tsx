'use client'
import React, { useEffect } from 'react'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'

import '@/styles/main.scss'
import { darkTheme } from '@/styles/theme/theme'
import StoreProvider from '@/app_legacy/StoreProvider'
// import { browser } from '@/testing/mockServer/browser'

// if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
//   console.log('process.env.TEST_MODE')
//   const { worker } = require('@/testing/mockServer/browser')
//   worker.start()
// } else {
//   console.log('process.env.TEST_MODE = FALSE')
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // useEffect(() => {
  //
  // }, [])

  return (
    <html lang="en">
      <StoreProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            <body>{children}</body>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </StoreProvider>
    </html>
  )
}
