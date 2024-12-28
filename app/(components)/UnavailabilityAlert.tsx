import React from 'react'
import { Dialog, DialogTitle, Typography } from '@mui/material'

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

const UnavailabilityAlert = ({
  onClose,
  selectedValue,
  open,
}: SimpleDialogProps) => {
  const handleClose = () => {
    onClose(selectedValue)
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: 'rgba(60, 60, 60, 0.15)',
          backdropFilter: 'blur(4px)',
          border: '1px solid #5E5E5E',
          padding: '20px 40px',
          whiteSpace: 'nowrap',
          width: 'fit-content',
          margin: 'auto',
        },
      }}
    >
        <Typography
          variant="h1"
          sx={{ textAlign: 'center', padding: '12px 12px', paddingBottom: '6px', fontSize: '26px', whiteSpace: 'nowrap' }} // Prevent wrapping in the title
        >
          Website is still under development
        </Typography>
      <Typography
        variant="body2"
        sx={{ color: '#AEAEAE', fontSize: '16px' , textAlign: 'center', padding: '12px 0', whiteSpace: 'nowrap' }} // Prevent wrapping in body text
      >
        Feature currently unavailable
      </Typography>
    </Dialog>
  )
}

export default UnavailabilityAlert
