// frontend/hooks/useTransactions.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useTransactions(userId: string | undefined) {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchTransactions = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Error fetching transactions:', error)
      } else {
        setTransactions(data)
      }
      setLoading(false)
    }

    fetchTransactions()
  }, [userId])

  return { transactions, loading }
}
