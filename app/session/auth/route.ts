import { auth0 } from '@/lib/auth0'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // Extract the mode parameter from the URL
  const mode = searchParams.get('mode') || 'individual'

  // Determine environment
  const env = process.env.NODE_ENV === 'development' ||
              process.env.NEXT_PUBLIC_APP_BASE_URL?.includes('localhost')
              ? 'STAGING'
              : 'PRODUCTION'

  console.log('Auth - Mode from URL:', mode)
  console.log('Auth - Environment:', env)

  // Pass all parameters including mode through the callback URL
  const queryParams = new URLSearchParams()
  for (const [key, value] of searchParams.entries()) {
    queryParams.append(key, value)
  }

  const queryString = queryParams.toString()
  const returnToUrl = queryString
    ? `/session/callback?${queryString}`
    : `/session/callback`

  const authorizationParameters = {
    scope: 'openid profile email offline_access',
    audience: 'https://dev-ns2zh0uf5v48x7jl.us.auth0.com/api/v2/',
    mode: mode, // Auth0 will have access to this
    env: env,   // Auth0 will have access to this
  }

  console.log('Auth - Full authorizationParameters being sent to Auth0:', JSON.stringify(authorizationParameters, null, 2))
  console.log('Auth - Return URL:', returnToUrl)

  const loginResponse = auth0.startInteractiveLogin({
    returnTo: returnToUrl,
    authorizationParameters
  })

  // Log the response to see if we can inspect the Auth0 URL
  console.log('Auth - Login response type:', typeof loginResponse)

  return loginResponse
}
