'use client'
import React, { useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  TextField, 
  Typography,
  Avatar,
  Chip
} from '@mui/material'
import { useDashboard, TeamMember } from '@/app/dashboard/DashboardContext'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EmailIcon from '@mui/icons-material/Email'
import { format } from 'date-fns'

export default function MembersPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { teamMembers, inviteTeamMember, subscriptionType } = useDashboard()
  const [email, setEmail] = useState('')
  const [isInviting, setIsInviting] = useState(false)
  const [inviteError, setInviteError] = useState('')
  const [inviteSuccess, setInviteSuccess] = useState(false)

  // Only team subscription should access this page
  if (subscriptionType !== 'team') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '24px',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Team Members Management
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          This feature is only available with a Team subscription plan.
          Please upgrade your subscription to access team management features.
        </Typography>
      </Box>
    )
  }

  const handleInvite = async () => {
    if (!email) {
      setInviteError('Please enter an email address')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInviteError('Please enter a valid email address')
      return
    }

    setIsInviting(true)
    setInviteError('')
    setInviteSuccess(false)

    try {
      const success = await inviteTeamMember(email)
      if (success) {
        setEmail('')
        setInviteSuccess(true)
      } else {
        setInviteError('Failed to send invitation. Please try again.')
      }
    } catch (error) {
      setInviteError('An error occurred. Please try again.')
    } finally {
      setIsInviting(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy')
    } catch (e) {
      return dateString
    }
  }

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
        Team Members
      </Typography>
      
      <Box 
        sx={{ 
          mb: 4,
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: '#E5E5E5' }}>
          Current Members ({teamMembers.length})
        </Typography>
        <List sx={{ p: 0 }}>
          {teamMembers.map((member: TeamMember) => (
            <React.Fragment key={member.id}>
              <ListItem
                sx={{
                  py: 2,
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 1 : 0, mr: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: member.role === 'admin' ? '#775EFF' : '#5E5E5E',
                      width: 36,
                      height: 36,
                      mr: 2
                    }}
                  >
                    {member.name.charAt(0)}
                  </Avatar>
                  <ListItemText 
                    primary={member.name} 
                    secondary={member.email}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  ml: isMobile ? 0 : 'auto'
                }}>
                  <Chip 
                    label={member.role} 
                    size="small"
                    sx={{ 
                      mr: 2,
                      bgcolor: member.role === 'admin' ? 'rgba(119, 94, 255, 0.1)' : 'transparent',
                      border: '1px solid',
                      borderColor: member.role === 'admin' ? '#775EFF' : '#5E5E5E',
                      color: member.role === 'admin' ? '#775EFF' : '#E5E5E5',
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    Joined {formatDate(member.joinedAt)}
                  </Typography>
                </Box>
              </ListItem>
              <Divider component="li" sx={{ 
                '&:last-child': { display: 'none' } 
              }} />
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box 
        sx={{ 
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, color: '#E5E5E5' }}>
          Invite New Member
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!inviteError}
            helperText={inviteError}
            fullWidth
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#5E5E5E',
                },
                '&:hover fieldset': {
                  borderColor: '#7E7E7E',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#775EFF',
                },
              },
            }}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, color: '#5E5E5E' }} />,
            }}
          />
          
          {inviteSuccess && (
            <Typography 
              variant="body2" 
              sx={{ color: '#4CAF50', mb: 2 }}
            >
              Invitation sent successfully!
            </Typography>
          )}
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={handleInvite}
            disabled={isInviting}
            sx={{ 
              alignSelf: 'flex-start',
              background: 'linear-gradient(to right, #775EFF, #FF5EBF)',
            }}
          >
            {isInviting ? 'Sending...' : 'Send Invitation'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
