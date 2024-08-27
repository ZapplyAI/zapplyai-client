import { nanoid } from 'nanoid'
import { YourWebApp } from '@/lib/type'

export const data: YourWebApp[] = [
  {
    id: nanoid(),
    name: 'Task-manager',
    url: 'https://task-manager.elasticapp.ai',
    // lastModified: new Date().toISOString(),
    lastModified: '2024-08-27T13:08:17.107Z',
    status: 'Active',
  },
  {
    id: nanoid(),
    name: 'Ping-pong',
    url: 'https://ping-pong.elasticapp.ai',
    lastModified: '2024-08-24T12:01:12.307E',
    status: 'Active',
  },
  {
    id: nanoid(),
    name: 'Connect-four',
    url: 'https://connect-four.elasticapp.ai',
    lastModified: '2024-08-26T12:08:10.657S',
    status: 'Active',
  },
  {
    id: nanoid(),
    name: 'Browser-extension',
    url: '',
    lastModified: '2024-08-27T08:05:18.994U',
    status: 'Built',
  },
]
