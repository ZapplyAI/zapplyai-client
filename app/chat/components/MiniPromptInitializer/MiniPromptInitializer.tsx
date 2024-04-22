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
import {AppOverview} from "@/lib/type";

interface MiniPromptInitializerProps {
  onSummarySubmit: (prompt: string, appName: string, appUrl: string) => void
}

interface FeatureListItemProps {
  label: string
}

interface FeatureListInputProps {
  onSubmit: any
}

const PAGINATION_STEPS = ['Summary', 'Features', 'App overview']

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
  setStep: (step: number) => void
  handleChange: (...args: any[]) => void
}

const FormSummaryPage = ({ setStep, handleChange }: FormPageProps) => {
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
        onChange={handleChange}
      />

      <div style={style.stepperControllerContainer}>
        <StepperController firstPage setStepAction={setStep} />
      </div>
    </form>
  )
}

const FormFeaturesPage = ({ setStep, handleChange }: FormPageProps) => {
  const [appFeatures, setAppFeatures] = useState<string[]>([])

  const addNewFeature = (value: string): void => {
    if (value.trim() === '') {
      return
    }

    const updatedAppFeatures = [...appFeatures, value.trim()]
    setAppFeatures(updatedAppFeatures)
    handleChange(updatedAppFeatures)
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

const AppOverviewPage = ({ setStep, handleChange }: FormPageProps) => {
  const [appName, setAppName] = useState<string>()
  const [appUrl, setAppUrl] = useState<string>()

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppName(event.target.value)
    handleChange({
      name: event.target.value,
      url: appUrl,
    })
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppUrl(event.target.value)
    handleChange({
      name: appName,
      url: event.target.value,
    })
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
        Provide the overview of your web-app
      </h2>

      <Input placeholder={'App name'} onChange={handleNameChange} />

      <Input placeholder={'App url'} onChange={handleUrlChange} />

      <div style={style.stepperControllerContainer}>
        <StepperController lastPage setStepAction={setStep} />
      </div>
    </form>
  )
}

const MiniPromptInitializer = ({
  onSummarySubmit,
}: MiniPromptInitializerProps): React.ReactNode => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [appSummary, setAppSummary] = useState<string>('')
  const [appFeatures, setAppFeatures] = useState<string[]>([])
  const [appOverview, setAppOverview] = useState<AppOverview>()
  const [formErrors, setFormErrors] = useState<string[]>([])

  const setStep = (stepChange: number) => {
    if (currentStep + stepChange >= PAGINATION_STEPS.length) {
      const errorsFound: boolean = checkFormErrors()

      if (errorsFound || !appOverview) {
        return
      }
      const prompt = `App Description: ${appSummary}\n\nApp Features: ${appFeatures.join(', ')}\n\nApp Overview: ${appOverview}`
      onSummarySubmit(prompt, appOverview.name, appOverview.url)
    }

    setCurrentStep(currentStep + stepChange)
  }

  const checkFormErrors = (): boolean => {
    let thisFormErrors: string[] = []

    if (appSummary === '' || appSummary.length < 20) {
      thisFormErrors = [...thisFormErrors, 'Summary too short']
    }

    setFormErrors(thisFormErrors)
    return thisFormErrors.length !== 0
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAppSummary(event.target.value)
  }

  const handleFeaturesChange = (features: string[]) => {
    setAppFeatures(features)
  }

  const handleOverviewChange = (overview: AppOverview) => {
    setAppOverview(overview)
  }

  return (
    <div style={style.centricContainer}>
      <Paper elevation={0} sx={style.promptContainer}>
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
            setStep={setStep}
            handleChange={handleDescriptionChange}
          />
        )}

        {currentStep === 1 && (
          <FormFeaturesPage
            setStep={setStep}
            handleChange={handleFeaturesChange}
          />
        )}

        {currentStep === 2 && (
          <AppOverviewPage
            setStep={setStep}
            handleChange={handleOverviewChange}
          />
        )}
      </Paper>
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  centricContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptContainer: {
    width: '65vw',
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
