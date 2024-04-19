import React, { useState } from 'react'
import {
  Alert,
  Divider,
  IconButton,
  List,
  Paper,
  Stack,
  StepperContext,
} from '@mui/material'
import PromptPagination from '@/app/chat/components/MiniPromptInitializer/component/PromptStepper'
type CSSProperties = React.CSSProperties
import ClearIcon from '@mui/icons-material/Clear'
import { Button, Input } from '@/components'
import map from 'lodash/map'
import StepperController from './component/StepperController'
import CloseIcon from '@mui/icons-material/Close'

interface MiniPromptInitializerProps {
  onSummarySubmit: (prompt: string) => void
  closeSummaryAction: () => void
}

interface FeatureListItemProps {
  label: string
}

interface FeatureListInputProps {
  onSubmit: any
}

const PAGINATION_STEPS = ['Summary', 'Features']

const FeatureListItem = ({ label }: FeatureListItemProps): React.ReactNode => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: '22px',
      }}
    >
      <p>{label}</p>
      <IconButton>
        <ClearIcon />
      </IconButton>
    </div>
  )
}

const FeatureListInput = ({
  onSubmit,
}: FeatureListInputProps): React.ReactNode => {
  return (
    <Input
      placeholder={'Add feature'}
      fullWidth
      submitButton
      onSubmit={async event => {
        // event.preventDefault()
        await onSubmit(event.value)
      }}
    />
  )
}

interface FormPageProps {
  currentStep: number
  setStep: (step: number) => void
  handleChange: (...args: any[]) => void
}

const FormSummaryPage = ({
  currentStep,
  setStep,
  handleChange,
}: FormPageProps) => {
  return (
    <form style={style.mainContainer}>
      <h2
        style={{
          color: '#CFCED9',
          fontWeight: 500,
          marginBottom: '22px',
        }}
      >
        List apps core features
      </h2>

      <p
        style={{
          color: '#CFCED9',
          fontWeight: 300,
          // marginBottom: '36px',
        }}
      >
        Write 2-5 sentences about your web application
      </p>
      <ul
        style={{
          marginLeft: '12px',
          marginTop: '12px',
          color: '#CFCED9',
          fontWeight: 300,
          marginBottom: '36px',
        }}
      >
        <li>Who is the audience?</li>
        <li>What features should it include?</li>
        <li>What is the typical use case?</li>
      </ul>

      <Input
        placeholder={'Tell me more about your web app'}
        fullWidth
        multiline
        // onSubmit={() => setStep(currentStep + 1)}
        onChange={handleChange}
      />

      <div style={style.stepperControllerContainer}>
        <StepperController firstPage setStepAction={setStep} />
      </div>
    </form>
  )
}

const FormFeaturesPage = ({
  currentStep,
  setStep,
  handleChange,
}: FormPageProps) => {
  const [appFeatures, setAppFeatures] = useState<string[]>([])

  const addNewFeature = (value: string): void => {
    if (value.trim() === '') {
      return
    }

    setAppFeatures([...appFeatures, value.trim()])
    handleChange()
  }

  return (
    <form style={style.mainContainer}>
      <h2
        style={{
          color: '#CFCED9',
          fontWeight: 500,
          marginBottom: '22px',
        }}
      >
        List the features you want your web-app to have
      </h2>

      <p
        style={{
          color: '#CFCED9',
          fontWeight: 300,
          // marginBottom: '22px',
        }}
      >
        For example
      </p>

      <ul
        style={{
          marginLeft: '12px',
          marginTop: '12px',
          color: '#CFCED9',
          fontWeight: 300,
          marginBottom: '36px',
        }}
      >
        <li>Shopping cart</li>
        <li>Product filters</li>
        <li>Calendar for date/time scheduling</li>
        <li>Interractive map</li>
      </ul>

      {appFeatures.length > 0 && (
        <List
          style={{
            maxHeight: '220px',
            overflow: 'scroll',
            width: '50%',
            flex: 1,
          }}
        >
          {map(appFeatures, featureLabel => (
            <React.Fragment>
              <FeatureListItem label={featureLabel} />
              {/*<Divider*/}
              {/*  orientation="horizontal"*/}
              {/*  flexItem*/}
              {/*  style={{ background: '#48474E' }}*/}
              {/*/>*/}
            </React.Fragment>
          ))}
        </List>
      )}

      <FeatureListInput onSubmit={addNewFeature} />

      <div style={style.stepperControllerContainer}>
        <StepperController lastPage setStepAction={setStep} />
      </div>
    </form>
  )
}

const MiniPromptInitializer = ({
  onSummarySubmit,
  closeSummaryAction,
}: MiniPromptInitializerProps): React.ReactNode => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [appDescription, setAppDescription] = useState<string>('')
  const [appFeatures, setAppFeatures] = useState<string[]>([])
  const [appStyle, setAppStyle] = useState<string>('')
  const [formErrors, setFormErrors] = useState<string[]>([])

  const setStep = (stepChange: number) => {
    if (currentStep + stepChange >= PAGINATION_STEPS.length) {
      const errorsFound: boolean = checkFormErrors()

      if (errorsFound) {
        return
      }
      const prompt = `App Description: ${appDescription}\n\nApp Features: ${appFeatures.join(', ')}\n\nApp Style: ${appStyle}`
      onSummarySubmit(prompt)
    }

    setCurrentStep(currentStep + stepChange)
  }

  const checkFormErrors = (): boolean => {
    let thisFormErrors: string[] = []

    if (appDescription === '' || appDescription.length < 20) {
      thisFormErrors = [...thisFormErrors, 'Summary too short']
    }

    setFormErrors(thisFormErrors)
    return thisFormErrors.length !== 0
  }

  const addNewFeature = (value: string): void => {
    if (value.trim() === '') {
      return
    }

    setAppFeatures([...appFeatures, value.trim()])
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAppDescription(event.target.value)
  }

  const handleStyleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppStyle(event.target.value)
  }

  return (
    <div style={style.centricContainer}>
      <Paper elevation={0} sx={style.promptContainer}>
        <IconButton
          style={style.closeButton}
          onClick={() => closeSummaryAction()}
        >
          <CloseIcon />
        </IconButton>
        <PromptPagination steps={PAGINATION_STEPS} currentStep={currentStep} />

        <Divider
          orientation="horizontal"
          style={{ margin: '0px 22px', background: '#48474E' }}
        />

        {map(formErrors, error => (
          <Alert severity="error">{error}</Alert>
        ))}

        {currentStep === 0 && (
          <FormSummaryPage
            currentStep={currentStep}
            setStep={setStep}
            handleChange={handleDescriptionChange}
          />
        )}

        {currentStep === 1 && (
          <FormFeaturesPage
            currentStep={currentStep}
            setStep={setStep}
            handleChange={handleDescriptionChange}
          />
        )}
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
    backgroundColor: 'rgba(0,0,30,0.4)',
  },
  promptContainer: {
    position: 'relative',
    width: '55vw',
    maxWidth: '1000px',
    // height: '82vh',
    maxHeight: '800px',
    background: '#181818',
    borderRadius: '8px',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '32px',
  },
  inputPrompt: {},
  stepperControllerContainer: {
    position: 'relative',
    bottom: '0',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    zIndex: '10000',
    top: '12px',
    right: '12px',
  },
}

export default MiniPromptInitializer
