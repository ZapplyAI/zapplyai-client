'use client'
import { Box, Button, Divider } from '@mui/material'
import React from 'react'
import { Logo } from '@/components'
import Typography from '@mui/material/Typography'
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
// import { signOut } from "next-auth/react";

const TopNav = () => {
  const { user, isLoading } = useUser()
  const router = useRouter()

  return (
    <React.Fragment>
      <Box
        sx={{
          width: '100%',
          padding: '0px 150px',
          borderBottom: '#5E5E5E 1px solid',
        }}
      >
        <Box
          sx={{
            padding: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <Logo
              mini
              width={26}
              height={26}
              sx={{ marginRight: '12px', height: '26px', width: '26px' }}
            />
            <Typography
              variant="h3"
              sx={{ marginBottom: 0, fontSize: '1.1rem', fontWeight: 400 }}
            >
              Elastic Copilot Dashboard
            </Typography>
          </Box>
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
              {/*<AccountCircleSharpIcon*/}
              {/*  sx={{ color: '#585858', marginRight: '9px' }}*/}
              {/*/>*/}
              <Typography variant={'body1'} sx={{ color: '#585858' }}>
                {user?.email}
              </Typography>
            </div>

            <Divider
              orientation={'vertical'}
              // flexItem
              sx={{
                backgroundColor: '#585858',
                height: '18px',
                margin: '0px 12px',
              }}
            />

            <Button
              onClick={() => {
                router.push('/api/auth/logout')
              }}
              title={'Log out'}
              variant={'text'}
            >
              <Typography
                variant={'body1'}
                sx={{ color: '#585858', textDecoration: 'underline' }}
              >
                Log out
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>

      {renderTopAnnouncement()}
    </React.Fragment>
  )
}

const renderTopAnnouncement = () => {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '0px 150px',
        borderBottom: '#5E5E5E 1px solid',
        background: '#1B1A20',
      }}
    >
      <Box
        sx={{
          padding: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FileDownloadSharpIcon sx={{ color: '#5E5E5E' }} />
        <Typography variant={'body1'} sx={{ color: '#666666' }}>
          Download elastic at this link
          <span style={{ color: '#5F5BCA' }}>
            marketplace.vscode.com/extention/9872h4urewinolnckdl
          </span>
        </Typography>
      </Box>
    </Box>
  )
}

export default TopNav
