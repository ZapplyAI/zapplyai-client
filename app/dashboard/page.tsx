'use client'
import React from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { Box, LinearProgress, Typography } from '@mui/material'
import { useDashboard } from './DashboardContext'

// Custom usage progress component
const UsageProgress = ({ 
  current, 
  max,
  label
}: { 
  current: number; 
  max: number;
  label: string;
}) => {
  // Calculate percentage for progress bar
  const percentage = (current / max) * 100;
  
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="#AAAAAA">
          {label}
        </Typography>
        <Typography variant="body2" color="#AAAAAA">
          {current.toLocaleString()} / {max.toLocaleString()}
        </Typography>
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        sx={{ 
          height: 8,
          width: '100%',
          maxWidth: '400px',
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(to right, #775EFF, #FF5EBF)',
            borderRadius: 4,
          }
        }} 
      />
    </Box>
  );
};

export default function MainPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { 
    requestsUsedIndividual,
    maxRequestsIndividual,
    requestsUsedTeam,
    maxRequestsTeam,
    subscriptionType
  } = useDashboard()

  // Only show team usage if on a team plan
  const showTeamUsage = subscriptionType === 'team'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        maxWidth: '800px',
        alignSelf: 'flex-start',
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Usage Dashboard
      </Typography>
      
      <Box 
        sx={{ 
          mb: 4,
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          padding: '16px 24px',
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, color: '#E5E5E5' }}>
          Your Usage
        </Typography>
        
        <UsageProgress 
          label="API Requests" 
          current={requestsUsedIndividual} 
          max={maxRequestsIndividual} 
        />
      </Box>
      
      {/* Team Usage - only show if on team plan */}
      {showTeamUsage && (
        <Box 
          sx={{ 
            border: '1px solid #5E5E5E',
            borderRadius: '12px',
            padding: '16px 24px',
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, color: '#E5E5E5' }}>
            Team Usage
          </Typography>
          
          <UsageProgress 
            label="Team API Requests" 
            current={requestsUsedTeam} 
            max={maxRequestsTeam} 
          />
        </Box>
      )}
    </Box>
  )
}
