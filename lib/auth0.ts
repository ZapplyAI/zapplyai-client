import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { NextResponse } from 'next/server'

export const auth0 = new Auth0Client({
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  secret: process.env.NEXT_PUBLIC_AUTH0_SECRET,
  clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
  appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
  authorizationParameters: {
    scope: 'openid profile email offline_access',
    audience: 'https://dev-ns2zh0uf5v48x7jl.us.auth0.com/api/v2/',
    mode: 'individual',
  },
  session: {
    rolling: true,
    absoluteDuration: 60 * 60 * 24 * 30,
    inactivityDuration: 60 * 60 * 24 * 7,
  },
  // @ts-ignore
  onCallback(err, context) {
    if (!!err) return

    if (!!context?.returnTo && context.returnTo !== '/') {
      return NextResponse.redirect(context.returnTo)
    }

    return NextResponse.redirect(
      new URL('/dashboard/usage', process.env.NEXT_PUBLIC_BASE_URL)
    )
  },
})
