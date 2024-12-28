'use client'
import React, { useState } from 'react'
import {
  HorizontalCenterBox,
  HorizontalLeftAlignBox,
  VerticalCenterBox,
  VerticalLeftAlignBox,
} from '@/components/layouts/CenterBox'
import Typography from '@mui/material/Typography'
import {
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { Button } from '@/components'

export default function CreatePage() {
  const [projectType, setProjectType] = useState('nodejs')

  const handleChange = (event: SelectChangeEvent) => {
    setProjectType(event.target.value)
  }

  const style = {
    divider: {
      borderColor: '#2B2B2B',
    },
  }

  return (
    <React.Fragment>
      <GradientText_H1 text={'Hi, I am Elastic AI'} />

      <HorizontalCenterBox>
        <Typography variant="h2">We are building your first</Typography>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={projectType}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="nodejs">
              Node.js
            </MenuItem>
            <MenuItem value={'cpp'}>C++</MenuItem>
            <MenuItem value={'java'}>Java</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h2">app</Typography>
      </HorizontalCenterBox>

      <HorizontalLeftAlignBox>
        <VerticalLeftAlignBox sx={{ flex: 1 }}>
          {multipleStepsCreate()}
        </VerticalLeftAlignBox>

        <Divider
          orientation="vertical"
          // variant="fullWidth"
          sx={style.divider}
        />

        <VerticalCenterBox sx={{ flex: 1 }} alignItems={'start'}>
          Need help ?
        </VerticalCenterBox>
      </HorizontalLeftAlignBox>

      <Button label={'Start building'} />
    </React.Fragment>
  )
}

const GradientText_H1 = ({ text, sx = {} }: { text: string; sx?: object }) => {
  return (
    <Typography
      variant="h1"
      sx={{
        display: 'inline-block',
        backgroundImage:
          'linear-gradient(135deg, #775EFF 0%, #F570A8 37%, #DDDCE9 100%)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        ...sx,
      }}
    >
      {text}
    </Typography>
  )
}

const multipleStepsCreate = () => {
  return (
    <React.Fragment>
      <Typography variant="body1">
        Please describe the main purpose of your app including info about users
        and data
      </Typography>
      <Typography variant="body2">
        E.g. “Dashboard for eco-friendly companies that allows to monitor CO2
        consumption by analysing your production data”{' '}
      </Typography>
    </React.Fragment>
  )
}
