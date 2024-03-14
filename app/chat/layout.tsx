import React from 'react'

import { Navbar, Sidebar } from '@/components'
import styles from './page.module.scss'

export default function ChatLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className={styles.contentContainer}>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}
