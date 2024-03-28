'use client'
import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import styles from './Tabs.module.scss'

interface TabsProps {
  tabs: {
    [key: string]: React.ReactNode
  }
  className?: string
}

const Tabs = ({ tabs, className, ...props }: TabsProps): React.ReactNode => {
  const titles = React.useMemo(() => Object.keys(tabs), [tabs])

  return (
    <TabsPrimitive.Root
      className={clsx(styles.tabsRoot, className)}
      defaultValue={titles[0]}
      {...props}
    >
      <TabsPrimitive.List className={styles.tabList}>
        {titles.map(title => (
          <TabsPrimitive.Trigger
            value={title}
            key={title}
            className={styles.tabsTrigger}
          >
            {title}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {titles?.map((title, index) => (
        <TabsPrimitive.Content key={title} value={title}>
          {tabs[title]}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}

export default Tabs
