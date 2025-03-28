import React, { CSSProperties } from 'react'
import {
  AnyFunction,
  APP_STATE,
  CurrentProgress,
  Dialog,
  Message,
} from '../../../lib/type_legacy'
import { Box, Card, CardContent, List, ListItem } from '@mui/material'
import map from 'lodash/map'
import Typography from '@mui/material/Typography'
import { get } from 'lodash'
import { Button } from '@/components'
import MessageAttachment from '@/app_legacy/chat/components/ChatWindow/component/MessageAttachment'
import LinearProgress, {
  LinearProgressProps,
  linearProgressClasses,
} from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

interface ProgressDisplayProps {
  isMobile?: boolean
  currentProgress: CurrentProgress
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  // height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#282636'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#775EFF'
  },
}))

const ProgressDisplay = ({
  isMobile = false,
  currentProgress,
}: ProgressDisplayProps): React.ReactNode => {
  const style: { [key: string]: CSSProperties } = {
    progressCard: {
      position: 'absolute',
      zIndex: 10000000,
      background: '#1C1B23',
      bottom: '0',
      left: '0',
      width: '92%',
      margin: '4%',
      padding: '16px',
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

  return (
    <Card sx={style.progressCard}>
      <Typography style={style.progressTitle} variant="h4">
        {currentProgress.title}
      </Typography>
      <Typography style={style.progressDescription} variant="h6">
        {currentProgress.description}
      </Typography>
      <LinearProgressWithLabel value={currentProgress.progress as number} />
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
