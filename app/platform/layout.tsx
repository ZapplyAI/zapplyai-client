import React, { useState } from 'react'
import SideNav from '@/app/platform/(navigation)/SideNav'
import { HorizontalCenterBox } from '@/components/layouts/CenterBox'
import { darkTheme } from '@/styles/theme/theme'
import { ThemeProvider } from '@mui/material/styles'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const style = {
    horizontalBox: {
      justifyContent: 'left',
      height: '100svh',
      width: '100svw',
      bgcolor: 'background.default',
    },
    centralBox: {
      flex: 1,
      height: '100%'
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
    <HorizontalCenterBox sx={style.horizontalBox}>
      <SideNav />
      <HorizontalCenterBox sx={style.centralBox}>
        {children}
      </HorizontalCenterBox>
    </HorizontalCenterBox>
    </ThemeProvider>
  )
}
