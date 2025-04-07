'use client'
import React, { useEffect, useRef } from 'react'
import { Box, Theme, useTheme } from '@mui/material'
import {
  HorizontalLeftAlignBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import DecorRect from '@/app/(components)/DecorRect'
import { CodedItemStack } from '@/app/(home-page-sections)/detailListing/(components)/CodedItemStack'

interface ContextAwareProps {
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
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8
      }}
    />
  )
}

// eslint-disable-next-line react/display-name
export const ContextAware = React.forwardRef(
  ({ isMobile }: ContextAwareProps, ref) => {
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
      <React.Fragment>
        <ParticleFlowingAnim />
        <Box
          ref={ref}
          sx={{
            width: '100%',
            position: 'relative',
            marginBottom: '100px',
          }}
        >
          <Box
            sx={{
              overflow: isMobile ? 'hidden' : 'visible',
              margin:
                '0px ' +
                (isMobile
                  ? theme.customSpacing?.sides.mobile
                  : theme.customSpacing?.sides.desktop),
              border: '1px solid transparent',
              borderImage: 'linear-gradient(180deg, #5E5E5E, #28272A) 1',
              borderTop: 'none',
              borderBottom: 'none',
              padding: '48px 0',
              background: 'linear-gradient(180deg, rgba(25, 25, 30, 0.95), rgba(25, 25, 30, 0.85))',
              backdropFilter: 'blur(12px)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(119, 94, 255, 0.05), transparent 70%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box sx={style.mainIllustration as any}>
              {renderContextAwareIllustration(theme, isMobile)}
            </Box>
            {isMobile && (
              <Box sx={{ paddingBottom: isMobile ? '100px' : 0 }}>
                <CodedItemStack
                  isMobile
                  items={[
                    ['100% project coverage'],
                    ['Always searching'],
                    ['Knows more then code'],
                  ]}
                  ctaButtonItems={['check autocomplete examples']}
                  activeItem={0}
                />
              </Box>
            )}
          </Box>
        </Box>
      </React.Fragment>
    )
  }
)

const renderContextAwareIllustration = (theme: Theme, isMobile: boolean) => {
  return (
    <VerticalLeftAlignBox>
      <HorizontalLeftAlignBox
        sx={{
          position: 'relative',
          border: '1px solid transparent',
          borderLeft: 'none',
          borderImage: 'linear-gradient(180deg, #5E5E5E, #28272A) 1',
          marginBottom: '32px',
        }}
      >
        <Typography
          variant={'h1' as any}
          sx={{
            padding: isMobile ? '28px 45px' : '28px 55px',
            marginLeft:
              'calc(' +
              (isMobile
                ? theme.customSpacing?.sides.mobile
                : theme.customSpacing?.sides.desktop) +
              ' - 1px)',
            border: '1px solid transparent',
            borderRight: 'none',
            borderTop: 'none',
            borderBottom: 'none',
            borderImage: 'linear-gradient(180deg, #5E5E5E, #28272A) 1',
            background:
              'linear-gradient(90deg, #775EFF 0%, #DE3AED 50%, #ED3A3D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            fontSize: isMobile ? '3rem' : '4rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
          }}
        >
          Context aware
          <DecorRect sx={{ top: '8px', right: '8px' }} />
        </Typography>
      </HorizontalLeftAlignBox>

      <Box
        sx={{
          background: 'rgba(17, 17, 21, 0.85)',
          padding: '56px',
          borderRadius: '16px',
          border: '1px solid rgba(119, 94, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(119, 94, 255, 0.1), 0 0 20px rgba(119, 94, 255, 0.15)',
          maxWidth: '900px',
          margin: '0 auto',
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
        <Typography
          variant={'body1' as any}
          sx={{
            fontSize: isMobile ? '1.2rem' : '1.4rem',
            lineHeight: 1.7,
            color: '#F5F5F5',
            textAlign: 'center',
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          From automating repetitive boilerplate to pinpointing complex bugs, <br/>
          our Copilot goes beyond simple code suggestions to help you deliver better software, faster.
        </Typography>
      </Box>
    </VerticalLeftAlignBox>
  )
}
