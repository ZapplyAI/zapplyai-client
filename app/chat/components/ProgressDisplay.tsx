import React, { CSSProperties } from 'react'
import { AnyFunction, APP_STATE, Process, Dialog, Message } from '@/lib/type'
import { Box, Card, CardContent, List, ListItem } from '@mui/material'
import map from 'lodash/map'
import Typography from '@mui/material/Typography'
import { filter, get, maxBy } from 'lodash'
import { Button } from '@/components'
import MessageAttachment from '@/app/chat/components/ChatWindow/component/MessageAttachment'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

interface ProgressDisplayProps {
  isMobile?: boolean
  displayedProcessProp?: Process | undefined
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  // height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#282636',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#775EFF',
  },
}))

const useReduxData = () => {
  const processes = useSelector(
    (state: RootState) => state.global.currentProcesses
  )
  console.log('processes', processes)

  let currentProcess = maxBy(
    filter(processes, process => process.isLoading),
    process => process.displayPriority
  ) // find highest priority loading process

  if (!currentProcess) {
    currentProcess = maxBy(processes, process => process.displayPriority) // find highest priority loading process
  }

  console.log('currentProcess', currentProcess)

  return {
    currentProcess,
  }
}

const ProgressDisplay = ({
  isMobile = false,
  displayedProcessProp,
}: ProgressDisplayProps): React.ReactNode => {
  const { currentProcess } = useReduxData()
  let displayedProcess = displayedProcessProp
    ? displayedProcessProp
    : currentProcess

  if (!displayedProcess) {
    return null
  }

  const style: { [key: string]: CSSProperties } = {
    progressCard: {
      position: 'absolute',
      zIndex: isMobile ? 10 : 10000000,
      background: '#1C1B23',
      bottom: isMobile ? 'auto' : '0',
      top: isMobile ? '0' : 'auto',
      left: '0',
      width: '92%',
      margin: '4%',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: isMobile ? '10' : '5'
    },
    progressTitle: {
      color: '#D0D0D0',
      fontSize: '13px',
      marginBottom: '8px',
    },
    progressDescription: {
      color: '#D0D0D0',
      fontSize: '11px',
      marginBottom: '8px',
    },
    progressProgress: {
      color: '#D0D0D0',
      paddingBottom: '0',
    },
  }

  let progress = 0

  if (displayedProcess.progressType === 'STEP') {
    if (
      displayedProcess.step === undefined ||
      displayedProcess.maxStep === undefined
    ) {
      return null
    }
    progress = (displayedProcess.step / displayedProcess.maxStep) * 100
  }
  if (displayedProcess.progressType === 'PERCENT') {
    if (displayedProcess.progress === undefined) {
      return null
    }
    progress = displayedProcess.progress
  }

  return (
    <Card sx={style.progressCard}>
      <Typography style={style.progressTitle} variant="h4">
        {displayedProcess.name}
      </Typography>
      <Typography style={style.progressDescription} variant="h6">
        {displayedProcess.description}
      </Typography>
      <LinearProgressWithLabel value={progress} />
    </Card>
  )
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

const style: { [key: string]: CSSProperties } = {}

export default ProgressDisplay
