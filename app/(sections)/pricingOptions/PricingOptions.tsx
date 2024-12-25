'use client'
import React, { Suspense } from 'react'
import { Box } from '@mui/material'
import {
  HorizontalCenterBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import Spline from '@splinetool/react-spline'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ClippedButton from '@/app/(components)/ClippedButton'

export const PricingOptions = (props) => {
  const style = {
    mainIllustration: {
      position: 'relative',
      left: '-12vw',
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
          margin: '0px 12vw',
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
              padding: '28px 55px',
              borderBottom: '1px solid #1E1D20',
            }}
          >
            What we offer
          </Typography>
          {renderPlansBoxes()}
          {renderThinkLess()}
        </VerticalLeftAlignBox>
      </Box>
    </Box>
  )
}

const renderPlansBoxes = () => {

  return (
    <HorizontalCenterBox
      sx={{ width: '100%', justifyContent: 'space-between', position: 'relative' }}
    >
      {renderIndividualOffer()}

      <Box sx={{ flex: 1.5 }}></Box>
      <HorizontalCenterBox sx={{position: 'absolute', width: '100%', height: '100%', marginTop: '170px', zIndex: -1}}>
        <PricesAnim/>
      </HorizontalCenterBox>
      {renderEnterpriseOffer()}
    </HorizontalCenterBox>
  )
}

const PriceHeaderBox = ({ title, description, gradient }) => {
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
          padding: '15px 30px',
        }}
      >
        <Typography
          variant={'h2' as any}
          sx={{
            color: '#000',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant={'h5' as any}
          sx={{
            textTransform: 'upper',
          }}
        >
          {description}
        </Typography>
      </Box>
    </React.Fragment>
  )
}

const renderThinkLess = () => {
  return (<VerticalCenterBox sx={{width: '100%', padding: '70px 0px 50px 0px'}}>
    <Typography variant={'h1' as any} sx={{textTransform: 'uppercase', marginBottom: '10px'}}>think less. Start now</Typography>
    <Typography variant={'h5' as any} sx={{marginBottom: '18px'}}>Less than 5 minutes to setup.</Typography>
    <ClippedButton sx={{ width: '145px' }} filled>
      <Typography variant={'button' as any}>Start here</Typography>
    </ClippedButton>
  </VerticalCenterBox>)
}

const PricesAnim = () => {
  const onLoad = splineApp => {
    const object = splineApp.findObjectByName('Camera') // Replace with your object name
    if (object) {
      // object.position.x -= 450
    }
  }

  return (
    <HorizontalCenterBox sx={{}}>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline
          scene="https://prod.spline.design/cMEdkrjJPVvtW5Qv/scene.splinecode"
          onLoad={onLoad}
          style={{ height: '600px', width: '600px' }}
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

const renderIndividualOffer = () => {

  return (
    <VerticalLeftAlignBox sx={{ flex: 2, border: '1px solid #353539' }}>
      <PriceHeaderBox
        title={'Individual'}
        description={
          'Plan for developers who work alone or as a part of small team, freelancers or students'
        }
        gradient={'#825AFD, #ED3A55'}
      />
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          Flexible Auto-Completes
        </Typography>
      </Box>
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          Just press tab and you will start moving faster
        </Typography>
      </Box>
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          lorem ipsum dolore lorem
        </Typography>
      </Box>
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          press tab and you will start moving faster
        </Typography>
      </Box>
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          Flexible Auto-Completes
        </Typography>
      </Box>

      <HorizontalCenterBox sx={{ ...style.advantageItem, marginTop: '90px' }}>
        <Typography variant={'body1' as any} sx={{ ...style.labelCTA, flex: 1 }}>
          check autocomplete examples
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

const renderEnterpriseOffer = () => {
  return (
    <VerticalLeftAlignBox sx={{ flex: 2, border: '1px solid #353539' }}>
      <PriceHeaderBox
        title={'Enterprise'}
        description={
          'Plan for developers who work alone or as a part of small team, freelancers or students'
        }
        gradient={'#FF945E, #ED3A55'}
      />
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          Flexible Auto-Completes
        </Typography>
      </Box>
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          Just press tab and you will start moving faster
        </Typography>
      </Box>
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          lorem ipsum dolore lorem
        </Typography>
      </Box>
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          press tab and you will start moving faster
        </Typography>
      </Box>
      <Box sx={style.advantageItem}>
        <Typography variant={'body1' as any} sx={style.label}>
          Flexible Auto-Completes
        </Typography>
      </Box>

      <HorizontalCenterBox sx={{ ...style.advantageItem, marginTop: '90px' }}>
        <Typography variant={'body1' as any} sx={{ ...style.labelCTA, flex: 1 }}>
          check autocomplete examples
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
