// app/layout.jsx
import theme from '../lib/theme';
import { UserProvider } from './context/UserContext';

export const metadata = {
  title: 'OneTwoOne',
  description: 'Sports tracking app for young athletes',
  themeColor: theme.colors.primary,
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content={theme.colors.primary} />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@600&family=Roboto+Condensed:wght@900&family=Squada+One&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/log.ico" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: theme.typography.text.fontFamily,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
        }}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}