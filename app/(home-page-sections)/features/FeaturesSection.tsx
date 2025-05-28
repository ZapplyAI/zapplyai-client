'use client'
import React from 'react'
import { Box, Grid, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import DecorRect from '@/app/(components)/DecorRect'
import CodeIcon from '@mui/icons-material/Code'
import BugReportIcon from '@mui/icons-material/BugReport'
import SpeedIcon from '@mui/icons-material/Speed'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import TerminalIcon from '@mui/icons-material/Terminal'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import WebIcon from '@mui/icons-material/Web'
import HistoryIcon from '@mui/icons-material/History'

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
      title: 'Terminal Access',
      description: 'Execute commands, install packages, run tests, and perform system operations directly from VS Code.',
      icon: <TerminalIcon sx={{ fontSize: 30 }} />,
      gradient: 'linear-gradient(135deg, #775EFF, #9D5DFE)',
    },
    {
      title: 'File System Integration',
      description: 'Create, modify, and organize files and directories with full understanding of your project structure.',
      icon: <FolderOpenIcon sx={{ fontSize: 30 }} />,
      gradient: 'linear-gradient(135deg, #9D5DFE, #DE3AED)',
    },
    {
      title: 'In-Editor Browser',
      description: 'Test web applications in real-time with an integrated browser that shows you exactly how your code works.',
      icon: <WebIcon sx={{ fontSize: 30 }} />,
      gradient: 'linear-gradient(135deg, #DE3AED, #ED3A93)',
    },
    {
      title: 'Development History',
      description: 'Every step of development is captured, allowing you to review the process and go back to any point in time.',
      icon: <HistoryIcon sx={{ fontSize: 30 }} />,
      gradient: 'linear-gradient(135deg, #ED3A93, #775EFF)',
    },
  ]

  return (
    <Box
      id="features"
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
