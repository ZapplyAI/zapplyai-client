import { auth0 } from '@/lib/auth0'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const queryParams = new URLSearchParams()
  for (const [key, value] of searchParams.entries()) {
    queryParams.append(key, value)
  }

  const queryString = queryParams.toString()
  const returnToUrl = queryString
    ? `/session/callback?${queryString}`
    : `/session/callback`

  return auth0.startInteractiveLogin({
    returnTo: returnToUrl,
    authorizationParameters: {
      scope: 'openid profile email offline_access',
      audience: 'https://dev-ns2zh0uf5v48x7jl.us.auth0.com/api/v2/',
      mode: 'individual'
    }
  })
}
