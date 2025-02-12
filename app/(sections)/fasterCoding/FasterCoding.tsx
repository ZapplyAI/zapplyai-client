'use client'
import React, { Suspense, useEffect, useRef } from 'react'
import { Box, Theme, useTheme } from '@mui/material'
import {
  HorizontalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import { AutofillAnimation } from '@/app/(sections)/fasterCoding/(components)/AutofillAnimation'
import Spline from '@splinetool/react-spline'
import DecorRect from '@/app/(components)/DecorRect'
import { CodedItemStack } from '@/app/(sections)/detailListing/(components)/CodedItemStack'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface FasterCodingProps {
  isMobile: boolean
}

// eslint-disable-next-line react/display-name
export const FasterCoding = React.forwardRef(
  ({ isMobile }: FasterCodingProps, ref) => {
    const theme = useTheme()

    const style = {
      mainIllustration: {
        position: 'relative',
        overflow: isMobile ? 'hidden' : 'visible',
        left: '-' + (isMobile ? 0 : theme.customSpacing?.sides.desktop),
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
              border: '1px solid #5E5E5E',
              borderTop: 'none',
              borderBottom: 'none',
              position: 'relative',
            }}
          >
            <Box sx={style.mainIllustration as any}>
              <FasterCodingIllustration theme={theme} isMobile={isMobile} />
              {!isMobile && renderDesktopRocketAnim()}
            </Box>

            <Box 
              sx={{ 
                paddingBottom: isMobile ? '100px' : 0,
                background: 'linear-gradient(180deg, rgba(25, 25, 30, 0.95), rgba(25, 25, 30, 0.85))',
                borderRadius: '16px',
                padding: '32px',
                marginTop: '60px',
                border: '1px solid rgba(119, 94, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(119, 94, 255, 0.1), 0 0 20px rgba(119, 94, 255, 0.15)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at top right, rgba(119, 94, 255, 0.1), transparent 70%)',
                  borderRadius: 'inherit',
                  pointerEvents: 'none',
                },
              }}
            >
              <CodedItemStack
                isMobile
                items={[
                  ['Intelligent Code Completion', 'Advanced Copilot-Powered Assistance'],
                  ['Context-Aware Suggestions', 'Smart Code Understanding'],
                  ['Real-time Problem Solving', 'Instant Solutions'],
                ]}
                ctaButtonItems={['Experience the Future of Coding']}
                activeItem={0}
              />
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    )
  }
)

interface FasterCodingIllustrationProps {
  theme: Theme
  isMobile: boolean
}

gsap.registerPlugin(useGSAP)

const FasterCodingIllustration = ({
  theme,
  isMobile,
}: FasterCodingIllustrationProps) => {
  const fixedElementRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const fixedElement = fixedElementRef.current
      const container = containerRef.current

      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: fixedElement,
          pinSpacing: true,
        },
      })
      gsap.to('.box', { x: 360 })
    },
    { scope: containerRef }
  )

  const style = {
    mobileRocketContainer: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      zIndex: '-1',
    },
  }

  return (
    <VerticalLeftAlignBox
      ref={containerRef}
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          border: '1px solid #5E5E5E',
          borderLeft: 'none',
          width: isMobile ? '93%' : 'auto',
          paddingLeft: isMobile ? 0 : theme.customSpacing?.sides.desktop,
        }}
      >
        <Typography
          variant={'h1' as any}
          sx={{
            padding: isMobile ? '28px 45px' : '28px 55px',
            background:
              'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3A3D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            marginBottom: isMobile ? '30px' : '24px',
            fontSize: isMobile ? '2.5rem' : '3.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          Develop faster
        </Typography>

        <DecorRect sx={{ top: '8px', right: '8px' }} />
      </Box>

      <Typography
        variant={'body1' as any}
        sx={{
          margin: isMobile
            ? '22px'
            : '30px 0px 10px calc(' +
              theme.customSpacing?.sides.desktop +
              ' + 40px)',
        }}
      >
          Experience Elastic Copilot—engineered to handle the entire spectrum {!isMobile && <br />}
          of modern software development tasks.
      </Typography>

      <AutofillAnimation isMobile={isMobile} />
    </VerticalLeftAlignBox>
  )
}

const renderDesktopRocketAnim = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '150px',
        left: '550px',
        zIndex: '-1',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Spline
            scene="https://prod.spline.design/SCklxumclxv161-V/scene.splinecode"
            style={{ height: '800px', width: '800px' }}
          />
        </Suspense>
      </Box>
    </Box>
  )
}
