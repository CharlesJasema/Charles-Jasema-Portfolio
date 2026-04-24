import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import { SkipLink } from '@/components/SkipLink';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Charles Jasema - Software Engineer, Designer & Gospel Artist',
    template: '%s | Charles Jasema',
  },
  description: 'Charles Jasema - Premium portfolio showcasing software engineering, graphics design, IT support, videography, and gospel music ministry. South Sudanese gospel artist spreading hope through worship since 2015.',
  keywords: [
    'Charles Jasema',
    'Software Engineer',
    'Graphics Designer',
    'Gospel Artist',
    'Videographer',
    'Portfolio',
    'South Sudan',
    'Uganda',
    'Contemporary Gospel',
    'Worship Music',
    'Web Developer',
    'IT Support',
    'Charles Jasema Music',
    'Charles Jasema Portfolio',
  ],
  authors: [{ name: 'Charles Jasema', url: 'https://charlesjasema.com' }],
  creator: 'Charles Jasema',
  publisher: 'Charles Jasema',
  metadataBase: new URL('https://charlesjasema.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://charlesjasema.com',
    siteName: 'Charles Jasema',
    title: 'Charles Jasema - Software Engineer, Designer & Gospel Artist',
    description: 'Premium portfolio showcasing software engineering, graphics design, IT support, videography, and gospel music ministry.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles Jasema - Software Engineer, Designer & Gospel Artist',
    description: 'Premium portfolio showcasing software engineering, graphics design, and gospel music ministry',
    creator: '@Charlesjasema',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
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
