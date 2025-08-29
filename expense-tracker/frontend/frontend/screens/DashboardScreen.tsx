import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { ScrollView, StyleSheet } from 'react-native'
import BalanceCard from '../components/dashboard/BalanceCard'
import BudgetProgressList from '../components/dashboard/BudgetProgressList'
import TransactionList from '../components/dashboard/TransactionList'
import SubscriptionsList from '../components/dashboard/SubscriptionsList'
import QuickActions from '../components/dashboard/QuickActions'
import { AuthContext } from '../contexts/AuthContext'

export default function DashboardScreen() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome, {user?.email}</Text>
            <Button title="Logout" onPress={signOut} />
        </View>
        <BalanceCard />
        <QuickActions />
        <BudgetProgressList />
        <TransactionList />
        <SubscriptionsList />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
  },
})
