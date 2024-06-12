import { AnyFunction, AsyncFunction } from './utilTypes'

type Dialog = {
  id: string
  appId: string
  pageId: string // holds pageId from {type AppPage} or 0 for main page
  messages: Message[]
  sessionState: SessionState
}

type SessionState = {
  referenceId?: string | undefined
  state: 'pending' | 'none'
  currentStep?: string | undefined
}

type Message = {
  messageId: string
  message: string
  sender: 'USER' | 'AI'
  attachments: MessageAttachment[]
}

type MessageAttachment = {
  id: string
  type: 'button'
  state: 'none' | 'used' | 'disabled' | 'clicked'
  element: any
}

enum APP_STATE {
  'none',
  'guided_start',
  'normal',
  'building',
  'deployment',
}

type WebApp = {
  id: string
  name: string
  url: string
  appState: WebAppState
  data: WebAppData
}

type WebAppState = {
  label: APP_STATE
  step?: number | undefined
  lastStep?: number | undefined
}

type WebAppData = {
  pages: AppPage[]
  frontendCode?: string
}

type AppPage = {
  id: string
  name: string
}

type AppOverview = {
  name: string
  url: string
}

type User = {
  id: string
  name: string
  email: string
  tokensLeft: number
  lastTokenTransactions: any[]
}

type CurrentProgress = {
  isShown?: boolean,
  isLoading?: boolean,
  progress?: number,
  finishAt?: number,
  title?: string,
  description?: string
}

export {
  type Dialog,
  APP_STATE,
  type WebApp,
  type WebAppState,
  type WebAppData,
  type AppPage,
  type Message,
  type MessageAttachment,
  type AppOverview,
  type SessionState,
  type User,
  type AsyncFunction,
  type AnyFunction,
  type CurrentProgress
}
