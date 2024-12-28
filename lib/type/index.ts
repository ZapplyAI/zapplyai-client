export type App = {
  name: string
  type: AppType
  state: AppState
}

export enum AppType {
  'technical',
  'nonTechnical'
}

export enum AppState {
  'inDevelopment',
  'deploying'
}
