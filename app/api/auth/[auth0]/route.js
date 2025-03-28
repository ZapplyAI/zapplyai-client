import {
  handleAuth,
  handleLogin,
  handleCallback,
  getSession,
} from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'

export const GET = handleAuth({
  login: async req => {
    try {
      return await handleLogin(req, {
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: 'openid profile email',
        },
      })
    } catch (error) {
      console.error('Login error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 500 }
      )
    }
  },

  callback: async req => {
    try {
      await handleCallback(req)

      const session = await getSession(req)
      console.log('Session:', session)

      if (!session || !session.accessToken) {
        throw new Error('Access token missing')
      }

      return NextResponse.redirect(
        `http://localhost:3000/dashboard/landing?token=${session.accessToken}`
      )
    } catch (error) {
      console.error('Callback error:', error)
      return NextResponse.redirect('/auth/error')
    }
  },
})
