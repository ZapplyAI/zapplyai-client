'use client'
import React, { useState, useEffect } from 'react'
import { useClientMediaQuery } from '@/helpers/IsMobile'
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Card,
  CardContent,
  CircularProgress,
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
import useUserProfile from '@/lib/hooks/useUserProfile'
import organizations from '@/services/organization'
import { format } from 'date-fns'

interface OrganizationData {
  name: string
  seats: number
}

export default function OrganizationSettingsPage() {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { subscriptionType, teamMembers } = useDashboard()
  const { profile, isProfileLoading } = useUserProfile()

  // Real organization data from API
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null)
  const [formData, setFormData] = useState<OrganizationData>({
    name: '',
    seats: 0
  })

  // Real team members data from API
  const [realTeamMembers, setRealTeamMembers] = useState<any[]>([])
  const [isLoadingMembers, setIsLoadingMembers] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingOrg, setIsLoadingOrg] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Team member management states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [newRole, setNewRole] = useState<string>('MEMBER')

  // Fetch team members data
  const fetchTeamMembers = async (orgId: string) => {
    setIsLoadingMembers(true)
    try {
      const result = await organizations.getMembers(orgId)

      if (result.success && result.response) {
        // Transform API response to match the expected format
        const members = result.response.Data || []
        setRealTeamMembers(members)
      } else {
        console.error('Failed to load team members:', result.response)
        setRealTeamMembers([])
      }
    } catch (err) {
      console.error('Error fetching team members:', err)
      setRealTeamMembers([])
    } finally {
      setIsLoadingMembers(false)
    }
  }

  // Fetch organization data when profile is available
  useEffect(() => {
    const fetchOrganizationData = async () => {
      if (!profile?.organization?.id) {
        setError('No organization found for this user')
        return
      }

      setIsLoadingOrg(true)
      setError('')

      try {
        const result = await organizations.getOrganization(profile.organization.id)

        if (result.success && result.response) {
          const orgData = {
            name: result.response.name || '',
            seats: result.response.seats || 0
          }
          setOrganizationData(orgData)
          setFormData(orgData)
        } else {
          setError(result.response || 'Failed to load organization data')
        }

        // Also fetch team members
        await fetchTeamMembers(profile.organization.id)

      } catch (err) {
        console.error('Error fetching organization:', err)
        setError('Failed to load organization data')
      } finally {
        setIsLoadingOrg(false)
      }
    }

    if (profile && !isProfileLoading) {
      void fetchOrganizationData()
    }
  }, [profile, isProfileLoading])

  // Get current user's role from profile
  const isCurrentUserAdmin = profile?.organization?.role === 'ADMIN'

  // Use real team members data instead of mock data
  const displayMembers = realTeamMembers.length > 0 ? realTeamMembers : teamMembers

  // Only allow access if user has an organization
  if (!profile?.organization) {
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
          You don&apos;t have access to any organization.
          Please contact your organization administrator or create an organization to access these features.
        </Typography>
      </Box>
    )
  }

  // Show loading state while fetching organization data
  if (isLoadingOrg || isProfileLoading) {
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
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body1">Loading organization data...</Typography>
      </Box>
    )
  }

  // Show error state if organization data failed to load
  if (error && !organizationData) {
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
        <Typography variant="h6" sx={{ mb: 2, color: 'error.main' }}>
          Error Loading Organization
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      </Box>
    )
  }

  // Don't render the form until we have organization data
  if (!organizationData) {
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
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body1">Loading organization data...</Typography>
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

    if (!profile?.organization?.id) {
      setError('Organization ID not found')
      return
    }

    setIsLoading(true)

    try {
      const result = await organizations.updateOrganization(profile.organization.id, {
        name: formData.name.trim(),
        seats: formData.seats
      })

      if (result.success) {
        setSuccess(true)
        setOrganizationData(formData)
        console.log('Organization updated successfully:', formData)
      } else {
        setError(result.response || 'Failed to update organization')
      }
    } catch (err) {
      console.error('Error updating organization:', err)
      setError('Failed to update organization')
    } finally {
      setIsLoading(false)
    }
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
      setNewRole(selectedMember.role.toUpperCase()) // Ensure uppercase format
      setEditDialogOpen(true)
    }
    handleMenuClose()
  }

  const handleDeleteMember = () => {
    setDeleteDialogOpen(true)
    handleMenuClose()
  }

  const handleSaveRole = async () => {
    if (!selectedMember || !profile?.organization?.id) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await organizations.updateMember(
        profile.organization.id,
        selectedMember.id,
        { role: newRole.toUpperCase() } // Convert to uppercase to match API format
      )

      if (result.success) {
        // Refresh team members data
        await fetchTeamMembers(profile.organization.id)
        setEditDialogOpen(false)
        setSelectedMember(null)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000) // Clear success message after 3 seconds
      } else {
        setError(result.response || 'Failed to update member role')
      }
    } catch (err) {
      console.error('Error updating member role:', err)
      setError('Failed to update member role')
    } finally {
      setIsLoading(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!selectedMember || !profile?.organization?.id) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await organizations.updateMember(
        profile.organization.id,
        selectedMember.id,
        { role: selectedMember.role, remove: true } // Set remove flag to true
      )

      if (result.success) {
        // Refresh team members data
        await fetchTeamMembers(profile.organization.id)
        setDeleteDialogOpen(false)
        setSelectedMember(null)
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000) // Clear success message after 3 seconds
      } else {
        setError(result.response || 'Failed to remove member')
      }
    } catch (err) {
      console.error('Error removing member:', err)
      setError('Failed to remove member')
    } finally {
      setIsLoading(false)
    }
  }

  const hasChanges = organizationData ? (
    formData.name !== organizationData.name ||
    formData.seats !== organizationData.seats
  ) : false

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
              helperText="Maximum 300 seats allowed"
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
            Team Members ({isLoadingMembers ? '...' : displayMembers.length})
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
                {isLoadingMembers ? (
                  <TableRow>
                    <TableCell colSpan={isCurrentUserAdmin ? 5 : 4} sx={{ textAlign: 'center', py: 4, borderBottom: '1px solid #5E5E5E' }}>
                      <CircularProgress size={24} sx={{ mr: 2 }} />
                      <Typography variant="body2" sx={{ color: '#AAAAAA', display: 'inline' }}>
                        Loading team members...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : displayMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={isCurrentUserAdmin ? 5 : 4} sx={{ textAlign: 'center', py: 4, borderBottom: '1px solid #5E5E5E' }}>
                      <Typography variant="body2" sx={{ color: '#AAAAAA' }}>
                        No team members found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : displayMembers.map((member: any) => (
                  <TableRow
                    key={member.user_id || member.id}
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
                            bgcolor: (member.role === 'ADMIN' || member.role === 'admin') ? '#775EFF' : '#5E5E5E',
                            width: 32,
                            height: 32,
                            mr: 2,
                            fontSize: '14px'
                          }}
                        >
                          {(member.name || member.email || 'U').charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#E5E5E5', fontWeight: 500 }}>
                          {member.name || member.email || 'Unknown User'}
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
                          bgcolor: (member.role === 'ADMIN' || member.role === 'admin') ? 'rgba(119, 94, 255, 0.1)' : 'transparent',
                          border: '1px solid',
                          borderColor: (member.role === 'ADMIN' || member.role === 'admin') ? '#775EFF' : '#5E5E5E',
                          color: (member.role === 'ADMIN' || member.role === 'admin') ? '#775EFF' : '#E5E5E5',
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
                      {formatDate(member.created_at || member.joinedAt)}
                    </TableCell>
                    {isCurrentUserAdmin && (
                      <TableCell
                        sx={{
                          borderBottom: '1px solid #5E5E5E',
                          width: '60px',
                        }}
                      >
                        {member.email !== profile?.email && ( // Don't show menu for current user
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
            Change role for {selectedMember?.name || selectedMember?.email}
          </Typography>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel sx={{ color: '#AAAAAA' }}>Role</InputLabel>
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as string)}
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
              <MenuItem value="MEMBER" sx={{ color: '#E5E5E5' }}>Member</MenuItem>
              <MenuItem value="ADMIN" sx={{ color: '#E5E5E5' }}>Admin</MenuItem>
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
            disabled={isLoading}
            sx={{
              background: isLoading ? '#5E5E5E' : 'linear-gradient(to right, #775EFF, #FF5EBF)',
              '&:hover': {
                background: isLoading ? '#5E5E5E' : 'linear-gradient(to right, #6B52E6, #E654AB)',
              },
              '&:disabled': {
                background: '#5E5E5E',
                color: '#AAAAAA',
              },
            }}
          >
            {isLoading ? 'Saving...' : 'Save'}
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
            Are you sure you want to remove <strong style={{ color: '#E5E5E5' }}>{selectedMember?.name || selectedMember?.email}</strong> from the team?
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
            disabled={isLoading}
            sx={{
              backgroundColor: isLoading ? '#5E5E5E' : '#d32f2f',
              '&:hover': {
                backgroundColor: isLoading ? '#5E5E5E' : '#b71c1c',
              },
              '&:disabled': {
                backgroundColor: '#5E5E5E',
                color: '#AAAAAA',
              },
            }}
          >
            {isLoading ? 'Removing...' : 'Remove'}
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
