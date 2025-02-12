import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'
import {
  type Dialog,
  type Message,
  type WebApp,
  type SessionState,
  APP_STATE,
} from '../type_legacy'
import map from 'lodash/map'
import { filter, find } from 'lodash'
import session from '@/services/session'
import { Response } from '@/services'
import { mockDialogs } from '@/testing'
import { nanoid } from 'nanoid'

interface WebAppState {
  allDialogs: Dialog[]
  // Shouldn't have this.
  // We must download dialogs from backend every time when we change the app.
  dialogs: Dialog[] // dialogs of this app
  openDialogId: string // default value '0' because it's the main chat
}

const initialState = {
  allDialogs: [],
  dialogs: [],
  openDialogId: '0',
  // allDialogs: mockDialogs,
  // dialogs: mockDialogs,
  // openDialogId: mockDialogs[0].pageId,
} satisfies WebAppState as WebAppState

const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // initializePageState(state) {
    //   const newAppId = nanoid()
    //   const initialMainDialog : Dialog = {
    //     id: '0',
    //     appId: 'Main chat',
    //     url: 'newapp.zapp.com',
    //   }
    // },
    createDialog(state, action: PayloadAction<Dialog>) {
      state.dialogs = [...state.dialogs, action.payload]
    },
    selectDialog(state, action: PayloadAction<string>) {
      state.openDialogId = action.payload
    },
    selectDialogs(state, action: PayloadAction<string>) {
      state.dialogs = filter(
        state.allDialogs,
        dialog => dialog.id === action.payload
      )
    },
    updateDialogSessionState(state, action: PayloadAction<SessionState>) {
      const openDialog = getOpenDialog(state)
      if (openDialog === undefined) {
        return
      }

      const updatedDialog: Dialog =
        action.payload.referenceId === 'same'
          ? {
              ...openDialog,
              sessionState: {
                referenceId: openDialog.sessionState.referenceId,
                state: action.payload.state,
                currentStep: action.payload.currentStep,
              },
            }
          : {
              ...openDialog,
              sessionState: action.payload,
            }

      updateDialog(state, updatedDialog)
    },
    addMessageToFeed(state, action: PayloadAction<Message>) {
      console.log('!addMessageToFeed, action', action)
      const openDialog = getOpenDialog(state)
      if (openDialog === undefined) {
        return
      }

      const updatedDialog: Dialog = {
        ...openDialog,
        messages: [...openDialog.messages, action.payload],
      }

      updateDialog(state, updatedDialog)
    },
    updateMessageAttachmentState(
      state,
      action: PayloadAction<{
        id: string
        updatedState: string
        selectedAppId: string
      }>
    ) {
      const openDialog = getOpenDialog(state) as Dialog

      const openDialogUpdated = {
        ...openDialog,
        messages: map(openDialog.messages, (message: Message) => ({
          ...message,
          attachments: map(message.attachments, attachment => {
            if (attachment.id === action.payload.id) {
              return {
                ...attachment,
                state: action.payload.updatedState,
              }
            }
            return attachment
          }),
        })),
      }

      updateDialog(
        state,
        openDialogUpdated as Dialog,
        action.payload.selectedAppId
      )
    },
  },
})

const getOpenDialog = (state: WebAppState) =>
  find(state.dialogs, dialog => dialog.pageId === state.openDialogId)

const updateDialog = (
  state: WebAppState,
  updatedDialog: Dialog,
  appId?: string
) => {
  state.dialogs = map(state.dialogs, dialog => {
    if (dialog.pageId === state.openDialogId) {
      return updatedDialog
    }
    return dialog
  })

  state.allDialogs = map(state.allDialogs, dialog => {
    if (dialog.pageId === state.openDialogId) {
      if (appId && dialog.appId === appId) {
        return updatedDialog
      }
    }
    return dialog
  })
}

export const {
  createDialog,
  selectDialogs,
  selectDialog,
  updateDialogSessionState,
  addMessageToFeed,
  updateMessageAttachmentState,
} = chatSlice.actions
export default chatSlice.reducer
