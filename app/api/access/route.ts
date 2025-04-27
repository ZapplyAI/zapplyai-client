import { auth0 } from '@/lib/auth0'

export async function GET() {
  const session = await auth0.getSession()
  if (!session) {
    return Response.json({
      status: 404,
      statusText: 'Token Not Found',
    })
  }

  return Response.json({ session: session.tokenSet.accessToken })
}
