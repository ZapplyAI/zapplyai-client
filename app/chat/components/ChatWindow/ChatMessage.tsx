import React from 'react'
import GrainIcon from '@mui/icons-material/Grain'
import { ListItem } from '@mui/material'
type CSSProperties = React.CSSProperties
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatMessageProps {
  messageObject: MessageObject
}

interface MessageObject {
  messageId: string
  sender: string
  message: string
}

const ChatMessage = ({ messageObject }: ChatMessageProps): React.ReactNode => {
  return (
    <ListItem style={style.messageContainer}>
      {messageObject.sender === 'AI' ? (
        <GrainIcon style={{ ...style.messageSenderIcon }} />
      ) : (
        <div style={{ ...style.messageSenderIcon, background: 'gray' }} />
      )}
      <div style={style.messageText}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {messageObject.message}
        </ReactMarkdown>
      </div>
    </ListItem>
  )
}

const style: { [key: string]: CSSProperties } = {
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '12px 22px',
  },
  messageSenderIcon: {
    height: '22px',
    width: '22px',
    marginRight: '15px',
  },
  messageText: {
    color: '#CFCED9',
    fontSize: '14px',
  },
}

export default ChatMessage
