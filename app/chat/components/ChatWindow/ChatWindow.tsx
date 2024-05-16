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
  const [previewCode, setPreviewCode] = React.useState<string>('')
  const [messages, setMessages] = React.useState<Message[]>([])
  const { ref = null } = useParams()
  const router = useRouter()
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

    dispatch(
      updateDialogSessionState({
        referenceId: 'same',
        state: 'pending',
        currentStep: response.data.next_step,
      })
    )

      if (success) {
        setPrompt(draft => {
          draft.step = response.data.next_step
        })
        setMessages(messages => [
          ...messages,
          { messageId: '', message: response.data.response, sender: 'AI' },
        ])

        if (response.data.response.length >= 1500) {
          const { success: buildSuccess, response } = await session.build({
            ref: ref as string,
          })

          if (buildSuccess) {
            const ws = new WebSocket(
              `wss://duality-core-api-5apq7.ondigitalocean.app/ws/app/${ref}/`
            )

            setMessages(messages => [
              ...messages,
              { messageId: '', message: 'Build started', sender: 'AI' },
            ])

            ws.onmessage = async event => {
              let _messages = ''
              _messages = `${_messages}\n >>>${event.data}`

              setMessages(messages => {
                const updatedMessages = [...messages]
                updatedMessages[updatedMessages.length - 1] = {
                  ...updatedMessages[updatedMessages.length - 1],
                  message: _messages,
                }
                return updatedMessages
              })

              if (
                event.data.toUpperCase().includes('UPDATE: FRONTEND_BUILD_DONE')
              ) {
                const { success: appSuccess, response } = await session.getApp({
                  ref: ref as string,
                })

                if (appSuccess) {
                  setPreviewCode(response?.front_end)
                  console.log(response, 'app code')
                }
              }
            }

            ws.onopen = () => {
              console.log('WebSocket connection established')
            }

            ws.onerror = error => {
              console.log(`WebSocket error: ${error}`)
            }

            ws.onclose = () => {
              console.log('WebSocket connection closed')
            }
          }
        }
      }
    } finally {
      setPrompt(draft => {
        draft.isProcessing = false
      })
    }
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

  if (apps.length === 0) {
    return (
      <div style={style.centricContainer}>
        <AutoAwesomeIcon
          sx={{
            height: '55px',
            width: '55px',
            color: '#5443B1',
            marginBottom: '22px',
          }}
        />
        <span
          style={{
            fontWeight: '300',
            textAlign: 'center',
            color: '#738189',
            marginBottom: '22px',
          }}
        >
          This is where your web-app idea can become a reality.
          <br />
          Click ‘start’ to summarise your idea
        </span>
        <Button
          label={'Start'}
          sx={{ background: '#5443B1', width: '190px' }}
          action={() => {
            const appId = nanoid()
            dispatch(createApp({ id: appId, name: 'New app', url: '' }))
            dispatch(selectApp(appId))
          }}
        />
      </div>
    )
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

          <List style={style.dialogContainer}>
            {/*going with index for now*/}
            {messages.map((message, index) =>
              index === messages.length - 1 ? (
                <ChatMessage key={index} messageObject={message} />
              ) : (
                <React.Fragment key={index}>
                  <ChatMessage key={index} messageObject={message} />
                  <Divider
                    orientation="horizontal"
                    flexItem
                    style={{ background: '#48474E' }}
                  />
                </React.Fragment>
              )
            )}
            {!!previewCode && (
              <iframe
                srcDoc={previewCode}
                title="Example Iframe"
                style={{ width: '100%', height: '70vh', border: 'none' }}
              />
            )}
          </List>
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
  centricContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
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
    overflow: 'scroll',
    marginTop: '55px',
    width: '80%',
  },
}

export default ChatWindow
