import Button from '@mui/material/Button'
import React from 'react'
import Link from 'next/link'
import { auth0 } from '@/lib/auth0'

const AuthButton = async () => {
  const session = await auth0.getSession()

  if (!session) {
    return (
      <a href={'/auth/login'}>
        <Button
          variant="contained"
          sx={{
            marginLeft: 'auto',
            background: '#775EFF',
            '&:hover': {
              background: '#5E3FFF',
            },
          }}
        >
          Try now
        </Button>
      </a>
    )
  }

  return (
    <Link href={'/dashboard'}>
      <Button
        variant="contained"
        sx={{
          marginLeft: 'auto',
          background: '#775EFF',
          '&:hover': {
            background: '#5E3FFF',
          },
        }}
      >
        Go To Dashboard
      </Button>
    </Link>
  )
}

export default AuthButton
