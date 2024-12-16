import type { Metadata } from 'next';
import './globals.css';
import AppProvider from '@/provider/appProvider';

export const metadata: Metadata = {
  title: 'FindHouse',
  description: 'We help you find the best places and offers nearby. Explore win-win strategies for proactive living',
  icons: {
    icon: '/assets/logo/logo-white-1.svg', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <body>{children}</body>
      </AppProvider>
    </html>
  );
}
