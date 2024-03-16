import React from 'react'

import { Button, Tabs } from '@/components'
import { Accordion, Input } from '@/app/chat/components'
import { PencilIcon } from '@/assets/svgs'
import styles from './page.module.scss'

const Chat = (): React.ReactNode => {
  return (
    <main className={styles.main}>
      <aside>
        <div>
          <Tabs
            tabs={{
              frontend: <Accordion type={'frontend'} />,
              backend: <Accordion type={'backend'} />,
            }}
          />
          <Button className={styles.chatButton}>Start new chat</Button>
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
