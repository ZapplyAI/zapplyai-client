'use client'
import React, { createContext, useContext, ReactNode, useState } from 'react'

// Define the type for team API usage
type TeamApiUsage = {
  userId: string
  userName: string
  tokensUsed: number
}

// Define the subscription types
export type SubscriptionType = 'free' | 'plus' | 'team'

// Define the context type
interface DashboardContextType {
  apiTokensUsedIndividual: number
  apiTokensUsedTeam: number
  maxApiTokensIndividual: number
  maxApiTokensTeam: number
  copilotAccessCode: string | null
  teamApiUsage: TeamApiUsage[]
  subscriptionType: SubscriptionType
}

// Create the context with default values
const DashboardContext = createContext<DashboardContextType>({
  apiTokensUsedIndividual: 0,
  apiTokensUsedTeam: 0,
  maxApiTokensIndividual: 0,
  maxApiTokensTeam: 0,
  copilotAccessCode: null,
  teamApiUsage: [],
  subscriptionType: 'free',
})

// Create a provider component
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  // Dummy data for the context
  const [contextValue] = useState<DashboardContextType>({
    apiTokensUsedIndividual: 125000,
    apiTokensUsedTeam: 2750000,
    maxApiTokensIndividual: 500000,
    maxApiTokensTeam: 5000000,
    copilotAccessCode: 'ELASTIC-COPILOT-123456',
    teamApiUsage: [
      { userId: '1', userName: 'John Doe', tokensUsed: 950000 },
      { userId: '2', userName: 'Jane Smith', tokensUsed: 750000 },
      { userId: '3', userName: 'Bob Johnson', tokensUsed: 550000 },
      { userId: '4', userName: 'Alice Williams', tokensUsed: 500000 },
    ],
    subscriptionType: 'free', // Set to 'team' for the final implementation
  })

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  )
}

// Create a custom hook to use the context
export const useDashboard = () => useContext(DashboardContext)

export default DashboardContext
