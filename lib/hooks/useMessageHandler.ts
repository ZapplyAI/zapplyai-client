import { useState, useEffect } from 'react'
import {
  AnyFunction,
  APP_STATE,
  CurrentProgress,
  Dialog,
  Message,
  SessionState,
  WebApp,
} from '@/lib/type'
import { addMessageToFeed, updateDialogSessionState } from '@/lib/reducer/chat'
import { find, get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { updateAppState } from '@/lib/reducer/webApp'
import { nanoid } from 'nanoid'
import { session } from '@/services'

interface handleSendMessageProps {
  message: Message
  callback?: AnyFunction
}

const useReduxData = () => {
  const apps = useSelector((state: RootState) => state.webApp.apps)
  const selectedAppId = useSelector(
    (state: RootState) => state.webApp.selectedId
  )
  const dialogs = useSelector((state: RootState) => state.chat.dialogs)
  const selectedDialogId = useSelector(
    (state: RootState) => state.chat.openDialogId
  )

  const selectedDialog = find(dialogs, dialog => {
    return dialog.pageId === selectedDialogId
  })
  const selectedApp = find(apps, app => app.id === selectedAppId)

  return {
    selectedDialog,
    selectedApp,
  }
}

export const useMessageHandler = () => {
  const { selectedApp, selectedDialog } = useReduxData()

  const dispatch = useDispatch()

  // const [error, setError] = useState<any>(null)
  const [progress, setProgress] = useState<any>({})
  const [frontendCode, setFrontendCode] = useState('')

  const handleSendMessage = async ({
    message,
    callback = () => {},
  }: handleSendMessageProps) => {
    console.log('\n\n\n')
    console.log('handleSendMessage')
    dispatch(addMessageToFeed(message))
    if (message.sender === 'AI') return

    const currentAppState = get(selectedApp, 'appState.label', APP_STATE.none)

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
  }

  const sendUserMessage_GuidedStart = async (message: Message) => {
    if (!selectedApp || !selectedApp.appState.step) {
      return
    }

    console.log('selectedApp.appState.step', selectedApp.appState.step)
    if (!appStateStepsCompleted(selectedApp)) {
      switch (selectedApp.appState.step) {
        case 1: {
          console.log('   -- guided start step 1')
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
          console.log('   -- guided start step 2')
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
          console.log('   -- guided start step 3')
          dispatch(
            addMessageToFeed({
              messageId: nanoid(),
              message:
                'Thank you for completing the "Guided start" section, please proceed with chatting about your web-app!',
              sender: 'AI',
              attachments: [],
            })
          )
          incrementStateSteps()
          dispatch(
            updateAppState({
              label: APP_STATE.normal,
              step: undefined,
              lastStep: undefined,
            })
          )
          // TODO: only select all of user's messages in this dialog
          await sendUserMessage(selectedDialog as Dialog, message.message)
          break
        }
      }
    }
  }

  const sendUserMessage = async (selectedDialog: Dialog, message: string) => {
    if (!get(selectedDialog, 'sessionState.referenceId', undefined)) {
      const newReferenceId = await initialiseSession(selectedDialog)
      await sendMessageDirectly(selectedDialog, message, newReferenceId)
    } else {
      await sendMessageDirectly(
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

  const sendMessageDirectly = async (
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
      addMessageToFeed({
        messageId: nanoid(),
        message: response.data.response,
        sender: 'AI',
        attachments: [],
      })
    )

    console.log('checking for final architecture')
    if (response.data.response.startsWith('Final architecture:')) {
      console.log(' -- > true')
      dispatch(
        updateAppState({
          label: APP_STATE.building,
          step: undefined,
          lastStep: undefined,
        })
      )
      // setProgress({ isLoading: true, title: 'building started' })
      await establishBuildingSocket(selectedDialog)
    }
  }

  const establishBuildingSocket = async (selectedDialog: Dialog) => {
    console.log('  establishBuildingSocket')
    const { success: buildSuccess, response } = await session.build({
      ref: selectedDialog.sessionState.referenceId as string,
    })

    console.log('buildSuccess:', buildSuccess, 'response', response)
    if (!buildSuccess) {
      setProgress({
        title: 'build',
        description: ' !!! Error occurred. Build unsuccessful',
      })
    }

    if (buildSuccess) {
      const ws = new WebSocket(
        `wss://duality-core-api-5apq7.ondigitalocean.app/ws/app/${selectedDialog.sessionState.referenceId}/`
      )
      dispatch(
        addMessageToFeed({
          messageId: nanoid(),
          message: 'Build started',
          sender: 'AI',
          attachments: [],
        })
      )

      console.log('building in progress, ws:', ws)

      ws.onmessage = async event => {
        console.log('\n\n\n\n')
        console.log('setProgress -> ', { title: 'build', description: event.data })
        setProgress({ title: 'build', description: event.data })
        // dispatch(
        //   addMessageToFeed({
        //     messageId: nanoid(),
        //     message: `>>>${event.data}`,
        //     sender: 'AI',
        //     attachments: [],
        //   })
        // )
        console.log('added progress to feed')

        if (event.data.toUpperCase().includes('UPDATE: FRONTEND_BUILD_DONE')) {
          console.log('UPDATE: FRONTEND_BUILD_DONE')
          const { success: appSuccess, response } = await session.getApp({
            ref: selectedDialog.sessionState.referenceId as string,
          })

          console.log('appSuccess, response', appSuccess, response)
          setFrontendCode(response?.front_end)
          setProgress({ title: 'build finished' })
          // setLoadingProgress({ isLoading: false, title: 'building finished' })
        }
      }
    }
  }

  // useEffect(() => {
  //   if (!lazy_fetch && router.isReady) {
  //     execute()
  //   }
  // }, [router.isReady, router.locale, ...dependencies])

  return { progress, handleSendMessage, frontendCode }
}

const appStateStepsCompleted = (selectedApp: WebApp) => {
  return (
    get(selectedApp, 'appState.step', 0) >
    get(selectedApp, 'appState.lastStep', 0)
  )
}