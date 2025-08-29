// frontend/App.tsx
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider, AuthContext } from './contexts/AuthContext'
import AuthNavigator from './navigation/AuthNavigator'
import AppNavigator from './navigation/AppNavigator'
import { ActivityIndicator, View } from 'react-native'

function RootNavigator() {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return user ? <AppNavigator /> : <AuthNavigator />
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}
