import React, { CSSProperties } from 'react'
import GrainIcon from '@mui/icons-material/Grain'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { AppPage } from '@/lib/type'
import { find } from 'lodash'
import { DropdownSelect } from '@/components'
import map from 'lodash/map'

interface ChatHeaderProps {
  allPages: AppPage[]
  openDialogId: string
  selectDialog: any
}

const ChatHeader = ({
  allPages,
  openDialogId,
  selectDialog,
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
      <span>Tokens : 25</span>
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
    zIndex: '10000',
    width: '100%',
  },
}

export default ChatHeader
