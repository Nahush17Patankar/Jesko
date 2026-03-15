import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jesko - Beyond Private Aviation',
  description: 'Experience the future of global flight. Luxury aerospace brand cinematic experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
