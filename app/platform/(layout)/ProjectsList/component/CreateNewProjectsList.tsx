'use client'
import React, { ReactNode } from 'react'
import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import Image from 'next/image'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import {
  Box,
  Button as MUI_Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { palette } from '@/styles/theme/palette'
import { useRouter } from 'next/navigation'

export const CreateNewProjectsList = () => {
  const style = {
    scrollableList: {
      overflowY: 'scroll',
      height: '220px',
      paddingRight: '22px',
      overscrollBehavior: 'none'
    },
    divider: {
      borderColor: '#202023',
      width: '100%',
      marginBottom: '5px',
      marginTop: '5px',
    },
  }

  return (
    <VerticalLeftAlignBox>
      <Typography variant="h3">Create new project</Typography>

      <HorizontalLeftAlignBox sx={{alignItems: 'baseline'}}>
        <VerticalLeftAlignBox>
          <Typography
            variant="h3"
            sx={{ color: 'text.caption', marginBottom: '16px' }}
          >
            Non-Technical
          </Typography>

          <NewProjectBar
            icon={<AddCircleIcon sx={{ color: 'icon.light' }} />}
            title={'New project'}
            description={'General project, suits for everything'}
            noIconBG
          />
          <Divider sx={style.divider} />

          <List sx={style.scrollableList}>
            {renderNonTechnicalProjects()}
          </List>
        </VerticalLeftAlignBox>

        <span style={{ width: '2rem' }} />

        <VerticalLeftAlignBox>
          <Typography
            variant="h3"
            sx={{ color: 'text.caption', marginBottom: '16px' }}
          >
            Technical
          </Typography>

          <NewProjectBar
            icon={<AddCircleIcon sx={{ color: 'icon.light' }} />}
            title={'New project'}
            description={'General project, suits for everything'}
            noIconBG
          />
          <Divider sx={style.divider} />

          <List sx={style.scrollableList}>{renderTechnicalProjects()}</List>
        </VerticalLeftAlignBox>
      </HorizontalLeftAlignBox>
    </VerticalLeftAlignBox>
  )
}

interface NewProjectBarProps {
  icon: ReactNode
  title: string
  description: string
  noIconBG?: boolean
}

const NewProjectBar = ({
  icon,
  title,
  description,
  noIconBG = false,
}: NewProjectBarProps) => {
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
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={<Typography variant="h5">{title}</Typography>}
        secondary={<Typography variant="caption">{description}</Typography>}
      />
    </ListItemButton>
  )
}

const renderNonTechnicalProjects = () => {
  return (
    <React.Fragment>
      <NewProjectBar
        icon={
          <Image
            src="/icons/CPP_Project.svg"
            alt="CPP"
            width={35}
            height={35}
          />
        }
        title={'C++'}
        description={'General C++ project'}
      />
      <NewProjectBar
        icon={<Image
          src="/icons/Java_Project.svg"
          alt="Java"
          width={35}
          height={35}
        />}
        title={'Java'}
        description={'General Java project'}
      />
      <NewProjectBar
        icon={<Image
          src="/icons/Nodejs_Project.svg"
          alt="JS"
          width={35}
          height={35}
        />}
        title={'Node.js'}
        description={'General Node.js project'}
      />
      <NewProjectBar
        icon={<Image
          src="/icons/CS_Project.svg"
          alt="JS"
          width={35}
          height={35}
        />}
        title={'C#.js'}
        description={'General C# project'}
      />
    </React.Fragment>
  )
}

const renderTechnicalProjects = () => {
  return (
    <React.Fragment>
      <NewProjectBar
        icon={
          <Image
            src="/icons/CPP_Project.svg"
            alt="CPP"
            width={35}
            height={35}
          />
        }
        title={'C++'}
        description={'General C++ project'}
      />
      <NewProjectBar
        icon={<Image
          src="/icons/Java_Project.svg"
          alt="Java"
          width={35}
          height={35}
        />}
        title={'Java'}
        description={'General Java project'}
      />
      <NewProjectBar
        icon={<Image
          src="/icons/Nodejs_Project.svg"
          alt="JS"
          width={35}
          height={35}
        />}
        title={'Node.js'}
        description={'General Node.js project'}
      />
      <NewProjectBar
        icon={<Image
          src="/icons/CS_Project.svg"
          alt="JS"
          width={35}
          height={35}
        />}
        title={'C#.js'}
        description={'General C# project'}
      />
    </React.Fragment>
  )
}
