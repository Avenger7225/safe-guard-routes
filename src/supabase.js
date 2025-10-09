import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sdvuvnqpmutqsxxciviv.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkdnV2bnFwbXV0cXN4eGNpdml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4OTM3MjQsImV4cCI6MjA3NTQ2OTcyNH0.3Hvq5tHc_5gkfYxaw_E3MmD7YZZtYMekeS1r5_7cyHo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)