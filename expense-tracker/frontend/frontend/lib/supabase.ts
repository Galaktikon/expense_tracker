// frontend/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://nbkycfjlsafrdsmqajrm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ia3ljZmpsc2FmcmRzbXFhanJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0OTAzMTUsImV4cCI6MjA3MjA2NjMxNX0.dCUez5kA0WQA3Fl-pwy0Ve8VUx4fwDoTAVvqAnbUIN4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
