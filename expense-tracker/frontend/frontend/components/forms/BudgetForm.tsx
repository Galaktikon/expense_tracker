// frontend/components/forms/BudgetForm.tsx
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

interface BudgetFormProps {
  initialValues?: {
    id: string
    category: string
    limit_amount: string
    start_date: Date
    end_date: Date
  }
  onSubmit: (values: {
    category: string
    limit_amount: number
    start_date: Date
    end_date: Date
  }) => void
  loading?: boolean
}

export default function BudgetForm({ initialValues, onSubmit, loading }: BudgetFormProps) {
  const [category, setCategory] = useState(initialValues?.category || '')
  const [limitAmount, setLimitAmount] = useState(initialValues?.limit_amount || '')
  const [startDate, setStartDate] = useState(initialValues?.start_date || new Date())
  const [endDate, setEndDate] = useState(initialValues?.end_date || new Date())
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!category) errs.category = 'Category is required'
    if (!limitAmount || isNaN(Number(limitAmount))) errs.limit_amount = 'Valid limit amount is required'
    if (startDate > endDate) errs.date = 'Start date must be before end date'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      onSubmit({ category, limit_amount: Number(limitAmount), start_date: startDate, end_date: endDate })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Category"
        value={category}
        onChangeText={setCategory}
        error={!!errors.category}
        mode="outlined"
        style={styles.input}
      />
      {errors.category && <Text style={styles.error}>{errors.category}</Text>}

      <TextInput
        label="Limit Amount"
        value={limitAmount}
        onChangeText={setLimitAmount}
        keyboardType="numeric"
        error={!!errors.limit_amount}
        mode="outlined"
        style={styles.input}
      />
      {errors.limit_amount && <Text style={styles.error}>{errors.limit_amount}</Text>}

      <Button onPress={() => setShowStartPicker(true)} mode="outlined" style={styles.input}>
        {`Start Date: ${startDate.toDateString()}`}
      </Button>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowStartPicker(false)
            if (selectedDate) setStartDate(selectedDate)
          }}
        />
      )}

      <Button onPress={() => setShowEndPicker(true)} mode="outlined" style={styles.input}>
        {`End Date: ${endDate.toDateString()}`}
      </Button>
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowEndPicker(false)
            if (selectedDate) setEndDate(selectedDate)
          }}
        />
      )}

      {errors.date && <Text style={styles.error}>{errors.date}</Text>}

      <Button mode="contained" onPress={handleSubmit} loading={loading} style={styles.submitBtn}>
        Save Budget
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  submitBtn: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
})
