import React from 'react'

import { Tabs } from '@/components/Tabs'
import { Input } from '@/app/chat/components'
import { PencilIcon } from '@/assets/svgs'
import styles from './page.module.scss'

const Chat = (): React.ReactNode => {
  return (
    <main className={styles.main}>
      <aside>
        <div>
          <Tabs
            tabs={[
              {
                title: 'frontend',
                content: null,
              },
              {
                title: 'backend',
                content: null,
              },
            ]}
          />
        </div>
      </aside>
      <div className={styles.chatInterface}>
        <nav aria-label={'chat navigation'}>
          <div>
            <PencilIcon stroke={styles.iconColor} />
            <span>Create new event</span>
          </div>
        </nav>
        <div className={styles.messagesContainer}>
          query
          <Input />
        </div>
      </div>
    </main>
  )
}

export default Chat
