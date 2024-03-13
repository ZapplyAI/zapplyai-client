'use client'
import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import styles from './Avatar.module.scss'

const Avatar = (): React.ReactNode => {
  return <AvatarPrimitive.Root className={styles.avatar}>
    <AvatarPrimitive.Image
      alt="Avatar"
      src="https://avatars.githubusercontent.com/u/58847378?v=4"
    />
    <AvatarPrimitive.Fallback className={styles.avatarFallback} delayMs={700}>
      AI
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
}

export default Avatar
