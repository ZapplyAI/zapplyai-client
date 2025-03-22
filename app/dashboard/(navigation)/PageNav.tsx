'use client'
import { Box, Button, Divider, Stack } from '@mui/material'
import React, { ReactNode } from 'react'
import Typography from '@mui/material/Typography'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp'
import PaymentsSharpIcon from '@mui/icons-material/PaymentsSharp'
import { usePathname, useRouter } from 'next/navigation'

interface PageNavProps {}

const PageNav = ({}: PageNavProps) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '#5E5E5E 1px solid',
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        sx={{ padding: '10px 28px' }}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: '32px', borderColor: '#393939' }}
          />
        }
      >
        <Box>
          {renderNavButton(
            'main',
            pathname === '/dashboard',
            <HomeSharpIcon
              sx={{
                maxWidth: '22px',
                maxHeight: '22px',
              }}
            />,
            () => router.push('/dashboard')
          )}
        </Box>
        <Box>
          {renderNavButton(
            'subscriptions',
            pathname === '/dashboard/subscriptions',
            <PaymentsSharpIcon
              sx={{
                maxWidth: '22px',
                maxHeight: '22px',
              }}
            />,
            () => router.push('/dashboard/subscriptions')
          )}
        </Box>
        <Box>
          {renderNavButton(
            'settings',
            pathname === '/dashboard/settings',
            <SettingsSharpIcon
              sx={{
                maxWidth: '22px',
                maxHeight: '22px',
              }}
            />,
            () => router.push('/dashboard/settings')
          )}
        </Box>
      </Stack>
    </Box>
  )
}

const renderNavButton = (
  label: string,
  active: boolean,
  icon: ReactNode,
  routerAction: () => void
) => {
  const style = {
    menuButton: (isActive: boolean) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '4px 24px',
      border: isActive ? '1px solid #775EFF' : 'none',
      borderRadius: '6px',
    }),
    menuButtonIcon: (isActive: boolean) => ({
      color: isActive ? '#775EFF' : '#C1C1C1',
      marginRight: '8px',
      maxWidth: '22px',
      maxHeight: '22px',
    }),
  }

  return (
    <Button variant="text" sx={style.menuButton(active)} onClick={routerAction}>
      {icon && <span style={style.menuButtonIcon(active)}>{icon}</span>}
      <Typography
        sx={{
          color: active ? '#775EFF' : null,
          textTransform: 'capitalize',
        }}
        variant="h4"
      >
        {label}
      </Typography>
    </Button>
  )
}

export default PageNav
