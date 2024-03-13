import React from 'react'

import { Navbar, Sidebar } from '@/components'
import styles from './page.module.scss'

export default function Home(): React.ReactNode {
  return (
    <main className={styles.main}>
      <Navbar />
      <div>
        <Sidebar />
        <main>

        </main>
      </div>
    </main>
  )
}
