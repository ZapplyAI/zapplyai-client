import React, { useState } from 'react'
import ChatMessage from '@/app/chat/components/ChatWindow/ChatMessage'
import { Divider, IconButton, InputBase, Stack } from '@mui/material'
import GrainIcon from '@mui/icons-material/Grain'
import SendIcon from '@mui/icons-material/Send'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useImmer } from 'use-immer'
import { useParams, useRouter } from 'next/navigation'
import { CSSProperties } from 'react'

import { session } from '@/services'
import { sendPrompt } from '@/app/chat/actions'
import Input from '@/components/Input/Input'
import { type Dialog, type Message, WebApp } from '@/lib/type'
import { get } from 'lodash'
import MiniPromptInitializer from '@/app/chat/components/MiniPromptInitializer/MiniPromptInitializer'
import { useDispatch } from 'react-redux'
import { createApp, selectApp } from '@/lib/reducer/webApp'
import { updateAppInfo } from '@/lib/reducer/webApp'
import { createDialog, selectDialogs } from '@/lib/reducer/chat'
import { nanoid } from 'nanoid'

interface ChatWindowProps {
  apps: WebApp[]
  selectedAppId: string
  initialAppSetup: boolean
  selectedDialog: Dialog | null
}

interface ChatHeaderProps {
  icon: any
  headerTitle: string | null
}

const ChatHeader = ({
  icon,
  headerTitle,
}: ChatHeaderProps): React.ReactNode => {
  return (
    <div style={style.headerContainer}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <GrainIcon style={{ color: '#775EFF' }} />
        <span style={{ color: '#CFCED9', marginLeft: '5px' }}>
          {headerTitle}
        </span>
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <IconButton>
          <MoreVertIcon style={{ color: '#CFCED9' }} />
        </IconButton>
      </div>
    </div>
  )
}

interface PromptState {
  value: string
  isProcessing: boolean
  step: string
}

const ChatWindow = ({
  apps,
  selectedAppId,
  initialAppSetup = false,
  selectedDialog,
}: ChatWindowProps): React.ReactNode => {
  const [messages, setMessages] = React.useState<Message[]>([])
  const { ref = null } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()

  const [prompt, setPrompt] = useImmer<PromptState>({
    value: '',
    isProcessing: false,
    step: '',
  })

  React.useEffect(() => {
    if (!ref) {
      ;(async () => {
        setPrompt(draft => {
          draft.isProcessing = true
        })
        try {
          const { success, response } = await session.initialize(
            `Project ${Math.floor(Math.random() * 100)}`
          )

          if (success && !ref) {
            router.push(`/chat/${response.ref}`)
          }
        } finally {
          setPrompt(draft => {
            draft.isProcessing = false
          })
        }
      })()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(draft => {
      draft.value = event.target.value
    })
  }

  const handleEnterPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent default behavior (creating new line)
      await submitAction() // Perform action when Enter is pressed
    }
  }

  const handleSendButtonClick = async () => {
    await submitAction()
  }

  const submitAction = async () => {
    setMessages(messages => [
      ...messages,
      { messageId: '', message: prompt.value, sender: 'USER' },
    ])
    setPrompt(draft => {
      draft.isProcessing = true
      draft.value = ''
    })
    try {
      const { success, response } = await sendPrompt({
        ref: ref as string,
        prompt: prompt.value,
      })

      if (success) {
        setPrompt(draft => {
          draft.step = response.data.next_step
        })
        setMessages(messages => [
          ...messages,
          { messageId: '', message: response.data.response, sender: 'AI' },
        ])
      }
    } finally {
      setPrompt(draft => {
        draft.isProcessing = false
      })
    }
  }

  const sendAppSummary = (
    prompt: string,
    appName: string,
    appUrl: string
  ): void => {
    dispatch(
      updateAppInfo({
        name: appName,
        url: appUrl,
      })
    )
    dispatch(selectDialogs(selectedAppId))
    dispatch(
      createDialog({
        id: nanoid(),
        appId: selectedAppId,
        messages: [],
        pageTitle: 'General',
        selectedOptions: [],
        title: 'Initial dialog',
      })
    )
    // apiCall('./sendMessage', prompt, )
  }

  if (apps.length === 0) {
    return null
  }

  return (
    <div style={style.chatWindow}>
      {initialAppSetup ? (
        <MiniPromptInitializer onSummarySubmit={sendAppSummary} />
      ) : (
        <React.Fragment>
          <ChatHeader
            icon={null}
            headerTitle={get(selectedDialog, 'title', '')}
          />

          <Stack
            direction={'column'}
            alignItems={'center'}
            justifyContent={'flex-end'}
            spacing={3}
            divider={
              <Divider
                orientation="horizontal"
                flexItem
                style={{ background: '#48474E' }}
              />
            }
            style={style.dialogContainer}
          >
            {/*going with index for now*/}
            {messages.map((message, index) => (
              <ChatMessage key={index} messageObject={message} />
            ))}
          </Stack>
          <Input
            placeholder={'Tell me more about your web app'}
            fullWidth
            multiline
            icon={<GrainIcon style={{ color: '#775EFF' }} />}
            onSubmit={submitAction}
            sx={{ width: '80%' }}
          />
        </React.Fragment>
      )}
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  chatWindow: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '45px',
    width: '100%',
    padding: '0px 10px',
    background: '#181818',
    borderBottom: '1px solid #282636',
    borderLeft: '1px solid #282636',
  },
  dialogContainer: {
    overflow: 'hidden',
    width: '80%',
    flex: 1,
  },
}

export default ChatWindow
