import Typography from '@mui/material/Typography'
import {
  HorizontalCenterBox,
  VerticalCenterBox,
} from '@/components/layouts/CenterBox'
import { Box, Divider, IconButton, Theme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AliceCarousel, { EventObject } from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

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

export const BigNumbersCarousel = ({
  theme,
  isMobile,
}: BigNumberCarouselProps) => {
  const style = {
    divider: {
      border: '1px #393939 solid',
      height: '80px',
    },
  }
  const [activeIndex, setActiveIndex] = useState(0)

  const [items, setItems] = useState<React.ReactNode[]>([])

  useEffect(() => {
    setItems(createItems(isMobile))
  }, [isMobile])

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
