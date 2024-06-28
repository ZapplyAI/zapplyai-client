import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string | undefined
  email: string | undefined
  apiAccessToken: string | undefined
}

const initialState = {
  name: undefined,
  email: undefined,
  apiAccessToken: undefined
} satisfies UserState as UserState

const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    editName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    editEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    editApiAccessToken(state, action: PayloadAction<string>) {
      state.apiAccessToken = action.payload
    }
  },
})

export const { editName, editEmail, editApiAccessToken } =
  userSlice.actions
export default userSlice.reducer
