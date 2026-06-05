'use client';

import { useState } from 'react';
import { FaMusic, FaYoutube, FaSearch, FaExternalLinkAlt, FaFilePdf, FaFileAlt } from 'react-icons/fa';
import { Button, Card } from '@/components/ui';
import { clsx } from 'clsx';

// Sample lyrics data - replace with your actual songs
const lyricsData = [
  {
    _id: 'song-1',
    songTitle: 'Grace Abounds',
    artist: 'Charles Jasema',
    album: 'Worship Collection',
    releaseYear: '2024',
    language: 'English',
    verses: [
      {
        type: 'Verse 1',
        lines: [
          'In the depths of my despair',
          'When I thought no one would care',
          'Your grace came down like morning rain',
          'Washing away my guilt and shame'
        ]
      },
      {
        type: 'Chorus',
        lines: [
          'Grace abounds, grace abounds',
          'In every corner it can be found',
          'Your love surrounds, your mercy sounds',
          'Grace abounds, grace abounds'
        ]
      },
      {
        type: 'Verse 2',
        lines: [
          'When the world seems dark and cold',
          'And my heart has grown so old',
          'You remind me of Your love',
          'Sent from heaven up above'
        ]
      },
      {
        type: 'Bridge',
        lines: [
          'Amazing grace, how sweet the sound',
          'That saved a wretch like me',
          'I once was lost, but now I\'m found',
          'Was blind, but now I see'
        ]
      }
    ],
    notes: 'A powerful song about God\'s amazing grace and mercy that never fails.',
    youtubeUrl: 'https://www.youtube.com/@CharlesJasemaMusic',
    mdundoUrl: 'https://mdundo.com/song/1377029',
    featured: true
  },
  {
    _id: 'song-2',
    songTitle: 'Faithful God',
    artist: 'Charles Jasema',
    album: 'Worship Collection',
    releaseYear: '2024',
    language: 'English',
    verses: [
      {
        type: 'Verse 1',
        lines: [
          'Through the storms and through the night',
          'You have been my guiding light',
          'Never failing, always true',
          'I can always count on You'
        ]
      },
      {
        type: 'Chorus',
        lines: [
          'Faithful God, You never change',
          'Your promises remain the same',
          'Yesterday, today, forever',
          'You are faithful, now and ever'
        ]
      },
      {
        type: 'Verse 2',
        lines: [
          'In my weakness You are strong',
          'In my sorrow You\'re my song',
          'When I fall You lift me up',
          'You\'re my hope, my strength, my cup'
        ]
      }
    ],
    notes: 'A declaration of God\'s faithfulness through all seasons of life.',
    youtubeUrl: 'https://www.youtube.com/@CharlesJasemaMusic',
    mdundoUrl: 'https://mdundo.com/song/1377029',
    featured: true
  },
  {
    _id: 'song-3',
    songTitle: 'Holy Spirit Come',
    artist: 'Charles Jasema',
    album: 'Worship Collection',
    releaseYear: '2024',
    language: 'English',
    verses: [
      {
        type: 'Verse 1',
        lines: [
          'Holy Spirit, come and fill this place',
          'Let Your presence fall like rain',
          'We are hungry for Your touch',
          'Come and heal our hearts again'
        ]
      },
      {
        type: 'Chorus',
        lines: [
          'Holy Spirit come, Holy Spirit come',
          'Fill our hearts with Your love',
          'Holy Spirit come, Holy Spirit come',
          'Send Your fire from above'
        ]
      },
      {
        type: 'Verse 2',
        lines: [
          'In this moment we surrender',
          'Every burden, every fear',
          'Let Your glory fill the temple',
          'Holy Spirit, draw us near'
        ]
      }
    ],
    notes: 'An invitation for the Holy Spirit to move in our hearts and lives.',
    youtubeUrl: 'https://www.youtube.com/@CharlesJasemaMusic',
    mdundoUrl: 'https://mdundo.com/song/1377029',
    featured: false
  }
];

export default function LyricsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<string | null>(null);

  // Filter lyrics based on search
  const filteredLyrics = lyricsData.filter((song) =>
    song.songTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get selected song details
  const selectedSongData = selectedSong
    ? lyricsData.find((song) => song._id === selectedSong)
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

      {/* Search Bar */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a song..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                    {song.verses.length} sections
                  </span>
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
            <a href="https://mdundo.com/song/1377029" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Mdundo
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}