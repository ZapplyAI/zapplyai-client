'use client'

import React, { CSSProperties } from 'react'
import { AnyFunction, APP_STATE, Dialog, Message } from '../../../../../lib/type_legacy'
import { List, ListItem } from '@mui/material'
import map from 'lodash/map'
import Typography from '@mui/material/Typography'
import Logo from '../../../../../components/Logo/Logo'
import { get } from 'lodash'
import { Button } from '@/components'
import MessageAttachment from '@/app_legacy/chat/components/ChatWindow/component/MessageAttachment'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatMessageProps {
  isMobile: boolean // must never be undefined or null, because if not page dialog, then main chat dialog.
  message: Message
  sendMessage: AnyFunction
  changeAppState: AnyFunction
  changeMessageAttachmentState: AnyFunction
}

const ChatMessage = ({
  isMobile,
  message,
  sendMessage,
  changeAppState,
  changeMessageAttachmentState,
}: ChatMessageProps): React.ReactNode => {
  const style: { [key: string]: CSSProperties } = {
    aiMessageItem: {
      display: 'flex',
      justifyContent: 'start',
      maxWidth: isMobile ? '85%' : '75%',
      marginRight: 'auto',
      marginBottom: '35px',
      color: 'CFCED9',
    },
    userMessageItem: {
      background: '#181818',
      padding: '15px 22px',
      borderRadius: '15px',
      maxWidth: isMobile ? '85%' : '75%',
      marginLeft: 'auto',
      marginBottom: '35px',
      width: 'auto',
      color: 'CFCED9',
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  }

  const mockResponse = `Awesome **Awesome** Awesome **Awesome** Awesome **Awesome** Awesome **Awesome**`

  return message.sender === 'AI' ? (
    <div style={style.aiMessageItem}>
      <Logo height={22} width={22} mini sx={{ marginRight: '22px' }} />
      <div style={style.messageContainer}>
        <Typography variant={'h6'}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.message}
          </ReactMarkdown>
        </Typography>
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
    </div>
  ) : (
    <div style={style.userMessageItem}>
      <Typography variant={'h6'}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.message}</ReactMarkdown>
      </Typography>

    </div>
  )
}

export default ChatMessage
