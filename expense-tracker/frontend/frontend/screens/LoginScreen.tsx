import React, { useState } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormInput from '../components/FormInput'
import { Button, Text } from 'react-native-paper'
import { signIn } from '../lib/auth'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

export default function LoginScreen({ navigation }: any) {
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
    const error = await signIn(data.email, data.password)
    setLoading(false)
    if (error) Alert.alert('Login failed', error.message)
    else Alert.alert('Success', 'Logged in!')
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>
      <FormInput name="email" control={control} label="Email" />
      <FormInput name="password" control={control} label="Password" secureTextEntry />
      <Button mode="contained" onPress={handleSubmit(onSubmit)} loading={loading} disabled={loading} style={styles.button}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('SignUp')} style={styles.link}>
        Don't have an account? Sign Up
      </Button>
      <Button onPress={() => navigation.navigate('ForgotPassword')} style={styles.link}>
        Forgot Password?
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
