'use client'
import React, { useState } from 'react'
import '@/styles/main.scss'
import { TopNav } from './(navigation)'
import Sidebar from './(navigation)/Sidebar'
import { DashboardProvider } from './DashboardContext'
import { Box } from '@mui/material'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true)
  }

  return (
    <DashboardProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
          }}
        >
          <TopNav onUpgradeClick={handleUpgradeClick} />
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            marginTop: '61px',
          }}
        >
          <Box
            sx={{
              position: 'fixed',
              top: '61px',
              left: 0,
              bottom: 0,
              width: '240px',
              zIndex: 1000,
            }}
          >
            <Sidebar upgradeSubscription={() => setShowUpgradeModal(true)} />
          </Box>
          
          <Box
            sx={{
              flexGrow: 1,
              marginLeft: '240px',
              overflowY: 'auto',
              height: 'calc(100vh - 61px)',
            }}
          >
            <main
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '24px',
                minHeight: '100%',
                alignItems: 'flex-start',
              }}
            >
              {children}
            </main>
          </Box>
        </Box>
      </Box>
    </DashboardProvider>
  )
}
