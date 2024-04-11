import React from 'react'
import { Paper } from '@mui/material'
type CSSProperties = React.CSSProperties

interface MiniPromptInitializerProps {

}

const MiniPromptInitializer = ({
}: MiniPromptInitializerProps): React.ReactNode => {
  return (
    <div style={style.centricContainer}>
      <Paper elevation={0} sx={style.promptContainer}></Paper>
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  centricContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1000
  },
  promptContainer: {
    height: '450px',
    width: '800px'
  },
}

export default MiniPromptInitializer
