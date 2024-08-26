import { nanoid } from 'nanoid'
import { YourWebApp } from '@/lib/type'

export const data: YourWebApp[] = [
  {
    id: nanoid(),
    name: 'Task-manager',
    url: 'task-manager.elastic.app',
    lastModified: 'Seattle',
    status: 'Active',
  },
  {
    id: nanoid(),
    name: 'Ping-pong',
    url: 'ping-pong.elastic.app',
    lastModified: 'Seattle',
    status: 'Active',
  },
  {
    id: nanoid(),
    name: 'Select-four',
    url: 'select-four.elastic.app',
    lastModified: 'Seattle',
    status: 'Active',
  },
]
