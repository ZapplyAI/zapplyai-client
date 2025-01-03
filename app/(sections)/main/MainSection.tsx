import Typography from '@mui/material/Typography'
import {
  HorizontalCenterBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import { Box, Divider, IconButton } from '@mui/material'
import ClippedButton from '@/app/(components)/ClippedButton'
import Image from 'next/image'
import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface MainSectionProps {
  showAlert: any
}

export const MainSection = ({showAlert} : MainSectionProps) => {
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="start"
        alignItems="normal"
        flexDirection="row"
        sx={{
          margin: '0px 12vw',
          border: '1px solid #5E5E5E',
          borderTop: 'none',
          borderBottom: 'none',
          position: 'relative',
        }}
      >
        {renderStickySocialLinks()}

        <VerticalLeftAlignBox
          sx={{
            padding: '30px',
          }}
        >
          <VerticalLeftAlignBox
            sx={{ justifyContent: 'start', marginBottom: '60px' }}
          >
            <Typography
              variant={'h5' as any}
              sx={{
                background: 'linear-gradient(90deg, #775EFF, #DE3AED, #ED3A93)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                marginBottom: '12px',
              }}
            >
              Being a developer is hard? Let’s make things simple!
            </Typography>

            <Typography
              variant={'h5' as any}
              sx={{ maxWidth: '90%', marginBottom: '40px' }}
            >
              With Elastic development process becomes a piece-of-cake. Pair
              programming with our AI-assistant will save you 50% of your time
              developing things.
            </Typography>

            {renderLoadingHUD()}
          </VerticalLeftAlignBox>

          {renderVideo()}
        </VerticalLeftAlignBox>

        <VerticalLeftAlignBox
          sx={{ flex: '1', justifyContent: 'space-between' }}
        >
          <VerticalCenterBox
            sx={{
              border: '1px solid #5E5E5E',
              width: '200px',
              padding: '32px',
            }}
          >
            <VerticalCenterBox sx={{ marginBottom: '22px' }}>
              <ClippedButton sx={{ width: '145px' }} onClick={() => showAlert()}>
                <Typography variant={'button' as any}>Free Trial</Typography>
              </ClippedButton>
              <Typography variant={'caption' as any}>
                No card required
              </Typography>
            </VerticalCenterBox>

            <ClippedButton sx={{ width: '145px' }} filled
                           onClick={() => showAlert()}>
              <Typography variant={'button' as any}>Learn more</Typography>
            </ClippedButton>
          </VerticalCenterBox>

          <VerticalCenterBox
            sx={{
              border: '1px solid #5E5E5E',
              width: '200px',
              padding: '32px',
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
            <ClippedButton sx={{ width: '145px', marginTop: '12px' }}
                           onClick={() => showAlert()}>
              <Typography variant={'button' as any}>Contact</Typography>
            </ClippedButton>
          </VerticalCenterBox>
        </VerticalLeftAlignBox>
      </Box>

      {renderBigNumbers()}
    </React.Fragment>
  )
}

const renderStickySocialLinks = () => {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        left: '0',
      }}
    >
      <VerticalCenterBox
        sx={{
          position: 'absolute',
          top: '-1px',
          left: '-70px',
          width: '70px',
          height: '250px',
          justifyContent: 'space-around',
          border: '1px solid #5E5E5E',
        }}
      >
        <Image
          src="/icons/linkedin_icon.png"
          alt="LinkedIn"
          width={38}
          height={38}
        />
        <Image
          src="/icons/telegram_icon.png"
          alt="Telegram"
          width={38}
          height={38}
        />
        <Image src="/icons/twitter_x_icon.png" alt="X" width={38} height={38} />
      </VerticalCenterBox>
    </div>
  )
}

const renderLoadingHUD = () => {
  return (
    <VerticalLeftAlignBox>
      <Typography variant={'body2' as any} sx={{ marginBottom: '5px' }}>
        loading elastic IDE ...
      </Typography>
      <span
        style={{
          position: 'relative',
          width: '200px',
          height: '6px',
          background: '#222222',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '120px',
            height: '6px',
            background: '#E5E5E5',
          }}
        />
      </span>
    </VerticalLeftAlignBox>
  )
}

const renderVideo = () => {
  const style = {
    videoBorders: {
      width: '90%',
      height: '350px',
      boxShadow: `
        0 0 0 200px inset transparent,
        0 0 0 1px inset #999999
       `,
      borderRadius: '0',
      border: '1px',
      clipPath: `
          polygon(
            0% 0.7em,
            calc(0% + 0.7em) 0,
            100% 0,
            100% calc(100% - 0.7em),
            calc(100% - 0.7em) 100%,
            0% 100%
          )
        `,
    },

    rectangle: {
      width: '100%',
      height: '380px',
      position: 'relative',
    },
    corner: {
      position: 'absolute',
      border: '1px solid #999999',
    },
    topLeft: {
      top: '0',
      left: '0',
      width: '110px',
      height: '110px',
      borderRight: 'none',
      borderBottom: 'none',
    },
    topRight: {
      top: '0',
      right: '0',
      width: '110px',
      height: '110px',
      borderLeft: 'none',
      borderBottom: 'none',
    },
    bottomLeft: {
      bottom: '0',
      left: '0',
      width: '110px',
      height: '110px',
      borderRight: 'none',
      borderTop: 'none',
    },
    bottomRight: {
      bottom: '0',
      right: '0',
      width: '110px',
      height: '110px',
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
      <span style={{ width: '90%', height: '81%', background: '#1D1D1D' }}>
        video
      </span>
    </HorizontalCenterBox>
  )
}

const renderBigNumbers = () => {
  const style = {
    bigNumber: {
      fontSize: '40px',
      color: '#AEAEAE',
      fontFamily: 'JetBrains Mono, sans-serif',
      marginBottom: '12px',
    },
    divider: {
      border: '1px #393939 solid',
      height: '80px',
    },
  }

  return (
    <Box
      sx={{
        borderTop: '1px solid #5E5E5E',
        borderBottom: '1px solid #5E5E5E',
        padding: '0px 12vw',
      }}
    >
      <HorizontalCenterBox
        sx={{
          position: 'relative',
          justifyContent: 'space-around',
          borderLeft: '1px solid #5E5E5E',
          borderRight: '1px solid #5E5E5E',
          padding: '30px 22px',
        }}
      >
        <VerticalCenterBox>
          <Typography variant={'h1' as any} sx={style.bigNumber}>
            34.8%
          </Typography>
          <Typography variant={'body1' as any}>
            Productivity increase
          </Typography>
        </VerticalCenterBox>

        <Divider orientation={'vertical'} style={style.divider} />

        <VerticalCenterBox>
          <Typography variant={'h1' as any} sx={style.bigNumber}>
            28.1%
          </Typography>
          <Typography variant={'body1' as any}>Faster development</Typography>
        </VerticalCenterBox>

        <Divider orientation={'vertical'} style={style.divider} />

        <VerticalCenterBox>
          <Typography variant={'h1' as any} sx={style.bigNumber}>
            45.0%
          </Typography>
          <Typography variant={'body1' as any}>Less debugging time</Typography>
        </VerticalCenterBox>

        <Divider orientation={'vertical'} style={style.divider} />

        <VerticalCenterBox>
          <Typography variant={'h1' as any} sx={style.bigNumber}>
            59.2%
          </Typography>
          <Typography variant={'body1' as any}>Better code quality</Typography>
        </VerticalCenterBox>

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
            sx={{
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  color: '#FFFFFF', // Lighter color on hover
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
            sx={{
              '&:hover': {
                '& .MuiSvgIcon-root': {
                  color: '#FFFFFF', // Lighter color on hover
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
