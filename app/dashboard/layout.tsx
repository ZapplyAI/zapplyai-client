import React from 'react'
import '@/styles/main.scss'
import { TopNav } from './(navigation)'
import { DashboardProvider } from './DashboardContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}
