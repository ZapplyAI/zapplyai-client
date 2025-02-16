import React from 'react'
import '@/styles/main.scss'
import { DashboardProvider } from '@/app/dashboard/DashboardProvider'
import { TopNav } from './(navigation)'
import { Box } from '@mui/material'
import AuthProvider from '@/app/dashboard/AuthProvider'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // todo :           When User unauthenticated --> move to /auth directory
    // todo :           I was thinking of making some sort of AuthProvider
    // todo :              that would take care of this, and put it in here ?
    <AuthProvider>
      <DashboardProvider>
        <TopNav />
        <div
          style={{
            flexGrow: 1,
            padding: '0px 150px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <main
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              borderLeft: '1px solid #5E5E5E',
              borderRight: '1px solid #5E5E5E',
              flexGrow: 1,
              height: '100%',
            }}
          >
            {children}
          </main>
        </div>
      </DashboardProvider>
    </AuthProvider>
  )
}
