import React, { CSSProperties } from 'react'
import Image from 'next/image'

interface LogoProps {
  sx?: object
  height?: number,
  width?: number
}

const Logo = ({sx={}, height=22, width=130} : LogoProps): React.ReactNode => {
  return (
    <div style={{ ...style.logoIcon, ...sx }}>
      <Image
        src="/image/brand/zapplyAI_io_logo.svg"
        alt="An SVG of an eye"
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
