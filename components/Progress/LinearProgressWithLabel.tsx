import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import React from 'react'

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#fff">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

export default LinearProgressWithLabel
