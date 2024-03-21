'use client'
import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import styles from './Avatar.module.scss'

const Avatar = (): React.ReactNode => {
  return (
      <div style={style.avatar}>

      </div>
  )
}

const style = {
  avatar: {
    height: '22px',
    width: '22px',
    borderRadius: '5px',
    background: 'grey'
  }
}

export default Avatar
