'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import PageCard from '@/app/dashboard/(components)/PageCard'
import { Box, Divider, FormControl } from '@mui/material'
import { Button, Input } from '@/components'
import GoogleIcon from '@mui/icons-material/Google'
import Typography from '@mui/material/Typography'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import { PageNav } from '@/app/dashboard/(navigation)'

export default function MainPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [x, xf] = useState(0)

  const y = useRef<HTMLDivElement | null>(null)

  useEffect(() => {}, [])

  return (
    <Box sx={{ width: '100%' }}>
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
