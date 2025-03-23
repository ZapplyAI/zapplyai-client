'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import PageCard from '@/app/dashboard/(components)/PageCard'
import { Box, Divider, FormControl, IconButton, Stack } from '@mui/material'
import { Button, Input } from '@/components'
import GoogleIcon from '@mui/icons-material/Google'
import Typography from '@mui/material/Typography'
import {
  SubscriptionUser,
  useDashboard,
} from '@/app/dashboard/DashboardProvider'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PaymentsIcon from '@mui/icons-material/Payments'
import { PageNav } from '@/app/dashboard/(navigation)'
import SubscriptionsNav from './(components)/SubscriptionsNav'
import MySubscriptions from './(components)/MySubscriptions'

export default function SubscriptionsPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [selectedSubscriptionID, selectSubscriptionID] = useState('') // subscriptionID
  const { subscriptions } = useDashboard()

  const y = useRef<HTMLDivElement | null>(null)

  useEffect(() => {}, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        flexGrow: '1',
      }}
    >
      <PageNav />
      <Box
        sx={{
          flexGrow: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <SubscriptionsNav selectSubscriptionAction={selectSubscriptionID} />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: '#393939', margin: '0px 24px' }}
        />
        <MySubscriptions selectedSubscriptionID={selectedSubscriptionID} />
      </Box>
    </Box>
  )
}
