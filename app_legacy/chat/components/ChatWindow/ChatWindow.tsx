'use client'

import React, { CSSProperties, useEffect } from 'react'
import {
  APP_STATE,
  AppPage,
  type Dialog,
  Message,
  WebAppState,
} from '../../../../lib/type_legacy'
import { get } from 'lodash'
import ChatHeader from './component/ChatHeader'
import MessagesFeed from '@/app_legacy/chat/components/ChatWindow/component/MessagesFeed'
import InputField from '@/app_legacy/chat/components/ChatWindow/component/InputField'
import { nanoid } from 'nanoid'

interface ChatWindowProps {
  isMobile?: boolean
  allPages: AppPage[]
  selectedDialog: Dialog
  selectDialog: any
  openGetTokensForm: any
  sendMessage: (message: Message) => {}
  appState: WebAppState
  changeAppState: (state: WebAppState) => void
  changeMessageAttachmentState: (id: string, updatedState: string) => void
}

const ChatWindow = ({
  isMobile = false,
  allPages,
  selectedDialog,
  selectDialog,
                      openGetTokensForm,
  sendMessage,
  appState,
  changeAppState,
  changeMessageAttachmentState,
}: ChatWindowProps): React.ReactNode => {
  const style: { [key: string]: CSSProperties } = {
    mainWindow: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: '1',
      minHeight: '0',
      width: '100%',
    },
    messageFeedContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexGrow: '1',
      minHeight: '0',
      width: '100%',
      margin: '0px auto',
    },
  }

  useEffect(() => {
    if (
      selectedDialog.messages.length === 0 &&
      appState.label === APP_STATE.none
    ) {
      // It's the first time user interacts with this app.
      sendMessage({
        messageId: nanoid(),
        message:
          'Hi, I am Elastic AI !\n' +
          'To start building write a short summary of your idea  in the text field.\n' +
          'If it’s your first time using Elastic AI, I recommend you to start with pressing “Guided start” below.',
        sender: 'AI',
        attachments: [
          {
            id: nanoid(),
            state: 'none',
            type: 'button',
            element: 'guided_start',
          },
        ],
      })
    }
  }, [appState])

  return (
    <div style={style.mainWindow}>
      {!isMobile && (
        <ChatHeader
          allPages={allPages}
          openDialogId={get(selectedDialog, 'pageId', '0')}
          selectDialog={selectDialog}
          openGetTokensForm={openGetTokensForm}
        />
      )}
      <div style={style.messageFeedContainer}>
        <MessagesFeed
          isMobile={isMobile}
          activeDialog={selectedDialog as Dialog}
          sendMessage={sendMessage}
          changeAppState={changeAppState}
          changeMessageAttachmentState={changeMessageAttachmentState}
        />
        <div
          style={{ background: '1B1A21', width: isMobile ? '90%' : '70%', paddingBottom: '12px' }}
        >
          <InputField sendAction={sendMessage} />
        </div>
      </div>

      {/* INPUT HERE */}
    </div>
  )
}

export default ChatWindow
