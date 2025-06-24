'use client';
import theme from '../../lib/theme';
import Navbar from '../../components/Navbar';
import ConfigForm from '../../components/settings/ConfigForm';

export default function SettingsPage() {
  return (
    <div style={theme.pages.settings.page}>
      <div style={theme.pages.settings.overlay}>
        <header style={theme.pages.settings.header}>
          <h1 style={theme.pages.settings.title}>⚙️ Paramètres</h1>
        </header>

        <main style={theme.pages.settings.main}>
          <ConfigForm />
        </main>

        <footer style={theme.pages.settings.footer}>
          <Navbar />
        </footer>
      </div>
    </div>
  );
}
