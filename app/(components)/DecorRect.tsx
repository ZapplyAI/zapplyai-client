import React from 'react'
import { Box, SxProps } from '@mui/material'
import { Theme } from '@mui/system'

interface DecorRectProps {
  sx?: SxProps<Theme>
}

const DecorRect = ({ sx }: DecorRectProps) => {
  const style = {
    decorativeRect: {
      position: 'absolute',
      background: '#775EFF',
      width: '10px',
      height: '10px',
    },
  }

  return <Box sx={{ ...style.decorativeRect, ...sx } as any} />
}

export default DecorRect
