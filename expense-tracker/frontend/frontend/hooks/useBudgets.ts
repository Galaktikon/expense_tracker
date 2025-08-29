// frontend/hooks/useBudgets.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useBudgets(userId: string | undefined) {
  const [budgets, setBudgets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchBudgets = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', userId)
        .order('start_date', { ascending: false })

      if (error) {
        console.error('Error fetching budgets:', error)
      } else {
        setBudgets(data)
      }
      setLoading(false)
    }

    fetchBudgets()
  }, [userId])

  return { budgets, loading }
}
