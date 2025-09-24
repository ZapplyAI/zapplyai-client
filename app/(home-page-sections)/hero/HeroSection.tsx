'use client'
import React from 'react'
import { Box, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import DecorRect from '@/app/(components)/DecorRect'
import ClippedButton from '@/app/(components)/ClippedButton'
import { EXTENSION_URL } from '@/constants'

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
        color: colors[Math.floor(Math.random() * colors.length)],
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
        maxHeight: '900px',
      }}
    />
  )
}

export const HeroSection = ({ isMobile, showAlert }: HeroSectionProps) => {
  const theme = useTheme()

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <ParticleAnimation />

      <Box
        sx={{
          margin: `0px ${
            isMobile
              ? theme.customSpacing?.sides.mobile
              : theme.customSpacing?.sides.desktop
          }`,
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
            Enhance code quality with full model context
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
            Write high-quality code in VS Code with Elastic Co-Pilot. Leverage
            the full context window of industry-leading AI models and deliver
            production-ready projects. No context caps, EVER.
          </Typography>

          <Box sx={{ display: 'flex', gap: '20px', marginBottom: '50px' }}>
            <a href={EXTENSION_URL} target={'_blank'} rel={'noreferrer'}>
              <ClippedButton
                sx={{
                  fontFamily: 'Tektur, sans-serif',
                  fontSize: '1.1rem',
                  padding: '12px 24px',
                }}
              >
                Download For VS Code
              </ClippedButton>
            </a>
          </Box>
        </Box>
        <DecorRect sx={{ top: '20px', right: '20px' }} />
        <DecorRect sx={{ bottom: '20px', left: '20px' }} />
      </Box>
    </Box>
  )
}
