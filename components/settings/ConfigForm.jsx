'use client';

import { useState, useEffect } from 'react';
import theme from '../../lib/theme';

const SPORT_CONFIG = {
  'baby-foot': { manches: 1, points_to_win: 7, adversaires_max: 2 },
  tennis: { manches: 3, points_to_win: 6, adversaires_max: 1 },
  'ping-pong': { manches: 5, points_to_win: 11, adversaires_max: 1 },
  badminton: { manches: 3, points_to_win: 21, adversaires_max: 1 },
  padel: { manches: 3, points_to_win: 6, adversaires_max: 2 },
  squash: { manches: 5, points_to_win: 11, adversaires_max: 1 },
  boxe: { manches: 3, points_to_win: null, adversaires_max: 1 },
  escrime: { manches: 3, points_to_win: 15, adversaires_max: 1 },
  'tennis de table': { manches: 5, points_to_win: 11, adversaires_max: 1 }
};

export default function ConfigForm() {
  const [sport, setSport] = useState('baby-foot');
  const [points, setPoints] = useState('');
  const [undefinedPoints, setUndefinedPoints] = useState(false);
  const [opponents, setOpponents] = useState('');
  const [sets, setSets] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const config = SPORT_CONFIG[sport];
    if (config) {
      setPoints(config.points_to_win ?? '');
      setUndefinedPoints(config.points_to_win === null);
      setOpponents(config.adversaires_max ?? '');
      setSets(config.manches ?? '');
    }
  }, [sport]);

  const handleSave = () => {
    const config = {
      sport,
      points: undefinedPoints ? null : points,
      opponents,
      sets
    };
    localStorage.setItem('match_config', JSON.stringify(config));
    setMessage('✅ Paramètres sauvegardés avec succès !');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <form style={theme.forms.configForm.form}>
        <label style={theme.forms.configForm.label}>Sport</label>
        <select
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          style={theme.forms.configForm.input}
        >
          {Object.keys(SPORT_CONFIG).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <label style={theme.forms.configForm.label}>Points pour gagner</label>
        <input
          type="number"
          value={points}
          disabled={undefinedPoints}
          onChange={(e) => setPoints(e.target.value)}
          style={theme.forms.configForm.input}
        />
        <label style={theme.forms.configForm.checkboxLabel}>
          <input
            type="checkbox"
            checked={undefinedPoints}
            onChange={(e) => setUndefinedPoints(e.target.checked)}
          />
          À définir (durée)
        </label>

        <label style={theme.forms.configForm.label}>Nombre d'adversaires</label>
        <input
          type="number"
          min={1}
          max={10}
          value={opponents}
          onChange={(e) => setOpponents(e.target.value)}
          style={theme.forms.configForm.input}
        />

        <label style={theme.forms.configForm.label}>Nombre de manches</label>
        <input
          type="number"
          min={1}
          max={5}
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          style={theme.forms.configForm.input}
        />

        <button
          type="button"
          style={theme.forms.configForm.button}
          onClick={handleSave}
        >
          Sauvegarder
        </button>
      </form>

      {message && (
        <div style={theme.forms.configForm.successMessage}>{message}</div>
      )}
    </div>
  );
}
