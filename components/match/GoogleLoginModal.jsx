'use client';

import { useEffect } from 'react';
import { supabase } from '../../lib/supabase';

/**
 * Modale de connexion Google via Supabase
 *
 * @param {function} onClose - Fonction pour fermer la modale
 * @param {function} onLoginSuccess - Callback après connexion réussie
 */
export default function GoogleLoginModal({ onClose, onLoginSuccess }) {
  // Écoute l'event de changement d'état d'authentification
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('[AUTH EVENT] SIGNED_IN:', session.user);
          onLoginSuccess?.(session.user);
          onClose?.();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [onClose, onLoginSuccess]);

  // Lancement de l'OAuth Google
  const handleGoogleLogin = async () => {
    console.log('[DEBUG] Tentative de connexion avec Google...');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });

    if (error) {
      console.error('[ERREUR] Échec de signInWithOAuth:', error);
    } else {
      console.log('[DEBUG] Redirection OAuth déclenchée:', data);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: 24,
          borderRadius: 12,
          textAlign: 'center',
          maxWidth: 320,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <p style={{ fontSize: 16, marginBottom: 20 }}>
          Veuillez vous connecter pour valider votre match
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontSize: 14,
            cursor: 'pointer',
            marginBottom: 10,
          }}
        >
          Connexion avec Google
        </button>

        <br />

        <button
          onClick={onClose}
          style={{
            padding: '6px 12px',
            backgroundColor: '#ccc',
            color: '#333',
            border: 'none',
            borderRadius: 6,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
