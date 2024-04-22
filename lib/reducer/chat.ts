import { createSlice } from '@reduxjs/toolkit'
import { type PayloadAction } from '@reduxjs/toolkit'
import { type Dialog, type Message } from '@/lib/type'
import map from "lodash/map";
import {filter} from "lodash";

interface WebAppState {
  allDialogs: Dialog[]
  dialogs: Dialog[]
  selectedId: string | null
}

const initialState = {
  allDialogs: [], // Shouldn't have this. We must download dialogs from backend every time when we change the app.
  dialogs: [],
  selectedId: null,
} satisfies WebAppState as WebAppState

const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    createDialog(state, action: PayloadAction<Dialog>) {
      state.dialogs = [...state.dialogs, action.payload]
    },
    selectDialog(state, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },
    selectDialogs(state, action: PayloadAction<string>) {
      state.dialogs = filter(state.allDialogs, dialog => dialog.id === action.payload)
    },
    sendMessage(state, action: PayloadAction<Message>) {
      state.dialogs = map(state.dialogs, (dialog) =>
        dialog.id === state.selectedId
          ? addMessageToDialog(dialog, action.payload)
          : dialog
      )
    },
  },
})

const addMessageToDialog = (dialog: Dialog, message: Message): Dialog => ({
  ...dialog,
  messages: [...dialog.messages, message]
})

export const { createDialog, selectDialogs, selectDialog, sendMessage } = chatSlice.actions
export default chatSlice.reducer
