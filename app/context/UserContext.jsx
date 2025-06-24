'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[UserProvider] Initializing...');

    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('[UserProvider] Session at mount:', session);
      if (error) console.error(error);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    // Démarre par récupération de session
    getInitialSession();

    // Écoute les changements d'état (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`[UserProvider] Auth changed: ${event}`);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Chargement de la session...</div>;
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
