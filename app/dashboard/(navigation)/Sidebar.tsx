'use client'
import { Box, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { usePathname, useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import LogoutIcon from '@mui/icons-material/Logout'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import BusinessIcon from '@mui/icons-material/Business'
import { useDashboard } from '../DashboardContext'
import useUserProfile from '@/lib/hooks/useUserProfile'
import { UserProfile } from '@/services/types'
import TransactionHistoryModal from '../(components)/TransactionHistoryModal'

interface SidebarProps {
  upgradeSubscription: () => void
  closeSidebar?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ upgradeSubscription, closeSidebar }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { subscriptionType } = useDashboard()
  const { profile } = useUserProfile()
  const isOnFreeSubscription = subscriptionType === 'free'
  const [transactionModalOpen, setTransactionModalOpen] = useState(false)

  const handleTransactionHistory = () => {
    setTransactionModalOpen(true)
    if (closeSidebar) closeSidebar();
  }

  const handleLogout = () => {
    // Clear user profile from localStorage on logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userProfile');
    }
    if (closeSidebar) closeSidebar();
    router.push('/auth/logout')
  }

  return (
    <Box
      sx={{
        width: '260px',
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
        subscriptionType,
        handleTransactionHistory,
        handleLogout,
        closeSidebar,
        profile
      )}
      <TransactionHistoryModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
      />
    </Box>
  )
}

const renderSideMenu = (
  isOnFreeSubscription: boolean,
  upgradeSubscription: () => void,
  pathname: string,
  router: AppRouterInstance,
  subscriptionType: 'free' | 'plus' | 'team',
  handleTransactionHistory: () => void,
  handleLogout: () => void,
  closeSidebar?: () => void,
  profile?: UserProfile | null
) => {
  console.log(subscriptionType, 'starving');
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

  const menuItems = [
    // { label: 'Home', path: '', icon: HomeSharpIcon },
    // { label: 'VS Code', path: '/landing', icon: CodeIcon },
    { label: 'Usage', path: '/usage', icon: DataUsageIcon },
    { label: 'Transaction History', path: '', icon: ReceiptLongIcon, onClick: handleTransactionHistory },
    { label: 'Settings', path: '/settings', icon: SettingsSharpIcon },
    // Only show Organization Settings if user has an organization
    ...(profile?.organization ? [
      { label: 'Organization', path: '/organization/settings', icon: BusinessIcon }
    ] : []),
    { label: 'Logout', path: '', icon: LogoutIcon, onClick: handleLogout },
  ]

  return (
    <Stack direction="column" spacing={1} sx={style.navContainer}>
      {menuItems.map(({ label, path, icon: Icon, onClick }) => {
        const isActive = path ? pathname === '/dashboard' + path : false;

        return (
          <Button
            key={label}
            onClick={onClick ? onClick : () => {
              if (closeSidebar) closeSidebar();
              router.push('/dashboard' + path);
            }}
            sx={{
              ...style.buttonStyle,
              background: isActive ? 'rgba(119, 94, 255, 0.1)' : 'transparent',
              '&:hover': {
                background: isActive
                  ? 'rgba(119, 94, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.05)',
              },
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
