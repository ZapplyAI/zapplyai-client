import Button from '@mui/material/Button'
import React from 'react'
import { auth0 } from '@/lib/auth0'
import {} from '@auth0/nextjs-auth0';

const AuthButton = async () => {
  const session = await auth0.getSession();
  console.log(session);

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
    <a href={'/dashboard'}>
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
    </a>
  )
}

export default AuthButton
