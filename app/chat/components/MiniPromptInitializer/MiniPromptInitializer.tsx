import React, { useState } from 'react'
import { Divider, IconButton, List, Paper, Stack } from '@mui/material'
import PromptPagination from '@/app/chat/components/MiniPromptInitializer/component/PromptStepper'
type CSSProperties = React.CSSProperties
import ClearIcon from '@mui/icons-material/Clear'
import { Button, Input } from '@/components'
import map from 'lodash/map'

interface MiniPromptInitializerProps {
  onSummarySubmit: () => Promise<void> | void
}

interface FeatureListItemProps {
  label: string
}

interface FeatureListInputProps {
  onSubmit: any
}

const PAGINATION_STEPS = ['Summary', 'Features', 'Styling']

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

const MiniPromptInitializer = ({
  onSummarySubmit,
}: MiniPromptInitializerProps): React.ReactNode => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const moveStepForward = (step: number) => {
    setCurrentStep(step)

    console.log('moveStepForward => currentStep', currentStep)
    if (currentStep >= PAGINATION_STEPS.length - 1) {
      console.log('onSummarySubmit')
      onSummarySubmit()
    }
  }

  const addNewFeature = (value: string): void => {
    console.log('addNewFeature value', value)

    if (value === '') {
      return
    }

    setSelectedFeatures([...selectedFeatures, value])
  }

  return (
    <div style={style.centricContainer}>
      <Paper elevation={0} sx={style.promptContainer}>
        <PromptPagination steps={PAGINATION_STEPS} currentStep={currentStep} />

        <Divider
          orientation="horizontal"
          style={{ margin: '0px 22px', background: '#48474E' }}
        />

        {currentStep === 0 && (
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
              onSubmit={() => moveStepForward(currentStep + 1)}
            />

            {/*<TextField*/}
            {/*  id="outlined-multiline-static"*/}
            {/*  multiline*/}
            {/*  rows={4}*/}
            {/*  fullWidth*/}
            {/*  placeholder={'Tell me more about  your web app'}*/}
            {/*  style={style.inputPrompt}*/}
            {/*/>*/}
          </form>
        )}

        {currentStep === 1 && (
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

            {selectedFeatures.length > 0 && (
              <List
                style={{
                  maxHeight: '220px',
                  overflow: 'scroll',
                  width: '50%',
                  flex: 1,
                }}
              >
                {map(selectedFeatures, featureLabel => (
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

            <Button
              label={'Continue'}
              action={() => moveStepForward(currentStep + 1)}
            />
          </form>
        )}

        {currentStep === 2 && (
          <form style={style.mainContainer}>
            <h2
              style={{
                color: '#CFCED9',
                fontWeight: 500,
                marginBottom: '22px',
              }}
            >
              Last step. Please describe how you would like your app to look
            </h2>

            <p
              style={{
                color: '#CFCED9',
                fontWeight: 300,
              }}
            >
              Write 2-5 sentences about the style of your app
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
              <li>Colours</li>
              <li>Style</li>
              <li>etc ...</li>
            </ul>

            <Input
              placeholder={'Tell me more about your web app'}
              fullWidth
              multiline
              onSubmit={() => moveStepForward(currentStep + 1)}
            />
          </form>
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
    width: '800px',
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
}

export default MiniPromptInitializer
