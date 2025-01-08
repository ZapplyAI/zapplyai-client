import Typography from '@mui/material/Typography'
import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Theme,
  useTheme,
} from '@mui/material'
import ClippedButton from '@/app/(components)/ClippedButton'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import DecorRect from '@/app/(components)/DecorRect'
import AliceCarousel, { EventObject } from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import map from 'lodash/map'
import LoadingAnimHUD from '@/app/(components)/LoadingAnimHUD'

interface MainSectionProps {
  showAlert: any
  isMobile: boolean
}

export const MainSection = ({ showAlert, isMobile }: MainSectionProps) => {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="start"
        alignItems="normal"
        flexDirection={isMobile ? 'column' : 'row'}
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
        {renderStickySocialLinks(isMobile)}

        <VerticalLeftAlignBox
          sx={{
            padding: isMobile ? '18px' : '30px',
          }}
        >
          <VerticalLeftAlignBox
            sx={{
              justifyContent: 'start',
              marginBottom: '60px',
              paddingRight: isMobile ? '42px' : 'auto',
            }}
          >
            <Typography
              variant={'h5' as any}
              sx={{
                background: 'linear-gradient(90deg, #775EFF, #DE3AED, #ED3A93)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                marginBottom: isMobile ? '20px' : '12px',
                paddingRight: isMobile ? '12px' : 'auto',
              }}
            >
              Being a developer is hard? Let’s make things simple!
            </Typography>

            <Typography
              variant={'h5' as any}
              sx={{ maxWidth: '90%', marginBottom: isMobile ? '30px' : '40px' }}
            >
              With Elastic development process becomes a piece-of-cake. Pair
              programming with our AI-assistant will save you 50% of your time
              developing things.
            </Typography>

            <LoadingAnimHUD label={'loading elastic IDE ...'} />
          </VerticalLeftAlignBox>

          {renderVideo(isMobile)}

          {isMobile && (
            <DecorRect
              sx={{ background: '#413486', top: '8px', right: '68px' }}
            />
          )}
        </VerticalLeftAlignBox>

        <VerticalLeftAlignBox
          sx={{
            flex: isMobile ? 'unset' : '1',
            height: isMobile ? '200px' : 'auto',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'row' : 'column',
          }}
        >
          <VerticalCenterBox
            sx={{
              position: 'relative',
              border: '1px solid #5E5E5E',
              width: isMobile ? 'auto' : '200px',
              flex: isMobile ? 1 : 'unset',
              height: isMobile ? '100%' : 'auto',
              padding: isMobile ? 'auto' : '32px',
            }}
          >
            <VerticalCenterBox sx={{ marginBottom: '22px' }}>
              <ClippedButton
                sx={{ width: '145px' }}
                onClick={() => showAlert()}
              >
                <Typography variant={'button' as any}>Free Trial</Typography>
              </ClippedButton>
              <Typography variant={'caption' as any}>
                No card required
              </Typography>
            </VerticalCenterBox>

            <ClippedButton
              sx={{ width: '145px' }}
              filled
              onClick={() => showAlert()}
            >
              <Typography variant={'button' as any}>Learn more</Typography>
            </ClippedButton>

            <DecorRect
              sx={
                isMobile
                  ? { background: '#413486', top: '8px', right: '8px' }
                  : { top: '8px', left: '8px' }
              }
            />
          </VerticalCenterBox>

          <VerticalCenterBox
            sx={{
              position: 'relative',
              border: '1px solid #5E5E5E',
              width: isMobile ? 'auto' : '200px',
              flex: isMobile ? 1 : 'unset',
              height: isMobile ? '100%' : 'auto',
              padding: isMobile ? 'auto' : '32px',
            }}
          >
            <Typography variant={'body1' as any} sx={{ fontSize: '1.1rem' }}>
              Questions?
            </Typography>
            <Typography
              variant={'body1' as any}
              sx={{ color: '#AEAEAE', fontSize: '1.1rem' }}
            >
              Email us
            </Typography>
            <ClippedButton
              sx={{ width: '145px', marginTop: '12px' }}
              onClick={() => showAlert()}
            >
              <Typography variant={'button' as any}>Contact</Typography>
            </ClippedButton>

            <DecorRect
              sx={
                isMobile
                  ? { background: '#413486', top: '8px', right: '8px' }
                  : { top: '8px', right: '8px' }
              }
            />
          </VerticalCenterBox>
        </VerticalLeftAlignBox>
      </Box>

      {isMobile && (
        <Box
          sx={{
            margin: '0px ' + theme.customSpacing?.sides.mobile,
            border: '1px solid #5E5E5E',
            borderTop: 'none',
            borderBottom: 'none',
          }}
        >
          {renderFetchingMetrics()}
        </Box>
      )}

      <BigNumbersCarousel theme={theme} isMobile={isMobile} />
    </React.Fragment>
  )
}

const renderStickySocialLinks = (isMobile: boolean) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: isMobile ? 'auto' : '0',
        right: isMobile ? '0' : 'auto',
      }}
    >
      <VerticalCenterBox
        sx={{
          position: 'absolute',
          top: '-1px',
          left: isMobile ? '-60px' : '-70px',
          width: isMobile ? '60px' : '70px',
          height: isMobile ? '210px' : '250px',
          justifyContent: 'space-around',
          border: '1px solid #5E5E5E',
        }}
      >
        <Image
          src="/icons/linkedin_icon.png"
          alt="LinkedIn"
          width={isMobile ? 30 : 38}
          height={isMobile ? 30 : 38}
        />
        <Image
          src="/icons/telegram_icon.png"
          alt="Telegram"
          width={isMobile ? 30 : 38}
          height={isMobile ? 30 : 38}
        />
        <Image
          src="/icons/twitter_x_icon.png"
          alt="X"
          width={isMobile ? 30 : 38}
          height={isMobile ? 30 : 38}
        />
      </VerticalCenterBox>
    </div>
  )
}

const renderVideo = (isMobile: boolean) => {
  const borderL = '110px'
  const borderL_M = '55px'

  const style = {
    rectangle: {
      width: '100%',
      height: isMobile ? '190px' : '380px',
      position: 'relative',
    },
    corner: {
      position: 'absolute',
      border: '1px solid #999999',
    },
    topLeft: {
      top: '0',
      left: '0',
      width: isMobile ? borderL_M : borderL,
      height: isMobile ? borderL_M : borderL,
      borderRight: 'none',
      borderBottom: 'none',
    },
    topRight: {
      top: '0',
      right: '0',
      width: isMobile ? borderL_M : borderL,
      height: isMobile ? borderL_M : borderL,
      borderLeft: 'none',
      borderBottom: 'none',
    },
    bottomLeft: {
      bottom: '0',
      left: '0',
      width: isMobile ? borderL_M : borderL,
      height: isMobile ? borderL_M : borderL,
      borderRight: 'none',
      borderTop: 'none',
    },
    bottomRight: {
      bottom: '0',
      right: '0',
      width: isMobile ? borderL_M : borderL,
      height: isMobile ? borderL_M : borderL,
      borderLeft: 'none',
      borderTop: 'none',
    },
  }

  return (
    <HorizontalCenterBox sx={style.rectangle}>
      <div style={{ ...style.corner, ...style.topLeft } as any}></div>
      <div style={{ ...style.corner, ...style.topRight } as any}></div>
      <div style={{ ...style.corner, ...style.bottomLeft } as any}></div>
      <div style={{ ...style.corner, ...style.bottomRight } as any}></div>
      <HorizontalCenterBox
        style={{ width: '90%', height: '81%', background: '#1D1D1D' }}
      >
        <Typography variant={'body2'} sx={{ maxWidth: '75%' }}>
          Into video is still in production!
        </Typography>
      </HorizontalCenterBox>
    </HorizontalCenterBox>
  )
}

const createItems = (isMobile: boolean) => {
  const style = {
    bigNumberContainer: {
      position: 'relative',
    },
    bigNumber: {
      fontSize: isMobile ? '30px' : '40px',
      color: isMobile ? '#E5E5E5' : '#AEAEAE',
      fontFamily: 'JetBrains Mono, sans-serif',
      marginBottom: '12px',
    },
    smallDescription: {
      color: isMobile ? '#E5E5E5' : '#DDDCE9',
      textAlign: 'center',
      margin: '0px 20px',
    },
  }

  return [
    <VerticalCenterBox key={'0'} sx={style.bigNumberContainer}>
      <Typography variant={'h1' as any} sx={style.bigNumber}>
        34.8%
      </Typography>
      <Typography variant={'body1' as any} sx={style.smallDescription}>
        Productivity increase
      </Typography>
    </VerticalCenterBox>,

    <VerticalCenterBox key={'1'} sx={style.bigNumberContainer}>
      <Typography variant={'h1' as any} sx={style.bigNumber}>
        28.1%
      </Typography>
      <Typography variant={'body1' as any} sx={style.smallDescription}>
        Faster development
      </Typography>
    </VerticalCenterBox>,

    <VerticalCenterBox key={'2'} sx={style.bigNumberContainer}>
      <Typography variant={'h1' as any} sx={style.bigNumber}>
        45.0%
      </Typography>
      <Typography variant={'body1' as any} sx={style.smallDescription}>
        Less debugging time
      </Typography>
    </VerticalCenterBox>,

    <VerticalCenterBox key={'3'} sx={style.bigNumberContainer}>
      <Typography variant={'h1' as any} sx={style.bigNumber}>
        59.2%
      </Typography>
      <Typography variant={'body1' as any} sx={style.smallDescription}>
        Better code quality
      </Typography>
    </VerticalCenterBox>,
  ]
}

interface BigNumberCarouselProps {
  theme: Theme
  isMobile: boolean
}

const BigNumbersCarousel = ({ theme, isMobile }: BigNumberCarouselProps) => {
  const style = {
    divider: {
      border: '1px #393939 solid',
      height: '80px',
    },
  }
  const [activeIndex, setActiveIndex] = useState(0)
  const [items] = useState(createItems(isMobile))

  const slidePrev = () => setActiveIndex(activeIndex - 1)
  const slideNext = () => setActiveIndex(activeIndex + 1)
  const syncActiveIndexForSwipeGestures = (e: EventObject) =>
    setActiveIndex(e.item)

  const onSlideChanged = (e: EventObject) => {
    syncActiveIndexForSwipeGestures(e)
  }

  return (
    <Box
      sx={{
        borderTop: '1px solid #5E5E5E',
        borderBottom: '1px solid #5E5E5E',
        padding:
          '0px ' +
          (isMobile
            ? theme.customSpacing?.sides.mobile
            : theme.customSpacing?.sides.desktop),
      }}
    >
      <HorizontalCenterBox
        sx={{
          position: 'relative',
          justifyContent: 'space-around',
          borderLeft: '1px solid #5E5E5E',
          borderRight: '1px solid #5E5E5E',
          padding: isMobile ? '30px 0px' : '30px 22px',
        }}
      >
        <AliceCarousel
          responsive={{
            0: { items: 2 },
            1024: { items: 4 },
          }}
          activeIndex={activeIndex}
          autoPlayInterval={2500}
          onSlideChanged={onSlideChanged}
          infinite
          disableSlideInfo
          disableButtonsControls
          disableDotsControls
          touchTracking
          autoPlayControls={false}
          autoPlay
          mouseTracking
          items={items}
          paddingLeft={isMobile ? 0 : 10}
          paddingRight={isMobile ? 0 : 10}
          animationDuration={200}
        />

        <HorizontalCenterBox
          sx={{
            position: 'absolute',
            justifyContent: 'space-around',
            padding: '0px 150px',
            width: '100%',
            height: '100%',
          }}
        >
          <Divider
            orientation={'vertical'}
            style={style.divider as React.CSSProperties}
          />
          {!isMobile && (
            <React.Fragment>
              <Divider
                orientation={'vertical'}
                style={style.divider as React.CSSProperties}
              />
              <Divider
                orientation={'vertical'}
                style={style.divider as React.CSSProperties}
              />
            </React.Fragment>
          )}
        </HorizontalCenterBox>
        <HorizontalCenterBox
          sx={{
            position: 'absolute',
            bottom: '-55px',
            right: '0px',
            height: '55px',
            width: '120px',
            borderTop: 'none',
            border: '1px solid #5E5E5E',
          }}
        >
          <IconButton
            onClick={slidePrev}
            sx={{
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  color: '#FFFFFF',
                },
              },
            }}
          >
            <ArrowBackIosIcon
              sx={{ color: '#AEAEAE', height: '20px', width: '20px' }}
            />
          </IconButton>
          <span style={{ width: '12px' }} />
          <IconButton
            onClick={slideNext}
            sx={{
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  color: '#FFFFFF',
                },
              },
            }}
          >
            <ArrowForwardIosIcon
              sx={{ color: '#AEAEAE', height: '20px', width: '20px' }}
            />
          </IconButton>
        </HorizontalCenterBox>
      </HorizontalCenterBox>
    </Box>
  )
}

const renderFetchingMetrics = () => {
  return (
    <HorizontalLeftAlignBox
      sx={{
        padding: '32px 22px',
      }}
    >
      <GradientCircularProgress />
      <Typography
        variant={'body1'}
        sx={{ color: '#7B5DFE', marginLeft: '12px' }}
      >
        Fetching key metrics ...
      </Typography>
    </HorizontalLeftAlignBox>
  )
}

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={18}
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
    </React.Fragment>
  )
}
