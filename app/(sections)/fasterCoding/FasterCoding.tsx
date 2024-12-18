'use client'
import React, { Suspense, useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import {
  HorizontalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import { AutofillAnimation } from '@/app/(sections)/fasterCoding/(components)/AutofillAnimation'
import Spline from '@splinetool/react-spline'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import StickyBox from 'react-sticky-box'

export const FasterCoding = () => {
  const style = {
    mainIllustration: {
      position: 'relative',
      left: '-12vw',
      top: 0,
    },
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            margin: '0px 12vw',
            border: '1px solid #5E5E5E',
            borderTop: 'none',
            borderBottom: 'none',
            position: 'relative',
          }}
        >
          <Box sx={style.mainIllustration}>
            {renderFasterCodingIllustration()}
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

          <StickyBox offsetTop={10} offsetBottom={10}>
            {renderAdvantages()}
          </StickyBox>
        </Box>
      </Box>
    </React.Fragment>
  )
}

const renderFasterCodingIllustration = () => {
  return (
    <VerticalLeftAlignBox>
      <Box
        sx={{
          border: '1px solid #5E5E5E',
          borderLeft: 'none',
          paddingLeft: '12vw',
        }}
      >
        <Typography
          variant={'h1'}
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
      </Box>

      <Typography
        variant={'body1'}
        sx={{ margin: '30px 0px 10px calc(12vw + 40px)' }}
      >
        With light-speed autocompletes Elastic does <br />
        everything for you in seconds.
      </Typography>

      <AutofillAnimation />
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

const renderAdvantages = () => {
  const style = {
    advantageItem: {
      width: '298px',
      border: '#343434 1px solid',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '10px 15px',
      textTransform: 'uppercase',
      marginBottom: '-1px',
    },
    label: {
      fontWeight: '200',
      color: '#E5E5E5',
      width: '100%',
      textAlign: 'right',
    },
    labelCTA: {
      fontWeight: '200',
      width: '100%',
      textAlign: 'right',
      background:
        'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3ABA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
    },
  }
  return (
    <VerticalLeftAlignBox
      sx={{
        justifyContent: 'end',
        position: 'absolute',
        right: '0',
        top: '0',
      }}
    >
      <Box>
        <Box sx={style.advantageItem}>
          <Typography variant={'body1'} sx={style.label}>
            Flexible Auto-Completes
          </Typography>
        </Box>
        <Box sx={style.advantageItem}>
          <Typography variant={'body1'} sx={style.label}>
            Flexible Auto-Completes
          </Typography>
        </Box>
        <Box sx={style.advantageItem}>
          <Typography variant={'body1'} sx={style.label}>
            Flexible Auto-Completes
          </Typography>
        </Box>
      </Box>
      <HorizontalCenterBox sx={style.advantageItem}>
        <Typography variant={'body1'} sx={{ ...style.labelCTA, flex: 1 }}>
          check autocomplete examples
        </Typography>
        <ArrowCircleRightIcon
          sx={{ width: '22px', height: '22px', color: '#C932A1' }}
        />
      </HorizontalCenterBox>
    </VerticalLeftAlignBox>
  )
}
