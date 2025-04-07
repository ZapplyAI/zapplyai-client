'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import PageCard from '@/app/dashboard/(components)/PageCard'
import { Box, Divider, FormControl, IconButton, Stack } from '@mui/material'
import { PageNav } from '@/app/dashboard/(navigation)'

export default function SettingsPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [x, xf] = useState(0)
  // const { subscriptions } = useDashboard()

  const y = useRef<HTMLDivElement | null>(null)

  useEffect(() => {}, [])

  return (
    <Box sx={{width: '100%'}}>
      <PageNav />
      <Box
        sx={{
          padding: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // borderBottom: '#5E5E5E 1px solid',
        }}
      >
        Content
      </Box>
    </Box>
  )
}
