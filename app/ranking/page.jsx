'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import useUser from '../../lib/useUser';
import theme from '../../lib/theme';
import Navbar from '../../components/Navbar';
import RankingTable from '../../components/ranking/RankingTable';

export default function RankingPage() {
  const { user } = useUser();
  const styles = theme.pages.hallOfFame;
  const [ranking, setRanking] = useState([]);
  const [sortBy, setSortBy] = useState('manches');

  useEffect(() => {
    if (!user) return;

    const fetchMatches = async () => {
      const { data: matches, error } = await supabase
        .from('matches')
        .select('opponents_names, user_scores, opponent_scores, manches')
        .eq('user_id', user.id)
        .eq('validated', true);

      if (error) {
        console.error('[Ranking] ❌ Erreur récupération matches:', error.message);
        return;
      }

      const statsByOpponent = {};

      matches.forEach(({ opponents_names, user_scores = [], opponent_scores = [] }) => {
        if (!Array.isArray(opponents_names)) return;

        opponents_names.forEach((name) => {
          if (!name) return;

          if (!statsByOpponent[name]) {
            statsByOpponent[name] = {
              opponent: name,
              manches: 0,
              manches_gagnees: 0,
              points_marques: 0,
              points_encaisses: 0
            };
          }

          const stat = statsByOpponent[name];
          for (let i = 0; i < user_scores.length; i++) {
            const us = user_scores[i] ?? 0;
            const os = opponent_scores[i] ?? 0;

            stat.manches += 1;
            stat.points_marques += us;
            stat.points_encaisses += os;

            if (us > os) stat.manches_gagnees += 1;
          }
        });
      });

      const rawStats = Object.values(statsByOpponent).map((s) => ({
        ...s,
        pourcentage_gagnees_val: s.manches > 0 ? s.manches_gagnees / s.manches : 0,
        pourcentage_gagnees: s.manches > 0
          ? `${Math.round((s.manches_gagnees / s.manches) * 100)} %`
          : '0 %'
      }));

      setRanking(sortRanking(rawStats, sortBy));
    };

    fetchMatches();
  }, [user, sortBy]);

  const sortRanking = (data, key) => {
    const sorted = [...data];
    switch (key) {
      case 'manches':
        return sorted.sort((a, b) => b.manches - a.manches);
      case 'pourcentage':
        return sorted.sort((a, b) => b.pourcentage_gagnees_val - a.pourcentage_gagnees_val);
      case 'points_marques':
        return sorted.sort((a, b) => b.points_marques - a.points_marques);
      case 'points_encaisses':
        return sorted.sort((a, b) => b.points_encaisses - a.points_encaisses);
      default:
        return sorted;
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <header style={styles.header}>
          <h1 style={theme.pages.match}>🏆 Leaderboard</h1>
        </header>

        <main style={styles.main}>
          <div style={{ marginBottom: 16, textAlign: 'center' }}>
            <label htmlFor="sortBy" style={{ marginRight: 8, fontWeight: 'bold' }}>
              Trier par :
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            >
              <option value="manches">Manches jouées</option>
              <option value="pourcentage">% gagnées</option>
              <option value="points_marques">Points marqués</option>
              <option value="points_encaisses">Points encaissés</option>
            </select>
          </div>

          {ranking.length === 0 ? (
            <p style={{ color: theme.colors.black }}>
              Aucun match enregistré pour le moment.
            </p>
          ) : (
            <RankingTable data={ranking} />
          )}
        </main>

        <footer style={styles.footer}>
          <Navbar />
        </footer>
      </div>
    </div>
  );
}
