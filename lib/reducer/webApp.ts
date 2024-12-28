import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { APP_STATE, AppOverview, AppPage, WebApp, WebAppState } from '../type_legacy'
import { filter, find } from 'lodash'
import map from 'lodash/map'
import { nanoid } from 'nanoid'
import { mockWebApps } from '@/testing'

interface WebApp_State {
  apps: WebApp[]
  selectedId: string | null
}

const initialState = () : WebApp_State => {
  // const initialAppId = nanoid()
  return {
    // apps: mockWebApps,
    selectedId: null,
    apps: [],
    // selectedId: null
  }
}

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
            ...app,
            name: action.payload.name,
            url: action.payload.url,
          }
        }
        return app
      })
    },
    updateAppState(state, action: PayloadAction<WebAppState>) {
      state.apps = map(state.apps, app => {
        if (app.id === state.selectedId) {
          return {
            ...app,
            appState: action.payload,
          }
        }
        return app
      })
    },
    createPage(state, action: PayloadAction<AppPage>) {
      state.apps = map(state.apps, (app) => {
        if (app.id === state.selectedId) {
          return {
            ...app,
            data: {
              pages: [...app.data.pages, action.payload]
            }
          }
        }
        return app
      })
    },
    updateFrontendCode(state, action: PayloadAction<string>) {
      state.apps = map(state.apps, (app) => {
        if (app.id === state.selectedId) {
          return {
            ...app,
            data: {
              ...app.data,
              frontendCode: action.payload
            }
          }
        }
        return app
      })
    }
  }
})

export const { createApp, deleteApp, selectApp, updateAppInfo, updateAppState, createPage, updateFrontendCode } =
  webAppSlice.actions
export default webAppSlice.reducer
