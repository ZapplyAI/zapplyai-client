import React from 'react'
import GrainIcon from '@mui/icons-material/Grain'
type CSSProperties = React.CSSProperties

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
    <div style={style.messageContainer}>
      {messageObject.sender === 'AI' ? (
        <GrainIcon style={{ ...style.messageSenderIcon }} />
      ) : (
        <div style={{ ...style.messageSenderIcon, background: 'gray' }} />
      )}
      <div style={style.messageText}>{messageObject.message}</div>
    </div>
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
