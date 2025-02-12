'use client'
import React from 'react'
import { Box, useTheme } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const SideNav = () => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRight: '1px solid #5E5E5E',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          borderBottom: '1px solid #5E5E5E',
          cursor: 'pointer',
        }}
        onClick={() => router.push('/')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
          <Image
            src="/assets/svgs/LISA MARK EXP.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <span style={{ 
            color: '#fff',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            fontFamily: 'Kanit, sans-serif'
          }}>
            Elastic Copilot
          </span>
        </div>
      </Box>
    </Box>
  )
}
