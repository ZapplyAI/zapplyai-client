'use client'
import React from 'react'
import {
  HorizontalLeftAlignBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/navigation'

export function MyProjectsList() {
  const style = {
    scrollableList: {
      overflowY: 'scroll',
      height: '150px',
      paddingRight: '22px',
      overscrollBehavior: 'none',
      display: 'flex',
      flexWrap: 'wrap',
    },
  }

  return (
    <VerticalLeftAlignBox sx={{ width: '100%', marginTop: '50px' }}>
      <Typography variant="h3">My projects</Typography>
      <List sx={style.scrollableList}>{renderMyProjects()}</List>
    </VerticalLeftAlignBox>
  )
}

const renderMyProjects = () => {
  return (
    <React.Fragment>
      <MyProjectBar
        icon={'CO'}
        title={'My project #2'}
        size={'200MB'}
        state={'deployed'}
        lastUpdate={'21.02.23'}
        updatedBy={'Lauren Smith'}
        projectColor={'#13C061'}
      />
      <MyProjectBar
        icon={'CO'}
        title={'My project #2'}
        size={'200MB'}
        state={'deployed'}
        lastUpdate={'21.02.23'}
        updatedBy={'Lauren Smith'}
        projectColor={'#9813C0'}
      />
    </React.Fragment>
  )
}

interface MyProjectBarProps {
  icon: string
  title: string
  size: string
  state: 'deployed' | 'in development' | 'cancelled'
  lastUpdate: string
  updatedBy: string
  projectColor: string
}

const MyProjectBar = ({
  icon,
  title,
  size,
  state,
  lastUpdate,
  updatedBy,
  projectColor,
}: MyProjectBarProps) => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/platform/create')
  }

  const style = {
    buttonContainer: {
      width: '335px',
      height: 'fit-content',
      borderRadius: '5px',
    },
  }

  return (
    <ListItemButton
      onClick={handleClick}
      alignItems="flex-start"
      sx={style.buttonContainer}
    >
      <ListItemIcon>
        <VerticalCenterBox
          sx={{
            width: '35px',
            height: '35px',
            borderRadius: '5px',
            background: projectColor,
          }}
        >
          <Typography variant="body1">{icon}</Typography>
        </VerticalCenterBox>
      </ListItemIcon>
      <ListItemText
        primary={<Typography variant="h5">{title}</Typography>}
        secondary={
          <Typography variant="caption">{state}    {size}</Typography>
          // <HorizontalLeftAlignBox>
          //   <span
          //     style={{
          //       height: '5px',
          //       width: '5px',
          //       borderRadius: '100px',
          //       background: 'green',
          //       marginRight: '0.5rem',
          //     }}
          //   />
          //
          //   <span style={{ width: '1rem' }} />
          //   <Typography variant="caption">{size}</Typography>
          // </HorizontalLeftAlignBox>
        }
      />
      <ListItemText
        primary={
          <Typography variant="caption">
            {lastUpdate}
            <br />
          </Typography>
        }
        secondary={<Typography variant="caption">{updatedBy}</Typography>}
      />
    </ListItemButton>
  )
}
