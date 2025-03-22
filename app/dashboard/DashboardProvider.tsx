'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react'

export type SubscriptionType = 'Team' | 'Individual'
export type SubscriptionState = 'active' | 'canceled' | 'overdue'
export type SubscriptionUser = {
  id: string
  email: string
  subscriptionState: SubscriptionState
}

export type Subscription = {
  id: string
  name?: string
  userEmail: string
  type: SubscriptionType
  users?: SubscriptionUser[]
  state: SubscriptionState
}

interface DashboardState {
  subscriptions: Subscription[]
  isLoading: boolean
  error: string | null
}

interface DashboardContextType extends DashboardState {
  // functions in here ...
}

// Actions
type DashboardAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | {
      type: 'ADD_SUBSCRIPTION'
      payload: any
    }

// Initial state
const initialState: DashboardState = {
  subscriptions: [
    {
      id: 'wch87u234qiolndjwc4',
      name: 'Zapply AI',
      userEmail: 'andrii@elasticapp.io',
      type: 'Team',
      users: [
        {
          id: '123',
          email: 'israela@elasticapp.io',
          subscriptionState: 'active',
        },
        {
          id: '1234',
          email: 'oseezleu@elasticapp.io',
          subscriptionState: 'active',
        },
        {
          id: '12345',
          email: 'bene@elasticapp.io',
          subscriptionState: 'active',
        },
      ],
      state: 'active',
    },
    {
      id: 'wch87u234qio34eqwcdlndjwc4',
      userEmail: 'beneluan@elasticapp.io',
      type: 'Individual',
      state: 'active',
    },
  ],
  isLoading: false,
  error: null,
}

// Context
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
)

// Reducer
function dashboardReducer(
  state: DashboardState,
  action: DashboardAction
): DashboardState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'ADD_SUBSCRIPTION':
      return { ...state }
    default:
      return state
  }
}

// Provider
export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState)
  // const { data: session } = useSession()
  // const { toast } = useToast()

  // Fetch blogs when session changes
  useEffect(() => {
    // if (session?.user?.email) {
    //   fetchBlogs()
    // }
  }, [])

  // const fetchBlogs = async (page = 1) => {
  //   dispatch({ type: 'SET_LOADING', payload: true })
  //   dispatch({ type: 'SET_ERROR', payload: null })
  //
  //   try {
  //     if (!session?.user?.id) {
  //       throw new Error('User not authenticated')
  //     }
  //     const response = await getBlogs(page, state.limit)
  //
  //     if (!response) {
  //       throw new Error('Failed to fetch blogs')
  //     }
  //
  //     dispatch({
  //       type: 'SET_BLOGS',
  //       payload: {
  //         blogs: response.blogs,
  //         page: response.page,
  //         total: response.total_blogs,
  //         limit: response.limit,
  //       },
  //     })
  //   } catch (error) {
  //     console.error('Error fetching blogs:', error)
  //     dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch blogs' })
  //     toast({
  //       title: 'Error',
  //       description: 'Failed to fetch blogs',
  //       variant: 'destructive',
  //     })
  //   } finally {
  //     dispatch({ type: 'SET_LOADING', payload: false })
  //   }
  // }
  //
  // const deleteBlog = async (blogId: string) => {
  //   try {
  //     const response = await deleteBlogById(blogId)
  //
  //     if (response) {
  //       await fetchBlogs(state.currentPage)
  //       return true
  //     } else {
  //       dispatch({ type: 'SET_ERROR', payload: 'Failed to delete blog' })
  //       return false
  //     }
  //   } catch (error) {
  //     console.error('Error deleting blog:', error)
  //     dispatch({ type: 'SET_ERROR', payload: 'Failed to delete blog' })
  //     return false
  //   }
  // }

  const value = {
    ...state,
    // fetchBlogs,
    // deleteBlog,
    // refreshBlogs: () => fetchBlogs(state.currentPage),
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}
