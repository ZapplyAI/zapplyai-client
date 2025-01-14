'use client'
import React, { Suspense, useEffect } from 'react'
import { Box, Theme, useTheme } from '@mui/material'
import {
  HorizontalLeftAlignBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import Spline from '@splinetool/react-spline'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Image from 'next/image'
import DecorRect from '@/app/(components)/DecorRect'

interface ContextAwareProps {
  isMobile: boolean
}

// eslint-disable-next-line react/display-name
export const ContextAware = React.forwardRef(
  ({ isMobile }: ContextAwareProps, ref) => {
    const theme = useTheme()

    const style = {
      mainIllustration: {
        position: 'relative',
        left:
          '-' +
          (isMobile
            ? theme.customSpacing?.sides.mobile
            : theme.customSpacing?.sides.desktop),
        top: 0,
      },
    }

    return (
      <React.Fragment>
        <Box
          ref={ref}
          sx={{
            width: '100%',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              margin:
                '0px ' +
                (isMobile
                  ? theme.customSpacing?.sides.mobile
                  : theme.customSpacing?.sides.desktop),
              border: '1px solid transparent',
              borderImage: 'linear-gradient(180deg, #5E5E5E, #28272A) 1',
              borderTop: 'none',
              borderBottom: 'none',
            }}
          >
            <Box sx={style.mainIllustration as any}>
              {renderContextAwareIllustration(theme, isMobile)}
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '150px',
                right: '200px',
                zIndex: '-1',
              }}
            >
              <ContextAnim isMobile={isMobile} />
            </Box>
          </Box>

          {/*<Box*/}
          {/*  sx={{*/}
          {/*    position: 'absolute',*/}
          {/*    right: '0',*/}
          {/*    top: 0,*/}
          {/*    border: '1px solid #5E5E5E',*/}
          {/*    borderTop: 'none',*/}
          {/*    height: '100%',*/}
          {/*    width: '300px',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <StickyBox offsetTop={10} offsetBottom={10}>*/}
          {/*    {renderAdvantages()}*/}
          {/*  </StickyBox>*/}
          {/*</Box>*/}
        </Box>
      </React.Fragment>
    )
  }
)

const renderContextAwareIllustration = (theme: Theme, isMobile: boolean) => {
  return (
    <VerticalLeftAlignBox>
      <HorizontalLeftAlignBox
        sx={{
          position: 'relative',
          border: '1px solid transparent',
          borderLeft: 'none',
          borderImage: 'linear-gradient(180deg, #5E5E5E, #28272A) 1',
        }}
      >
        <Typography
          variant={'h1' as any}
          sx={{
            padding: '28px 55px',
            marginLeft:
              'calc(' +
              (isMobile
                ? theme.customSpacing?.sides.mobile
                : theme.customSpacing?.sides.desktop) +
              ' - 1px)',
            border: '1px solid transparent',
            borderRight: 'none',
            borderTop: 'none',
            borderBottom: 'none',
            borderImage: 'linear-gradient(180deg, #5E5E5E, #28272A) 1',
            background:
              'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3A3D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          Context aware
          <DecorRect sx={{ top: '8px', right: '8px' }} />
        </Typography>
      </HorizontalLeftAlignBox>

      <Typography
        variant={'body1' as any}
        sx={{
          margin:
            '30px 0px 10px calc(' +
            (isMobile
              ? theme.customSpacing?.sides.mobile
              : theme.customSpacing?.sides.desktop) +
            ' + 40px)',
        }}
      >
        With light-speed autocompletes Elastic does <br />
        everything for you in seconds.
      </Typography>

      <Box
        sx={{
          marginLeft: '100px',
          marginTop: '50px',
          height: '550px',
        }}
      >
        <ContextFindingAnim />
      </Box>
    </VerticalLeftAlignBox>
  )
}

// Register the MotionPathPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin)
}

const ContextFindingAnim = () => {
  useEffect(() => {
    const animations = [
      { id: 'particle1', path: '#path1', duration: 1 },
      { id: 'particle2', path: '#path2', duration: 1.5 },
      { id: 'particle3', path: '#path3', duration: 2 },
      { id: 'particle4', path: '#path4', duration: 1.125 },
    ]

    const maxDuration = Math.max(...animations.map(anim => anim.duration))

    const masterTimeline = gsap.timeline({ repeat: -1, ease: 'power1.inOut' })

    animations.forEach(({ id, path, duration }) => {
      const durationScaleFactor = maxDuration / duration

      // Add opacity animation along with motionPath
      masterTimeline
        .fromTo(
          `#${id}`,
          { opacity: 1, scale: 0.5 }, // Start with opacity 0 and 10% size
          {
            opacity: 1, // Fade in to opacity 1
            scale: 0.5, // Scale up to 100% size
            duration: maxDuration, // Takes 0.5 seconds for fade-in and scale-up
            ease: 'power1.inOut',
          },
          0 // Start immediately with motionPath
        )
        .to(
          `#${id}`,
          {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
              start: 1,
              end: 0,
            },
            duration: maxDuration, // Normalize duration
            ease: 'power1.inOut',
          },
          0 // Start the motion path at the same time
        )
    })
  }, [])

  return (
    <Box sx={{ position: 'relative' }}>
      <svg
        width="452"
        height="290"
        viewBox="0 0 452 290"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', overflow: 'visible' }}
      >
        <defs>
          <filter
            id="particleGlow"
            x="-50%"
            y="-50%"
            width="500%"
            height="500%"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id="unifiedGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#7B5DFE" />
            <stop offset="50%" stopColor="#DE3AED" />
            <stop offset="100%" stopColor="#ED3A82" />
          </linearGradient>
        </defs>

        <path id="path1" d="M346 78H392" stroke="url(#unifiedGradient)" />

        <path
          id="path2"
          d="M346 78V212.5H452V290"
          stroke="url(#unifiedGradient)"
        />

        <path
          id="path3"
          d="M346 78H204.5V155H101.5V217"
          stroke="url(#unifiedGradient)"
        />
        <path
          id="path4"
          d="M346 78H204.5V155H101.5V126H1V0"
          stroke="url(#unifiedGradient)"
        />

        <circle
          id="particle1"
          cx="346"
          cy="78"
          r="3"
          fill="white"
          filter="url(#particleGlow)"
        />
        <circle
          id="particle2"
          cx="346"
          cy="78"
          r="3"
          fill="white"
          filter="url(#particleGlow)"
        />
        <circle
          id="particle3"
          cx="346"
          cy="78"
          r="3"
          fill="white"
          filter="url(#particleGlow)"
        />
        <circle
          id="particle4"
          cx="346"
          cy="78"
          r="3"
          fill="white"
          filter="url(#particleGlow)"
        />
      </svg>
      <Image
        src="/image/home/contextAware/contextMatches.png"
        alt="X"
        width={1000}
        height={428}
        style={{
          position: 'absolute',
          left: -27,
          top: -30,
          width: 'auto',
        }}
      />
    </Box>
  )
}

interface ContextAnimProps {
  isMobile?: boolean
}

const ContextAnim = ({ isMobile = false }: ContextAnimProps) => {
  const onLoad = (splineApp: any) => {
    const object = splineApp.findObjectByName('Camera')
    if (object) {
      object.position.x -= 150
    }
  }

  return (
    <div
      style={{
        // background: 'red',
        width: '100%',
        height: '100%',
        overflow: isMobile ? 'hidden' : 'visible',
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          scene="https://prod.spline.design/Rpk28cD21MQY1Wvm/scene.splinecode"
          onLoad={onLoad}
          style={{ height: '600px', width: '800px' }}
        />
      </Suspense>
    </div>
  )
}

const renderAdvantages = () => {
  return <></>
}
