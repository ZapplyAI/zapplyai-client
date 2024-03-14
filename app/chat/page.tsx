import React from 'react'

import { PencilIcon } from '@/assets/svgs'
import styles from './page.module.scss'

const Chat = (): React.ReactNode => {
  return (
    <main className={styles.main}>
      <aside></aside>
      <div className={styles.chatInterface}>
        <nav aria-label={'chat navigation'}>
          <div>
            <PencilIcon stroke={styles.iconColor} />
            <span>Create new event</span>
          </div>
        </nav>
      </div>
    </main>
  )
}

export default Chat
