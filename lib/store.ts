import { configureStore } from '@reduxjs/toolkit'
import webAppReducer from './reducer/webApp'
import chatReducer from './reducer/chat'
import userReducer from './reducer/user'
import { initializeReduxMiddleware } from '@/lib/middleware/initializeReduxMiddleware'

export const makeStore = () => {
  return configureStore({
    reducer: {
      webApp: webAppReducer,
      chat: chatReducer,
      user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(initializeReduxMiddleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

