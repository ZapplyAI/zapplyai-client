'use client'
import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography'
import { usePathname, useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp'
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CodeIcon from '@mui/icons-material/Code'
import { useDashboard } from '../DashboardContext'

interface SidebarProps {
  upgradeSubscription: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ upgradeSubscription }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { subscriptionType } = useDashboard()
  const isOnFreeSubscription = subscriptionType === 'free'

  return (
    <Box
      sx={{
        width: '240px',
        height: '100%',
        borderRight: '1px solid #5E5E5E',
        padding: '24px 0',
      }}
    >
      {renderSideMenu(
        isOnFreeSubscription,
        upgradeSubscription,
        pathname,
        router,
        subscriptionType
      )}
    </Box>
  )
}

const renderSideMenu = (
  isOnFreeSubscription: boolean,
  upgradeSubscription: () => void,
  pathname: string,
  router: AppRouterInstance,
  subscriptionType: 'free' | 'plus' | 'team'
) => {
  const style = {
    navContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '4px 16px',
    },
    buttonStyle: {
      padding: '12px 16px',
      margin: '4px 0',
      justifyContent: 'flex-start',
      borderRadius: '6px',
    },
    icon: (isActive: boolean) => ({
      height: '20px',
      width: '20px',
      color: isActive ? '#775EFF' : '#E5E5E5',
      marginRight: '12px',
    }),
    buttonText: {
      fontSize: '14px',
      fontWeight: '300',
      fontFamily: 'JetBrains Mono',
      textAlign: 'left',
    },
  }

  const baseMenuItems = [
    { label: 'Home', path: '', icon: HomeSharpIcon },
    // { label: 'VS Code', path: '/landing', icon: CodeIcon },
    { label: 'Settings', path: '/settings', icon: SettingsSharpIcon },
  ]

  const menuItems = baseMenuItems;

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={style.navContainer}
    >
      {menuItems.map(({ label, path, icon: Icon }) => {
        const isActive = pathname === '/dashboard' + path

        return (
          <Button
            key={label}
            onClick={() => router.push('/dashboard' + path)}
            sx={{
              ...style.buttonStyle,
              background: isActive ? 'rgba(119, 94, 255, 0.1)' : 'transparent',
              '&:hover': {
                background: isActive
                  ? 'rgba(119, 94, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            <Icon sx={style.icon(isActive)} />
            <Typography
              variant="body2"
              sx={{
                ...style.buttonText,
                color: isActive ? '#775EFF' : '#E5E5E5',
              }}
            >
              {label}
            </Typography>
          </Button>
        )
      })}
    </Stack>
  )
}

export default Sidebar
