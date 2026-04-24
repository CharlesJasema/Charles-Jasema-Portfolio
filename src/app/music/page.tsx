'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaPlay, FaMusic, FaYoutube, FaExternalLinkAlt, FaDrum, FaGuitar, FaMicrophone } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';
import { Button, Card } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { musicConfig } from '@/config/music';
import { imagesConfig } from '@/config/images';
import { clsx } from 'clsx';

export default function MusicPage() {
  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'MusicGroup',
      name: 'Charles Jasema',
      genre: ['Contemporary Gospel', 'Worship', 'Christian Music'],
      description: musicConfig.story.description,
      foundingDate: '2015',
      foundingLocation: {
        '@type': 'Place',
        name: 'Yei, South Sudan',
      },
      member: {
        '@type': 'Person',
        name: 'Charles Jasema',
        alternateName: 'Bro Charles',
        jobTitle: 'Gospel Artist, Vocalist, Multi-Instrumentalist',
      },
      album: musicConfig.audioSongs.map((song) => ({
        '@type': 'MusicAlbum',
        name: song.title,
        datePublished: song.releaseDate,
        byArtist: {
          '@type': 'Person',
          name: 'Charles Jasema',
        },
      })),
      track: musicConfig.audioSongs.map((song) => ({
        '@type': 'MusicRecording',
        name: song.title,
        duration: song.duration,
        datePublished: song.releaseDate,
        description: song.description,
        url: song.mdundoUrl,
      })),
      sameAs: [
        'https://www.youtube.com/@CharlesJasemaMusic',
        'https://mdundo.com/a/148492',
        'https://www.instagram.com/charlesjasemamusic',
        'https://x.com/JasemaMusic',
        'https://www.facebook.com/share/1Aoqf2FLQ9/',
        'https://www.tiktok.com/@charlesjasemamusic',
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Ministry Image */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative rounded-lg overflow-hidden shadow-2xl shadow-accent-red/20">
                <Image
                  src={imagesConfig.profile.ministry}
                  alt={`${siteConfig.name} - Music Ministry`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-red/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-gold/10 rounded-full blur-2xl"></div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
                <span className="text-gray-900 dark:text-white">{musicConfig.story.title}</span>
              </h1>
              <p className="text-2xl text-accent-red font-semibold mb-6">
                {musicConfig.story.subtitle}
              </p>
              <p className="text-lg text-gray-700 dark:text-text-secondary mb-6 leading-relaxed">
                {musicConfig.story.description}
              </p>
              <div className="bg-gradient-to-r from-accent-red/10 to-primary-gold/10 rounded-lg p-6 mb-6">
                <p className="text-gray-800 dark:text-text-primary font-semibold">
                  <span className="text-accent-red">Mission:</span> {musicConfig.story.mission}
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-text-secondary italic">
                  "{musicConfig.story.philosophy}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Stats */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {musicConfig.stats.map((stat, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="lg"
                className="text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl font-bold text-accent-red mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-text-tertiary">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Musical Skills */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-slate-100 dark:bg-slate-900 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
            Musical Skills & Influences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Instruments */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-heading font-bold text-accent-red mb-4">Instruments</h3>
              <div className="space-y-3">
                {musicConfig.instruments.map((instrument, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-text-secondary">
                    {instrument.includes('Drum') && <FaDrum className="text-accent-red" />}
                    {instrument.includes('Guitar') && <FaGuitar className="text-accent-red" />}
                    {instrument.includes('Vocal') && <FaMicrophone className="text-accent-red" />}
                    {instrument.includes('Keyboard') && <FaMusic className="text-accent-red" />}
                    <span>{instrument}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Influences */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-heading font-bold text-accent-red mb-4">Musical Influences</h3>
              <div className="space-y-3">
                {musicConfig.influences.map((influence, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-text-secondary">
                    <FaMusic className="text-primary-gold" />
                    <span>{influence}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Videos Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Music Videos
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg">
              Watch official music videos with full production
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicConfig.musicVideos.map((video) => (
              <Card
                key={video.id}
                variant="elevated"
                padding="none"
                className="overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {/* Video Thumbnail */}
                <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <div className="aspect-video bg-gradient-to-br from-accent-red/20 to-primary-gold/20 flex items-center justify-center relative">
                    <FaPlay className="text-6xl text-accent-red/50 group-hover:scale-110 transition-transform duration-300" />
                    {video.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-accent-red text-white text-xs font-bold rounded-full">
                        FEATURED
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-background-dark/80 text-white text-xs rounded">
                      {video.views} views
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <span className="text-xs text-accent-red font-semibold uppercase tracking-wide">
                      {video.category}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 mt-1 group-hover:text-accent-red transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-text-secondary mb-4">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-text-tertiary">
                        {video.releaseDate}
                      </span>
                      <span className="inline-flex items-center gap-2 text-accent-red hover:text-accent-red/80 text-sm font-semibold">
                        Watch on YouTube
                        <FaExternalLinkAlt className="text-xs" />
                      </span>
                    </div>
                  </div>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lyrical Videos Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-slate-100 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Lyrical Videos
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg">
              Worship along with lyrics on screen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicConfig.lyricalVideos.map((video) => (
              <Card
                key={video.id}
                variant="elevated"
                padding="none"
                className="overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <div className="aspect-video bg-gradient-to-br from-primary-gold/20 to-tech-teal/20 flex items-center justify-center relative">
                    <FaPlay className="text-6xl text-primary-gold/50 group-hover:scale-110 transition-transform duration-300" />
                    {video.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded-full">
                        FEATURED
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-background-dark/80 text-white text-xs rounded">
                      {video.views} views
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-xs text-primary-gold font-semibold uppercase tracking-wide">
                      {video.category}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 mt-1 group-hover:text-primary-gold transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-text-secondary mb-4">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-text-tertiary">
                        {video.releaseDate}
                      </span>
                      <span className="inline-flex items-center gap-2 text-primary-gold hover:text-primary-gold/80 text-sm font-semibold">
                        Watch on YouTube
                        <FaExternalLinkAlt className="text-xs" />
                      </span>
                    </div>
                  </div>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Songs Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Audio Songs
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg">
              Listen to all 12 singles on Mdundo and other platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicConfig.audioSongs.map((song) => (
              <Card
                key={song.id}
                variant="elevated"
                padding="lg"
                className={clsx(
                  'hover:shadow-2xl transition-all duration-300',
                  song.featured && 'ring-2 ring-accent-red/50'
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Album Art Placeholder */}
                  <div className="w-20 h-20 bg-gradient-to-br from-accent-red/20 to-primary-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMusic className="text-3xl text-accent-red" />
                  </div>

                  {/* Song Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-text-tertiary">
                          {song.album} • {song.duration} • {song.releaseDate}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        {song.isNew && (
                          <span className="px-2 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded animate-pulse">
                            NEW
                          </span>
                        )}
                        {song.featured && (
                          <span className="px-2 py-1 bg-accent-red text-white text-xs font-bold rounded">
                            NEW
                          </span>
                        )}
                        {song.isFirstSong && (
                          <span className="px-2 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded">
                            FIRST
                          </span>
                        )}
                        {song.isCollaboration && (
                          <span className="px-2 py-1 bg-tech-teal text-white text-xs font-bold rounded">
                            COLLAB
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-text-secondary mb-4">
                      {song.description}
                    </p>

                    {/* Streaming Links */}
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={song.mdundoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors text-sm"
                      >
                        <FaMusic />
                        <span>Mdundo</span>
                      </a>
                      {song.directUpload && (
                        <a
                          href={song.directUpload}
                          download
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-red text-white rounded-lg hover:bg-accent-red/90 transition-colors text-sm"
                        >
                          <FaPlay />
                          <span>Play</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Streaming Platforms */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-gradient-to-r from-accent-red/10 via-primary-gold/10 to-tech-teal/10 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Listen on Your Favorite Platform
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-12">
            Stream my music on all major platforms
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {musicConfig.platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-800 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center gap-3">
                  {platform.icon === 'youtube' && <FaYoutube className="text-5xl text-accent-red group-hover:scale-110 transition-transform duration-300" />}
                  {platform.icon === 'music' && <FaMusic className="text-5xl text-primary-gold group-hover:scale-110 transition-transform duration-300" />}
                  {platform.icon === 'spotify' && <SiSpotify className="text-5xl text-tech-teal group-hover:scale-110 transition-transform duration-300" />}
                  {platform.icon === 'apple' && <SiApplemusic className="text-5xl text-primary-gold group-hover:scale-110 transition-transform duration-300" />}
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {platform.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-slate-100 dark:bg-slate-900 rounded-2xl p-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            {musicConfig.cta.title}
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-8">
            {musicConfig.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {musicConfig.cta.buttons.map((button, index) => (
              <Link key={index} href={button.link}>
                <Button variant={button.variant} size="lg" className="w-full sm:w-auto">
                  {button.text}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
