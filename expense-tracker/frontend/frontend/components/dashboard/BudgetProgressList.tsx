import React, { useContext } from 'react'
import { Card, Text, ProgressBar, ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import { useBudgets } from '../../hooks/useBudgets'

export default function BudgetProgressList() {
  const { user } = useContext(AuthContext)
  const { budgets, loading } = useBudgets(user?.id)

  if (loading) {
    return (
      <Card style={{ marginVertical: 8 }}>
        <Card.Content>
          <ActivityIndicator />
        </Card.Content>
      </Card>
    )
  }

  if (!budgets.length) {
    return (
      <Card style={{ marginVertical: 8 }}>
        <Card.Content>
          <Text>No budgets found.</Text>
        </Card.Content>
      </Card>
    )
  }

  return (
    <Card style={{ marginVertical: 8 }}>
      <Card.Content>
        <Text variant="titleLarge">Budget Progress</Text>
        {budgets.map((b, i) => {
          const progress = b.spent_amount / b.limit_amount
          return (
            <View key={i} style={{ marginTop: 12 }}>
              <Text>{b.category} — ${b.spent_amount.toFixed(2)} / ${b.limit_amount.toFixed(2)}</Text>
              <ProgressBar progress={progress} color={progress > 0.8 ? 'red' : 'green'} />
            </View>
          )
        })}
      </Card.Content>
    </Card>
  )
}
