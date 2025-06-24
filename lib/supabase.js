import { createClient } from '@supabase/supabase-js';

// === 🔍 Vérification des variables d'environnement ===
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('[Supabase] ❌ NEXT_PUBLIC_SUPABASE_URL is missing');
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('[Supabase] ❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

console.log('[Supabase] ✅ Loaded env variables');
console.log(`[Supabase] 🔗 URL: ${supabaseUrl}`);
console.log(`[Supabase] 🔑 Anon Key present: ${!!anonKey}`);
console.log(`[Supabase] 🛡️ Service Role Key present: ${!!serviceRoleKey}`);

// === ⚙️ Options d'authentification ===
const authOptions = {
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: false,
  storage: typeof window !== 'undefined' ? {
    getItem: (key) => {
      const value = localStorage.getItem(key);
      console.debug(`[Supabase] 🧠 getItem(${key}) =>`, value);
      return value;
    },
    setItem: (key, value) => {
      console.debug(`[Supabase] 💾 setItem(${key}) =>`, value);
      localStorage.setItem(key, value);
    },
    removeItem: (key) => {
      console.debug(`[Supabase] 🗑️ removeItem(${key})`);
      localStorage.removeItem(key);
    },
  } : undefined
};

// === 🚀 Initialisation du client public (frontend) ===
console.log('[Supabase] 🟢 Initialisation du client Supabase public');
export const supabase = createClient(supabaseUrl, anonKey, {
  auth: authOptions
});

// === 🛠️ Initialisation du client admin (serveur uniquement) ===
export const supabaseAdmin = serviceRoleKey
  ? (() => {
      console.log('[Supabase] 🔐 Initialisation du client Supabase admin');
      return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
    })()
  : (() => {
      console.warn('[Supabase] ⚠️ Service role key is not defined. Admin client not created.');
      return null;
    })();

// === 📝 Fonction d'insertion conditionnelle ===
export const saveMatch = async (matchData) => {
  const isAdmin = matchData.requiresAdmin;
  const client = isAdmin ? supabaseAdmin : supabase;

  if (!client) {
    console.error('[Supabase] ❌ Aucun client disponible pour saveMatch');
    throw new Error('Service role not configured or required for this operation');
  }

  console.log(`[Supabase] ➕ Inserting match (admin: ${isAdmin})...`, matchData);

  const { data, error } = await client
    .from('matches')
    .insert(matchData)
    .select();

  if (error) {
    console.error('[Supabase] ❌ Erreur lors de l’insertion du match :', error);
    throw error;
  }

  console.log('[Supabase] ✅ Match inséré avec succès :', data);
  return data;
};

// === 🌍 Débug client-side ===
if (typeof window !== 'undefined') {
  console.log('[Supabase] 🌐 Exposition du client supabase dans window.supabase (débug)');
  window.supabase = supabase;
}
