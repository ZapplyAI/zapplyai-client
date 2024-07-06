import React from 'react'
import { styled } from '@mui/system'
import { ButtonBase, ClickAwayListener, MenuItem, Paper } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Popper } from '@mui/base'

const StyledSelect = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  cursor: 'pointer',
  userSelect: 'none',
  fontFamily: 'Arial, sans-serif',
  color: '#D0D0D0',
  fontSize: '1rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 16px',
  backgroundColor: 'transparent',
  borderRadius: '8px',
  minWidth: '150px',
  '&:hover': {
    backgroundColor: '#2A2937',
  },
}))

const DropdownContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#201F29',
  borderRadius: '5px',
  overflow: 'hidden',
  marginTop: '8px',
  width: '10rem',
  paddingY: '0.5rem',
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '0.625rem 0.75rem',
  display: 'flex',
  alignItems: 'center',
  color: '#D0D0D0',
  fontSize: '0.75rem',
  fontWeight: 300,
  '&:hover': {
    backgroundColor: '#2A2937',
  },
  '& .MuiSvgIcon-root': {
    marginRight: '1rem',
    color: '#828282',
    height: '15px',
  },
}))

const Divider = styled('div')({
  height: '1px',
  backgroundColor: '#978f8f',
  margin: '0 0.8rem',
})

const PageSelect = ({ options, value, onChange }) => {
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
    setOpen(prev => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMenuItemClick = option => {
    onChange(option)
    handleClose()
  }

  return (
    <>
      <StyledSelect onClick={handleClick}>
        <span>{value?.label || 'Product page'}</span>
        <ExpandMoreIcon
          style={{
            marginLeft: '8px',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s',
          }}
        />
      </StyledSelect>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <DropdownContainer>
            {options.map((option, index) => (
              <React.Fragment key={option.value}>
                <StyledMenuItem onClick={() => handleMenuItemClick(option)}>
                  <InsertDriveFileIcon fontSize="small" />
                  {option.label}
                </StyledMenuItem>
              </React.Fragment>
            ))}
            <Divider />
            <StyledMenuItem
              onClick={() =>
                handleMenuItemClick({ value: 'new', label: 'New page' })
              }
            >
              <AddCircleIcon fontSize="small" />
              New page
            </StyledMenuItem>
          </DropdownContainer>
        </ClickAwayListener>
      </Popper>
    </>
  )
}

export default PageSelect
