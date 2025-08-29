import React from 'react'
import { Button } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation/types'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TransactionEdit'>

export default function QuickActions() {
    const navigation = useNavigation<NavigationProp>()
  
    return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 }}>
      <Button mode="contained" onPress={() => navigation.navigate('TransactionEdit', {})} style={{ flex: 1, marginRight: 6 }}>
        Add Expense
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('BudgetEdit', {})} style={{ flex: 1, marginRight: 6 }}>
        Add Budget
      </Button>
      <Button mode="contained" onPress={() => console.log('Link Bank')} style={{ flex: 1, marginLeft: 6 }}>
        Link Bank
      </Button>
    </View>
  )
}
