import { Auth0Client } from '@auth0/nextjs-auth0/server'

export const auth0 = new Auth0Client({
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  secret: process.env.NEXT_PUBLIC_AUTH0_SECRET,
  clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
  appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
  authorizationParameters: {
    scope: 'openid profile email',
    audience: 'https://dev-ns2zh0uf5v48x7jl.us.auth0.com/api/v2/',
  },
})

