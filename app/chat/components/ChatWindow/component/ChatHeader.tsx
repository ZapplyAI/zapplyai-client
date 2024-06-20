'use client'

import React, { CSSProperties } from 'react'
import GrainIcon from '@mui/icons-material/Grain'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { AppPage } from '@/lib/type'
import { find } from 'lodash'
import { DropdownSelect } from '@/components'
import map from 'lodash/map'
import MUI_Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface ChatHeaderProps {
  allPages: AppPage[]
  openDialogId: string
  selectDialog: any
  openGetTokensForm: any
}

const ChatHeader = ({
  allPages,
  openDialogId,
  selectDialog,
  openGetTokensForm,
}: ChatHeaderProps): React.ReactNode => {
  // CREATING NEW APP
  const pagesValues = map(allPages, page => ({
    value: page.id,
    label: page.name,
  }))

  return (
    <div style={{ ...style.headerContainer, ...style.absolutePositioning }}>
      <DropdownSelect
        allValues={[...pagesValues, { value: '0', label: 'Main chat' }]}
        currentValue={openDialogId}
        onChange={selectDialog}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}
      >
        <MUI_Button
          variant={'text'}
          onClick={openGetTokensForm}
          sx={style.getTokensButton}
        >
          Get tokens
          <hr style={{ width: '40px', border: 'solid 0.3px #7C7C7C' }} />
        </MUI_Button>
        <div
          style={{
            background: '#181818',
            borderRadius: '5px',
            padding: '5px 12px',
          }}
        >
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
  getTokensButton: {
    fontSize: '9px',
    // textDecoration: 'underline',
    textTransform: 'unset',
    color: '#7C7C7C',
    fontWeight: '300',
    display: 'flex',
    flexDirection: 'column',
  },
}

export default ChatHeader
