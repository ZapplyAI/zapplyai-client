'use client'

import React, { CSSProperties } from 'react'
import { type AnyFunction, type Dialog } from '../../../../../lib/type_legacy'
import { List, ListItem } from '@mui/material'
import map from 'lodash/map'
import { get } from 'lodash'
import ChatMessage from './ChatMessage'

interface MessagesFeedProps {
  isMobile: boolean
  activeDialog: Dialog
  sendMessage: AnyFunction
  changeAppState: AnyFunction
  changeMessageAttachmentState: AnyFunction
}

const MessagesFeed = ({
  isMobile,
  activeDialog,
  sendMessage,
  changeAppState,
  changeMessageAttachmentState,
}: MessagesFeedProps): React.ReactNode => {
  const style: { [key: string]: CSSProperties } = {
    messagesContainer: {
      padding: isMobile ? '0px 5% 22px 5%' : '0px 15% 22px 15%',
      paddingTop: '48px',
      width: '100%',
      minHeight: '0',
      marginTop: 'auto',
      overflow: 'scroll',
      overscrollBehavior: 'contain',
    },
    messageAlignment: {
      display: 'flex',
      flexDirection: 'column',
    },
    messageContainer: {
      width: '100%',
    },
  }

  return (
    <List style={{ ...style.messageAlignment, ...style.messagesContainer }}>
      {map(get(activeDialog, 'messages', []), message => (
        <ListItem key={message.messageId} style={style.messageContainer}>
          <ChatMessage
            isMobile={isMobile}
            message={message}
            sendMessage={sendMessage}
            changeAppState={changeAppState}
            changeMessageAttachmentState={changeMessageAttachmentState}
          />
        </ListItem>
      ))}
    </List>
  )
}

const style: { [key: string]: CSSProperties } = {}

export default MessagesFeed
