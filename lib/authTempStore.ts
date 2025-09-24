// Simple in-memory store for temporary auth data
// In production, you might want to use Redis or a database
interface AuthTempData {
  mode: 'individual' | 'organization'
  timestamp: number
}

const authTempStore = new Map<string, AuthTempData>()

// Clean up expired entries (older than 10 minutes)
const EXPIRY_TIME = 10 * 60 * 1000 // 10 minutes

function cleanupExpired() {
  const now = Date.now()
  for (const [key, data] of authTempStore.entries()) {
    if (now - data.timestamp > EXPIRY_TIME) {
      authTempStore.delete(key)
    }
  }
}

export function storeAuthMode(sessionId: string, mode: 'individual' | 'organization') {
  cleanupExpired()
  authTempStore.set(sessionId, {
    mode,
    timestamp: Date.now()
  })
  console.log('AuthTempStore - Stored:', sessionId, mode, 'Total entries:', authTempStore.size)
}

export function getAuthMode(sessionId: string): 'individual' | 'organization' | null {
  cleanupExpired()
  console.log('AuthTempStore - Looking for:', sessionId, 'Total entries:', authTempStore.size)
  console.log('AuthTempStore - All entries:', Array.from(authTempStore.keys()))

  const data = authTempStore.get(sessionId)
  console.log('AuthTempStore - Found data:', data)

  if (data) {
    authTempStore.delete(sessionId) // One-time use
    return data.mode
  }
  return null
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
