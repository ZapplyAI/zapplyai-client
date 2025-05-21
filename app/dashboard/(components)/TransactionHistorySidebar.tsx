'use client'
import React, { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { Transaction, useDashboard } from '../DashboardContext'
import { axios } from '@/lib'

const TransactionHistorySidebar: React.FC = () => {
  const { transactions: contextTransactions } = useDashboard()
  const [apiTransactions, setApiTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const { status, data } = await axios.get('/api/subscriptions/payments')

        if (status >= 200 && status < 300 && data?.data) {
          // Transform API response to match Transaction type
          const transformedTransactions: Transaction[] = data.data.map(
            (payment: any) => ({
              id: payment.id,
              date: payment.transaction_date,
              amount: parseFloat(payment.amount),
              type: payment.transaction_type === 'SUBSCRIPTION' ? 'subscription' : 'one-time',
              description: payment.subscription_id
                ? `Subscription (${payment.subscription_id})`
                : 'Payment',
            })
          )

          setApiTransactions(transformedTransactions)
        } else {
          setError('Failed to load transactions')
        }
      } catch (err) {
        console.error('Error fetching transactions:', err)
        setError('Failed to load transactions')
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch transactions when the component mounts
    fetchTransactions()
  }, [])

  // Use API transactions if available, fallback to context transactions
  const displayTransactions =
    apiTransactions.length > 0 ? apiTransactions : contextTransactions

  // Limit to showing only the most recent 3 transactions
  const recentTransactions = displayTransactions.slice(0, 3)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: '8px 16px',
        borderRadius: '8px',
        backgroundColor: 'rgba(30, 30, 30, 0.5)',
        marginBottom: '16px',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: '#E5E5E5',
          fontWeight: 500,
          marginBottom: '8px',
          fontSize: '14px',
        }}
      >
        Recent Transactions
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            padding: '12px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={24} sx={{ color: '#775EFF' }} />
        </Box>
      ) : error ? (
        <Typography variant="caption" sx={{ color: '#FF5E5E' }}>
          {error}
        </Typography>
      ) : recentTransactions.length === 0 ? (
        <Typography variant="caption" sx={{ color: '#AAAAAA' }}>
          No transactions found
        </Typography>
      ) : (
        <List
          sx={{
            padding: 0,
            maxHeight: '200px',
            overflow: 'auto',
          }}
        >
          {recentTransactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <ListItem
                sx={{
                  padding: '8px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: '#E5E5E5', fontWeight: 500, fontSize: '12px' }}
                    >
                      {formatDate(transaction.date)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#AAAAAA', display: 'block', fontSize: '11px' }}
                    >
                      {transaction.description}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#E5E5E5',
                      fontWeight: 500,
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px',
                    }}
                  >
                    {formatAmount(transaction.amount)}
                  </Typography>
                </Box>
              </ListItem>
              {index < recentTransactions.length - 1 && (
                <Divider sx={{ backgroundColor: '#5E5E5E', opacity: 0.5 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  )
}

export default TransactionHistorySidebar
