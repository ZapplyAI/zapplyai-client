import React, { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

interface PageCardProps {
  title: string
  rightComponents?: ReactNode
  children?: ReactNode
  sx?: any
}

const PageCard = ({
  title,
  rightComponents,
  children,
  sx = {},
}: PageCardProps) => {
  return (
    <Box
      sx={{
        borderRadius: 0,
        border: '1px solid #5E5E5E',
        backgroundColor: '#0C0C12',
        minWidth: '350px',
        ...sx
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px #5E5E5E solid',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '16px',
            color: '#AEAEAE',
          }}
        >
          {title}
        </Typography>
        <Box>{rightComponents}</Box>
      </Box>
      <Box sx={{ padding: '24px' }}>{children}</Box>
    </Box>
  )
}

export default PageCard
