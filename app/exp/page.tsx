'use client'
import React, { Suspense, useRef } from 'react'
import { Box } from '@mui/material'
import Sticky from 'react-sticky-el'
import Spline from '@splinetool/react-spline'

export default function PlatformPage() {
  return (
    <div style={{ flex: 1 }}>
      <p>....</p>
      <div
        className="scrollarea"
        style={{ height: '200px', overflow: 'scroll' }}
      >
        <Sticky scrollElement=".scrollarea">
          <h1>Scroll pane</h1>
        </Sticky>
      </div>
      <p>....</p>
    </div>
  )
}

const RocketAnim = () => {
  const splineRef = useRef(null)

  return (
    <div style={{}}>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          ref={splineRef}
          scene="https://prod.spline.design/FAOL8ZviUJKTsIwN/scene.splinecode"
          style={{ height: '600px', width: '600px' }}
        />
      </Suspense>
    </div>
  )
}
