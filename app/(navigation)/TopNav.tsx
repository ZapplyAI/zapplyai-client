'use client'
import React from 'react'
import { Box, useTheme } from '@mui/material'
import { Logo } from '@/components'
import Button from '@mui/material/Button'
import { HorizontalLeftAlignBox } from '@/components/layouts/CenterBox'
import Image from 'next/image'

interface TopNavProps {
  showAlert: any
  isMobile: boolean
}

export const TopNav = ({ showAlert, isMobile }: TopNavProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        zIndex: '1000',
        position: 'sticky',
        top: '0',
        padding: isMobile
          ? '12px ' + theme.customSpacing?.sides.mobile
          : '12px ' + theme.customSpacing?.sides.desktop,
        background: '#0A090E',
        borderBottom: '1px solid #5E5E5E',
        paddingTop: isMobile ? '14px' : '12px',
      }}
    >
      <HorizontalLeftAlignBox
        sx={{
          padding: '20px',
          borderBottom: '1px solid #5E5E5E',
        }}
      >
        <Image
          src="/assets/svgs/LISA MARK EXP.svg"
          alt="Logo"
          width={32}
          height={32}
        />
        <Button
          variant="contained"
          onClick={showAlert}
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
      </HorizontalLeftAlignBox>

      {loggedIn ? (
        <HorizontalCenterBox>
          <ClippedButton
            sx={{
              width: 'fit-content',
              padding: '8px 16px',
              marginRight: '6px',
            }}
            onClick={() => showAlert()}
          >
            <PersonIcon sx={{ color: '#AEAEAE' }} />
            <Typography
              sx={{
                fontFamily: 'Kanit',
                fontSize: '14px',
                fontWeight: '300',
                marginLeft: '12px',
              }}
              variant={'caption' as any}
            >
              Hi User
            </Typography>
          </ClippedButton>

          <IconButton onClick={() => showAlert()}>
            <SettingsIcon sx={{ color: '#AEAEAE' }} />
          </IconButton>
        </HorizontalCenterBox>
      ) : (
        <React.Fragment>
          {isMobile ? (
            <ClippedButton
              sx={{
                width: 'fit-content',
                padding: '8px 16px',
                marginRight: '6px',
              }}
              filled
              onClick={() => showAlert()}
            >
              <Typography
                sx={{
                  fontFamily: 'Tektur',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: '300',
                  margin: '0px 16px',
                }}
                variant={'caption' as any}
              >
                Try free
              </Typography>
            </ClippedButton>
          ) : (
            <HorizontalCenterBox>
              <Button
                sx={style.authButton}
                label={'Try free'}
                action={() => showAlert()}
              />
              <span style={{ width: '16px' }} />
              <Button
                action={() => (window.location.href = '/api/auth/login?returnTo=/dashboard/subscriptions')}
                sx={{ ...style.authButton, background: '#222222' }}
                label={'Sign In'}
              />
            </HorizontalCenterBox>
          )}
        </React.Fragment>
      )}
    </HorizontalCenterBox>
  )
}
