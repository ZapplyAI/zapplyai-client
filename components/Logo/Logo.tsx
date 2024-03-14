import React from 'react'

import { ZapplyLogo } from '@/assets/svgs'
import styles from './Logo.module.scss'

const Logo = (): React.ReactNode => {
  return (
    <div className={styles.logo}>
      <ZapplyLogo />
      <span>
        Zapply AI
      </span>
    </div>
  )
}

export default Logo
