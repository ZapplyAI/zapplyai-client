import React from 'react'
import { VerticalCenterBox } from '@/components/layouts/CenterBox'
import TopNav from '@/app/platform/develop/(navigation)/TopNav'
import { AppState, AppType } from '@/lib/type'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const style = {}

  return (
    <VerticalCenterBox>
      <TopNav
        currentApp={{
          name: 'My app #2',
          type: AppType.nonTechnical,
          state: AppState.inDevelopment,
        }}
      />
      {children}
    </VerticalCenterBox>
  )
}
