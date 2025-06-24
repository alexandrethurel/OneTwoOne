'use client';

import MatchForm from '../../components/match/MatchForm';
import Navbar from '../../components/Navbar';
import theme from '../../lib/theme';

export default function MatchPage() {
  const pageStyles = theme.pages.match;

  return (
    <div style={pageStyles.page}>
      <div style={pageStyles.overlay}>
        <header style={pageStyles.header}>
          <h2 style={pageStyles.sloganTop}>Crush the lead.</h2>
          <h1 style={pageStyles.logo}>OneTwoOne</h1>
          <h2 style={pageStyles.sloganBottom}>Smash the gap.</h2>
        </header>

        <main style={pageStyles.main}>
          <MatchForm />
        </main>

        <footer style={pageStyles.footer}>
          <Navbar />
        </footer>
      </div>
    </div>
  );
}
