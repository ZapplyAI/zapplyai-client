import React from 'react'
import { Box } from '@mui/material'
import {
  VerticalCenterBox,
} from '@/components/layouts/CenterBox'

export const DetailListing = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          position: 'absolute',
          right: '12vw',
          top: 0,
          border: '1px solid #5E5E5E',
          height: '1750px',
          width: '300px',
        }}
      >
        <VerticalCenterBox sx={{}}>
          point 1
          <br />
          point 2
          <br />
          point 3
        </VerticalCenterBox>
      </Box>
    </React.Fragment>
  )
}

