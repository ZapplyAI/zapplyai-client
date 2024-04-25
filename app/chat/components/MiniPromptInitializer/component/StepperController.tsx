import React, { CSSProperties } from 'react'
import { Button } from '@/components'

interface StepperControllerProps {
  firstPage?: boolean
  lastPage?: boolean
  setStepAction: (step: number) => void
}

const StepperController = ({
  firstPage = false,
  lastPage = false,
  setStepAction,
}: StepperControllerProps): React.ReactNode => {
  return (
    <div style={style.controllerContainer}>
      <Button
        label={'Back'}
        disabled={firstPage}
        action={() => setStepAction(-1)}
      />
      <Button
        label={lastPage ? 'Complete' : 'Next'}
        action={() => setStepAction(1)}
      />
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  controllerContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default StepperController