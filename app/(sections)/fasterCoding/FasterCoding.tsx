'use client'
import React, { Suspense, useRef } from 'react'
import { Box, Theme, useTheme } from '@mui/material'
import { VerticalLeftAlignBox } from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import { AutofillAnimation } from '@/app/(sections)/fasterCoding/(components)/AutofillAnimation'
import Spline from '@splinetool/react-spline'
import DecorRect from '@/app/(components)/DecorRect'

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
        left:
          '-' + (isMobile
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
                '0px ' + (isMobile
                  ? theme.customSpacing?.sides.mobile
                  : theme.customSpacing?.sides.desktop),
              border: '1px solid #5E5E5E',
              borderTop: 'none',
              borderBottom: 'none',
              position: 'relative',
            }}
          >
            <Box sx={style.mainIllustration as any}>
              {renderFasterCodingIllustration(theme, isMobile)}
              <Box
                sx={{
                  position: 'absolute',
                  top: '150px',
                  left: '550px',
                  zIndex: '-1',
                }}
              >
                <RocketAnim />
              </Box>
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    )
  }
)

const renderFasterCodingIllustration = (theme: Theme, isMobile: boolean) => {
  return (
    <VerticalLeftAlignBox>
      <Box
        sx={{
          position: 'relative',
          border: '1px solid #5E5E5E',
          borderLeft: 'none',
          paddingLeft: (isMobile
            ? theme.customSpacing?.sides.mobile
            : theme.customSpacing?.sides.desktop),
        }}
      >
        <Typography
          variant={'h1' as any}
          sx={{
            padding: '28px 55px',
            background:
              'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3A3D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          Faster Coding
        </Typography>

        <DecorRect sx={{ top: '8px', right: '8px' }} />
      </Box>

      <Typography
        variant={'body1' as any}
        sx={{
          margin:
            '30px 0px 10px calc(' + (isMobile
              ? theme.customSpacing?.sides.mobile
              : theme.customSpacing?.sides.desktop) + ' + 40px)',
        }}
      >
        With light-speed autocompletes Elastic does <br />
        everything for you in seconds.
      </Typography>

      <AutofillAnimation isMobile={isMobile} />
    </VerticalLeftAlignBox>
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
