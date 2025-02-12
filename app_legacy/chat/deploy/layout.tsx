'use client'
import React, { CSSProperties } from 'react'

export default function PreviewPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <React.Fragment>{children}</React.Fragment>
}
