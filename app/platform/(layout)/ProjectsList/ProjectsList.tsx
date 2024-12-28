'use client'
import React from 'react'
import { VerticalCenterBox } from '@/components/layouts/CenterBox'
import { CreateNewProjectsList } from './component/CreateNewProjectsList'
import { MyProjectsList } from './component/MyProjectsList'

export function ProjectsList() {
  const style = {
    mainContainer: {},
  }

  return (
    <VerticalCenterBox sx={{width: 'fit-content'}}>
      <CreateNewProjectsList />
      <MyProjectsList />
    </VerticalCenterBox>
  )
}
