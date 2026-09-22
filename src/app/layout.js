import '@/styles/globals.css';
import { Providers } from '@/components/providers';
import { Navigation } from '@/components/navigation';
import Footer from '@/components/footer';
import { StructuredData } from '@/components/StructuredData';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { AIChatWidget } from '@/components/chat';

export const metadata = {
  title: {
    default: 'Charles Jasema - Software Engineer, Designer & Gospel Artist',
    template: '%s | Charles Jasema',
  },
  description: 'Charles Jasema - Professional software engineer, graphics designer, and contemporary gospel artist. Specializing in React, Node.js, mobile development, and worship ministry.',
  keywords: [
    'Charles Jasema',
    'Charles Jada Sebit Emmanuel',
    'Software Engineer',
    'Full Stack Developer',
    'Graphics Designer',
    'Gospel Artist',
    'React Developer',
    'Node.js Developer',
    'Mobile App Developer',
    'IT Support Specialist',
    'Worship Leader',
    'South Sudan Developer',
    'Uganda Developer',
    'Freelance Developer',
    'Web Development Services',
    'App Development',
    'Graphics Design Services',
    'Music Ministry',
    'Contemporary Gospel',
    'Project Management',
    'Digital Literacy Training',
    'Hire Developer',
    'Remote Developer',
  ],
  authors: [
    {
      name: 'Charles Jada Sebit Emmanuel',
      url: 'https://charlesjasema.com',
    },
  ],
  creator: 'Charles Jada Sebit Emmanuel',
  metadataBase: new URL('https://charlesjasema.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://charlesjasema.com',
    title: 'Charles Jasema - Software Engineer & Gospel Artist',
    description: 'Professional software engineer, graphics designer, and gospel artist. Building technology solutions and spreading hope through music.',
    siteName: 'Charles Jasema Portfolio',
    images: [
      {
        url: 'https://charlesjasema.com/images/professional/charles-jasema-professional.jpg',
        width: 1200,
        height: 630,
        alt: 'Charles Jasema - Software Engineer & Gospel Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles Jasema - Software Engineer & Gospel Artist',
    description: 'Professional software engineer, graphics designer, and gospel artist. Building technology solutions and spreading hope through music.',
    creator: '@charlesjasema',
    images: ['https://charlesjasema.com/images/professional/charles-jasema-professional.jpg'],
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
    google: 'G-VBD2T2LCQH',
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans">
        <StructuredData />
        <AnalyticsProvider>
          <Providers>
            <Navigation />
            <main id="main-content" className="min-h-screen" role="main">
              {children}
            </main>
            <Footer />
            <AIChatWidget />
          </Providers>
        </AnalyticsProvider>
      </body>
    </html>
  );
}