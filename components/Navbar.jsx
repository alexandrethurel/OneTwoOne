'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import theme from '../lib/theme';

export default function Navbar() {
  const pathname = usePathname();
  const styles = theme.components.navbar;

  return (
    <div style={styles.container}>
      <NavItem
        emoji="⚡"
        label="MATCH"
        href="/match"
        active={pathname === '/match'}
        styles={styles}
      />
      <NavItem
        emoji="🏆"
        label="HALL OF FAME"
        href="/ranking"
        active={pathname === '/hall-of-fame'}
        styles={styles}
      />
      <NavItem
        emoji="⚙️"
        label="TWEAK ZONE"
        href="/settings"
        active={pathname === '/settings'}
        styles={styles}
      />
    </div>
  );
}

function NavItem({ emoji, label, href, active = false, styles }) {
  return (
    <Link href={href} style={{ textDecoration: 'none', flex: 1 }}>
      <div style={{ ...styles.item, ...(active ? styles.activeItem : {}) }}>
        <div style={styles.emoji}>{emoji}</div>
        <div style={styles.label}>{label}</div>
        {active && <div style={styles.indicator} />}
      </div>
    </Link>
  );
}
