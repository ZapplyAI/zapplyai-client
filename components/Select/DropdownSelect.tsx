import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import Typography from '@mui/material/Typography'
import find from 'lodash/find'
import { CSSProperties } from 'react'
import { WebApp } from '@/lib/type'

type AnyFunction = (...args: any[]) => any

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '250px',
      overflow: 'scroll',
      border: '0px',
      background: '#352F5A',
      borderRadius: '7px',
      // borderTopLeftRadius: '0',
      // borderTopRightRadius: '0',
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
  bottomComponent,
}: DropdownSelectProps): React.ReactNode => {
  const style: { [key: string]: CSSProperties } = {
    menuItemMain: {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center',
    },
    menuItemIcon: {
      width: '22px',
      height: '22px',
      background: '#800E52',
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
    menuItemText: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: '#CFCED9',
      fontSize: '14px',
      fontWeight: 400,
      // color: '#E8E7F4'
    },
    menuItem: { margin: '3px 6px', borderRadius: '4px', padding: '5px 6px' },
  }

  const onSelectChange = (event: SelectChangeEvent) => {
    selectApp(event.target.value)
  }

  return (
    <Select
      fullWidth
      value={selectedApp.id}
      onChange={onSelectChange}
      IconComponent={() => <UnfoldMoreIcon style={{ color: '#CFCED9' }} />}
      renderValue={selected => {
        const selectedApp = find(allApps, thisApp => thisApp.id === selected)

        if (selectedApp === undefined) {
          return <Typography style={style.menuItemText}>Select App</Typography>
        }

        return (
          <div style={style.menuItemMain}>
            <div style={style.menuItemIcon}>{selectedApp.name.charAt(0)}</div>
            <Typography style={style.menuItemText}>
              {selectedApp.name}
            </Typography>
          </div>
        )
      }}
      MenuProps={MenuProps}
      sx={{
        '& .MuiSelect-select': {
          padding: '6px 4px',
        },
        '& .MuiOutlinedInput-notchedOutline': { border: 0 },
        background: '#5443B1',
        border: '0px solid',
        padding: '0px 8px',
      }}
    >
      {allApps.map(app => (
        <MenuItem key={app.id} value={app.id} style={style.menuItem}>
          <div style={style.menuItemIcon}>{app.name.charAt(0)}</div>
          <span style={style.menuItemText}>{app.name}</span>
        </MenuItem>
      ))}
      {bottomComponent}
    </Select>
  )
}

export default DropdownSelect
