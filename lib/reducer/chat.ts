import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'
import {
  type Dialog,
  type Message,
  type WebApp,
  type SessionState,
} from '@/lib/type'
import map from 'lodash/map'
import { filter, find } from 'lodash'
import session from '@/services/session'
import { Response } from '@/services'

interface WebAppState {
  allDialogs: Dialog[]
  // Shouldn't have this.
  // We must download dialogs from backend every time when we change the app.

  dialogs: Dialog[] // dialogs of this app
  openDialogId: string | null
}

const initialState = {
  allDialogs: [],
  dialogs: [],
  openDialogId: null,
} satisfies WebAppState as WebAppState

const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
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
    sendMessage(state, action: PayloadAction<Message>) {
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
  },
})

const getOpenDialog = (state: WebAppState) =>
  find(state.dialogs, dialog => dialog.id === state.openDialogId)

const updateDialog = (state: WebAppState, updatedDialog: Dialog) => {
  state.dialogs = map(state.dialogs, dialog => {
    if (dialog.id === state.openDialogId) {
      return updatedDialog
    }
    return dialog
  })

  state.allDialogs = map(state.allDialogs, dialog => {
    if (dialog.id === state.openDialogId) {
      return updatedDialog
    }
    return dialog
  })
}

export const {
  createDialog,
  selectDialogs,
  selectDialog,
  updateDialogSessionState,
  sendMessage,
} = chatSlice.actions
export default chatSlice.reducer
