import React from 'react'
import { Button as ButtonMUI } from '@mui/material'

interface ButtonProps {
  label: string
  fullWidth: boolean
  variant: string
  sx: object
  action: any
}

const Button = ({
  label,
  fullWidth,
  variant = 'contained',
  sx = {},
  action
}: ButtonProps): React.ReactNode => {
  return (
    <ButtonMUI
      fullWidth={fullWidth}
      variant={variant}
      style={style.button(variant)}
      sx={sx}
      onClick={action}
    >
      <span style={style.buttonLabel}>{label}</span>
    </ButtonMUI>
  )
}

const style = {
  button: variant => ({
    background: variant === 'text' ? 'none' : '#282636',
    boxShadow: 'none',
  }),
  buttonLabel: {
    fontSize: '12px',
    textTransform: 'none',
    color: '#CFCED9',
  },
}

export default Button
