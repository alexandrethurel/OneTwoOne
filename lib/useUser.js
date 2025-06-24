// lib/useUser.js
'use client';

import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error('[useUser] ❌ Erreur getUser:', error.message);
      }
      setUser(data?.user ?? null);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
