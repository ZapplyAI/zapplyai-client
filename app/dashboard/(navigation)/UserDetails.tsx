import { Box, Button, Divider, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { auth0 } from '@/lib/auth0'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0'

const UserDetails = () => {
  const { user, error, isLoading } = useUser()
  const router = useRouter()

  if (isLoading) return null
  if (error) return <div>Error loading user</div>

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'inline-flex' }}>
        <img
          src={user?.picture as string | undefined}
          alt="Profile"
          style={{
            color: '#585858',
            marginRight: '9px',
            borderRadius: '10000px',
            height: '20px',
            width: '20px',
          }}
        />
        <Typography
          variant={'body1'}
          sx={{ fontFamily: 'JetBrains Mono', color: '#585858' }}
        >
          {user?.email}
        </Typography>
      </div>

      <Divider
        orientation={'vertical'}
        sx={{
          backgroundColor: '#585858',
          height: '18px',
          margin: '0px 12px',
        }}
      />

      <Button
        onClick={() => router.push('/auth/logout')}
        title={'Log out'}
        variant={'text'}
      >
        <Typography
          variant={'body1'}
          sx={{
            fontFamily: 'JetBrains Mono',
            color: '#585858',
            textDecoration: 'underline',
          }}
        >
          Log out
        </Typography>
      </Button>
    </Box>
  )
}

export default UserDetails
