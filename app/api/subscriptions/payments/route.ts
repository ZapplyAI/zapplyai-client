import { NextRequest, NextResponse } from 'next/server'
import { auth0 } from '@/lib/auth0'
import _axios from '@/lib/axios'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const session = await auth0.getSession()
    const accessToken = session?.tokenSet.accessToken

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized', session: session }, { status: 401 })
    }

    const response = await _axios.post('/subscription/payments', {
      plan_id: body.plan_id,
      success_url: body.success_url,
      cancel_url: body.cancel_url,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Checkout error:', error.response?.data || error.message)
    return NextResponse.json({ error: 'Something went wrong', session: auth0.getSession() }, { status: 500 })
  }
}
