'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LandingContextType {
  name: string
  surname: string
  setName: (name: string) => void
  setSurname: (surname: string) => void
}

const LandingContext = createContext<LandingContextType | undefined>(undefined)

interface LandingProviderProps {
  children: ReactNode
}

export const LandingProvider: React.FC<LandingProviderProps> = ({
  children,
}) => {
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')

  return (
    <LandingContext.Provider value={{ name, surname, setName, setSurname }}>
      {children}
    </LandingContext.Provider>
  )
}

export const useLandingContext = (): LandingContextType => {
  const context = useContext(LandingContext)
  if (!context) {
    throw new Error('useLandingContext must be used within a LandingProvider')
  }
  return context
}
