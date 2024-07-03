import React, { CSSProperties } from 'react'

const LoadingDisplay = (): React.ReactNode => {
  return <div style={style.loadingDisplay}>Loading ...</div>
}

const style: { [key: string]: CSSProperties } = {
  loadingDisplay: {
    height: '100svh',
    width: '100svw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default LoadingDisplay
