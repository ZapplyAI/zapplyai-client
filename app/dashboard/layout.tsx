'use client'
import React, { useState } from 'react'
import '@/styles/main.scss'
import { TopNav } from './(navigation)'
import Sidebar from './(navigation)/Sidebar'
import { DashboardProvider } from './DashboardContext'
import { Box, IconButton, Drawer } from '@mui/material'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import MenuIcon from '@mui/icons-material/Menu'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true)
  }

  const handleModalClose = (membershipUpdated: boolean) => {
    setShowUpgradeModal(false)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
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
          <TopNav
            onUpgradeClick={handleUpgradeClick}
            modalOpen={showUpgradeModal}
            onModalClose={handleModalClose}
            isMobile={isMobile}
            onMenuClick={toggleSidebar}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            height: '100%',
            marginTop: '61px',
          }}
        >
          {/* Desktop Sidebar - hidden on mobile */}
          {!isMobile && (
            <Box
              sx={{
                position: 'fixed',
                top: '61px',
                left: 0,
                bottom: 0,
                width: '260px',
                zIndex: 1000,
              }}
            >
              <Sidebar
                upgradeSubscription={() => setShowUpgradeModal(true)}
                closeSidebar={() => setSidebarOpen(false)}
              />
            </Box>
          )}

          {/* Mobile Sidebar Drawer */}
          {isMobile && (
            <Drawer
              anchor="left"
              open={sidebarOpen}
              onClose={toggleSidebar}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '260px',
                  backgroundColor: '#13121A',
                  borderRight: '1px solid #5E5E5E',
                  marginTop: '61px',
                },
              }}
            >
              <Sidebar
                upgradeSubscription={() => {
                  setShowUpgradeModal(true);
                  setSidebarOpen(false);
                }}
                closeSidebar={() => setSidebarOpen(false)}
              />
            </Drawer>
          )}

          <Box
            sx={{
              flexGrow: 1,
              marginLeft: isMobile ? '0px' : '260px',
              overflowY: 'auto',
              height: 'calc(100vh - 61px)',
            }}
          >
            <main
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: isMobile ? '16px' : '24px',
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
