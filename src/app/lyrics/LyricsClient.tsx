'use client';

import { useState } from 'react';
import { FaSearch, FaExternalLinkAlt, FaFilePdf, FaFileAlt, FaYoutube, FaMusic } from 'react-icons/fa';
import { Button, Card } from '@/components/ui';
import { clsx } from 'clsx';
import { trackDownload, trackSearch } from '@/lib/analytics';
import { generateLyricsPDF, downloadLyricsTXT } from '@/lib/pdf-generator';
import type { Lyrics } from '@/lib/sanity.queries';
import toast from 'react-hot-toast';

interface LyricsClientProps {
  lyrics: Lyrics[];
}

export function LyricsClient({ lyrics }: LyricsClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  // Filter lyrics based on search query (client-side for instant filtering)
  const filteredLyrics = lyrics.filter((song) =>
    song.songTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get selected song details
  const selectedSongData = selectedSong
    ? lyrics.find((song) => song._id === selectedSong)
    : null;

  return (
    <>
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
                  const results = lyrics.filter((song) =>
                    song.songTitle.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    song.artist.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    song.album.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                  trackSearch(e.target.value, 'lyrics_page', results.length);
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
                key={song._id}
                variant="elevated"
                padding="lg"
                className={clsx(
                  'cursor-pointer hover:shadow-2xl transition-all duration-300',
                  selectedSong === song._id && 'ring-2 ring-accent-red',
                  song.featured && 'border-2 border-accent-red/20'
                )}
                onClick={() => setSelectedSong(song._id)}
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
                    {song.featured && (
                      <span className="px-2 py-1 bg-accent-red text-white text-xs font-bold rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-text-secondary mb-4">
                  {song.notes || 'Worship song by Charles Jasema'}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-text-tertiary">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                    {song.language}
                  </span>
                  {song.verses && song.verses.length > 0 && (
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                      {song.verses.length} sections
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSong(song._id);
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
                {selectedSongData.youtubeUrl && (
                  <a
                    href={selectedSongData.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-red text-white rounded-lg hover:bg-accent-red/90 transition-colors text-sm"
                  >
                    <FaYoutube />
                    <span>Watch on YouTube</span>
                  </a>
                )}
                {selectedSongData.mdundoUrl && (
                  <a
                    href={selectedSongData.mdundoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors text-sm"
                  >
                    <FaMusic />
                    <span>Listen on Mdundo</span>
                  </a>
                )}
                <button
                  onClick={() => {
                    try {
                      generateLyricsPDF(selectedSongData as any);
                      trackDownload(selectedSongData.songTitle, 'pdf', 'lyrics_modal');
                      toast.success('✅ PDF downloaded successfully!');
                    } catch (error) {
                      toast.error('❌ Failed to download PDF. Please try again.');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-tech-teal text-white rounded-lg hover:bg-tech-teal/90 transition-colors text-sm"
                >
                  <FaFilePdf />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => {
                    try {
                      downloadLyricsTXT(selectedSongData as any);
                      trackDownload(selectedSongData.songTitle, 'txt', 'lyrics_modal');
                      toast.success('✅ TXT file downloaded successfully!');
                    } catch (error) {
                      toast.error('❌ Failed to download TXT. Please try again.');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
                >
                  <FaFileAlt />
                  <span>Download TXT</span>
                </button>
              </div>
            </div>

            {/* Lyrics Content */}
            <div className="p-6 space-y-8">
              {selectedSongData.verses && selectedSongData.verses.length > 0 ? (
                selectedSongData.verses.map((verse, index) => (
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
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-text-tertiary">
                    Lyrics not available yet. Check back soon or stream this song on YouTube or Mdundo.
                  </p>
                </div>
              )}

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
            Listen to the Music
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-8">
            Stream all songs on your favorite platforms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.youtube.com/@CharlesJasemaMusic" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                YouTube
              </Button>
            </a>
            <a href="https://mdundo.com/a/148492" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Mdundo
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
