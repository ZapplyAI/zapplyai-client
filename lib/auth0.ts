import { Auth0Client } from '@auth0/nextjs-auth0/server'

// client ID = lYZO57iboXVG4Yxt1wMan0dtBYcHpZ51
// client secret = TA_xkWzTteK1OKCXkNWNJa3Zd8Vdu-YuWvnjPF1vcAxTfCSpSzlqOB-yV4she43B
// domain =

export const auth0 = new Auth0Client({
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  secret: process.env.NEXT_PUBLIC_AUTH0_SECRET,
  clientSecret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET,
  appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
})
