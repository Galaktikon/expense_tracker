// frontend/lib/auth.ts
import { supabase } from './supabase'

export async function signUp(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password })
  return error
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  return error
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  return error
}
