'use client'
import { Box, Button, Divider, Stack } from '@mui/material'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth0, User } from '@auth0/auth0-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import HomeSharpIcon from '@mui/icons-material/HomeSharp'
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp'
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import UpgradeMembershipModal from '@/app/dashboard/members/(components)/UpgradeMembershipModal'
import CodeIcon from '@mui/icons-material/Code'

const TopNav = () => {
  const { user, isLoading } = useAuth0()
  const router = useRouter()
  const pathname = usePathname()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [userSubscriptionType, setUserSubscriptionType] = useState('free')

  const handleClose = (membershipUpdated: boolean) => {
    setDialogOpen(false)
    if (membershipUpdated) {
      setUserSubscriptionType('plus')
    }
  }

  const upgradeSubscription = () => {
    setDialogOpen(true)
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          width: '100%',
          padding: '0px 24px',
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
          {renderLogoAndSubscription(
            userSubscriptionType as 'plus' | 'team' | 'free'
          )}
          {renderTopMenu(
            userSubscriptionType === 'free',
            upgradeSubscription,
            pathname,
            router
          )}
          {renderUserDetails(router, user)}
        </Box>
      </Box>

=      <UpgradeMembershipModal
        open={dialogOpen}
        onClose={membershipUpdated => handleClose(membershipUpdated)}
      />
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

const renderLogoAndSubscription = (
  subscriptionType: 'plus' | 'team' | 'free'
) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      {/*<Logo*/}
      {/*  mini*/}
      {/*  width={26}*/}
      {/*  height={26}*/}
      {/*  sx={{ marginRight: '12px', height: '26px', width: '26px' }}*/}
      {/*/>*/}
      <Typography
        variant="h3"
        sx={{ marginBottom: 0, fontSize: '1.1rem', fontWeight: 400 }}
      >
        Elastic
      </Typography>
      {renderSubscriptionType(subscriptionType)}
    </Box>
  )
}

const renderSubscriptionType = (subscriptionType: 'plus' | 'team' | 'free') => {
  const gradients = {
    plus: ['#7C5EFC', '#F95EC1'],
    team: ['#FFB12E', '#F86682'],
    free: ['#4F4B63', '#4F4B63'],
  }

  const [startColor, endColor] = gradients[subscriptionType]

  const style = {
    container: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '78px', // Match SVG width
      height: '24px', // Match SVG height
      marginLeft: '12px',
    },
    textStyle: {
      position: 'absolute',
      background: `linear-gradient(to right, ${startColor}, ${endColor})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '14px',
      fontWeight: '300',
      fontFamily: 'Kanit',
      marginTop: '-2px',
      textTransform: 'capitalize',
    },
  }

  return (
    <Box sx={style.container}>
      <svg
        width="78"
        height="24"
        viewBox="0 0 78 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="77"
          height="23"
          rx="3.5"
          stroke={`url(#paint0_linear_${subscriptionType})`}
        />
        <defs>
          <linearGradient
            id={`paint0_linear_${subscriptionType}`}
            x1="0"
            y1="12"
            x2="78"
            y2="12"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={startColor} />
            <stop offset="1" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>

      <Typography variant={'body2'} sx={style.textStyle}>
        {subscriptionType}
      </Typography>
    </Box>
  )
}

const renderTopMenu = (
  isOnFreeSubscription: boolean,
  upgradeSubscription: () => void,
  pathname: string,
  router: AppRouterInstance
) => {
  const style = {
    navContainer: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #3C3C3C',
      borderRadius: '6px',
      padding: '4px',
    },
    buttonStyle: {
      padding: '4px 24px',
      margin: '1px 6px',
    },
    divider: {
      background: '#5E5E5E',
      height: '20px',
      width: '1px',
    },
    icon: (isActive: boolean) => ({
      height: '16px',
      width: '16px',
      color: isActive ? '#775EFF' : '#E5E5E5',
      marginRight: '12px',
    }),
    buttonText: {
      fontSize: '13px',
      fontWeight: '300',
      fontFamily: 'JetBrains Mono',
    },
    gradientText: {
      background: `linear-gradient(to right, #775EFF, #FF5EBF)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  }

  const menuItems = [
    { label: 'Home', path: '', icon: HomeSharpIcon },
    { label: 'Members', path: '/members', icon: GroupsSharpIcon },
    { label: 'VS Code', path: '/landing', icon: CodeIcon },
    { label: 'Settings', path: '/settings', icon: SettingsSharpIcon },
  ]

  return (
    <Stack
      direction="row"
      divider={<div style={style.divider} />}
      spacing={2}
      sx={style.navContainer}
    >
      {menuItems.map(({ label, path, icon: Icon }) => {
        const isActive = pathname === '/dashboard' + path

        if (isOnFreeSubscription && label === 'Members') {
          return (
            <Button
              key={'Upgrade Subscription'}
              onClick={upgradeSubscription}
              sx={style.buttonStyle}
            >
              <TrendingUpIcon sx={style.icon(true)} />
              <Typography
                variant="body2"
                sx={{ ...style.buttonText, ...style.gradientText }}
              >
                Upgrade Subscription
              </Typography>
            </Button>
          )
        }

        return (
          <Button
            key={label}
            onClick={() => router.push('/dashboard' + path)}
            sx={style.buttonStyle}
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

      {/* Open in VS Code Button */}
      {/*<Button*/}
      {/*  // onClick={() => window.open('vscode://', '_blank')}*/}
      {/*  onClick={() => router.push('/dashboard/landing' + path)}*/}
      {/*  sx={style.buttonStyle}*/}
      {/*>*/}
      {/*  <CodeIcon sx={style.icon(false)} />*/}
      {/*  <Typography variant="body2" sx={style.buttonText}>*/}
      {/*    Open in VS Code*/}
      {/*  </Typography>*/}
      {/*</Button>*/}
    </Stack>
  )
}

const renderUserDetails = (
  router: AppRouterInstance,
  user: User | undefined
) => {
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
        {/*<AccountCircleSharpIcon*/}
        {/*  sx={{ color: '#585858', marginRight: '9px' }}*/}
        {/*/>*/}
        <Typography
          variant={'body1'}
          sx={{ fontFamily: 'JetBrains Mono', color: '#585858' }}
        >
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
export default TopNav
