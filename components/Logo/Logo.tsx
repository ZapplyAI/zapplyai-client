import React, { CSSProperties } from 'react'
import Image from 'next/image'

const Logo = (): React.ReactNode => {
  return (
    <div style={style.logoIcon}>
      <Image
        src="/image/brand/zapplyAI_io_logo.svg"
        alt="An SVG of an eye"
        height={22}
        width={130}
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
