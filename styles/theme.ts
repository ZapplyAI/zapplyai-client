'use client'
import { createTheme } from '@mui/material/styles'

import { Inter } from 'next/font/google'
import { Radio_Canada } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const radio_canada = Radio_Canada({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

const darkTheme = createTheme({
  typography: {
    fontFamily: radio_canada.style.fontFamily,
  },
  palette: {
    mode: 'dark',
  },
})

export default darkTheme
