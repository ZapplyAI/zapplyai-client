import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Process } from '../type'
import map from 'lodash/map'
import { flatMap } from 'lodash'

interface GlobalState {
  currentProcesses: Process[]
}

const initialState = {
  currentProcesses: [],
} satisfies GlobalState as GlobalState

const globalSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addProcess(state, action: PayloadAction<Process>) {
      state.currentProcesses = [...state.currentProcesses, action.payload]
    },
    progressProcess(
      state,
      action: PayloadAction<{
        searchBy: 'name' | 'id'
        description?: string
        id?: string
        name?: string
        progressSize: number
      }>
    ) {
      state.currentProcesses = map(state.currentProcesses, thisProcess => {
        if (action.payload.searchBy === 'id') {
          if (thisProcess.id && thisProcess.id === action.payload.id) {
            return progressThisProcess(
              thisProcess,
              action.payload.description === undefined
                ? '...'
                : action.payload.description,
              action.payload.progressSize
            )
          }
          return thisProcess
        }
        if (action.payload.searchBy === 'name') {
          if (thisProcess.name && thisProcess.name === action.payload.name) {
            return progressThisProcess(
              thisProcess,
              action.payload.description === undefined
                ? '...'
                : action.payload.description,
              action.payload.progressSize
            )
          }
          return thisProcess
        }
        return thisProcess
      }) as Process[]
    },
    stopProcess(
      state,
      action: PayloadAction<{
        searchBy: 'name' | 'id'
        id?: string
        name?: string
      }>
    ) {
      state.currentProcesses = flatMap(state.currentProcesses, thisProcess => {
        if (action.payload.searchBy === 'id') {
          if (thisProcess.id && thisProcess.id === action.payload.id) {
            return []
          }
          return thisProcess
        }
        if (action.payload.searchBy === 'name') {
          if (thisProcess.name && thisProcess.name === action.payload.name) {
            return []
          }
          return thisProcess
        }
        return thisProcess
      }) as Process[]
    },
  },
})

const progressThisProcess = (
  thisProcess: Process,
  description: string,
  progressSize: number
) => {
  if (thisProcess.progressType === 'STEP') {
    return {
      ...thisProcess,
      description: description,
      step: (thisProcess.step as number) + progressSize,
    }
  }
  if (thisProcess.progressType === 'PERCENT') {
    return {
      ...thisProcess,
      description: description,
      progress: (thisProcess.progress as number) + progressSize,
    }
  }
}

export const { addProcess, progressProcess, stopProcess } = globalSlice.actions
export default globalSlice.reducer
