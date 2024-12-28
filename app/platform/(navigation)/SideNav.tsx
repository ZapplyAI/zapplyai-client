'use client'
import React from 'react'
import { VerticalCenterBox } from '@/components/layouts/CenterBox'
import { Divider, IconButton, IconButtonProps } from '@mui/material'
import Image from 'next/image'
import AppsIcon from '@mui/icons-material/Apps'
import { useRouter } from 'next/navigation'

export default function SideNav() {
  const router = useRouter()

  const handleAppsClick = () => {
    router.push('/platform')
  }

  const style = {
    mainContainer: {
      height: '100%',
      padding: '20px 10px ',
      justifyContent: 'start',
      borderRight: '1px solid #26262E',
    },
  }

  return (
    <VerticalCenterBox sx={style.mainContainer}>
      <IconButton onClick={handleAppsClick} sx={{
        marginBottom: '12px'
      }}>
        <Image
          src="/ElasticappLogo_Small.svg"
          alt="CPP"
          width={28}
          height={28}
        />
      </IconButton>

      <NavIconButton onClick={handleAppsClick}>
        <AppsIcon
          sx={{
            height: '100%',
            width: '100%',
            color: 'icon.main',
          }}
        />
      </NavIconButton>

      <Divider
        variant="middle"
        sx={{
          marginTop: '18px',
          marginBottom: '18px',
          width: '25px',
          border: '1px solid',
          borderColor: '#26262E',
        }}
      />

      <NavIconButton onClick={handleAppsClick}>
        <div
          style={{
            height: '20px',
            width: '20px',
            backgroundColor: '#807F89',
          }}
        />
      </NavIconButton>
    </VerticalCenterBox>
  )
}

const NavIconButton = (props: IconButtonProps) => {
  return (
    <IconButton
      sx={{
        height: '40px',
        width: '40px',
        padding: '5px',
        borderRadius: '8px',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
      {...props}
    >
      {props.children}
    </IconButton>
  )
}
