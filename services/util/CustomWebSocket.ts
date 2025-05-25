type EventListener = (event: MessageEvent) => void

export default class CustomWebSocket {
  private ws: WebSocket | null = null
  onmessage: EventListener | null = null

  constructor(url: string) {
    if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
      this.mockWebSocket(url)
    } else {
      this.ws = new WebSocket(url)
      this.ws.onmessage = event => {
        if (this.onmessage) {
          this.onmessage(event)
        }
      }
    }
  }

  private mockWebSocket(url: string) {
    // console.log(`Mock WebSocket initialized for URL: ${url}`)

    // Automatically trigger messages when a new instance is created
    setTimeout(() => {
      this.sendMockMessage('Build started')

      // Wait 3 seconds and then send 'Build finished'
      setTimeout(() => {
        this.sendMockMessage('UPDATE: FRONTEND_BUILD_DONE')
      }, 3000)
    }, 100)
  }

  private sendMockMessage(data: string) {
    if (this.onmessage) {
      const event = new MessageEvent('message', {
        data,
      })
      this.onmessage(event)
    }
    // console.log(`CustomWebSocket sending mock data:`, data)
  }

  send(data: string) {
    if (this.ws) {
      this.ws.send(data)
    } else {
      // console.log(`Mock WebSocket cannot send data:`, data)
    }
  }

  close() {
    if (this.ws) {
      this.ws.close()
    } else {
      // console.log('Mock WebSocket closed')
    }
  }
}
