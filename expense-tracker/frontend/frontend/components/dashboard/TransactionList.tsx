import React, { useContext } from 'react'
import { Card, Text, List, ActivityIndicator } from 'react-native-paper'
import { AuthContext } from '../../contexts/AuthContext'
import { useTransactions } from '../../hooks/useTransactions'

export default function TransactionList() {
  const { user } = useContext(AuthContext)
  const { transactions, loading } = useTransactions(user?.id)

  return (
    <Card style={{ marginVertical: 8 }}>
      <Card.Content>
        <Text variant="titleLarge">Recent Transactions</Text>
        {loading && <ActivityIndicator />}
        {!loading && transactions.length === 0 && <Text>No transactions found.</Text>}
        {!loading &&
          transactions.map((tx) => (
            <List.Item
              key={tx.id}
              title={tx.title}
              description={tx.category}
              right={() => (
                <Text style={{ color: tx.amount < 0 ? 'red' : 'green' }}>
                  {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount)}
                </Text>
              )}
            />
          ))}
      </Card.Content>
    </Card>
  )
}
