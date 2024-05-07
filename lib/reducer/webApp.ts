import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppOverview, WebApp } from '@/lib/type'
import { filter, find } from 'lodash'
import map from 'lodash/map'

interface WebAppState {
  apps: WebApp[]
  selectedId: string | null
}

const initialState = {
  apps: [],
  selectedId: null,
} satisfies WebAppState as WebAppState

const webAppSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    createApp(state, action: PayloadAction<WebApp>) {
      state.apps = [...state.apps, action.payload]
    },
    deleteApp(state, action: PayloadAction<string>) {
      state.apps = filter(state.apps, app => app.id !== action.payload)
    },
    selectApp(state, action: PayloadAction<string>) {
      state.selectedId = action.payload
    },
    updateAppInfo(state, action: PayloadAction<AppOverview>) {
      state.apps = map(state.apps, app => {
        if (app.id === state.selectedId) {
          return {
            id: state.selectedId,
            name: action.payload.name,
            url: action.payload.url,
          }
        }
        return app
      })
    },
  },
})

export const { createApp, deleteApp, selectApp, updateAppInfo } =
  webAppSlice.actions
export default webAppSlice.reducer
