'use client'
import React from 'react'
import { clsx } from 'clsx'

import { Spinner } from '@/components'
import styles from './Button.module.scss'

interface ButtonProps {
  variant?: 'solid' | 'outlined' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  isDisabled?: boolean
  children: React.ReactNode
  ariaLabel?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
  let {
    ariaLabel = props.children as string,
    variant = 'solid',
    size = 'md',
    isLoading = false,
    isDisabled = false,
    children,
    onClick,
    className,
  } = props

  if (isLoading && !isDisabled) {
    isDisabled = true
  }

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      className={clsx(styles[size], styles[variant], className)}
      onClick={onClick}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
