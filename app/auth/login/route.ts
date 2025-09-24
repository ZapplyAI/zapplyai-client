import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  
  // Get the mode from query params, default to 'individual'
  const mode = searchParams.get('mode') || 'individual'
  
  // Preserve other query parameters
  const queryParams = new URLSearchParams()
  for (const [key, value] of searchParams.entries()) {
    queryParams.append(key, value)
  }
  
  // Ensure mode is set
  if (!queryParams.has('mode')) {
    queryParams.set('mode', mode)
  }
  
  const queryString = queryParams.toString()
  const redirectUrl = `/session/auth?${queryString}`
  
  return NextResponse.redirect(new URL(redirectUrl, req.url))
}
