import { NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // Extract the mode directly from URL parameters (passed through from auth)
  const mode = searchParams.get('mode') || 'individual'

  console.log('Callback - Mode from URL:', mode)

  const session = await auth0.getSession()
  const accessToken = session?.tokenSet.accessToken
  if (!accessToken) {
    return NextResponse.rewrite('/')
  }

  const queryParams = new URLSearchParams(searchParams)
  queryParams.append('token', accessToken)
  // Mode is already in the URL parameters, no need to add it again
  const callbackUrl = queryParams.get('callback_url')
  queryParams.delete('callback_url')

  console.log('Callback - Final redirect URL with mode:', `${callbackUrl}?${queryParams}`)

  return NextResponse.redirect(`${callbackUrl}?${queryParams}`)
}
