'use client';

import { Card } from '../ui';
import { HeroImage } from '@/components/HeroImage';

export function EnhancedMusicShowcase({ className = '' }) {
  const songs = [
    {
      id: 1,
      title: 'Grace Unending',
      artist: 'Charles Jasema',
      duration: '4:32',
      image: '/images/logos/charles-jasema-music-logo.jpg',
    },
    {
      id: 2,
      title: 'Worship in Spirit',
      artist: 'Charles Jasema',
      duration: '5:18',
      image: '/images/logos/charles-jasema-music-logo.jpg',
    },
    {
      id: 3,
      title: 'Hope Rising',
      artist: 'Charles Jasema',
      duration: '3:45',
      image: '/images/logos/charles-jasema-music-logo.jpg',
    },
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Music Ministry
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Gospel music that inspires faith, hope, and worship. Spreading God's love through contemporary worship songs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <Card key={song.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                <HeroImage
                  src={song.image}
                  alt={song.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {song.artist}
                  </p>
                  <p className="text-xs text-gray-500">
                    {song.duration}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}