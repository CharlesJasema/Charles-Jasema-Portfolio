import { FaMusic } from 'react-icons/fa';
import { getLyrics } from '@/lib/sanity.queries';
import { generateMetadata as generateSEOMetadata, generateKeywords } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { LyricsClient } from './LyricsClient';

// Force dynamic rendering to prevent build-time API calls
export const dynamic = 'force-dynamic';
// Enable ISR with 60-second revalidation
export const revalidate = 60;

export const metadata = generateSEOMetadata({
  title: `${siteConfig.name} - Song Lyrics`,
  description: 'Read, download, and sing along with complete lyrics from all Charles Jasema worship songs.',
  keywords: generateKeywords([
    'Charles Jasema Lyrics',
    'Gospel Song Lyrics',
    'Worship Song Lyrics',
    'Christian Lyrics',
    'Grace Abounds Lyrics',
    'Faithful God Lyrics',
    'Download Song Lyrics',
    'PDF Lyrics',
    'Worship Lyrics',
  ]),
  url: '/lyrics',
  type: 'website',
});

export default async function LyricsPage() {
  // Fetch lyrics data server-side
  const lyrics = await getLyrics();

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MusicPlaylist',
    name: 'Charles Jasema Song Lyrics Collection',
    description: 'Complete lyrics collection for all Charles Jasema worship songs',
    author: {
      '@type': 'Person',
      name: 'Charles Jasema',
      url: 'https://charlesjasema.com',
    },
    track: lyrics.map((song) => ({
      '@type': 'MusicRecording',
      name: song.songTitle,
      byArtist: {
        '@type': 'Person',
        name: song.artist,
      },
      inLanguage: song.language,
      datePublished: song.releaseYear,
      recordingOf: {
        '@type': 'MusicComposition',
        name: song.songTitle,
        lyricist: {
          '@type': 'Person',
          name: 'Charles Jasema',
        },
      },
    })),
  };

  return (
    <>
      {/* Add structured data script in head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        suppressHydrationWarning
      />

      <div className="min-h-screen pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12 bg-gradient-to-br from-accent-red/5 via-primary-gold/5 to-accent-red/5 py-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-red/10 rounded-full mb-6">
              <FaMusic className="text-4xl text-accent-red" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-gray-900 dark:text-white">Song Lyrics</span>
            </h1>
            <p className="text-2xl text-accent-red font-semibold mb-6">
              Worship Through Words
            </p>
            <p className="text-lg text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
              Read, download, and sing along with complete lyrics from all Charles Jasema worship songs.
            </p>
          </div>
        </section>

        {/* Pass lyrics data to client component for interactivity */}
        <LyricsClient lyrics={lyrics} />
      </div>
    </>
  );
}
