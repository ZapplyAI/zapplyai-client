'use client'

import React, { CSSProperties, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import Divider from '@mui/material/Divider'
import {LinearProgressWithLabel} from "@/components";


interface AppStatusBoxProps {}

const AppStatusBox = ({}: AppStatusBoxProps): React.ReactNode => {
  return (
    <Box style={style.statusBoxContainer}>
      <h4 style={style.statusHeader}>Deployment</h4>
      <p style={style.statusDescription}>
        Your app is being deployed, we will let you know when it&apos;s finished.
      </p>

      <Divider
        sx={{
          margin: '12px 0px',
          background: '#48474E',
        }}
      />

      <div style={style.statusBody}>
        <LinearProgressWithLabel value={62} />
      </div>
    </Box>
  )
}

const style: { [key: string]: CSSProperties } = {
  statusBoxContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: '#212121',
    color: '#fff',
    // width: 'calc(100% - (12px * 2))'
    width: '100%',
    padding: '12px',
  },
  statusHeader: {
    fontSize: '12px',
    marginBottom: '8px',
  },
  statusDescription: {
    fontSize: '12px',
    fontWeight: 'normal',
  },
  statusBody: {
    fontSize: '12px',
    fontWeight: 'normal',
  },
}

export default AppStatusBox
