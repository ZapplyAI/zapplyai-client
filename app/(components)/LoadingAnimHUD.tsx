import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'

const LoadingAnimHUD = ({ label } : {label: string}) => {
  const [progress, setProgress] = useState(Math.random() * 100)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        let newProgress = prevProgress + Math.random() * 10 // Increment by a random value between 0 and 10
        if (newProgress >= 100) {
          newProgress = Math.random() * 20 // Restart progress to a random value between 0 and 20
        }
        return newProgress
      })
    }, 500)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant={'body2' as any} sx={{ marginBottom: '5px' }}>
        {label}
      </Typography>
      <div
        style={{
          position: 'relative',
          width: '200px',
          height: '6px',
          background: '#222222',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: `${progress}%`, // Dynamic width based on progress state
            height: '6px',
            background: '#E5E5E5',
            transition: 'width 0.5s linear', // Smooth transition
          }}
        />
      </div>
    </div>
  )
}

export default LoadingAnimHUD
