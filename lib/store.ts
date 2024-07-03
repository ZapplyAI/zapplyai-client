import { configureStore } from '@reduxjs/toolkit'
import webAppReducer from './reducer/webApp'
import chatReducer from './reducer/chat'
import profileReducer from './reducer/profile'
import globalReducer from './reducer/global'
import { initializeMiddleware } from '@/lib/middleware/initializeMiddleware'

export const makeStore = () => {
  return configureStore({
    reducer: {
      webApp: webAppReducer,
      chat: chatReducer,
      profile: profileReducer,
      global: globalReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(initializeMiddleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

