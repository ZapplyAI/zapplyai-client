'use client'
import React from 'react'
import { App } from '@/lib/type'
import Typography from '@mui/material/Typography'
import { HorizontalCenterBox } from '@/components/layouts/CenterBox'

interface TopNavProps {
  currentApp: App
}

export default function TopNav({ currentApp }: TopNavProps) {

  const style = {
    topNavContainer: {
      position: 'absolute',
      top: '22px',
    }
  }

  return (
    <HorizontalCenterBox sx={style.topNavContainer}>
      <Typography variant="caption">{currentApp.name}</Typography>
      <span style={{width: '22px'}}/>
      <Typography variant="caption">{currentApp.state}</Typography>
    </HorizontalCenterBox>
  )
}
