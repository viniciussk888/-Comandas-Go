import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ktltjynbnxeischkkluv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bHRqeW5ibnhlaXNjaGtrbHV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwNDM1NzcsImV4cCI6MTk2MDYxOTU3N30.4Zt4V2AYYZN_oNjrRhzzuIMijMzuzGGUyt7EQ7zIN7A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)