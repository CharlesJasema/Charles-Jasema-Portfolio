'use client';

import { useState, useEffect } from 'react';
import { FaMusic, FaYoutube, FaSearch, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { Button, Card } from '@/components/ui';
import { lyricsConfig } from '@/config/lyrics';
import { clsx } from 'clsx';
import { trackDownload, trackSearch } from '@/lib/analytics';

export default function LyricsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  // Add structured data for SEO
  useEffect(() => {
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
      track: lyricsConfig.lyrics.map((song) => ({
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

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Filter lyrics based on search
  const filteredLyrics = lyricsConfig.lyrics.filter((song) =>
    song.songTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get selected song details
  const selectedSongData = selectedSong
    ? lyricsConfig.lyrics.find((song) => song.id === selectedSong)
    : null;

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12 bg-gradient-to-br from-accent-red/5 via-primary-gold/5 to-accent-red/5 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-red/10 rounded-full mb-6">
            <FaMusic className="text-4xl text-accent-red" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-gray-900 dark:text-white">{lyricsConfig.page.title}</span>
          </h1>
          <p className="text-2xl text-accent-red font-semibold mb-6">
            {lyricsConfig.page.subtitle}
          </p>
          <p className="text-lg text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
            {lyricsConfig.page.description}
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a song..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  trackSearch(e.target.value);
                }
              }}
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-accent-red focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Lyrics List */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLyrics.map((song) => (
              <Card
                key={song.id}
                variant="elevated"
                padding="lg"
                className={clsx(
                  'cursor-pointer hover:shadow-2xl transition-all duration-300',
                  selectedSong === song.id && 'ring-2 ring-accent-red',
                  song.featured && 'border-2 border-accent-red/20'
                )}
                onClick={() => setSelectedSong(song.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                      {song.songTitle}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-text-tertiary">
                      {song.artist}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-text-tertiary mt-1">
                      {song.album} • {song.releaseYear}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {(song as any).isNew && (
                      <span className="px-2 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded animate-pulse">
                        NEW
                      </span>
                    )}
                    {song.featured && (
                      <span className="px-2 py-1 bg-accent-red text-white text-xs font-bold rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-text-secondary mb-4">
                  {song.notes}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-text-tertiary">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                    {song.language}
                  </span>
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                    {song.verses.length} sections
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSong(song.id);
                    }}
                    className="text-accent-red hover:text-accent-red/80 text-sm font-semibold inline-flex items-center"
                  >
                    Read Lyrics
                    <FaExternalLinkAlt className="ml-2 text-xs" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {filteredLyrics.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-text-tertiary text-lg">
                No songs found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Selected Song Lyrics Modal */}
      {selectedSongData && (
        <div
          className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSong(null)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                    {selectedSongData.songTitle}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-text-tertiary">
                    {selectedSongData.artist}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-text-tertiary mt-1">
                    {selectedSongData.album} • {selectedSongData.releaseYear} • {selectedSongData.language}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSong(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-text-tertiary dark:hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-4">
                <a
                  href={selectedSongData.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent-red text-white rounded-lg hover:bg-accent-red/90 transition-colors text-sm"
                >
                  <FaYoutube />
                  <span>Watch on YouTube</span>
                </a>
                <a
                  href={selectedSongData.mdundoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors text-sm"
                >
                  <FaMusic />
                  <span>Listen on Mdundo</span>
                </a>
                <button
                  onClick={() => {
                    const lyricsText = selectedSongData.verses
                      .map((verse) => `${verse.type}\n${verse.lines.join('\n')}`)
                      .join('\n\n');
                    const blob = new Blob([lyricsText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedSongData.songTitle} - Lyrics.txt`;
                    a.click();
                    
                    // Track download
                    trackDownload(selectedSongData.songTitle, 'txt');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-tech-teal text-white rounded-lg hover:bg-tech-teal/90 transition-colors text-sm"
                >
                  <FaDownload />
                  <span>Download Lyrics</span>
                </button>
              </div>
            </div>

            {/* Lyrics Content */}
            <div className="p-6 space-y-8">
              {selectedSongData.verses.map((verse, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-heading font-bold text-accent-red">
                    {verse.type}
                  </h3>
                  <div className="space-y-2">
                    {verse.lines.map((line, lineIndex) => (
                      <p
                        key={lineIndex}
                        className="text-gray-700 dark:text-text-secondary text-lg leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Notes */}
              {selectedSongData.notes && (
                <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-text-tertiary italic">
                    <strong>Note:</strong> {selectedSongData.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-accent-red/10 via-primary-gold/10 to-tech-teal/10 rounded-2xl p-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            {lyricsConfig.cta.title}
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-8">
            {lyricsConfig.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {lyricsConfig.cta.buttons.map((button, index) => (
              <a key={index} href={button.link} target="_blank" rel="noopener noreferrer">
                <Button variant={button.variant} size="lg" className="w-full sm:w-auto">
                  {button.text}
                </Button>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
