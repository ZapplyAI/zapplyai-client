import { Middleware } from '@reduxjs/toolkit'
// import { initializeWebAppState, selectApp } from '@/lib/reducer/webApp'

export const initializeMiddleware: Middleware =
  store => next => action => {

    const result = next(action)
    const state = store.getState()

    // No way of applying this for now

    // if (state.webApp.apps.length === 0) {
    //   console.log('webApps found to be empty')
    //   store.dispatch(initializeWebAppState())
    //   console.log('dispatched initializeWebAppState()')
    // }
    //
    // if (state.webApp.selectedId === '' || state.webApp.selectedId === null) {
    //   console.log('webApp found to be non-selected')
    //   store.dispatch(selectApp(state.webApp.apps[0]))
    //   console.log('dispatched selectApp()')
    // }

    return result
  }
