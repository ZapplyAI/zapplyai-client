import React, { useEffect, useState } from 'react'
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
import { AppOverview } from '@/lib/type'
import { filter, get } from 'lodash'
import { nanoid } from 'nanoid'

type AnyFunction = (...args: any[]) => any

interface MiniPromptInitializerProps {
  onSummarySubmit: (prompt: string, appName: string, appUrl: string) => void
}

interface FeatureListItemProps {
  feature: Feature
  removeFeature: AnyFunction
}

type Feature = {
  id: string
  label: string
}

interface FeatureListInputProps {
  onSubmit: any
}

const PAGINATION_STEPS = ['Summary', 'Features', 'App overview']

const FeatureListItem = ({
  feature,
  removeFeature,
}: FeatureListItemProps): React.ReactNode => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'row',
        background: '#775EFF',
        borderRadius: '22px',
        padding: '2px 5px 2px 12px',
      }}
    >
      <p style={{ fontSize: '12px' }}>{feature.label}</p>
      <IconButton>
        <ClearIcon
          onClick={() => removeFeature(feature.id)}
          style={{ color: '#282636', height: '15px', width: '15px' }}
        />
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
  initialValue?: any
}

const FormSummaryPage = ({
  setStep,
  handleChange,
  initialValue,
}: FormPageProps) => {
  const [inputValue, setInputValue] = useState(initialValue || '')

  // Update the input value when initialValue changes
  useEffect(() => {
    setInputValue(initialValue || '')
  }, [initialValue])

  return (
    <form style={style.mainContainer}>
      <h2
        style={{
          color: '#CFCED9',
          fontWeight: 500,
          marginBottom: '22px',
        }}
      >
        Summarise your app
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
        sendIcon={false}
        value={inputValue}
        onSubmit={() => setStep(1)}
      />

      <div style={style.stepperControllerContainer}>
        <StepperController firstPage setStepAction={setStep} />
      </div>
    </form>
  )
}

const FormFeaturesPage = ({
  setStep,
  handleChange,
  initialValue,
}: FormPageProps) => {
  const [appFeatures, setAppFeatures] = useState<Feature[]>(initialValue || [])
  const [inputValue, setInputValue] = useState('')

  const addNewFeature = (value: string): void => {
    if (value.trim() === '') {
      return
    }

    const updatedAppFeatures: Feature[] = [
      ...appFeatures,
      { id: nanoid(), label: value.trim() },
    ]
    setAppFeatures(updatedAppFeatures)
    handleChange(updatedAppFeatures)
  }

  const removeFeature = (id: string) => {
    const featureUpdated = filter(
      appFeatures,
      appFeature => appFeature.id !== id
    )
    setAppFeatures(featureUpdated)
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
        List the features you want to include in your web-app
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
          maxHeight: '400px',
          overflow: 'scroll',
        }}
      >
        <li>Shopping cart</li>
        <li>Product filters</li>
        <li>Calendar for date/time scheduling</li>
        <li>Interractive map</li>
      </ul>

      {appFeatures.length > 0 && (
        <Stack
          spacing={{ xs: 0, sm: 1 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {map(appFeatures, featureLabel => (
            <FeatureListItem
              key={featureLabel.id}
              feature={{ id: featureLabel.id, label: featureLabel.label }}
              removeFeature={removeFeature}
            />
          ))}
        </Stack>
      )}

      <Input
        placeholder={'Add feature'}
        fullWidth
        value={inputValue}
        submitButton
        onChange={async event => {
          setInputValue(event.value)
        }}
        onSubmit={async event => {
          addNewFeature(event.value)
          setInputValue('')
        }}
      />

      <div style={style.stepperControllerContainer}>
        <StepperController lastPage setStepAction={setStep} />
      </div>
    </form>
  )
}

const AppOverviewPage = ({
  setStep,
  handleChange,
  initialValue,
}: FormPageProps) => {
  const [appName, setAppName] = useState<string>(get(initialValue, 'name', ''))
  const [appUrl, setAppUrl] = useState<string>(get(initialValue, 'url', ''))

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
        Overview
      </h2>

      <div style={{ width: '60%', marginBottom: '145px' }}>
        <Input
          sx={{marginTop: '0px'}}
          placeholder={'App name'}
          value={appName}
          onChange={handleNameChange}
        />
        <Input
          sx={{marginTop: '0px'}}
          placeholder={'App url'}
          value={appUrl}
          onChange={handleUrlChange}
        />
      </div>

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
            initialValue={appSummary}
          />
        )}

        {currentStep === 1 && (
          <FormFeaturesPage
            setStep={setStep}
            handleChange={handleFeaturesChange}
            initialValue={appFeatures}
          />
        )}

        {currentStep === 2 && (
          <AppOverviewPage
            setStep={setStep}
            handleChange={handleOverviewChange}
            initialValue={appOverview}
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
