import React, { CSSProperties } from 'react'
import { AnyFunction, APP_STATE, Dialog, Message } from '@/lib/type'
import { List, ListItem } from '@mui/material'
import map from 'lodash/map'
import Typography from '@mui/material/Typography'
import Logo from '../../../../../components/Logo/Logo'
import { get } from 'lodash'
import { Button } from '@/components'
import MessageAttachment from '@/app/chat/components/ChatWindow/component/MessageAttachment'

interface MessagesFeedProps {
  isMobile: boolean // must never be undefined or null, because if not page dialog, then main chat dialog.
  activeDialog: Dialog // must never be undefined or null, because if not page dialog, then main chat dialog.
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
  }

  return (
    <List style={{ ...style.messageAlignment, ...style.messagesContainer }}>
      {map(get(activeDialog, 'messages', []), message =>
        message.sender === 'AI'
          ? sendAiMessage(
            isMobile,
              message,
              sendMessage,
              changeAppState,
              changeMessageAttachmentState
            )
          : sendUserMessage(isMobile,message)
      )}
    </List>
  )
}

const sendAiMessage = (
  isMobile: boolean,
  message: Message,
  sendMessage: AnyFunction,
  changeAppState: AnyFunction,
  changeMessageAttachmentState: AnyFunction
) => {
  const style: { [key: string]: CSSProperties } = {
    aiMessageItem: {
      display: 'flex',
      justifyContent: 'start',
      maxWidth: isMobile? '85%' : '75%',
      marginRight: 'auto',
      marginBottom: '35px',
      color: 'CFCED9',
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  }

  return (
    <ListItem key={message.messageId} style={style.aiMessageItem}>
      <Logo height={22} width={22} mini sx={{ marginRight: '22px' }} />
      <div style={style.messageContainer}>
        <Typography variant={'h6'}>{message.message}</Typography>
        {map(get(message, 'attachments', []), attachment => (
          <MessageAttachment
            key={attachment.id}
            attachment={attachment}
            sendMessage={sendMessage}
            changeAppState={changeAppState}
            changeMessageAttachmentState={changeMessageAttachmentState}
          />
        ))}
      </div>
    </ListItem>
  )
}

const sendUserMessage = (isMobile: boolean, message: Message) => {
  const style: { [key: string]: CSSProperties } = {
    userMessageItem: {
      background: '#181818',
      padding: '15px 22px',
      borderRadius: '15px',
      maxWidth: isMobile? '85%' : '75%',
      marginLeft: 'auto',
      marginBottom: '35px',
      width: 'auto',
      color: 'CFCED9',
    },
  }

  return (
    <ListItem key={message.messageId} style={style.userMessageItem}>
      <Typography variant={'h6'}>{message.message}</Typography>
    </ListItem>
  )
}

const style: { [key: string]: CSSProperties } = {}

export default MessagesFeed
