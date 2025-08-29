// frontend/screens/BudgetEditScreen.tsx
import React, { useContext, useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import BudgetForm from '../components/forms/BudgetForm'
import { supabase } from '../lib/supabase'
import { AuthContext } from '../contexts/AuthContext'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../navigation/types'

type BudgetEditRouteProp = RouteProp<RootStackParamList, 'BudgetEdit'>

export default function BudgetEditScreen() {
  const navigation = useNavigation()
  const route = useRoute<BudgetEditRouteProp>()
  const { user } = useContext(AuthContext)
  const { budget } = route.params || {}

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    if (!user) return

    setLoading(true)
    try {
      if (budget) {
        // Update existing budget
        const { error } = await supabase
          .from('budgets')
          .update({
            category: values.category,
            limit_amount: values.limit_amount,
            start_date: values.start_date.toISOString().split('T')[0],
            end_date: values.end_date.toISOString().split('T')[0],
          })
          .eq('id', budget.id)
          .eq('user_id', user.id)

        if (error) throw error
      } else {
        // Insert new budget
        const { error } = await supabase.from('budgets').insert({
          user_id: user.id,
          category: values.category,
          limit_amount: values.limit_amount,
          start_date: values.start_date.toISOString().split('T')[0],
          end_date: values.end_date.toISOString().split('T')[0],
        })

        if (error) throw error
      }
      Alert.alert('Success', 'Budget saved successfully!')
      navigation.goBack()
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <BudgetForm initialValues={budget} onSubmit={handleSubmit} loading={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
