import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = typeof window !== 'undefined' && url && anonKey
  ? createClient(url, anonKey)
  : null;

export async function joinWaitlist({ email, source }) {
  if (!supabase) {
    return { ok: false, error: 'config' };
  }
  const { data, error } = await supabase.functions.invoke('subscribe-waitlist', {
    body: { email, source },
  });
  if (error) {
    return { ok: false, error: 'network', detail: error.message };
  }
  if (data?.ok === false) {
    return { ok: false, error: data.error || 'unknown' };
  }
  return { ok: true };
}
