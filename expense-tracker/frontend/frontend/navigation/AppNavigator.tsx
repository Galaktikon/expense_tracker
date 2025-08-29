// frontend/navigation/AppNavigator.tsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DashboardScreen from '../screens/DashboardScreen'
import TransactionEditScreen from '../screens/TransactionEditScreen'
import BudgetEditScreen from '../screens/BudgetEditScreen'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="TransactionEdit" component={TransactionEditScreen} options={{ title: 'Add/Edit Transaction' }} />
      <Stack.Screen name="BudgetEdit" component={BudgetEditScreen} options={{ title: 'Add/Edit Budget' }} />
    </Stack.Navigator>
  )
}
