'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { Box, Divider, FormControl, IconButton, Stack } from '@mui/material'
import { PageNav } from '@/app/dashboard/(navigation)'

export default function SubscriptionsPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  const y = useRef<HTMLDivElement | null>(null)

  useEffect(() => {}, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        flexGrow: '1',
      }}
    >
      <PageNav />
      <Box
        sx={{
          flexGrow: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >

      </Box>
    </Box>
  )
}
