import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface TokenState {
  tokenLeft: number
}

const initialState = {
  tokenLeft: 100
} satisfies TokenState as TokenState

const tokenSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addTokens(state, action: PayloadAction<number>) {
      state.tokenLeft = state.tokenLeft + action.payload
    },
    spendTokens(state, action: PayloadAction<number>) {
      state.tokenLeft = state.tokenLeft - action.payload
    },
  },
})

export const { addTokens, spendTokens } =
  tokenSlice.actions
export default tokenSlice.reducer
