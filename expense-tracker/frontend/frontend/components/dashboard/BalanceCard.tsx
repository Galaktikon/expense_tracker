import React from 'react'
import { Card, Text } from 'react-native-paper'

export default function BalanceCard() {
  return (
    <Card style={{ marginVertical: 8 }}>
      <Card.Content>
        <Text variant="titleLarge">Total Balance</Text>
        <Text variant="headlineMedium">$12,345.67</Text>
      </Card.Content>
    </Card>
  )
}
