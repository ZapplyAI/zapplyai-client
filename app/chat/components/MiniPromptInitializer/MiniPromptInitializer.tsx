import React from 'react'
import {Divider, Paper} from '@mui/material'
import PromptPagination from "@/app/chat/components/MiniPromptInitializer/component/PromptStepper";
type CSSProperties = React.CSSProperties

interface MiniPromptInitializerProps {

}

const MiniPromptInitializer = ({
}: MiniPromptInitializerProps): React.ReactNode => {
  return (
    <div style={style.centricContainer}>
      <Paper elevation={0} sx={style.promptContainer}>
        <PromptPagination
          steps={['Summary', 'Features', 'Styling']}
          currentStep={1}
        />

        <Divider
          orientation="horizontal"
          style={{ margin: '0px 22px', background: '#48474E' }}
        />

        <main style={style.mainContainer}>

          <h2 style={{
            color: '#CFCED9',
            fontWeight: 500
          }}>Summarize your web application</h2>
        </main>
      </Paper>
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
    top: 0,
    left: 0,
    zIndex: 1000,
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0,0,30,0.4)'
  },
  promptContainer: {
    height: '450px',
    width: '800px',
    background: '#181818',
    borderRadius: '8px'
  },
  mainContainer: {
    padding: '22px'
  }
}

export default MiniPromptInitializer
