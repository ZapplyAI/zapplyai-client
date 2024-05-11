import React, { CSSProperties } from 'react'
import { IconButton, InputBase } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useImmer } from 'use-immer'

type AsyncFunction = (...args: any[]) => Promise<any>
type AnyFunction = (...args: any[]) => any

interface InputProps {
  icon?: React.ReactNode
  placeholder?: string
  fullWidth?: boolean
  multiline?: boolean
  submitButton?: boolean
  sx?: object
  onChange?: AnyFunction | AsyncFunction
  onSubmit?: AnyFunction | AsyncFunction
  value?: string
}

interface PromptState {
  value: string
  isProcessing: boolean
  step: string
}

const Input = ({
  icon,
  placeholder = '',
  fullWidth = false,
  multiline = false,
  submitButton = false,
  sx = {},
  value = '',
  onSubmit = (prompt: string) => {},
  onChange = async () => {},
}: InputProps): React.ReactNode => {
  const [prompt, setPrompt] = useImmer<PromptState>({
    value: value,
    isProcessing: false,
    step: '',
  })

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPrompt(draft => {
      draft.value = event.target.value
    })
    onChange(event)
  }

  const handleEnterPress = async (
    event: any,
    prompt: any
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault() // Prevent default behavior (creating new line)
      setPrompt(draft => {
        draft.value = ''
      })
      await onSubmit(prompt) // Perform action when Enter is pressed
    }
  }

  const handleSendButtonClick = async (prompt: any) => {
    setPrompt(draft => {
      draft.value = ''
    })
    await onSubmit(prompt)
  }

  return (
    <div style={{ ...style.inputContainer, ...sx }}>
      {icon && (
        <IconButton sx={{ p: '10px', marginBottom: 'auto' }} aria-label="menu">
          {/*<GrainIcon style={{ color: '#775EFF' }} />*/}
          {icon}
        </IconButton>
      )}
      <InputBase
        style={{
          flex: 1,
          color: '#CFCED9',
          fontSize: '14px',
          maxHeight: '150px',
          overflow: 'scroll',
          marginLeft: icon ? '0' : '12px',
        }}
        autoFocus
        fullWidth={fullWidth}
        multiline={multiline}
        placeholder={placeholder}
        value={prompt.value}
        onChange={handleInputChange}
        onKeyDown={event => handleEnterPress(event, prompt.value)}
      />
      <IconButton
        type="button"
        sx={{ padding: '10px', marginTop: 'auto' }}
        aria-label="search"
        onClick={() => handleSendButtonClick(prompt.value)}
      >
        <SendIcon style={{ color: '#775EFF' }} />
      </IconButton>
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '30px 0px 12px 0px',
    border: '1px solid #423F59',
    borderRadius: '5px',
    maxHeight: '550px',
  },
}

export default Input
