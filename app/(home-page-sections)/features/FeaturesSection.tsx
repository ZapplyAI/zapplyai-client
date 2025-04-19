'use client'
import React from 'react'
import { Box, Grid, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import DecorRect from '@/app/(components)/DecorRect'
import CodeIcon from '@mui/icons-material/Code'
import BugReportIcon from '@mui/icons-material/BugReport'
import SpeedIcon from '@mui/icons-material/Speed'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'

interface FeaturesSectionProps {
  isMobile: boolean
}

// Feature card component
const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  gradient 
}: { 
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        padding: '30px',
        height: '100%',
        border: '1px solid rgba(119, 94, 255, 0.3)',
        background: 'rgba(10, 9, 14, 0.7)',
        backdropFilter: 'blur(5px)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(119, 94, 255, 0.2)',
        },
      }}
    >
      <Box
        sx={{
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          background: gradient,
          color: '#FFFFFF',
          fontSize: '30px'
        }}
      >
        {icon}
      </Box>
      
      <Typography
        variant={'h3' as any}
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '15px',
          fontFamily: 'Tektur, sans-serif',
          color: '#FFFFFF',
        }}
      >
        {title}
      </Typography>
      
      <Typography
        variant={'body1' as any}
        sx={{
          fontSize: '1rem',
          color: '#AEAEAE',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 300,
        }}
      >
        {description}
      </Typography>
      
      <DecorRect sx={{ bottom: '10px', right: '10px' }} />
    </Box>
  )
}

export const FeaturesSection = ({ isMobile }: FeaturesSectionProps) => {
  const theme = useTheme()
  
  const features = [
    {
      title: 'Context-Aware Assistance',
      description: 'Elastic Copilot understands your entire codebase, providing suggestions that fit perfectly with your existing code.',
      icon: <CodeIcon sx={{ fontSize: 30 }} />,
      gradient: 'linear-gradient(135deg, #775EFF, #9D5DFE)',
    },
    {
      title: 'Intelligent Bug Detection',
      description: 'Identify and fix bugs before they become problems with our advanced error detection system.',
      icon: <BugReportIcon sx={{ fontSize: 30 }} />,
      gradient: 'linear-gradient(135deg, #9D5DFE, #DE3AED)',
    },
    {
      title: 'Accelerated Development',
      description: 'Write code faster with smart autocompletions and full function generation based on your comments.',
      icon: <SpeedIcon sx={{ fontSize: 30 }} />,
      gradient: 'linear-gradient(135deg, #DE3AED, #ED3A93)',
    },
    {
      title: 'Seamless Integration',
      description: 'Works with your favorite IDEs and tools, enhancing your existing workflow without disruption.',
      icon: <IntegrationInstructionsIcon sx={{ fontSize: 30 }} />,
      gradient: 'linear-gradient(135deg, #ED3A93, #775EFF)',
    },
  ]

  return (
    <Box
      sx={{
        position: 'relative',
        padding: isMobile ? '60px 20px' : '100px 0',
        background: '#0A090E',
      }}
    >
      <Box
        sx={{
          margin: `0px ${isMobile ? theme.customSpacing?.sides.mobile : theme.customSpacing?.sides.desktop}`,
          position: 'relative',
        }}
      >
        <Box sx={{ textAlign: 'left', marginBottom: '60px' }}>
          <Typography
            variant={'h2' as any}
            sx={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 600,
              marginBottom: '20px',
              fontFamily: 'Orbitron, sans-serif',
              color: '#FFFFFF',
            }}
          >
            Supercharge Your Coding
          </Typography>
          
          <Typography
            variant={'body1' as any}
            sx={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: '#AEAEAE',
              fontFamily: 'JetBrains Mono, monospace',
              maxWidth: '800px',
              margin: '0',
            }}
          >
            Elastic Copilot combines AI power with developer-focused features to transform how you write code.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
              />
            </Grid>
          ))}
        </Grid>
        
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-30px',
            left: isMobile ? '20px' : '100px',
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(119, 94, 255, 0), rgba(119, 94, 255, 1))',
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            bottom: '-30px',
            right: isMobile ? '20px' : '100px',
            width: '1px',
            height: '60px',
            background: 'linear-gradient(to top, rgba(119, 94, 255, 0), rgba(119, 94, 255, 1))',
          }}
        />
      </Box>
    </Box>
  )
}
