import React from 'react'

import { Navbar, Sidebar } from '@/components'
import styles from './page.module.scss'

export default function ChatLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      <div className={styles.contentContainer}>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}
