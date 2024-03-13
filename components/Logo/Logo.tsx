import React from 'react'

import { ZappyLogo } from '@/assets/svgs'
import styles from './Logo.module.scss'

const Logo = (): React.ReactNode => {
  return (
    <div className={styles.logo}>
      <ZappyLogo />
      <span>
        Zappy AI
      </span>
    </div>
  )
}

export default Logo
