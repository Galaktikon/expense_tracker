import React, { useState } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormInput from '../components/FormInput'
import { Button, Text } from 'react-native-paper'
import { signUp } from '../lib/auth'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
})

export default function SignUpScreen({ navigation }: any) {
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
    const error = await signUp(data.email, data.password)
    setLoading(false)
    if (error) Alert.alert('Sign Up failed', error.message)
    else Alert.alert('Success', 'Check your email to confirm your account.')
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Sign Up
      </Text>
      <FormInput name="email" control={control} label="Email" />
      <FormInput name="password" control={control} label="Password" secureTextEntry />
      <FormInput name="confirmPassword" control={control} label="Confirm Password" secureTextEntry />
      <Button mode="contained" onPress={handleSubmit(onSubmit)} loading={loading} disabled={loading} style={styles.button}>
        Sign Up
      </Button>
      <Button onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? Login
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { marginBottom: 20, textAlign: 'center' },
  button: { marginTop: 12 },
  link: { marginTop: 6 },
})
