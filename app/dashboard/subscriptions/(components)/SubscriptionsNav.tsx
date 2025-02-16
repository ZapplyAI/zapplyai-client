'use client'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { Box, Button as Button_MUI, Stack } from '@mui/material'
import { Input } from '@/components'
import {
  Subscription,
  SubscriptionState,
  SubscriptionType,
  useDashboard,
} from '@/app/dashboard/DashboardProvider'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import map from 'lodash/map'
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp'
import PersonSharpIcon from '@mui/icons-material/PersonSharp'
import Typography from '@mui/material/Typography'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'

interface SubscriptionNavProps {
  selectSubscriptionAction: Dispatch<SetStateAction<string>>
}

export default function SubscriptionsNav({
  selectSubscriptionAction,
}: SubscriptionNavProps) {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [x, xf] = useState(0)
  const { subscriptions } = useDashboard()

  const y = useRef<HTMLDivElement | null>(null)

  useEffect(() => {}, [])

  return (
    <Box sx={{ flex: 1 }}>
      <Input
        sx={{
          background: '#202023',
          border: 'none',
          marginTop: '0',
          marginBottom: '18px',
        }}
        fullWidth
        placeholder={'Search subscriptions'}
        icon={<SearchSharpIcon sx={{ color: '#5E5E5E' }} />}
      />
      <Stack spacing={1} direction="column">
        {map(subscriptions, (subscription: Subscription) =>
          renderSubscriptionItem(subscription, selectSubscriptionAction)
        )}
        )
      </Stack>

      {/*{renderNewSubscriptionButton()}*/}
    </Box>
  )
}

const renderSubscriptionItem = (
  subscription: Subscription,
  selectSubscription: Dispatch<SetStateAction<string>>
) => (
  <Button_MUI
    key={subscription.id}
    onClick={() => {
      selectSubscription(subscription.id)
    }}
    sx={{
      width: '100%',
      padding: '8px 12px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      background: '#1B1A20',
      borderRadius: '8px',
    }}
  >
    {renderSubscriptionIcon(subscription.type)}
    {renderSubscriptionDescription(subscription)}
  </Button_MUI>
)

const renderSubscriptionIcon = (type: SubscriptionType) => {
  const style = {
    iconContainer: {
      flexShrink: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      width: '40px',
      background: '#775EFF',
      borderRadius: '7px',
      margin: '3px'
    },
    icon: {
      height: '25px',
      width: '25px',
      color: '#fff',
    },
  }

  switch (type) {
    case 'Individual':
      return (
        <Box sx={{ ...style.iconContainer, background: '#D95EFF' }}>
          <PersonSharpIcon
            sx={{ ...style.icon, height: '20px', width: '20px' }}
          />
        </Box>
      )
    case 'Team':
      return (
        <Box sx={style.iconContainer}>
          <GroupsSharpIcon sx={style.icon} />
        </Box>
      )
    default:
      return <div>empty</div>
  }
}

const renderSubscriptionDescription = (subscription: Subscription) => (
  <Box
    sx={{
      flexGrow: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '15px',
    }}
  >
    {renderSubscriptionDescription_Top(
      subscription.name,
      subscription.userEmail,
      subscription.type,
      subscription.state
    )}
    {renderSubscriptionDescription_Bottom(
      subscription.userEmail,
      subscription.users?.length
    )}
  </Box>
)

const renderSubscriptionDescription_Top = (
  name: string | undefined,
  userEmail: string,
  type: SubscriptionType,
  state: SubscriptionState
) => {
  const style = {
    stateIndicator: (state: SubscriptionState) => ({
      height: '4px',
      width: '4px',
      marginRight: '6px',
      borderRadius: '2px',
      background:
        state === 'active'
          ? '#2AA65C'
          : state === 'overdue'
            ? '#EC391A'
            : '#666666',
    }),
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <span style={style.stateIndicator(state)} />
        <Typography
          variant={'h3'}
          sx={{
            fontSize: '14px',
            color: '#E5E5E5',
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          {name ? name : userEmail}
        </Typography>
      </Box>

      <Typography
        variant={'h3'}
        sx={{
          fontSize: '12px',
          color: '#8B8B8B',
          marginBottom: 0,
          marginLeft: '15px',
        }}
      >
        {type}
      </Typography>
    </Box>
  )
}

const renderSubscriptionDescription_Bottom = (
  userEmail: string,
  usersNumber: number | undefined
) => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <AccountCircleSharpIcon
        sx={{ height: '14px', width: '14px', color: '#C1C1C1' }}
      />
      <Typography
        variant={'h3'}
        sx={{
          fontSize: '12px',
          color: '#C1C1C1',
          fontWeight: 200,
          marginBottom: 0,
          marginLeft: '6px',
        }}
      >
        {userEmail}
      </Typography>
    </Box>

    {usersNumber && (
      <Typography
        variant={'h3'}
        sx={{ fontSize: '12px', color: '#8B8B8B', marginBottom: 0 }}
      >
        {usersNumber}
      </Typography>
    )}
  </Box>
)
