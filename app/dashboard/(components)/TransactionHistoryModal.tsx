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
import DashboardModal from './DashboardModal'
import { axios } from '@/lib'

interface TransactionHistoryModalProps {
  open: boolean
  onClose: () => void
}

const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({
  open,
  onClose,
}) => {
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
          // Transform API response to a match Transaction type
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

    if (open) {
      ;(async () => fetchTransactions())()
    }
  }, [open])

  // Use API transactions if available, fallback to context transactions
  const displayTransactions =
    apiTransactions.length > 0 ? apiTransactions : contextTransactions

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
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
    <DashboardModal open={open} onClose={onClose} title="Transaction History">
      {isLoading ? (
        <Box
          sx={{
            padding: '24px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={40} sx={{ color: '#775EFF' }} />
        </Box>
      ) : error ? (
        <Box sx={{ padding: '24px', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#FF5E5E' }}>
            {error}
          </Typography>
        </Box>
      ) : displayTransactions.length === 0 ? (
        <Box sx={{ padding: '24px', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#AAAAAA' }}>
            No transactions found
          </Typography>
        </Box>
      ) : (
        <List
          sx={{
            padding: 0,
            maxHeight: '400px',
            overflow: 'auto',
          }}
        >
          {displayTransactions.map(transaction => (
            <React.Fragment key={transaction.id}>
              <ListItem
                sx={{
                  padding: '16px 24px',
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
                    marginBottom: '8px',
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ color: '#E5E5E5', fontWeight: 500 }}
                    >
                      {transaction.description}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#AAAAAA' }}>
                      {formatDate(transaction.date)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#E5E5E5',
                      fontWeight: 500,
                      fontFamily: 'JetBrains Mono',
                    }}
                  >
                    {formatAmount(transaction.amount)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor:
                        transaction.type === 'subscription'
                          ? 'rgba(119, 94, 255, 0.1)'
                          : 'rgba(255, 94, 191, 0.1)',
                      display: 'inline-flex',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color:
                          transaction.type === 'subscription'
                            ? '#775EFF'
                            : '#FF5EBF',
                        fontFamily: 'JetBrains Mono',
                        fontSize: '11px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {transaction.type}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
              <Divider sx={{ backgroundColor: '#5E5E5E' }} />
            </React.Fragment>
          ))}
        </List>
      )}
    </DashboardModal>
  )
}

export default TransactionHistoryModal
