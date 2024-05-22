'use client'

import React, { CSSProperties, useRef } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'


export default function requestAccessPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  const style: { [key: string]: CSSProperties } = {

  }

  return (
    <div>request access</div>
  )
}
