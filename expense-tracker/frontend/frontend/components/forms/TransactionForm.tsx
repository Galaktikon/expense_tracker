// frontend/components/forms/TransactionForm.tsx
import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'

interface TransactionFormProps {
  initialValues?: {
    id: string
    title: string
    amount: string
    category: string
    date: Date
  }
  onSubmit: (values: {
    title: string
    amount: number
    category: string
    date: Date
  }) => void
  loading?: boolean
}

export default function TransactionForm({ initialValues, onSubmit, loading }: TransactionFormProps) {
  const [title, setTitle] = useState(initialValues?.title || '')
  const [amount, setAmount] = useState(initialValues?.amount || '')
  const [category, setCategory] = useState(initialValues?.category || '')
  const [date, setDate] = useState(initialValues?.date || new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const errs: { [key: string]: string } = {}
    if (!title) errs.title = 'Title is required'
    if (!amount || isNaN(Number(amount))) errs.amount = 'Valid amount is required'
    if (!category) errs.category = 'Category is required'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      onSubmit({ title, amount: Number(amount), category, date })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        error={!!errors.title}
        mode="outlined"
        style={styles.input}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        error={!!errors.amount}
        mode="outlined"
        style={styles.input}
        placeholder="Use negative for expenses, positive for income"
      />
      {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

      <TextInput
        label="Category"
        value={category}
        onChangeText={setCategory}
        error={!!errors.category}
        mode="outlined"
        style={styles.input}
      />
      {errors.category && <Text style={styles.error}>{errors.category}</Text>}

      <Button onPress={() => setShowDatePicker(true)} mode="outlined" style={styles.input}>
        {`Date: ${date.toDateString()}`}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(_, selectedDate) => {
            setShowDatePicker(false)
            if (selectedDate) setDate(selectedDate)
          }}
        />
      )}

      <Button mode="contained" onPress={handleSubmit} loading={loading} style={styles.submitBtn}>
        Save Transaction
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
