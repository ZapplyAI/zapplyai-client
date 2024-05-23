import React from 'react'
import type { Metadata } from 'next'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material/styles'

import '@/styles/main.scss'
import darkTheme from '@/styles/theme'
import StoreProvider from '@/app/StoreProvider'
import { Navbar, Sidebar } from '@/components'
import styles from '@/app/chat/page.module.scss'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div>{children}</div>
    </div>
  )
}
