'use client'
import React from 'react'
import { Box, useTheme } from '@mui/material'
import { GradientText_H1 } from '@/app/(components)/GradientText'

export default function CreatePage() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        margin:
          '0px ' +
          theme.customSpacing?.sides.desktop,
        border: '1px solid #5E5E5E',
        borderTop: 'none',
        borderBottom: 'none',
        position: 'relative',
      }}
    >
      <GradientText_H1 text={'Hi, I am Elastic Copilot'} />
    </Box>
  )
}
