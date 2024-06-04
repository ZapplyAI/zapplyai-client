import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ProfileState {
  name: string
  email: string
}

const initialState = {
  name: 'user',
  email: 'email@gmail.com'
} satisfies ProfileState as ProfileState

const profileSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    editName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    editEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
  },
})

export const { editName, editEmail } =
  profileSlice.actions
export default profileSlice.reducer
