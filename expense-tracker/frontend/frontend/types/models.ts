// frontend/types/models.ts

export interface Transaction {
  id: string
  title: string
  amount: string
  category: string
  date: Date  // ISO date string
  // add other fields if needed
}

export interface Budget {
  id: string
  category: string
  limit_amount: string
  start_date: Date
  end_date: Date
  // add other fields if needed
}
