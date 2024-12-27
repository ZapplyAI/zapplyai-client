import React, { ReactNode } from 'react'
import { Button as MUIButton, ButtonProps, SxProps } from '@mui/material'
import { Theme } from '@mui/system'

interface ClippedButtonProps {
  onClick?: any
  filled?: boolean
  sx?: SxProps<Theme>
  children?: ReactNode // Allow passing children
}

const ClippedButton = ({
  onClick = () => {},
  filled = false,
  sx,
  children,
}: ClippedButtonProps) => {
  const style = {
    baseButton: {
      position: 'relative',
      padding: '10px 15px',
      borderRadius: 0,
      color: '#E5E5E5',
      background: filled
        ? `
          linear-gradient(to top left, #775EFF 50%, #0000 50.1%) bottom right,
          linear-gradient(to bottom right, #775EFF 50%, #0000 50.1%) top left
        `
        : `
          linear-gradient(to top left, #E5E5E5 50%, #0000 50.1%) bottom right,
          linear-gradient(to bottom right, #E5E5E5 50%, #0000 50.1%) top left
        `,
      backgroundSize: filled
        ? `100% 100%`
        : `calc(0.7em + 1.3*1px) calc(0.7em + 1.3*1px)`,
      backgroundRepeat: 'no-repeat',
      boxShadow: filled
        ? `0 0 0 200px inset transparent,
          0 0 0 1px inset #E5E5E5`
        : `
          0 0 0 200px inset transparent,
          0 0 0 1px inset #E5E5E5
        `,
      clipPath: `
          polygon(
            0% 0.7em,
            calc(0% + 0.7em) 0,
            100% 0,
            100% calc(100% - 0.7em),
            calc(100% - 0.7em) 100%,
            0% 100%
          )
        `,
      transition: 'color 0.3s, background-size 0.3s',
      border: '1px',

      '&:hover, &:active': {
        color: '#775EFF',
        background: `
          linear-gradient(to top left, #775EFF 50%, #0000 50.1%) bottom right,
          linear-gradient(to bottom right, #775EFF 50%, #0000 50.1%) top left
        `,
        backgroundSize: `calc(0.7em + 1.3*1px) calc(0.7em + 1.3*1px)`,
        backgroundRepeat: 'no-repeat',
        boxShadow: `
          0 0 0 200px inset transparent,
          0 0 0 1px inset #775EFF
        `,
      },
    },
  }

  return (
    <MUIButton sx={{ ...style.baseButton, ...sx } as any} onClick={onClick}>
      {children}
    </MUIButton>
  )
}

export default ClippedButton
