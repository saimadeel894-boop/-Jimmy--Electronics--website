import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ztxvmwiwgantovkikryj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0eHZtd2l3Z2FudG92a2lrcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MTM5NTksImV4cCI6MjA4ODA4OTk1OX0.VsZ0-HP5qBp0YHMdDQZpU1IIkZO8_jHzrqPtntVT-58';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
