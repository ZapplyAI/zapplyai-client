'use client'
import React, { Suspense, useRef } from 'react'
import { Box, Theme, useTheme } from '@mui/material'
import { VerticalLeftAlignBox } from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import { AutofillAnimation } from '@/app/(sections)/fasterCoding/(components)/AutofillAnimation'
import Spline from '@splinetool/react-spline'
import DecorRect from '@/app/(components)/DecorRect'
import Sticky from 'react-sticky-el'
import { CodedItemStack } from '@/app/(sections)/detailListing/(components)/CodedItemStack'

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
            <Box
              className="scrollarea boundaryarea"
              sx={style.mainIllustration as any}
            >
              {renderFasterCodingIllustration(theme, isMobile)}
              {!isMobile && renderDesktopRocketAnim()}
            </Box>

            {isMobile && (
              <CodedItemStack
                isMobile
                items={[
                  ['Flexible Auto-Completes'],
                  ['Just press tab'],
                  ['Gives you ideas!'],
                ]}
                ctaButtonItems={['check autocomplete examples']}
                activeItem={0}
              />
            )}
          </Box>
        </Box>
      </React.Fragment>
    )
  }
)

const renderFasterCodingIllustration = (theme: Theme, isMobile: boolean) => {
  return (
    <VerticalLeftAlignBox
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          border: '1px solid #5E5E5E',
          borderLeft: 'none',
          width: isMobile ? '100%' : 'auto',
          paddingLeft: isMobile ? 0 : theme.customSpacing?.sides.desktop,
        }}
      >
        <Typography
          variant={'h1' as any}
          sx={{
            padding: isMobile ? '22px' : '28px 55px',
            background:
              'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3A3D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            fontSize: isMobile ? '30px' : theme.typography.h1.fontSize,
          }}
        >
          Faster Coding
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
        With light-speed autocompletes Elastic does {!isMobile && <br />}
        everything for you in seconds.
      </Typography>

      {isMobile && renderMobileRocketAnim()}

      <AutofillAnimation isMobile={isMobile} />
    </VerticalLeftAlignBox>
  )
}

const renderMobileRocketAnim = () => {
  return (

    <Box style={{ position: 'sticky', zIndex: '-1' }}>
      <RocketAnim />
    </Box>
  )
}

const renderDesktopRocketAnim = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '150px',
        // left: isMobile ? '20%' : '550px',
        left: '550px',
        zIndex: '-1',
      }}
    >
      <RocketAnim />
    </Box>
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
