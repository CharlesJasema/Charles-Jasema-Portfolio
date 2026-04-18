import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import { SkipLink } from '@/components/SkipLink';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Charles Jasema - Software Engineer, Designer & Gospel Artist',
  description: 'Premium portfolio showcasing software engineering, graphics design, IT support, videography, and gospel music ministry.',
  keywords: ['Software Engineer', 'Graphics Designer', 'Gospel Artist', 'Videographer', 'Portfolio'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
      </head>
      <body className={inter.className}>
        <SkipLink />
        <Providers>
          <Navigation />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
