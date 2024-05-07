import { configureStore } from '@reduxjs/toolkit'
import webAppReducer from './reducer/webApp'
import chatReducer from './reducer/chat'

export const makeStore = () => {
  return configureStore({
    reducer: {
      webApp: webAppReducer,
      chat: chatReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

