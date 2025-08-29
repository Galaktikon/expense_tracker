import React, { useState } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormInput from '../components/FormInput'
import { Button, Text } from 'react-native-paper'
import { resetPassword } from '../lib/auth'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
})

export default function ForgotPasswordScreen() {
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    const error = await resetPassword(data.email)
    setLoading(false)
    if (error) Alert.alert('Error', error.message)
    else Alert.alert('Success', 'Password reset email sent.')
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Reset Password
      </Text>
      <FormInput name="email" control={control} label="Email" />
      <Button mode="contained" onPress={handleSubmit(onSubmit)} loading={loading} disabled={loading} style={styles.button}>
        Send Reset Email
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { marginBottom: 20, textAlign: 'center' },
  button: { marginTop: 12 },
})
