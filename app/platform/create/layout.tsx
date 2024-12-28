import React from 'react'
import { VerticalLeftAlignBox } from '@/components/layouts/CenterBox'

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const style = {}

  return <VerticalLeftAlignBox>{children}</VerticalLeftAlignBox>
}
