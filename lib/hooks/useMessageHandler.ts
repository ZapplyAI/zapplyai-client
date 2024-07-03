import { useState } from 'react'
import { AnyFunction, APP_STATE, Dialog, Message, WebApp } from '@/lib/type'
import { addMessageToFeed, updateDialogSessionState } from '@/lib/reducer/chat'
import { filter, find, get, takeRight } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { updateAppState, updateFrontendCode } from '@/lib/reducer/webApp'
import { nanoid } from 'nanoid'
import { session } from '@/services'
import CustomWebSocket from '@/services/util/CustomWebSocket'
import App from 'next/app'
import { addProcess, progressProcess, stopProcess } from '@/lib/reducer/global'

interface handleSendMessageProps {
  message: Message
  appState: APP_STATE
  callback?: AnyFunction
}

interface MessageHandlerProps {
  selectedApp: WebApp | undefined
  selectedDialog: Dialog | undefined
  dialogs: Dialog[] | undefined
  updateFrontendCode: AnyFunction
}

export const useMessageHandler = ({
  selectedApp,
  selectedDialog,
  dialogs,
  updateFrontendCode,
}: MessageHandlerProps) => {
  const dispatch = useDispatch()

  // const [error, setError] = useState<any>(null)

  const handleSendMessage = async ({
    message,
    appState,
    callback = () => {},
  }: handleSendMessageProps) => {
    dispatch(addMessageToFeed(message))

    switch (message.sender) {
      case 'AI':
        return
      case 'USER':
        await sendMessageAccordingToAppState(appState, message)
    }
  }

  const sendMessageAccordingToAppState = async (
    currentAppState: APP_STATE,
    message: Message
  ) => {
    switch (currentAppState) {
      case APP_STATE.none:
        await sendUserMessage(selectedDialog as Dialog, message.message)
        break
      case APP_STATE.guided_start:
        console.log('- GUIDED START')
        await sendUserMessage_GuidedStart(message)
        break
      case APP_STATE.normal:
        console.log('- NORMAL MESSAGE')
        await sendUserMessage(selectedDialog as Dialog, message.message)
        break
      case APP_STATE.building:
        console.log('- BUILDING')
        await sendUserMessage(selectedDialog as Dialog, message.message)
        break
    }
  }

  const incrementStateSteps = () => {
    if (!selectedApp || !selectedApp.appState.step) return

    dispatch(
      updateAppState({
        ...selectedApp.appState,
        step: selectedApp.appState.step + 1,
      })
    )
    dispatch(
      progressProcess({
        searchBy: 'name',
        name: 'Guided Start',
        progressSize: 1,
      })
    )
  }

  const sendUserMessage_GuidedStart = async (message: Message) => {
    if (!selectedApp || !selectedApp.appState.step) {
      return
    }

    if (!appStateStepsCompleted(selectedApp)) {
      switch (selectedApp.appState.step) {
        case 1: {
          dispatch(
            addMessageToFeed({
              messageId: nanoid(),
              message:
                'Step 2 - Describe main features of your application\n' +
                'This can be anything from. \n' +
                ' - UI elements? \n' +
                ' - Logic of how your application will work and run \n' +
                ' - Authentication, User Cabinet, Settings, etc...',
              sender: 'AI',
              attachments: [],
            })
          )
          incrementStateSteps()
          break
        }
        case 2: {
          dispatch(
            addMessageToFeed({
              messageId: nanoid(),
              message:
                'Step 3 - Give 1 or more examples of how users will interract with your app',
              sender: 'AI',
              attachments: [],
            })
          )
          incrementStateSteps()
          break
        }
        case 3: {
          incrementStateSteps()
          dispatch(
            updateAppState({
              label: APP_STATE.normal,
              step: undefined,
              lastStep: undefined,
            })
          )
          dispatch(
            stopProcess({
              searchBy: 'name',
              name: 'Guided Start',
            })
          )

          const userMessages = filter(selectedDialog?.messages, {
            sender: 'USER',
          })
          // Get the last three USER messages
          const lastThreeMessages = takeRight(userMessages, 3)
          // Destructure the messages
          const [object1, object2, object3] = lastThreeMessages
          // Format the string
          const formattedString = `Summary of the app: ${object1?.message || ''}. \n Main features of the app: ${object2?.message || ''}. \n  Example of using this app: ${object3?.message || ''}`
          console.log('formattedString', formattedString)

          dispatch(
            addMessageToFeed({
              messageId: nanoid(),
              message:
                'Thank you for completing the "Guided start" section. Below are the details you provided... \n\n' +
                formattedString +
                '\n' +
                'Please proceed with chatting about your web-app!',
              sender: 'AI',
              attachments: [],
            })
          )

          // TODO: only select all of user's messages in this dialog
          await sendUserMessage(selectedDialog as Dialog, formattedString)
          break
        }
      }
    }
  }

  const sendUserMessage = async (selectedDialog: Dialog, message: string) => {
    if (!get(selectedDialog, 'sessionState.referenceId', undefined)) {
      const newReferenceId = await initialiseSession(selectedDialog)
      await sendMessageUsingSession(selectedDialog, message, newReferenceId)
    } else {
      await sendMessageUsingSession(
        selectedDialog,
        message,
        selectedDialog.sessionState.referenceId as string
      )
    }
  }

  const initialiseSession = async (selectedDialog: Dialog) => {
    const { success, response } = await session.initialize(
      `Project ${selectedDialog.id}`
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

  const sendMessageUsingSession = async (
    selectedDialog: Dialog,
    message: string,
    dialogId: string
  ) => {
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

    await manageMessageRespose(response.response, selectedDialog, dialogId)
  }

  const manageMessageRespose = async (
    response: string,
    selectedDialog: Dialog,
    dialogId: string
  ) => {
    dispatch(
      updateDialogSessionState({
        referenceId: 'same',
        state: 'pending',
        currentStep: 'PROJECT_DESCRIPTION',
      })
    )

    dispatch(
      addMessageToFeed({
        messageId: nanoid(),
        message: response,
        sender: 'AI',
        attachments: [],
      })
    )

    //  -- FINAL ARCHITECTURE --
    if (response.length >= 1500) {
      dispatch(
        updateAppState({
          label: APP_STATE.building,
          step: undefined,
          lastStep: undefined,
        })
      )
      await startProjectBuild(dialogId)
    }
  }

  const startProjectBuild = async (dialogId: string) => {
    const { success, response } = await session.build({
      ref: dialogId as string,
    })

    console.log('Build successful:', success, 'response', response)
    if (!success) {
      const buildProcessId = nanoid()
      dispatch(
        addProcess({
          id: buildProcessId,
          name: 'Building Unsuccessful',
          isLoading: true,
          displayPriority: 20,
          progressType: 'PERCENT',
          progress: 100,
        })
      )
    }

    if (success) {
      // Establish Building Socket
      const ws = new CustomWebSocket(
        `wss://duality-core-api-5apq7.ondigitalocean.app/ws/app/${dialogId}/`
      )
      dispatch(
        addMessageToFeed({
          messageId: nanoid(),
          message: 'Build started',
          sender: 'AI',
          attachments: [],
        })
      )

      const buildProcessId = nanoid()
      dispatch(
        addProcess({
          id: buildProcessId,
          name: 'Building App',
          isLoading: true,
          displayPriority: 15,
          progressType: 'PERCENT',
          progress: 0,
        })
      )

      ws.onmessage = async event => {
        await processBuildUpdates(event, dialogId, buildProcessId)
      }
    }
  }

  const processBuildUpdates = async (
    event: MessageEvent<any>,
    dialogId: string,
    buildProcessId: string
  ) => {
    dispatch(
      progressProcess({
        searchBy: 'id',
        id: buildProcessId,
        description: event.data,
        progressSize: 0,
      })
    )

    if (event.data.toUpperCase().includes('UPDATE: FRONTEND_BUILD_DONE')) {
      console.log('UPDATE: FRONTEND_BUILD_DONE')
      dispatch(
        addMessageToFeed({
          messageId: nanoid(),
          message: 'UI build finished',
          sender: 'AI',
          attachments: [],
        })
      )
      const { success, response } = await session.getApp({
        ref: dialogId as string,
      })

      console.log('appSuccess, response', success, response)
      updateFrontendCode(get(response, 'front_end', ''))
      dispatch(
        stopProcess({
          searchBy: 'id',
          id: buildProcessId,
        })
      )
    }
  }

  // useEffect(() => {
  //   if (!lazy_fetch && router.isReady) {
  //     execute()
  //   }
  // }, [router.isReady, router.locale, ...dependencies])

  return { handleSendMessage }
}

const appStateStepsCompleted = (selectedApp: WebApp) => {
  return (
    get(selectedApp, 'appState.step', 0) >
    get(selectedApp, 'appState.lastStep', 0)
  )
}
