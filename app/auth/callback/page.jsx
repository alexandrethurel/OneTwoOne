'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    console.log(window.location)
    const hash = window.location.hash.substring(1); // Retire le `#`
    console.log("Contenu du hash : ", hash); // Log du contenu du hash

    const params = new URLSearchParams(hash);
    console.log("Params extraits : ", params); // Log des paramètres extraits

    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (access_token && refresh_token) {
      console.log('[Callback] Tokens trouvés dans le hash ✅');

      // Restaure la session avec Supabase
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
          // Redirige manuellement avec les tokens dans l'URL
          const newUrl = `${window.location.origin}/match#access_token=${access_token}&refresh_token=${refresh_token}`;
          window.location.href = newUrl; // Redirige manuellement avec les tokens
        }
      });
    } else {
      console.log('[Callback] Pas de tokens trouvés ❌');
      router.replace('/?error=missing_tokens');
    }
  }, [router]);

  return <div>Connexion en cours…</div>;
}
