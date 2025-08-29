// frontend/screens/TransactionEditScreen.tsx
import React, { useContext, useState, useEffect } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import TransactionForm from '../components/forms/TransactionForm'
import { supabase } from '../lib/supabase'
import { AuthContext } from '../contexts/AuthContext'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/types'

type TransactionEditRouteProp = RouteProp<RootStackParamList, 'TransactionEdit'>

export default function TransactionEditScreen() {
  const navigation = useNavigation()
  const route = useRoute<TransactionEditRouteProp>()
  const { user } = useContext(AuthContext)
  const { transaction } = route.params || {}

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    if (!user) return

    setLoading(true)
    try {
      if (transaction) {
        // Update existing transaction
        const { error } = await supabase
          .from('transactions')
          .update({
            title: values.title,
            amount: values.amount,
            category: values.category,
            date: values.date.toISOString().split('T')[0],
          })
          .eq('id', transaction.id)
          .eq('user_id', user.id)

        if (error) throw error
      } else {
        // Insert new transaction
        const { error } = await supabase.from('transactions').insert({
          user_id: user.id,
          title: values.title,
          amount: values.amount,
          category: values.category,
          date: values.date.toISOString().split('T')[0],
        })

        if (error) throw error
      }
      Alert.alert('Success', 'Transaction saved successfully!')
      navigation.goBack()
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <TransactionForm initialValues={transaction} onSubmit={handleSubmit} loading={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
