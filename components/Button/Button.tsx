import React, { CSSProperties, ReactNode } from 'react'
import { Button as ButtonMUI } from '@mui/material'

interface ButtonProps {
  label: string
  fullWidth?: boolean
  variant?: 'contained' | 'text' | 'outlined'
  sx?: object
  action?: () => void
  disabled?: boolean
  icon?: ReactNode
}

const Button = ({
  label,
  fullWidth = false,
  variant = 'contained',
  sx = {},
  action,
  disabled = false,
  icon,
}: ButtonProps): React.ReactNode => {
  const handleClick = () => {
    if (action) {
      action()
    }
  }

  return (
    <ButtonMUI
      fullWidth={fullWidth}
      variant={variant}
      style={
        variant === 'text'
          ? { ...style.buttonNoBG, ...sx }
          : { ...style.buttonBG, ...sx }
      }
      onClick={handleClick}
      disabled={disabled}
    >
      <span style={style.contentWrapper}>
        {icon && <span style={style.icon}>{icon}</span>}
        <span style={style.buttonLabel}>{label}</span>
      </span>
    </ButtonMUI>
  )
}

const style: { [key: string]: CSSProperties } = {
  buttonNoBG: {
    background: 'none',
    boxShadow: 'none',
    fontSize: '12px',
    color: '#CFCED9',
    padding: '6px 30px',
  },
  buttonBG: {
    background: '#282636',
    boxShadow: 'none',
    fontSize: '12px',
    color: '#CFCED9',
    padding: '6px 30px',
  },
  buttonLabel: {
    fontFamily: 'Kanit',
    // color: '#fff',
    textTransform: 'none',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
  },
}

export default Button
