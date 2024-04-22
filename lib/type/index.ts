type Dialog = {
  id: string
  appId: string
  title: string
  type?: string // 'frontend' or 'backend' TODO: enum
  pageTitle: string
  selectedOptions: string[]
  messages: Message[] // ex. 'dialog'
}

type Message = {
  messageId: string
  message: string
  sender: 'USER' | 'AI'
}

type WebApp = {
  id: string
  name: string
  url: string
}

type AppOverview = {
  name: string
  url: string
}

export { type Dialog, type WebApp, type Message, type AppOverview }
