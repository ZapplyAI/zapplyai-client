import React from 'react'

import { Avatar, Logo } from '@/components'
import styles from './Navbar.module.scss'

const Navbar = (): React.ReactNode => {
  return (
    <nav className={styles.nav} aria-label={'main navigation'}>
      <Logo />
      <Avatar />
    </nav>
  )
}

export default Navbar
