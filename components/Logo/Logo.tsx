'use client'

import React, { CSSProperties } from 'react'
import Image from 'next/image'

interface LogoProps {
  sx?: object
  height?: number,
  width?: number,
  mini?: boolean
}

const Logo = ({sx={}, height=22, width=130, mini=false} : LogoProps): React.ReactNode => {
  return mini ? (
    <div style={{ ...style.logoIcon, ...sx }}>
      <Image
        src="/image/brand/zapplyAI_io_logo.svg"
        alt="LOGO"
        height={height}
        width={width}
      />
    </div>
  ) : (
    <div style={{ ...style.logoIcon, ...sx }}>
      <Image
        src="/image/brand/zapplyAI_io_logo.svg"
        alt="LOGO"
        height={height}
        width={width}
      />
    </div>
  )
}

const style: { [key: string]: CSSProperties } = {
  logoIcon: {
    color: '#775EFF',
    height: '22px',
  },
}

export default Logo
