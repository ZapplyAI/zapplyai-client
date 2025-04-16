'use client'
import React from 'react'
import { Box, Divider, List, ListItem, Typography } from '@mui/material'
import { useDashboard } from '../DashboardContext'
import { useUser } from '@auth0/nextjs-auth0'
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
  const { transactions } = useDashboard()
  const { error } = useUser()

  React.useEffect(() => {
    (async () => {
      const {status, data: response} = await axios.get('/api/subscriptions/payments');

      if (status >= 200) {
        console.log(response);
      }
    })()
  }, [])

  // Use fake transactions if there's an error loading the user
  const displayTransactions = error
    ? [
        {
          id: 'fake1',
          date: '2023-12-01T10:00:00Z',
          amount: 29.99,
          cardLastFour: '4242',
          type: 'subscription' as const,
          description: 'Monthly Plus Subscription',
        },
        {
          id: 'fake2',
          date: '2023-11-01T10:00:00Z',
          amount: 29.99,
          cardLastFour: '4242',
          type: 'subscription' as const,
          description: 'Monthly Plus Subscription',
        },
        {
          id: 'fake3',
          date: '2023-10-15T14:30:00Z',
          amount: 99.99,
          cardLastFour: '5678',
          type: 'one-time' as const,
          description: 'Token Pack Purchase',
        },
        {
          id: 'fake4',
          date: '2023-10-01T10:00:00Z',
          amount: 29.99,
          cardLastFour: '4242',
          type: 'subscription' as const,
          description: 'Monthly Plus Subscription',
        },
        {
          id: 'fake5',
          date: '2023-09-01T10:00:00Z',
          amount: 29.99,
          cardLastFour: '4242',
          type: 'subscription' as const,
          description: 'Monthly Plus Subscription',
        },
        {
          id: 'fake6',
          date: '2023-08-15T14:30:00Z',
          amount: 49.99,
          cardLastFour: '5678',
          type: 'one-time' as const,
          description: 'Additional API Credits',
        },
        {
          id: 'fake7',
          date: '2023-08-01T10:00:00Z',
          amount: 29.99,
          cardLastFour: '4242',
          type: 'subscription' as const,
          description: 'Monthly Plus Subscription',
        },
        {
          id: 'fake8',
          date: '2023-07-01T10:00:00Z',
          amount: 29.99,
          cardLastFour: '4242',
          type: 'subscription' as const,
          description: 'Monthly Plus Subscription',
        },
        {
          id: 'fake9',
          date: '2023-06-01T10:00:00Z',
          amount: 29.99,
          cardLastFour: '4242',
          type: 'subscription' as const,
          description: 'Monthly Plus Subscription',
        },
        {
          id: 'fake10',
          date: '2023-05-01T10:00:00Z',
          amount: 29.99,
          cardLastFour: '4242',
          type: 'subscription' as const,
          description: 'Monthly Plus Subscription',
        },
      ]
    : transactions

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

  const formatCardNumber = (lastFour: string) => {
    return `**** **** **** ${lastFour}`
  }

  return (
    <DashboardModal open={open} onClose={onClose} title="Transaction History">
      {displayTransactions.length === 0 ? (
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
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#AAAAAA',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '12px',
                    }}
                  >
                    card number: {formatCardNumber(transaction.cardLastFour)}
                  </Typography>
                  <Box
                    sx={{
                      marginLeft: '12px',
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
