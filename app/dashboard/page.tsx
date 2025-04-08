'use client'
import React from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { Box, Divider, LinearProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useDashboard } from './DashboardContext'

// Custom token usage progress bar component
const TokenUsageProgress = ({ 
  currentTokens, 
  maxTokens 
}: { 
  currentTokens: number; 
  maxTokens: number 
}) => {
  // Calculate percentage for progress bar
  const percentage = (currentTokens / maxTokens) * 100;
  
  return (
    <Box sx={{ width: '100%' }}>
      {/* Token count display */}
      <Box sx={{ mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="#FFFFFF">
          {currentTokens.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="#FFFFFF">
          {maxTokens.toLocaleString()}
        </Typography>
      </Box>
      
      {/* Progress bar without label */}
      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        sx={{ 
          height: 22, // Increased height as requested
          borderRadius: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#6366F1'
          }
        }} 
      />
    </Box>
  );
};

// Token usage section component
const TokenUsageDisplay = ({ 
  title, 
  currentTokens, 
  maxTokens 
}: { 
  title: string; 
  currentTokens: number; 
  maxTokens: number 
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: '#FFFFFF' }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TokenUsageProgress 
        currentTokens={currentTokens} 
        maxTokens={maxTokens} 
      />
    </Box>
  );
};

export default function MainPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { 
    apiTokensUsedIndividual, 
    maxApiTokensIndividual, 
    apiTokensUsedTeam, 
    maxApiTokensTeam,
    subscriptionType
  } = useDashboard()

  // Only show team token usage if on a team plan
  const showTeamUsage = subscriptionType === 'team'

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          padding: '24px',
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ mb: 4, width: '100%' }}>
          {/* Individual Token Usage */}
          <TokenUsageDisplay 
            title="Individual Token Usage" 
            currentTokens={apiTokensUsedIndividual} 
            maxTokens={maxApiTokensIndividual} 
          />
          
          {/* Team Token Usage - only show if on team plan */}
          {showTeamUsage && (
            <TokenUsageDisplay 
              title="Team Token Usage" 
              currentTokens={apiTokensUsedTeam} 
              maxTokens={maxApiTokensTeam} 
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
