import React from 'react'
import { Card, Text, List } from 'react-native-paper'

const dummySubs = [
  { name: 'Netflix', amount: 15.99 },
  { name: 'Spotify', amount: 9.99 },
]

export default function SubscriptionsList() {
  return (
    <Card style={{ marginVertical: 8 }}>
      <Card.Content>
        <Text variant="titleLarge">Subscriptions</Text>
        {dummySubs.map((sub, i) => (
          <List.Item key={i} title={sub.name} right={() => <Text>${sub.amount}</Text>} />
        ))}
      </Card.Content>
    </Card>
  )
}
