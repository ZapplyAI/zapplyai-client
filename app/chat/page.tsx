"use client"

import React, {useState} from 'react'

import styles from './page.module.scss'
import DialogNavigation from "./components/DialogNavigation/DialogNavigation"
import ChatWindow from "@/app/chat/components/ChatWindow/ChatWindow"

const availableDialogs = {
    frontend: [
        {
            id: 1,
            title: 'Top Navigation bar',
            pageTitle: 'Main Calendar',
            selectedOptions: ['Small Animated Popup', 'Event type, Users included, Time, Length of event, Send invitation'],
            dialog: [
                {
                    messageId: 'mes1',
                    sender: 'user',
                    message: 'help me to build a cool navigation'
                },
                {
                    messageId: 'mes2',
                    sender: 'ai',
                    message: 'okay bla bla'
                },
                {
                    messageId: 'mes3',
                    sender: 'user',
                    message: 'sure so pls bla bla'
                },
                {
                    messageId: 'mes4',
                    sender: 'ai',
                    message: 'will do as you wish sir'
                }
            ]
        },
        {
            id: 2,
            title: 'Main',
            pageTitle: 'Settings',
            selectedOptions: ['Small Animated Popup', 'Event type, Users included, Time, Length of event, Send invitation'],
            dialog: [
                {
                    messageId: 'mes1',
                    sender: 'user',
                    message: 'Lets create settings for my app'
                },
                {
                    messageId: 'mes2',
                    sender: 'ai',
                    message: 'okay bla bla'
                },
                {
                    messageId: 'mes3',
                    sender: 'user',
                    message: 'sure so pls bla bla'
                },
                {
                    messageId: 'mes4',
                    sender: 'ai',
                    message: 'will do as you wish sir'
                }
            ]
        },
        {
            id: 3,
            title: 'Create Event',
            pageTitle: 'Main Calendar',
            selectedOptions: ['Small Animated Popup', 'Event type, Users included, Time, Length of event, Send invitation'],
            dialog: [
                {
                    messageId: 'mes1',
                    sender: 'user',
                    message: 'bla bla bla'
                },
                {
                    messageId: 'mes2',
                    sender: 'ai',
                    message: 'okay bla bla'
                },
                {
                    messageId: 'mes3',
                    sender: 'user',
                    message: 'sure so pls bla bla'
                },
                {
                    messageId: 'mes4',
                    sender: 'ai',
                    message: 'will do as you wish sir'
                }
            ]
        }
    ],
    backend: [
        {
            id: 4,
            title: 'Top Navigation bar',
            pageTitle: 'Main Calendar',
            selectedOptions: ['op1', 'op2'],
            dialog: [
                {
                    messageId: 'mes1',
                    sender: 'user',
                    message: 'bla bla bla'
                },
                {
                    messageId: 'mes2',
                    sender: 'ai',
                    message: 'okay bla bla'
                },
                {
                    messageId: 'mes3',
                    sender: 'user',
                    message: 'sure so pls bla bla'
                },
                {
                    messageId: 'mes4',
                    sender: 'ai',
                    message: 'will do as you wish sir'
                }
            ]
        },
        {
            id: 5,
            title: 'Calendar style',
            pageTitle: 'Main Calendar',
            selectedOptions: ['Small Animated Popup', 'Event type, Users included, Time, Length of event, Send invitation'],
            dialog: [
                {
                    messageId: 'mes1',
                    sender: 'user',
                    message: 'bla bla bla'
                },
                {
                    messageId: 'mes2',
                    sender: 'ai',
                    message: 'okay bla bla'
                },
                {
                    messageId: 'mes3',
                    sender: 'user',
                    message: 'sure so pls bla bla'
                },
                {
                    messageId: 'mes4',
                    sender: 'ai',
                    message: 'will do as you wish sir'
                }
            ]
        },
    ]
}

const Chat = (): React.ReactNode => {
    const [openedDialogId, selectOpenedDialogId] = useState(-1)

    const openDialog = (dialogId : number) => {
        selectOpenedDialogId(dialogId)
    }

    const findDialogById = (id : number) => {
        for (const category in availableDialogs) {
            const dialogs = availableDialogs[category]
            const dialog = dialogs.find(dialog => dialog.id === id)
            if (dialog) {
                return dialog
            }
        }
        return null
    }


    return (
        <main className={styles.main}>
            <DialogNavigation frontend={availableDialogs.frontend}
                              backend={availableDialogs.backend}
                              openDialog={openDialog} />
            <ChatWindow selectedDialog={findDialogById(openedDialogId)}/>
        </main>
    )
}


export default Chat
