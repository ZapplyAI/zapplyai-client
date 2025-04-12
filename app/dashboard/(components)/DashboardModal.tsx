'use client'
import React, { ReactNode } from 'react'
import { 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  IconButton, 
  Typography, 
  Divider,
  DialogProps
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface DashboardModalProps extends Omit<DialogProps, 'title'> {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  maxWidth?: DialogProps['maxWidth']
}

const DashboardModal: React.FC<DashboardModalProps> = ({ 
  open, 
  onClose,
  title,
  children,
  maxWidth = 'sm',
  ...dialogProps
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#1E1E1E',
          borderRadius: '12px',
          border: '1px solid #5E5E5E'
        }
      }}
      {...dialogProps}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '16px 24px'
      }}>
        <Typography variant="h6" sx={{ color: '#E5E5E5' }}>
          {title}
        </Typography>
        <IconButton 
          onClick={onClose}
          size="small"
          sx={{ color: '#7E7E7E' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider sx={{ backgroundColor: '#5E5E5E' }} />
      
      <DialogContent sx={{ padding: 0 }}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DashboardModal
