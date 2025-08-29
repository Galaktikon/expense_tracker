// frontend/navigation/types.ts
import type { Transaction, Budget } from '../types/models'

export type RootStackParamList = {
  Dashboard: undefined
  TransactionEdit: { transaction?: Transaction }  // Transaction is your transaction type
  BudgetEdit: { budget?: Budget }                 // Budget is your budget type
}
