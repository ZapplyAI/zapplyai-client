'use client'
import React from 'react'
import { Box, Button, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import DecorRect from '@/app/(components)/DecorRect'
import Image from 'next/image'
import ClippedButton from '@/app/(components)/ClippedButton'

interface HeroSectionProps {
  isMobile: boolean
  showAlert: () => void
}

// Particle animation component for the hero background
const ParticleAnimation = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
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

    const particleCount = 50
    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
    }[] = []
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
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6,
        maxHeight: '900px'
      }}
    />
  )
}

// Futuristic panel component for the video
const FuturisticVideoPanel = ({ isMobile }: { isMobile: boolean }) => {
  const borderL = '110px'
  const borderL_M = '55px'
  const videoId = 'qjWzH8jk1rk'

  const style = {
    rectangle: {
      width: '100%',
      height: 'auto',
      position: 'relative',
      padding: isMobile ? '4px' : '48px',
      marginTop: '30px',
      marginBottom: '50px',
    },
    corner: {
      pointerEvents: 'none',
      position: 'absolute',
      border: '1px solid #775EFF',
      zIndex: 1,
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
    videoContainer: {
      width: '100%',
      height: 'auto',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '4px',
      background: 'linear-gradient(135deg, rgba(119, 94, 255, 0.1), rgba(222, 58, 237, 0.1))',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(119, 94, 255, 0.3)',
    },
    aspectRatioWrapper: {
      position: 'relative',
      width: '100%',
      paddingTop: '59.25%', // 16:9 aspect ratio (9 / 16 = 0.5625)
    }
  }

  return (
    <HorizontalCenterBox sx={style.rectangle}>
      <Box sx={style.videoContainer}>
        <Box sx={style.aspectRatioWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
            title="Elastic Copilot Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              zIndex: 20,
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            } as React.CSSProperties}
          />
        </Box>
      </Box>
      <div style={{ ...style.corner, ...style.topLeft } as any}></div>
      <div style={{ ...style.corner, ...style.topRight } as any}></div>
      <div style={{ ...style.corner, ...style.bottomLeft } as any}></div>
      <div style={{ ...style.corner, ...style.bottomRight } as any}></div>
    </HorizontalCenterBox>
  )
}


export const HeroSection = ({ isMobile, showAlert }: HeroSectionProps) => {
  const theme = useTheme()

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <ParticleAnimation />

      <Box
        sx={{
          margin: `0px ${isMobile ? theme.customSpacing?.sides.mobile : theme.customSpacing?.sides.desktop}`,
          border: '1px solid rgba(119, 94, 255, 0.3)',
          borderTop: 'none',
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '20px' : '40px',
          background: 'rgba(10, 9, 14, 0.7)',
          backdropFilter: 'blur(10px)',
        }}
      >

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant={'h1' as any}
            sx={{
              background: 'linear-gradient(90deg, #775EFF, #DE3AED, #ED3A93)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              marginBottom: isMobile ? '30px' : '24px',
              fontSize: isMobile ? '2.8rem' : '4rem',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              fontFamily: 'Orbitron, sans-serif',
              maxWidth: isMobile ? '100%' : '850%',
            }}
          >
            Revolutionize Your Coding Experience with Elastic Copilot
          </Typography>

          <Typography
            variant={'h4' as any}
            sx={{
              maxWidth: isMobile ? '100%' : '85%',
              marginBottom: isMobile ? '40px' : '50px',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              color: '#AEAEAE',
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            A VS Code extension that accesses your terminal, file system, and uses an in-editor browser to show real-time testing. Every development step is captured for future reference.
          </Typography>

          <Box sx={{ display: 'flex', gap: '20px', marginBottom: '50px' }}>

            <ClippedButton
              onClick={showAlert}
              sx={{
                fontFamily: 'Tektur, sans-serif',
                fontSize: '1.1rem',
                padding: '12px 24px',
              }}
            >
              Watch Demo
            </ClippedButton>
          </Box>
        </Box>

        <FuturisticVideoPanel isMobile={isMobile} />

        <DecorRect sx={{ top: '20px', right: '20px' }} />
        <DecorRect sx={{ bottom: '20px', left: '20px' }} />
      </Box>
    </Box>
  )
}
