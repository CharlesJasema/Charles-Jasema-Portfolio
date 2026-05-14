import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import SkipLinks from '@/components/SkipLinks';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { StickyContactCTA } from '@/components/cta';
import { generatePersonSchema, generateWebsiteSchema } from '@/lib/seo';
import { PerformanceOptimizer } from '@/components/PerformanceOptimizer';
import { AnalyticsTestPanel } from '@/components/AnalyticsTestPanel';
import TawkToChat from '@/components/TawkToChat';

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
  // Generate structured data for SEO
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        
        {/* Apple PWA meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Charles Jasema" />
        <link rel="apple-touch-icon" href="/images/CJ Music Logo.jpeg" />
        
        {/* Microsoft PWA meta tags */}
        <meta name="msapplication-TileColor" content="#0F172A" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans">
        <GoogleAnalytics />
        <PerformanceOptimizer />
        <SkipLinks />
        <Providers>
          <Navigation />
          <main id="main-content" className="min-h-screen" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <StickyContactCTA />
          <TawkToChat />
        </Providers>
        <AnalyticsTestPanel />
      </body>
    </html>
  );
}
