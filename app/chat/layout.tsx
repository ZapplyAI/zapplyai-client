'use client'
import React, { useState } from 'react'

import { Navbar, Sidebar } from '@/components'
import styles from './page.module.scss'
import DialogNavigation from './components/DialogNavigation/DialogNavigation'
import ChatWindow from '@/app/chat/components/ChatWindow/ChatWindow'
import { find } from 'lodash'
import { DialogProps } from '@/app/types/chat'

const availableDialogsInit = {
  frontend: [
    {
      id: 1,
      title: 'Top Navigation bar',
      pageTitle: 'Main Calendar',
      selectedOptions: [
        'Small Animated Popup',
        'Event type, Users included, Time, Length of event, Send invitation',
      ],
      dialog: [],
    },
    {
      id: 2,
      title: 'Main',
      pageTitle: 'Settings',
      selectedOptions: [
        'Small Animated Popup',
        'Event type, Users included, Time, Length of event, Send invitation',
      ],
      dialog: [],
    },
    {
      id: 3,
      title: 'Create Event',
      pageTitle: 'Main Calendar',
      selectedOptions: [
        'Small Animated Popup',
        'Event type, Users included, Time, Length of event, Send invitation',
      ],
      dialog: [],
    },
  ],
  backend: [
    {
      id: 4,
      title: 'Top Navigation bar',
      pageTitle: 'Main Calendar',
      selectedOptions: ['op1', 'op2'],
      dialog: [],
    },
    {
      id: 5,
      title: 'Calendar style',
      pageTitle: 'Main Calendar',
      selectedOptions: [
        'Small Animated Popup',
        'Event type, Users included, Time, Length of event, Send invitation',
      ],
      dialog: [],
    },
  ],
}

const Chat = (): React.ReactNode => {
  const [openedDialogId, selectOpenedDialogId] = useState(-1)
  const [availableDialogs, changeDialogs] =
    useState<typeof availableDialogsInit>(availableDialogsInit)

  const openDialog = (dialogId: number) => {
    selectOpenedDialogId(dialogId)
  }

  const findDialogById = (id: number): DialogProps => {
    for (const category in availableDialogs) {
      const dialogsInCategory = (availableDialogs as any)[
        category
      ] as DialogProps[]
      const foundDialog = dialogsInCategory.find(dialog => dialog.id === id)
      if (foundDialog) {
        return foundDialog
      }
    }

    return {
      id: -1,
      title: 'New Chat',
      pageTitle: '...',
      selectedOptions: [],
      dialog: [],
    }
  }

  const onMessageSent = (message: string) => {
    if (openedDialogId !== -1) {
      const category = openedDialogId <= 3 ? 'frontend' : 'backend'
      const updatedDialogs = {
        ...availableDialogs,
        [category]: availableDialogs[category].map(dialog =>
          dialog.id === openedDialogId
            ? {
                ...dialog,
                dialog: [
                  ...dialog.dialog,
                  {
                    messageId: `mes${dialog.dialog.length + 1}`,
                    sender: 'user',
                    message: message,
                  },
                ],
              }
            : dialog
        ),
      }
      changeDialogs(updatedDialogs)
    }
  }

  return (
    <main className={styles.main}>
      <DialogNavigation
        frontend={availableDialogs.frontend}
        backend={availableDialogs.backend}
        openDialog={openDialog}
      />
      <ChatWindow
        selectedDialog={findDialogById(openedDialogId)}
        sendMessage={onMessageSent}
      />
    </main>
  )
}

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className={styles.contentContainer}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}
