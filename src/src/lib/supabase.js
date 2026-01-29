
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Robust error handling for environment variables
const isValidUrl = (url) => {
  try {
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  } catch {
    return false;
  }
};

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
  const errorMsg = `Supabase configuration error: 
    - URL exists: ${!!supabaseUrl}
    - Key exists: ${!!supabaseAnonKey}
    - URL is valid: ${isValidUrl(supabaseUrl)}
    - Received URL value: "${String(supabaseUrl).substring(0, 10)}..."
  `.trim();

  console.error('❌ ' + errorMsg);

  // Create a dummy client or throw to be caught by App.jsx
  throw new Error(errorMsg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

