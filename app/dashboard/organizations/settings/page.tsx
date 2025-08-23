'use client'
import React, { useState } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select
} from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import PeopleIcon from '@mui/icons-material/People'
import SaveIcon from '@mui/icons-material/Save'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDashboard, TeamMember } from '../../DashboardContext'
import { format } from 'date-fns'

interface OrganizationData {
  name: string
  seats: number
}

export default function OrganizationSettingsPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { subscriptionType, teamMembers } = useDashboard()
  
  // Mock organization data for demo purposes
  const [organizationData] = useState<OrganizationData>({
    name: 'Acme Corporation',
    seats: 10
  })
  
  const [formData, setFormData] = useState<OrganizationData>({
    name: organizationData.name,
    seats: organizationData.seats
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  
  // Team member management states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [newRole, setNewRole] = useState<'admin' | 'member'>('member')
  
  // Mock current user - in real app this would come from auth context
  const currentUser = teamMembers.find(member => member.id === '1') // John Doe is admin
  const isCurrentUserAdmin = currentUser?.role === 'admin'

  // Only allow access for team subscriptions
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
          Organization Settings
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          Organization settings are only available with a Team subscription plan.
          Please upgrade your subscription to access organization management features.
        </Typography>
      </Box>
    )
  }

  const handleInputChange = (field: keyof OrganizationData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'seats' ? parseInt(event.target.value) || 0 : event.target.value
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
    setSuccess(false)
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess(false)

    // Validation
    if (!formData.name.trim()) {
      setError('Organization name is required')
      return
    }

    if (formData.seats < 1) {
      setError('Number of seats must be at least 1')
      return
    }

    if (formData.seats > 1000) {
      setError('Number of seats cannot exceed 1000')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
      console.log('Organization updated:', formData)
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy')
    } catch (e) {
      return dateString
    }
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, member: TeamMember) => {
    setAnchorEl(event.currentTarget)
    setSelectedMember(member)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedMember(null)
  }

  const handleEditRole = () => {
    if (selectedMember) {
      setNewRole(selectedMember.role)
      setEditDialogOpen(true)
    }
    handleMenuClose()
  }

  const handleDeleteMember = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleSaveRole = () => {
    if (selectedMember) {
      console.log(`Updating ${selectedMember.name} role to ${newRole}`)
      // Here you would call API to update the role
      setEditDialogOpen(false)
      setSelectedMember(null)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedMember) {
      console.log(`Deleting member: ${selectedMember.name}`)
      // Here you would call API to delete the member
      setDeleteDialogOpen(false)
      setSelectedMember(null)
    }
  }

  const hasChanges = 
    formData.name !== organizationData.name || 
    formData.seats !== organizationData.seats

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
        Organization Settings
      </Typography>

      <Card
        sx={{
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          backgroundColor: 'transparent',
          mb: 3,
        }}
      >
        <CardContent sx={{ padding: '24px' }}>
          <Typography variant="h6" sx={{ mb: 3, color: '#E5E5E5', display: 'flex', alignItems: 'center' }}>
            <BusinessIcon sx={{ mr: 1 }} />
            Organization Details
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Organization Name"
              value={formData.name}
              onChange={handleInputChange('name')}
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon sx={{ color: '#5E5E5E' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
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
                '& .MuiInputLabel-root': {
                  color: '#AAAAAA',
                },
                '& .MuiInputBase-input': {
                  color: '#E5E5E5',
                },
              }}
            />

            <TextField
              label="Number of Seats"
              type="number"
              value={formData.seats}
              onChange={handleInputChange('seats')}
              fullWidth
              variant="outlined"
              inputProps={{
                min: 1,
                max: 1000,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleIcon sx={{ color: '#5E5E5E' }} />
                  </InputAdornment>
                ),
              }}
              helperText="Maximum 1000 seats allowed"
              sx={{
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
                '& .MuiInputLabel-root': {
                  color: '#AAAAAA',
                },
                '& .MuiInputBase-input': {
                  color: '#E5E5E5',
                },
                '& .MuiFormHelperText-root': {
                  color: '#AAAAAA',
                },
              }}
            />
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 2,
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                border: '1px solid #d32f2f',
                color: '#d32f2f',
              }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 2,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid #4caf50',
                color: '#4caf50',
              }}
            >
              Organization settings updated successfully!
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              disabled={isLoading || !hasChanges}
              sx={{
                background: hasChanges 
                  ? 'linear-gradient(to right, #775EFF, #FF5EBF)'
                  : '#5E5E5E',
                '&:hover': {
                  background: hasChanges 
                    ? 'linear-gradient(to right, #6B52E6, #E654AB)'
                    : '#5E5E5E',
                },
                '&:disabled': {
                  background: '#5E5E5E',
                  color: '#AAAAAA',
                },
                transition: 'all 0.2s ease-out',
              }}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Team Members Table */}
      <Card
        sx={{
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          backgroundColor: 'transparent',
          mb: 3,
        }}
      >
        <CardContent sx={{ padding: '24px' }}>
          <Typography variant="h6" sx={{ mb: 3, color: '#E5E5E5', display: 'flex', alignItems: 'center' }}>
            <PeopleIcon sx={{ mr: 1 }} />
            Team Members ({teamMembers.length})
          </Typography>

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#AAAAAA', borderBottom: '1px solid #5E5E5E', fontWeight: 600 }}>
                    Member
                  </TableCell>
                  <TableCell sx={{ color: '#AAAAAA', borderBottom: '1px solid #5E5E5E', fontWeight: 600 }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: '#AAAAAA', borderBottom: '1px solid #5E5E5E', fontWeight: 600 }}>
                    Role
                  </TableCell>
                  <TableCell sx={{ color: '#AAAAAA', borderBottom: '1px solid #5E5E5E', fontWeight: 600 }}>
                    Joined
                  </TableCell>
                  {isCurrentUserAdmin && (
                    <TableCell sx={{ color: '#AAAAAA', borderBottom: '1px solid #5E5E5E', fontWeight: 600, width: '60px' }}>
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMembers.map((member: TeamMember) => (
                  <TableRow 
                    key={member.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                      transition: 'background-color 0.2s ease-out',
                    }}
                  >
                    <TableCell 
                      sx={{ 
                        borderBottom: '1px solid #5E5E5E',
                        color: '#E5E5E5',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: member.role === 'admin' ? '#775EFF' : '#5E5E5E',
                            width: 32,
                            height: 32,
                            mr: 2,
                            fontSize: '14px'
                          }}
                        >
                          {member.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#E5E5E5', fontWeight: 500 }}>
                          {member.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        borderBottom: '1px solid #5E5E5E',
                        color: '#AAAAAA',
                      }}
                    >
                      {member.email}
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        borderBottom: '1px solid #5E5E5E',
                      }}
                    >
                      <Chip 
                        label={member.role} 
                        size="small"
                        sx={{ 
                          bgcolor: member.role === 'admin' ? 'rgba(119, 94, 255, 0.1)' : 'transparent',
                          border: '1px solid',
                          borderColor: member.role === 'admin' ? '#775EFF' : '#5E5E5E',
                          color: member.role === 'admin' ? '#775EFF' : '#E5E5E5',
                          fontSize: '12px',
                          height: '24px',
                        }}
                      />
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        borderBottom: '1px solid #5E5E5E',
                        color: '#AAAAAA',
                      }}
                    >
                      {formatDate(member.joinedAt)}
                    </TableCell>
                    {isCurrentUserAdmin && (
                      <TableCell 
                        sx={{ 
                          borderBottom: '1px solid #5E5E5E',
                          width: '60px',
                        }}
                      >
                        {member.id !== currentUser?.id && ( // Don't show menu for current user
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, member)}
                            sx={{ 
                              color: '#AAAAAA',
                              '&:hover': {
                                color: '#E5E5E5',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              },
                              transition: 'all 0.2s ease-out',
                            }}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: '#2A2A2A',
            border: '1px solid #5E5E5E',
            '& .MuiMenuItem-root': {
              color: '#E5E5E5',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleEditRole}>
          <EditIcon sx={{ mr: 1, fontSize: '18px' }} />
          Edit Role
        </MenuItem>
        <MenuItem onClick={handleDeleteMember} sx={{ color: '#d32f2f !important' }}>
          <DeleteIcon sx={{ mr: 1, fontSize: '18px' }} />
          Remove Member
        </MenuItem>
      </Menu>

      {/* Edit Role Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#2A2A2A',
            border: '1px solid #5E5E5E',
            color: '#E5E5E5',
          },
        }}
      >
        <DialogTitle sx={{ color: '#E5E5E5' }}>
          Edit Member Role
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: '#AAAAAA' }}>
            Change role for {selectedMember?.name}
          </Typography>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel sx={{ color: '#AAAAAA' }}>Role</InputLabel>
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as 'admin' | 'member')}
              sx={{
                color: '#E5E5E5',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#5E5E5E',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#7E7E7E',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#775EFF',
                },
              }}
            >
              <MenuItem value="member" sx={{ color: '#E5E5E5' }}>Member</MenuItem>
              <MenuItem value="admin" sx={{ color: '#E5E5E5' }}>Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditDialogOpen(false)}
            sx={{ color: '#AAAAAA' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveRole}
            variant="contained"
            sx={{
              background: 'linear-gradient(to right, #775EFF, #FF5EBF)',
              '&:hover': {
                background: 'linear-gradient(to right, #6B52E6, #E654AB)',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#2A2A2A',
            border: '1px solid #5E5E5E',
            color: '#E5E5E5',
          },
        }}
      >
        <DialogTitle sx={{ color: '#E5E5E5' }}>
          Remove Team Member
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#AAAAAA' }}>
            Are you sure you want to remove <strong style={{ color: '#E5E5E5' }}>{selectedMember?.name}</strong> from the team?
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#d32f2f' }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: '#AAAAAA' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#b71c1c',
              },
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Card
        sx={{
          border: '1px solid #5E5E5E',
          borderRadius: '12px',
          backgroundColor: 'transparent',
        }}
      >
        <CardContent sx={{ padding: '24px' }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#E5E5E5' }}>
            Current Settings
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ color: '#AAAAAA' }}>
                Organization Name:
              </Typography>
              <Typography variant="body1" sx={{ color: '#E5E5E5', fontWeight: 500 }}>
                {organizationData.name}
              </Typography>
            </Box>
            
            <Divider sx={{ borderColor: '#5E5E5E' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ color: '#AAAAAA' }}>
                Number of Seats:
              </Typography>
              <Typography variant="body1" sx={{ color: '#E5E5E5', fontWeight: 500 }}>
                {organizationData.seats}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}