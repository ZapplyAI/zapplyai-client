import React, {CSSProperties} from 'react'
import { Button as ButtonMUI } from '@mui/material'

interface ButtonProps {
  label: string
  variant?: 'left' | 'right'
}

const Button = ({ label, variant='left' }: ButtonProps): React.ReactNode => {

  return (
    <ButtonMUI
      fullWidth={fullWidth}
      variant={variant}
      style={variant === 'text' ? style.buttonNoBG : style.buttonBG}
      sx={sx}
      onClick={handleClick}
    >
      <span style={style.buttonLabel}>{label}</span>
    </ButtonMUI>
  )
}

const style: { [key: string]: CSSProperties } = {
  buttonNoBG: {
    background: 'none',
    boxShadow: 'none',
  },
  buttonBG: {
    background: '#282636',
    boxShadow: 'none',
  },
  buttonLabel: {
    fontSize: '12px',
    textTransform: 'none',
    color: '#CFCED9',
  },
}

export default Button
