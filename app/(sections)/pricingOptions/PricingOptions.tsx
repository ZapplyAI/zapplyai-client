'use client'
import React, { Suspense } from 'react'
import { Box, useTheme } from '@mui/material'
import {
  HorizontalCenterBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import Spline from '@splinetool/react-spline'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ClippedButton from '@/app/(components)/ClippedButton'
import map from 'lodash/map'
import DecorRect from '@/app/(components)/DecorRect'

interface PricingOptionsProps {
  showAlert: any
  isMobile: boolean
}

export const PricingOptions = ({
  showAlert,
  isMobile,
}: PricingOptionsProps) => {
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
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        borderTop: '1px solid #2F2E30',
        borderBottom: '1px solid #5F5F5F',
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
          borderImage: 'linear-gradient(180deg, #2F2E30, #5F5F5F) 1',
          borderTop: 'none',
          borderBottom: 'none',
        }}
      >
        <VerticalLeftAlignBox>
          <Typography
            variant={'h1' as any}
            sx={{
              // position: 'relative',
              color: '#AEAEAE',
              width: '100%',
              padding: '28px 55px',
              borderBottom: '1px solid #1E1D20',
            }}
          >
            <span style={{ position: 'relative' }}>
              What we offer
              <DecorRect
                sx={{ right: '-40px', top: '50%', background: '#403486' }}
              />
            </span>
          </Typography>
          {renderPlansBoxes(isMobile)}
          {renderThinkLess(isMobile, showAlert)}
        </VerticalLeftAlignBox>
      </Box>
    </Box>
  )
}

const renderPlansBoxes = (isMobile: boolean) => {
  return (
    <HorizontalCenterBox
      sx={{
        width: '100%',
        alignItems: 'start',
        justifyContent: 'space-between',
        position: 'relative',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {renderPricingOffer(
        'Individual',
        'Plan for developers who work alone or as a part of small team, freelancers or students',
        '#825AFD, #ED3A55',
        [
          'Flexible Auto-Completes',
          'Just press tab and you will start moving faster',
          'lorem ipsum dolore lorem',
          'press tab and you will start moving faster',
          'Flexible Auto-Completes',
        ]
      )}

      <Box sx={{ flex: 1.5, height: '100%', position: 'relative' }}>
        <DecorRect sx={{ top: '8px', right: '8px', background: '#403486' }} />
      </Box>
      <HorizontalCenterBox
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          marginTop: '75px',
          zIndex: -1,
        }}
      >
        <PricesAnim />
      </HorizontalCenterBox>

      {renderPricingOffer(
        'Enterprise',
        'Plan for developers who work alone or as a part of small team, freelancers or students',
        '#FF945E, #ED3A55',
        [
          'Flexible Auto-Completes',
          'Just press tab and you will start moving faster',
          'lorem ipsum dolore lorem',
          'press tab and you will start moving faster',
          'Flexible Auto-Completes',
        ]
      )}
    </HorizontalCenterBox>
  )
}

interface PriceHeaderBoxProps {
  title: string
  description: string
  gradient: string
}

const PriceHeaderBox = ({
  title,
  description,
  gradient,
}: PriceHeaderBoxProps) => {
  const style = {
    title: {
      fontFamily: 'Orbitron',
      fontSize: '38px',
      fontWeight: '500',
      color: '#000',
    },
    description: {
      marginTop: '12px',
      color: '#DCDCDC',
      fontWeight: '200',
      fontSize: '15px',
      textTransform: 'uppercase',
    },
  }
  return (
    <React.Fragment>
      <span
        style={{
          background: 'linear-gradient(to right, ' + gradient + ')',
          width: '60%',
          height: '8px',
          opacity: 0.75,
          margin: '18px 0px',
        }}
      />
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(to right, ' + gradient + ')',
          padding: '18px 30px 30px 30px',
          marginBottom: '35px',
        }}
      >
        <Typography variant={'h2' as any} sx={style.title}>
          {title}
        </Typography>
        <Typography variant={'h5' as any} sx={style.description}>
          {description}
        </Typography>
      </Box>
    </React.Fragment>
  )
}

const renderThinkLess = (isMobile: boolean, showAlert: any) => {
  return (
    <VerticalCenterBox
      sx={{
        width: '100%',
        padding: isMobile ? '50px 0px' : '70px 0px 50px 0px',
        marginTop: isMobile ? '0px' : '45px',
      }}
    >
      <Typography
        variant={'h1' as any}
        sx={{
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}
      >
        Think less. <span style={{ color: '#ED3A55' }}>Start now</span>
      </Typography>
      <Typography
        variant={'h5' as any}
        sx={{ marginBottom: '18px', marginTop: isMobile ? '15px' : 'auto' }}
      >
        Less than 5 minutes to setup.
      </Typography>
      <ClippedButton sx={{ width: '145px' }} filled onClick={() => showAlert()}>
        <Typography variant={'button' as any}>Start here</Typography>
      </ClippedButton>
    </VerticalCenterBox>
  )
}

const PricesAnim = () => {
  const onLoad = (splineApp: any) => {
    const object = splineApp.findObjectByName('RobotGroup')
    if (object) {
      console.log('object', object)
      object.scale.x = 1.18
      object.scale.y = 1.18
      object.scale.z = 1.18
      object.position.y -= 30
    }
  }

  return (
    <HorizontalCenterBox sx={{}}>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          scene="https://prod.spline.design/cMEdkrjJPVvtW5Qv/scene.splinecode"
          onLoad={onLoad}
          style={{ height: '700px', width: '700px' }}
        />
      </Suspense>
    </HorizontalCenterBox>
  )
}

const style = {
  advantageItem: {
    width: '100%',
    border: '#343434 1px solid',
    borderLeft: 'none',
    borderRight: 'none',
    padding: '8px 13px',
    textTransform: 'uppercase',
    marginBottom: '-1px',
  },
  label: {
    fontWeight: '200',
    color: '#E5E5E5',
    fontSize: '12px',
    width: '100%',
    textAlign: 'right',
  },
  labelCTA: {
    fontWeight: '200',
    width: '100%',
    textAlign: 'right',
    background: 'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3ABA 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
  },
}

const renderPricingOffer = (
  title: string,
  description: string,
  gradient: string,
  advantages: string[]
) => {
  const advantagesNodes = map(advantages, (advantageLabel, index) => (
    <Box sx={{ ...style.advantageItem }} key={index}>
      <Typography variant={'body1' as any} sx={style.label}>
        {advantageLabel}
      </Typography>
    </Box>
  ))

  return (
    <VerticalLeftAlignBox
      sx={{
        background: 'rgba(17, 17, 21, 0.75)',
        flex: 1.5,
        border: '1px solid #1E1D20',
      }}
    >
      <PriceHeaderBox
        title={title}
        description={description}
        gradient={gradient}
      />

      {advantagesNodes}

      <HorizontalCenterBox
        sx={{ ...style.advantageItem, marginTop: '65px', marginBottom: '35px' }}
      >
        <Typography
          variant={'body1' as any}
          sx={{ ...style.labelCTA, flex: 1 }}
        >
          Details
        </Typography>
        <ArrowCircleRightIcon
          sx={{
            width: '22px',
            height: '22px',
            color: '#C932A1',
            marginLeft: '12px',
          }}
        />
      </HorizontalCenterBox>
    </VerticalLeftAlignBox>
  )
}
