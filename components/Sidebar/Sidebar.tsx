import React from 'react'
import Link from 'next/link'

import { ChatIcon, CogIcon, NewIcon, RocketIcon } from '@/assets/svgs'
import styles from './Sidebar.module.scss'

const Sidebar = (): React.ReactNode => {
  return (
    <nav aria-label={'side navigation'} className={styles.sidebar}>
      <ul>
        <li>
          <Link href={'/'}>
            <NewIcon className={styles.sidebarIcon} />
          </Link>
        </li>
        <li>
          <Link href={'/chat'}>
            <ChatIcon className={styles.sidebarIcon} />
          </Link>
        </li>
        <li>
          <Link href={'/x'}>
            <RocketIcon className={styles.sidebarIcon} />
          </Link>
        </li>
      </ul>
      <Link href={'/settings'}>
        <CogIcon className={styles.sidebarIcon} />
      </Link>
    </nav>
  )
}

export default Sidebar
