'use client';

import { useState, useEffect } from 'react';
import theme from '../../lib/theme';
import { saveMatch } from '../../lib/supabase';

// Constantes de configuration par défaut
const DEFAULT_CONFIG = { 
  sport: 'tennis', 
  points: 6, 
  sets: 3, 
  opponents: 1 
};

// 🧼 Fonction d'assainissement des noms
const sanitizeOpponentName = (value) => {
  return value
    .trim()
    .replace(/[^\w\s\-À-ÿ']/gi, '')
    .slice(0, 30)
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function MatchForm() {
  const styles = theme.forms.matchForm;

  const [userEmail, setUserEmail] = useState('');  // Pas besoin de "user", on utilise directement un e-mail
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [scores, setScores] = useState([]);
  const [opponents, setOpponents] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charge la configuration depuis le localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('match_config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        initializeScores(parsedConfig.sets || DEFAULT_CONFIG.sets);
      } catch (e) {
        console.error("Erreur de parsing de la config:", e);
        initializeScores(DEFAULT_CONFIG.sets);
      }
    } else {
      initializeScores(DEFAULT_CONFIG.sets);
    }
  }, []);

  const initializeScores = (setsCount) => {
    const initialScores = Array.from({ length: setsCount }, (_, i) => ({
      round: i + 1,
      player1: '',
      player2: ''
    }));
    setScores(initialScores);
  };

  const handleScoreChange = (index, player, value) => {
    const newScores = [...scores];
    const num = parseInt(value, 10);
    const cleanScore = isNaN(num) ? '' : Math.min(Math.max(0, num), config.points);
    newScores[index][player] = cleanScore;

    if (config.points !== null) {
      const otherPlayer = player === 'player1' ? 'player2' : 'player1';
      if (!newScores[index][otherPlayer]) {
        newScores[index][otherPlayer] = config.points;
      }
    }

    setScores(newScores);
  };

  const handleOpponentChange = (index, value) => {
    setOpponents(prev => ({
      ...prev,
      [`opponent${index}`]: value
    }));
  };

  const showMessage = (text, type = 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (scores.some(score => score.player1 === '' || score.player2 === '')) {
        showMessage('❌ Veuillez remplir tous les scores', 'error');
        return;
      }

      const sanitizedOpponents = Object.values(opponents)
        .filter(Boolean)
        .map(sanitizeOpponentName);

      // Faux UUID fixe
      const userId = '00000000-0000-0000-0000-000000000000';  // Faux UUID

      const matchData = {
        user_id: userId,  // Utiliser l'UUID fixe
        sport_name: config.sport,
        match_date: new Date().toISOString(),
        manches: Number(config.sets),
        points_to_win: config.points,
        opponents_count: Number(config.opponents),
        positions: null,
        opponents_names: sanitizedOpponents,
        opponents_positions: null,
        user_scores: scores.map((s) => s.player1 ?? null),
        opponent_scores: scores.map((s) => s.player2 ?? null),
        validated: true
      };

      const { error } = await saveMatch(matchData);

      if (error) throw error;

      showMessage('✅ Match sauvegardé avec succès', 'success');
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      showMessage(`❌ Erreur: ${error.message || 'Lors de la sauvegarde'}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {userEmail && (
        <div style={{ 
          backgroundColor: '#003E6B', 
          color: 'white', 
          padding: 10, 
          textAlign: 'center',
          marginBottom: 20
        }}>
          ✅ Connecté en tant que <strong>{userEmail}</strong>
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.container}>
        {scores.map((set, index) => (
          <div key={`round-${index}`} style={styles.inputGroup}>
            <label style={styles.label}>ROUND {index + 1}</label>
            <div style={styles.roundRow}>
              <select 
                value={set.player1} 
                onChange={(e) => handleScoreChange(index, 'player1', e.target.value)} 
                style={styles.input}
                required
              >
                <option value="">-</option>
                {[...Array(11)].map((_, i) => (
                  <option key={`p1-${i}`} value={i}>{i}</option>
                ))}
              </select>

              <select 
                value={set.player2} 
                onChange={(e) => handleScoreChange(index, 'player2', e.target.value)} 
                style={styles.input}
                required
              >
                <option value="">-</option>
                {[...Array(11)].map((_, i) => (
                  <option key={`p2-${i}`} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {Array.from({ length: config.opponents }, (_, i) => (
          <div key={`opponent-${i}`} style={styles.inputGroup}>
            <label style={styles.label}>ADVERSAIRE {i + 1}</label>
            <input
              style={styles.textInput}
              type="text"
              placeholder={`Nom de l'adversaire ${i + 1}`}
              value={opponents[`opponent${i}`] || ''}
              onChange={(e) => handleOpponentChange(i, e.target.value)}
              required
            />
          </div>
        ))}

        <button 
          type="submit" 
          style={{ 
            ...styles.button,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'ENVOI EN COURS...' : 'VALIDER LE MATCH'}
        </button>

        {message.text && (
          <div style={{
            ...styles.message,
            color: message.type === 'error' ? '#ff4444' : '#4CAF50'
          }}>
            {message.text}
          </div>
        )}

        <div style={styles.settingsText}>
          PARAMÈTRES ACTUELS — SPORT: {config.sport.toUpperCase()}, 
          SETS: {config.sets}, 
          ADVERSAIRES: {config.opponents}
        </div>
      </form>
    </>
  );
}
