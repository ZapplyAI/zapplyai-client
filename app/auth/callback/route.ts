import { NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'

export async function GET(req: Request) {
  try {
    // Let Auth0 handle the callback
    // The middleware will process the callback and the onCallback function in auth0.ts
    // will handle the redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_APP_BASE_URL));
  } catch (error) {
    console.error('Auth0 callback error:', error)
    // Redirect to home page on error
    return NextResponse.redirect(
      new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000')
    )
  }
}
