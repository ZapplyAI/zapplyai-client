'use client'
import React from 'react'

import { Navbar, Sidebar } from '@/components'
import styles from './page.module.scss'
import DialogNavigation from './components/DialogNavigation/DialogNavigation'
import ChatWindow from '@/app/chat/components/ChatWindow/ChatWindow'
import { find } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Dialog } from '@/lib/type'

// const availableDialogsInit = {
//   frontend: [
//     {
//       id: 1,
//       title: 'Top Navigation bar',
//       pageTitle: 'Main Calendar',
//       selectedOptions: [
//         'Small Animated Popup',
//         'Event type, Users included, Time, Length of event, Send invitation',
//       ],
//       dialog: [],
//     },
//     {
//       id: 2,
//       title: 'Main',
//       pageTitle: 'Settings',
//       selectedOptions: [
//         'Small Animated Popup',
//         'Event type, Users included, Time, Length of event, Send invitation',
//       ],
//       dialog: [],
//     },
//     {
//       id: 3,
//       title: 'Create Event',
//       pageTitle: 'Main Calendar',
//       selectedOptions: [
//         'Small Animated Popup',
//         'Event type, Users included, Time, Length of event, Send invitation',
//       ],
//       dialog: [],
//     },
//   ],
//   backend: [
//     {
//       id: 4,
//       title: 'Top Navigation bar',
//       pageTitle: 'Main Calendar',
//       selectedOptions: ['op1', 'op2'],
//       dialog: [],
//     },
//     {
//       id: 5,
//       title: 'Calendar style',
//       pageTitle: 'Main Calendar',
//       selectedOptions: [
//         'Small Animated Popup',
//         'Event type, Users included, Time, Length of event, Send invitation',
//       ],
//       dialog: [],
//     },
//   ],
// }

const useReduxData = () => {
  const apps = useSelector((state: RootState) => state.webApp.apps)
  const selectedAppId = useSelector(
    (state: RootState) => state.webApp.selectedId
  )
  const dialogs = useSelector((state: RootState) => state.chat.dialogs)
  const selectedDialogId = useSelector(
    (state: RootState) => state.chat.selectedId
  )

  const selectedDialog = find(dialogs, dialog => dialog.id === selectedDialogId)
  const selectedApp = find(apps, app => app.id === selectedAppId)

  return {
    apps,
    selectedAppId,
    dialogs,
    selectedDialogId,
    selectedDialog,
    selectedApp,
  }
}

const Chat = (): React.ReactNode => {
  const {
    apps,
    selectedAppId,
    selectedApp,
    dialogs,
    selectedDialogId,
    selectedDialog,
  } = useReduxData()

  const dispatch = useDispatch()

  const findDialogById = (requestedId: string): Dialog => {
    const dialogFound = find(dialogs, dialog => dialog.id === requestedId)
    return dialogFound === undefined
      ? {
          id: '-1',
          appId: '-1',
          title: 'New Chat',
          pageTitle: '...',
          selectedOptions: [],
          messages: [],
        }
      : dialogFound
  }

  const onMessageSent = (message: string) => {
    // if (openedDialogId !== -1) {
    //   const category = openedDialogId <= 3 ? 'frontend' : 'backend'
    //   const updatedDialogs = {
    //     ...availableDialogs,
    //     [category]: availableDialogs[category].map(dialog =>
    //       dialog.id === openedDialogId
    //         ? {
    //           ...dialog,
    //           dialog: [
    //             ...dialog.dialog,
    //             {
    //               messageId: `mes${dialog.dialog.length + 1}`,
    //               sender: 'user',
    //               message: message,
    //             },
    //           ],
    //         }
    //         : dialog
    //     ),
    //   }
    //   changeDialogs(updatedDialogs)
    // }
  }

  return (
    <main className={styles.main}>
      <DialogNavigation />
      <ChatWindow
        apps={apps}
        initialAppSetup={!selectedApp || selectedApp.url === ''}
        selectedDialog={
          selectedDialogId === null ? null : findDialogById(selectedDialogId)
        }
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
