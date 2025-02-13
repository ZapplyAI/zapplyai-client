'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Logo.module.scss'

interface LogoProps {
  mini?: boolean
}

export const Logo = ({ mini }: LogoProps) => {
  return (
    <Link href="/" className={styles.logo}>
      <Image
        src="/assets/svgs/LISA MARK EXP.svg"
        alt="Logo"
        width={mini ? 32 : 40}
        height={mini ? 32 : 40}
        priority
      />
    </Link>
  )
}
