'use client'
import { createTheme, Theme } from '@mui/material/styles'
import { Kanit } from 'next/font/google'

// const kanit = Kanit({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
// })

const themeTypography = ({
  h1: {
    fontWeight: 700,
    fontSize: '5.5vw',
    lineHeight: '5.5vw',
    textTransform: 'uppercase',
    display: 'inline-block',
    fontFamily: 'Kanit, sans-serif',
  },
  h1_gradient: {
    fontWeight: 700,
    fontSize: '5.2vw',
    lineHeight: '5.2vw',
    textTransform: 'uppercase',
    display: 'inline-block',
    backgroundImage:
      'linear-gradient(135deg, #D0D0D0 0%, #6A6A6A 77%, #000000 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontFamily: 'Kanit, sans-serif',
  },
  h1_gradient_mobile: {
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '36px',
    textTransform: 'uppercase',
    display: 'inline-block',
    backgroundImage:
      'linear-gradient(135deg, #D0D0D0 0%, #6A6A6A 77%, #000000 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontFamily: 'Kanit, sans-serif',
  },
  h2: {
    fontWeight: 700,
    fontSize: '56px',
    fontFamily: 'Kanit, sans-serif',
  },
  h2_gradient: {
    fontWeight: 700,
    fontSize: '4.0vw',
    lineHeight: '4.0vw',
    textTransform: 'uppercase',
    display: 'inline-block',
    backgroundImage:
      'linear-gradient(135deg, #D0D0D0 0%, #6A6A6A 77%, #000000 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontFamily: 'Kanit, sans-serif',
  },
  h2_gradient_mobile: {
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '28px',
    textTransform: 'uppercase',
    display: 'inline-block',
    backgroundImage:
      'linear-gradient(135deg, #D0D0D0 0%, #6A6A6A 77%, #000000 100%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontFamily: 'Kanit, sans-serif',
  },
  h3_empty: {
    fontWeight: 800,
    fontSize: '42px',
    WebkitTextStroke: '1px #D0D0D0',
    color: '#000',
    fontFamily: 'Kanit, sans-serif',
  },
  h4: {
    fontWeight: 400,
    fontSize: '24px',
    fontFamily: 'Kanit, sans-serif',
  },
  h5: {
    fontWeight: 200,
    fontSize: '1.1vw',
    lineHeight: '1.9vw',
    color: '#D0D0D0',
    fontFamily: 'Kanit, sans-serif',
  },
  h5_mobile: {
    fontWeight: 200,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#D0D0D0',
    fontFamily: 'Kanit, sans-serif',
  },
  h6: {
    fontWeight: 300,
    fontSize: '14px',
    color: '#D0D0D0',
    fontFamily: 'Kanit, sans-serif',
  },
})

const darkTheme: Theme = createTheme({
  // @ts-ignore
  typography: {
    ...themeTypography,
  },
  palette: {
    mode: 'dark',
  },
})

export default darkTheme
