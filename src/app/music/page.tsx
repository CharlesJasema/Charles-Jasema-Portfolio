'use client';

import Link from 'next/link';
import { FaPlay, FaMusic, FaYoutube, FaCalendar, FaMicrophone, FaExternalLinkAlt } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';
import { Button, Card } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { musicConfig } from '@/config/music';
import { clsx } from 'clsx';

export default function MusicPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-red/10 rounded-full mb-6">
              <FaMusic className="text-4xl text-accent-red" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-gray-900 dark:text-white">{musicConfig.story.title}</span>
          </h1>
          <p className="text-2xl text-accent-red font-semibold mb-6">
            {musicConfig.story.subtitle}
          </p>
          <p className="text-lg text-gray-700 dark:text-text-secondary max-w-3xl mx-auto mb-8">
            {musicConfig.story.description}
          </p>
          <div className="inline-block bg-gradient-to-r from-accent-red/10 to-primary-gold/10 rounded-lg p-6 max-w-2xl">
            <p className="text-gray-800 dark:text-text-primary font-semibold">
              <span className="text-accent-red">Mission:</span> {musicConfig.story.mission}
            </p>
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

      {/* Featured Songs */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20 bg-slate-100 dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Latest Songs
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg">
              Listen to my recent releases and worship songs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicConfig.songs.map((song) => (
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
                          {song.album} • {song.duration}
                        </p>
                      </div>
                      {song.featured && (
                        <span className="px-2 py-1 bg-accent-red text-white text-xs font-bold rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-text-secondary mb-4">
                      {song.description}
                    </p>

                    {/* Streaming Links */}
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={song.streamingLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-red text-white rounded-lg hover:bg-accent-red/90 transition-colors text-sm"
                      >
                        <FaYoutube />
                        <span>YouTube</span>
                      </a>
                      <a
                        href={song.streamingLinks.mdundo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors text-sm"
                      >
                        <FaMusic />
                        <span>Mdundo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Music Videos */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Music Videos
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg">
              Watch official music videos and live performances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {musicConfig.videos.map((video) => (
              <Card
                key={video.id}
                variant="elevated"
                padding="none"
                className="overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                {/* Video Thumbnail */}
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
                  <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-accent-red transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-text-secondary mb-4">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-text-tertiary">
                      {video.releaseDate}
                    </span>
                    <a
                      href={siteConfig.music.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent-red hover:text-accent-red/80 text-sm font-semibold"
                    >
                      Watch
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
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
