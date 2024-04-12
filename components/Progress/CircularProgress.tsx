import React from "react";
import {CircularProgress as CircularProgressMUI, circularProgressClasses, CircularProgressProps} from "@mui/material"

const CircularProgress = (props: CircularProgressProps) => {
  return (
    <CircularProgressMUI
      variant="indeterminate"
      disableShrink
      sx={{
        color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
        stroke: '1px'
      }}
      size={40}
      thickness={4}
      {...props}
    />
  )
}

interface GradientCircularProgressProps {
  sx: object
}

// From https://github.com/mui/material-ui/issues/9496#issuecomment-959408221
const GradientCircularProgress = ({ sx } : GradientCircularProgressProps) => {
  return (
    <div style={sx}>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgressMUI
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
    </div>
  )
}


export { CircularProgress, GradientCircularProgress }
