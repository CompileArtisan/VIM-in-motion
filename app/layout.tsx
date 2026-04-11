import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIM in Motion',
  description: 'Workshop - Learn by doing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
