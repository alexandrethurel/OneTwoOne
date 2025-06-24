'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1); // Supprime le `#`
    const params = new URLSearchParams(hash);

    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (access_token && refresh_token) {
      console.log('[Callback] Tokens trouvés dans le hash ✅');

      // Restaure manuellement la session
      supabase.auth.setSession({
        access_token,
        refresh_token,
      }).then(({ data, error }) => {
        if (error) {
          console.error('[Callback] Erreur setSession:', error);
          router.replace('/?error=set_session_failed');
        } else {
          console.log('[Callback] Session restaurée ✅', data.session);
          localStorage.setItem('userEmail', data.session.user.email);
          router.replace('/match');
        }
      });
    } else {
      console.warn('[Callback] Pas de tokens trouvés ❌');
      router.replace('/?error=missing_tokens');
    }
  }, [router]);

  return <div>Connexion en cours…</div>;
}
