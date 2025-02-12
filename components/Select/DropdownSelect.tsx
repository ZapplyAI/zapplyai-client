'use client'

import React from 'react'
import { MenuItem, Select } from '@mui/material'
import map from 'lodash/map'

interface DropdownSelectProps {
  allValues: { value: string | number; label: string }[]
  currentValue: string | number | null
  onChange: (value: string | number | null) => void
}

const DropdownSelect = ({
  allValues,
  currentValue,
  onChange,
}: DropdownSelectProps) => {
  return (
    <Select
      value={currentValue}
      onChange={event => {
        console.log('Selecting id', event.target.value)
        onChange(event.target.value)
      }}
      // IconComponent={(props) => (<UilAngleRightB {...props} sx={{transform: 'rotate(90deg)'}}/>)}
      displayEmpty
      inputProps={{ 'aria-label': 'Select' }}
      sx={{
        '& .MuiSelect-select': {
          padding: '6px 4px',
        },
        '& .MuiOutlinedInput-notchedOutline': { border: '0px solid' },
        background: 'transparent',
        border: '0px solid',
        padding: '0px 8px',
        '&:focus': {
          outline: 'none',
          boxShadow: 'none',
        },
      }}
    >
      {map(allValues, item => (
        <MenuItem
          key={item.value}
          value={item.value}
          sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'red' }}
        >
          {item.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default DropdownSelect
