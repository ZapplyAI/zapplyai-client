import React, { CSSProperties, useState } from 'react'
import ChatMessage from '@/app/chat/components/ChatWindow/ChatMessage'
import { Divider, IconButton, List, Stack } from '@mui/material'
import GrainIcon from '@mui/icons-material/Grain'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { session } from '@/services'
import Input, { InputChangeEvent } from '@/components/Input/Input'
import { type Dialog, type WebApp } from '@/lib/type'
import { find, get } from 'lodash'
import MiniPromptInitializer from '@/app/chat/components/MiniPromptInitializer/MiniPromptInitializer'
import { useDispatch, useSelector } from 'react-redux'
import { updateAppInfo } from '@/lib/reducer/webApp'
import {
  createDialog,
  selectDialog,
  selectDialogs,
  updateDialogSessionState,
  sendMessage,
} from '@/lib/reducer/chat'
import { nanoid } from 'nanoid'
import { RootState } from '@/lib/store'

interface ChatWindowProps {
  apps: WebApp[]
  selectedAppId?: string
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

const ChatWindow = ({
  apps,
  selectedAppId,
  initialAppSetup = false,
  selectedDialog,
}: ChatWindowProps): React.ReactNode => {
  const [prompt, setPrompt] = useState<string>('')

  const dispatch = useDispatch()

  const handleInputChange = (event: InputChangeEvent) => {
    setPrompt(event.target.value)
  }

  const handleInputSubmit = async (message: string) => {
    if (selectedDialog?.sessionState.referenceId === undefined) {
      const newReferenceId = await initialiseSession()
      await sendUserMessage(message, newReferenceId)
    } else {
      await sendUserMessage(message, selectedDialog.sessionState.referenceId)
    }
  }

  const initialiseSession = async () => {
    const { success, response } = await session.initialize(
      `Project ${selectedDialog?.id}`
    )

    if (!success) {
      return
    }

    console.log(' Session initialised, response:', response)
    // PROJECT_DESCRIPTION
    dispatch(
      updateDialogSessionState({
        referenceId: response.ref,
        state: 'pending',
        currentStep: 'PROJECT_DESCRIPTION',
      })
    )

    return response.ref
  }

  const sendUserMessage = async (message: string, dialogId: string) => {
    dispatch(
      sendMessage({
        messageId: nanoid(),
        message: message,
        sender: 'USER',
      })
    )

    const { success, response } = await session.prompt(
      message,
      dialogId,
      get(
        selectedDialog,
        'sessionState.currentStep',
        'PROJECT_DESCRIPTION'
      ) as string
    )

    if (!success) {
      return
    }

    console.log('Dispatch updateDialogSessionState')
    console.log('selectedDialog', selectedDialog)
    console.log('response', response)

    dispatch(
      updateDialogSessionState({
        referenceId: 'same',
        state: 'pending',
        currentStep: response.data.next_step,
      })
    )

    dispatch(
      sendMessage({messageId: nanoid(), message: response.data.response, sender: 'AI', })
    )
  }

  const handleSubmitAppSummary = async (
    prompt: string,
    summary: string,
    appName: string,
    appUrl: string
  ) => {
    dispatch(
      updateAppInfo({
        name: appName,
        url: appUrl,
      })
    )
    dispatch(selectDialogs(selectedAppId as any))

    const newDialogId = nanoid()
    dispatch(
      createDialog({
        id: newDialogId,
        appId: selectedAppId as string,
        messages: [],
        pageTitle: 'General',
        selectedOptions: [],
        title: 'Initial dialog',
        sessionState: {
          referenceId: undefined,
          state: 'none',
          currentStep: 'PROJECT_DESCRIPTION',
        },
      })
    )

    dispatch(selectDialog(newDialogId))

    await handleInputSubmit(prompt)
  }

  console.log('selectedDialog', selectedDialog)

  return (
    <div style={style.chatWindow}>
      {initialAppSetup ? (
        <MiniPromptInitializer onSummarySubmit={handleSubmitAppSummary} />
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
            {selectedDialog?.messages.map((message, index) => (
              <ChatMessage key={message.messageId} messageObject={message} />
            ))}
          </Stack>
          <Input
            placeholder={'Tell me more about your web app'}
            fullWidth
            multiline
            value={prompt}
            onChange={handleInputChange}
            icon={<GrainIcon style={{ color: '#775EFF' }} />}
            onSubmit={async () => await handleInputSubmit(prompt)}
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
    zIndex: 1000,
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
    display: 'block',
    overflow: 'scroll',
    overflowY: 'scroll',
    height: '82%',
    width: '80%',
  },
}

export default ChatWindow
