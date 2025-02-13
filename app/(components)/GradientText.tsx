'use client'
import React from 'react'
import { Typography, styled } from '@mui/material'

const GradientTypography = styled(Typography)({
  background: 'linear-gradient(90deg, #4F46E5 0%, #13B5C8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
})

interface GradientTextProps {
  text: string
}

export const GradientText_H1: React.FC<GradientTextProps> = ({ text }) => {
  return (
    <GradientTypography variant="h1">
      {text}
    </GradientTypography>
  )
}
