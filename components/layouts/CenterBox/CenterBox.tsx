'use client'
import { Box, BoxProps } from '@mui/material'
import React from 'react'

export const VerticalCenterBox = (props: BoxProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      {...props}
    >
      {props.children}
    </Box>
  )
}

export const VerticalLeftAlignBox = (props: BoxProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      flexDirection="column"
      {...props}
    >
      {props.children}
    </Box>
  )
}

export const HorizontalCenterBox = (props: BoxProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      {...props}
    >
      {props.children}
    </Box>
  )
}

export const HorizontalLeftAlignBox = (props: BoxProps) => {
  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      flexDirection="row"
      {...props}
    >
      {props.children}
    </Box>
  )
}
