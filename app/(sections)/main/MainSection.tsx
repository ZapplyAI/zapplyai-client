import Typography from '@mui/material/Typography'
import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import { Box, CircularProgress, useTheme } from '@mui/material'
import ClippedButton from '@/app/(components)/ClippedButton'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import DecorRect from '@/app/(components)/DecorRect'
import 'react-alice-carousel/lib/alice-carousel.css'
import LoadingAnimHUD from '@/app/(components)/LoadingAnimHUD'
import { BigNumbersCarousel } from '@/app/(sections)/main/(components)/BigNumbersCarousel'

interface MainSectionProps {
  showAlert: any
  isMobile: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

const ParticleFlowingAnim = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particleCount = 40
    const particles: Particle[] = []
    const colors = ['#775EFF', '#DE3AED', '#ED3A93', '#7B5DFE', '#9D5DFE']

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 180) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const alpha = 0.2 * (1 - distance / 180)
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(0, `rgba(119, 94, 255, ${alpha})`)
            gradient.addColorStop(1, `rgba(222, 58, 237, ${alpha})`)
            ctx.strokeStyle = gradient
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '90vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
        maxHeight: '800px'
      }}
    />
  )
}

export const MainSection = ({ showAlert, isMobile }: MainSectionProps) => {
  const theme = useTheme()

  return (
    <React.Fragment>
      <ParticleFlowingAnim />
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
              variant={'h1' as any}
              sx={{
                background: 'linear-gradient(90deg, #775EFF, #DE3AED, #ED3A93)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                marginBottom: isMobile ? '30px' : '24px',
                paddingRight: isMobile ? '12px' : 'auto',
                fontSize: isMobile ? '2.5rem' : '3.5rem',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Code Smarter, Ship Faster, Dream Bigger—Meet Elastic Copilot
            </Typography>

            <Typography
              variant={'h4' as any}
              sx={{ 
                maxWidth: '90%', 
                marginBottom: isMobile ? '40px' : '50px',
                fontSize: isMobile ? '1.25rem' : '1.75rem',
                color: '#AEAEAE',
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
              }}
            >
              Code generation, bug fixes, and everything in between—seamlessly powered by next-level Copilot.
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
          Intro video is still in production!
        </Typography>
      </HorizontalCenterBox>
    </HorizontalCenterBox>
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
