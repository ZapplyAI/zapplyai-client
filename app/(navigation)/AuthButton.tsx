import React from 'react'
import { auth0 } from '@/lib/auth0'
import ClippedButton from '@/app/(components)/ClippedButton'

const AuthButton = async () => {
  const session = await auth0.getSession()

  if (!session) {
    return (
      <a href="/auth/login">
        <ClippedButton
          // onClick={() => router.push('/auth/login')}
          sx={{
            fontFamily: 'Tektur, sans-serif',
            fontSize: '0.9rem',
            padding: '8px 16px',
            marginRight: '15px',
          }}
        >
          Sign In
        </ClippedButton>
      </a>

      // <a href={'/auth/login'}>
      //   <Button
      //     variant="contained"
      //     sx={{
      //       marginLeft: 'auto',
      //       background: '#775EFF',
      //       '&:hover': {
      //         background: '#5E3FFF',
      //       },
      //     }}
      //   >
      //     Try now
      //   </Button>
      // </a>
    )
  }

  return (
    <a href="/dashboard">
      <ClippedButton
        // onClick={() => router.push('/dashboard')}
        sx={{
          fontFamily: 'Tektur, sans-serif',
          fontSize: '0.9rem',
          padding: '8px 16px',
          marginRight: '15px',
        }}
      >
        Go To Dashboard
      </ClippedButton>
    </a>

    // <Link href={'/dashboard'}>
    //   <Button
    //     variant="contained"
    //     sx={{
    //       marginLeft: 'auto',
    //       background: '#775EFF',
    //       '&:hover': {
    //         background: '#5E3FFF',
    //       },
    //     }}
    //   >
    //     Go To Dashboard
    //   </Button>
    // </Link>
  )
}

export default AuthButton
