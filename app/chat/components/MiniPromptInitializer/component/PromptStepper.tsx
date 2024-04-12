import React from 'react'
import { styled } from '@mui/material/styles'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Check from '@mui/icons-material/Check'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'

type CSSProperties = React.CSSProperties

interface PromptStepperProps {
  steps: string[]
  currentStep: number
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}))

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  })
)

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  )
}

const PromptStepper = ({
  steps,
  currentStep = 0,
}: PromptStepperProps): React.ReactNode => {
  // const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  return (
    <div style={style.stepperContainer}>
      <Stepper
        alternativeLabel
        activeStep={currentStep}
        connector={<QontoConnector />}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <p style={{color: 'white'}}>{label}</p>
              </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  stepperContainer: {
    padding: '14px 0px',
  },
}

export default PromptStepper
