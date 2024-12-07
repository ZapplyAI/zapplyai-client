'use client'

import React, { CSSProperties, useState } from 'react'
import { AppPage } from '../../../../../lib/type_legacy'
import map from 'lodash/map'
import MUI_Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PageSelect from './PageSelect'

interface ChatHeaderProps {
  allPages: AppPage[]
  openDialogId: string
  selectDialog: (dialogId: string) => void
  openGetTokensForm: () => void
}

const ChatHeader = ({
  allPages,
  openDialogId,
  selectDialog,
  openGetTokensForm,
}: ChatHeaderProps): React.ReactNode => {
  const pagesValues = map(allPages, page => ({
    value: page.id,
    label: page.name,
  }))

  const allOptions = [
    { value: '0', label: 'Main chat' },
    ...pagesValues
  ]

  // Find the current selected option
  const [selectedOption, setSelectedOption] = useState(
    allOptions.find(option => option.value === openDialogId) || allOptions[0]
  )

  const handlePageChange = (newValue: { value: string, label: string }) => {
    setSelectedOption(newValue)
    selectDialog(newValue.value)
  }

  return (
    <div style={{ ...style.headerContainer, ...style.absolutePositioning }}>
      <PageSelect
        options={allOptions}
        value={selectedOption}
        onChange={handlePageChange}
      />
      <div style={style.tokenSection}>
        <MUI_Button
          variant={'text'}
          onClick={openGetTokensForm}
          sx={style.getTokensButton}
        >
          Get tokens
          <hr style={{ width: '40px', border: 'solid 0.3px #7C7C7C' }} />
        </MUI_Button>
        <div style={style.tokenDisplay}>
          <Typography
            variant={'h6'}
            style={{ color: '#D0D0D0', fontWeight: '200' }}
          >
            218 tokens
          </Typography>
        </div>
      </div>
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 18px',
  },
  absolutePositioning: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: '100',
    width: '100%',
  },
  tokenSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  getTokensButton: {
    fontSize: '9px',
    textTransform: 'unset',
    color: '#7C7C7C',
    fontWeight: '300',
    display: 'flex',
    flexDirection: 'column',
  },
  tokenDisplay: {
    background: '#181818',
    borderRadius: '5px',
    padding: '5px 12px',
  },
}

export default ChatHeader
