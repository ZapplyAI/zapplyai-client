import { NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'

export async function GET(req: Request) {
  const session = await auth0.getSession()
  const accessToken = session?.tokenSet.accessToken
  if (!accessToken) {
    return NextResponse.rewrite('/')
  }
  const { searchParams } = new URL(req.url)

  const queryParams = new URLSearchParams(searchParams)
  queryParams.append('token', accessToken)
  const callbackUrl = queryParams.get('callback_url')
  queryParams.delete('callback_url')

  return NextResponse.redirect(`${callbackUrl}?${queryParams}`)
}
