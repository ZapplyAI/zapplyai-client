'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { Box, Divider, IconButton, Stack } from '@mui/material'
import {
  SubscriptionUser,
  Subscription,
  useDashboard,
  SubscriptionState,
} from '@/app/dashboard/DashboardProvider'
import { filter, find } from 'lodash'
import Typography from '@mui/material/Typography'
import { Button } from '@/components'
import map from 'lodash/map'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'

interface MySubscriptionsProps {
  selectedSubscriptionID: string
}

export default function MySubscriptions({
  selectedSubscriptionID,
}: MySubscriptionsProps) {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [x, xf] = useState(0)
  const { subscriptions } = useDashboard()
  const selectedSubscription = find(
    subscriptions,
    subscription => subscription.id === selectedSubscriptionID
  )

  const y = useRef<HTMLDivElement | null>(null)

  useEffect(() => {}, [])

  if (!selectedSubscription) {
    return <Box sx={{ flex: 3 }}></Box>
  }

  return (
    <Box sx={{ flex: 3 }}>
      <Box
        sx={{
          padding: '12px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {renderAllSubscriptionUsers(selectedSubscription)}
      </Box>
    </Box>
  )
}

const renderAllSubscriptionUsers = (subscription: Subscription) => {
  const activeUsers = filter(
    subscription.users,
    (user: SubscriptionUser) => user.subscriptionState === 'active'
  )
  const inactiveUsers = filter(
    subscription.users,
    (user: SubscriptionUser) => user.subscriptionState !== 'active'
  )

  return (
    <React.Fragment>
      <Box
        sx={{
          // flexGrow: 1,
          flex: '1',
          // maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant={'body1'}>
          Active users : {activeUsers.length}
        </Typography>
        {renderUsersList(activeUsers)}
        <Button label={'Add user'} />
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: '#393939', margin: '0px 25px' }}
      />
      <Box
        sx={{
          // flexGrow: 1,
          flex: '1',
          // maxWidth: '50%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant={'body1'}>
          Inactive users : {inactiveUsers.length}
        </Typography>
        {renderUsersList(inactiveUsers)}
      </Box>
    </React.Fragment>
  )
}

const renderUsersList = (usersList: SubscriptionUser[]) => {
  return (
    <Stack spacing={1}>
      {map(usersList, (user: SubscriptionUser) => {
        return <UserBar key={user.id} user={user} />
      })}
    </Stack>
  )
}

interface UserBarProps {
  user: SubscriptionUser
}

const UserBar = ({ user }: UserBarProps) => {
  const style = {
    userStateBatch: (state: SubscriptionState) => ({
      padding: '3px 6px',
      background:
        state === 'active'
          ? '#2F673E'
          : state === 'overdue'
            ? '#853020'
            : '#855520',
      marginRight: '12px',
      borderRadius: '4px',
    }),
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <div style={style.userStateBatch(user.subscriptionState)}>
        <Typography variant={'body2'} sx={{ color: '#D0D0D0' }}>
          {user.subscriptionState}
        </Typography>
      </div>
      <Typography variant={'body2'} sx={{ color: '#AEAEAE' }}>
        {user.email}
      </Typography>
      <IconButton onClick={() => {}}>
        <MoreVertSharpIcon
          sx={{ color: '#AEAEAE', height: '20px', width: '20px' }}
        />
      </IconButton>
    </Box>
  )
}
