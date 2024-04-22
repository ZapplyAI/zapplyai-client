import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import Typography from '@mui/material/Typography'
import find from 'lodash/find'
import { CSSProperties } from 'react'
import { Button } from '@/components'
import {InputBase, Stack} from '@mui/material'
import {WebApp} from "@/lib/type";

type AnyFunction = (...args: any[]) => any

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 250,
      padding: '0px 8px',
      border: '0px',
      background: '#352F5A',
      borderRadius: '7px',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },
  },
}

interface DropdownSelectProps {
  selectedApp: WebApp
  allApps: WebApp[]
  selectApp: AnyFunction
  bottomComponent?: React.ReactNode
}

const DropdownSelect = ({
  selectedApp,
  allApps,
  selectApp,
  bottomComponent
}: DropdownSelectProps): React.ReactNode => {
  const style: { [key: string]: CSSProperties } = {
    menuItem: {
      display: 'flex',
      justifyContent: 'left',
    },
    menuItemIcon: {
      width: '22px',
      height: '22px',
      background: '#552CF6',
      color: '#fff',
      marginRight: '10px',
      textAlign: 'center',
      borderRadius: '5px',
      fontSize: '12px',
      display: 'flex',
      flexShrink: 0,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  }

  const onSelectChange = (event: SelectChangeEvent) => {
    console.log('selecting apps value, event:', event)
    selectApp(event.target.value)
  }

  console.log('selectedApp.id', selectedApp.id)
  console.log('appApps.id', allApps)

  return (
    <FormControl fullWidth sx={{ height: '40px' }}>
      <Select
        displayEmpty
        value={selectedApp.id}
        onChange={onSelectChange}
        input={<InputBase style={{ paddingLeft: '14px' }} />}
        IconComponent={() => (
          <UnfoldMoreIcon
            style={{ height: '22px', marginRight: '5px', color: '#CFCED9' }}
          />
        )}
        sx={{
          height: '40px',
          border: '2px #5443B1 solid',
          background: 'none',
          color: '#CFCED9',
          borderRadius: '7px',
        }}
        renderValue={selected => {
          const selectedApp = find(allApps, thisApp => thisApp.id === selected)

          if (selectedApp === undefined) {
            return (
              <Typography
                style={{
                  color: '#CFCED9',
                  fontSize: '14px',
                  fontWeight: '400',
                  // fontStyle: 'regular',
                  overflow: 'hidden',
                }}
              >
                Select App
              </Typography>
            )
          }

          return (
            <div style={style.menuItem}>
              <div style={style.menuItemIcon}>
                {selectedApp.name.charAt(0)}
              </div>
              <Typography
                style={{
                  fontSize: '14px',
                  fontWeight: '400',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {selectedApp.name}
              </Typography>
            </div>
          )
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
          {allApps.map(app => (
            <MenuItem key={app.id} value={app.id}>
              <div style={style.menuItemIcon}>{app.name.charAt(0)}</div>
              {app.name}
            </MenuItem>
          ))}
          {bottomComponent}
      </Select>
    </FormControl>
  )
}

export default DropdownSelect
