'use client'
import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import styles from './Tabs.module.scss'

interface TabsProps {
  tabs: {
    title: string
    content?: React.ReactNode
  }[]
  className?: string
}

const Tabs = ({ tabs, className, ...props }: TabsProps): React.ReactNode => {
  const titles: string[] = React.useMemo(
    () => tabs.map(tab => tab.title),
    [tabs]
  )
  const content: React.ReactNode[] = React.useMemo(
    () => tabs.map(tab => tab.content),
    [tabs]
  )

  return (
    <TabsPrimitive.Root
      className={clsx(styles.tabsRoot, className)}
      defaultValue={titles[0]}
      {...props}
    >
      <TabsPrimitive.List className={styles.tabList}>
        {titles.map(tab => (
          <TabsPrimitive.Trigger
            value={tab}
            key={tab}
            className={styles.tabsTrigger}
          >
            {tab}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {content?.map((_content, index) => (
        <TabsPrimitive.Content key={titles[index]} value={titles[index]}>
          {_content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}

export default Tabs
