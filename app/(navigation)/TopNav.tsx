'use client'
import React from 'react'
import { Box, useTheme } from '@mui/material'
import { HorizontalLeftAlignBox } from '@/components/layouts/CenterBox'
import Image from 'next/image'
import AuthButton from '@/app/(navigation)/AuthButton'

interface TopNavProps {
  showAlert: any
  isMobile: boolean
}

export const TopNav = ({ showAlert, isMobile }: TopNavProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        margin:
          '0px ' +
          (isMobile
            ? theme.customSpacing?.sides.mobile
            : theme.customSpacing?.sides.desktop),
        border: '1px solid #5E5E5E',
        borderTop: 'none',
        borderBottom: 'none',
        position: 'relative',
      }}
    >
      <HorizontalLeftAlignBox
        sx={{
          padding: '20px',
          borderBottom: '1px solid #5E5E5E',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Image
          src="/assets/svgs/LISA MARK EXP.svg"
          alt="Logo"
          width={32}
          height={32}
        />
        <AuthButton />
      </HorizontalLeftAlignBox>
    </Box>
  )
}
