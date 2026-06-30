import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

if (!process.env.VERCEL) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}

const supabaseUrl = process.env.SUPABASE_URL || 'https://tkmduvvaygyucegqlhlq.supabase.co';
// Supporting both env name patterns to be highly compatible
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || 'placeholder-key';

if (!process.env.SUPABASE_URL || (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_KEY)) {
  console.warn("WARNING: Supabase URL or Service Role Key is missing from environment variables.");
}

// Initialize Supabase Client with full admin privileges bypassing RLS
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
