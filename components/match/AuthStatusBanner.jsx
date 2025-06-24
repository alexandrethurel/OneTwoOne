'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../lib/supabase';

export default function AuthStatusBanner() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const u = await getCurrentUser();
      setUser(u);
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div style={{
      backgroundColor: '#003E6B',
      color: 'white',
      padding: '10px 20px',
      fontSize: 14,
      fontFamily: 'Roboto, sans-serif',
      textAlign: 'center'
    }}>
      ✅ Connecté en tant que <strong>{user.email}</strong>
    </div>
  );
}
