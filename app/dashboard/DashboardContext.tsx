'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react'

// Define the type for team API usage
type TeamApiUsage = {
  userId: string
  userName: string
  tokensUsed: number
}

// Define the type for team members
export type TeamMember = {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
  joinedAt: string
}

// Define the subscription types
export type SubscriptionType = 'free' | 'plus' | 'team'

// Define the context type
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
  inviteTeamMember: (email: string) => Promise<boolean>
}

// Create the context with default values
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
  inviteTeamMember: async () => false,
})

// Create a provider component
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  // Dummy data for the context
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
    subscriptionType: 'free', // Set to 'team' for the final implementation
    inviteTeamMember: async (email: string) => {
      // In a real implementation, this would make an API call
      // For now, we'll just simulate a successful invitation
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

// Create a custom hook to use the context
export const useDashboard = () => useContext(DashboardContext)

export default DashboardContext
