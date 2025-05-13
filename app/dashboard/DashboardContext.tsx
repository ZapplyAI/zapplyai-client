'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react'

type TeamApiUsage = {
  userId: string
  userName: string
  tokensUsed: number
}

export type TeamMember = {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
  joinedAt: string
}

export type SubscriptionType = 'free' | 'plus' | 'team'

export type Transaction = {
  id: string
  date: string
  amount: number
  type: 'subscription' | 'one-time'
  description: string
}

interface DashboardContextType {
  apiTokensUsedIndividual: number
  apiTokensUsedTeam: number
  maxApiTokensIndividual: number
  maxApiTokensTeam: number
  requestsUsedIndividual: number
  requestsUsedTeam: number
  maxRequestsIndividual: number
  maxRequestsTeam: number
  copilotAccessCode: string | null
  teamApiUsage: TeamApiUsage[]
  teamMembers: TeamMember[]
  subscriptionType: SubscriptionType
  transactions: Transaction[]
  inviteTeamMember: (email: string) => Promise<boolean>
}

const DashboardContext = createContext<DashboardContextType>({
  apiTokensUsedIndividual: 0,
  apiTokensUsedTeam: 0,
  maxApiTokensIndividual: 0,
  maxApiTokensTeam: 0,
  requestsUsedIndividual: 0,
  requestsUsedTeam: 0,
  maxRequestsIndividual: 0,
  maxRequestsTeam: 0,
  copilotAccessCode: null,
  teamApiUsage: [],
  teamMembers: [],
  subscriptionType: 'free',
  transactions: [],
  inviteTeamMember: async () => false,
})

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [contextValue, setContextValue] = useState<DashboardContextType>({
    apiTokensUsedIndividual: 125000,
    apiTokensUsedTeam: 2750000,
    maxApiTokensIndividual: 500000,
    maxApiTokensTeam: 5000000,
    requestsUsedIndividual: 350,
    requestsUsedTeam: 1250,
    maxRequestsIndividual: 1000,
    maxRequestsTeam: 5000,
    copilotAccessCode: 'ELASTIC-COPILOT-123456',
    teamApiUsage: [
      { userId: '1', userName: 'John Doe', tokensUsed: 950000 },
      { userId: '2', userName: 'Jane Smith', tokensUsed: 750000 },
      { userId: '3', userName: 'Bob Johnson', tokensUsed: 550000 },
      { userId: '4', userName: 'Alice Williams', tokensUsed: 500000 },
    ],
    teamMembers: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        joinedAt: '2023-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'member',
        joinedAt: '2023-02-20T14:45:00Z'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        role: 'member',
        joinedAt: '2023-03-10T09:15:00Z'
      },
      {
        id: '4',
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        role: 'member',
        joinedAt: '2023-04-05T16:20:00Z'
      },
    ],
    transactions: [
      {
        id: '1',
        date: '2023-11-01T10:00:00Z',
        amount: 29.99,
        type: 'subscription',
        description: 'Monthly Plus Subscription'
      },
      {
        id: '2',
        date: '2023-10-01T10:00:00Z',
        amount: 29.99,
        type: 'subscription',
        description: 'Monthly Plus Subscription'
      },
      {
        id: '3',
        date: '2023-09-01T10:00:00Z',
        amount: 29.99,
        type: 'subscription',
        description: 'Monthly Plus Subscription'
      },
      {
        id: '4',
        date: '2023-08-15T14:30:00Z',
        amount: 99.99,
        type: 'one-time',
        description: 'Token Pack Purchase'
      },
      {
        id: '5',
        date: '2023-08-01T10:00:00Z',
        amount: 29.99,
        type: 'subscription',
        description: 'Monthly Plus Subscription'
      }
    ],
    subscriptionType: 'team',
    inviteTeamMember: async (email: string) => {
      console.log(`Invitation sent to ${email}`);
      return true;
    }
  });

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => useContext(DashboardContext)

export default DashboardContext
