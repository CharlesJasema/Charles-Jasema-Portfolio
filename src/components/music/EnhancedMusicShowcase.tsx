'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { 
  FaPlay, 
  FaMusic, 
  FaYoutube, 
  FaHeart, 
  FaEye, 
  FaCalendar, 
  FaHeadphones,
  FaMicrophone,
  FaGuitar,
  FaDrum,
  FaUsers,
  FaChurch,
  FaDownload
} from 'react-icons/fa';
import { 
  Card, 
  EnhancedButton, 
  AnimatedContainer, 
  StaggeredContainer,
  useBrandContext,
  brandGradients,
  getBrandClasses
} from '@/components/ui';

interface Song {
  _id: string;
  title: string;
  description: string;
  albumArt?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  mdundoUrl?: string;
  spotifyUrl?: string;
  releaseDate: string;
  duration?: string;
  genre?: string;
  featured?: boolean;
  isNew?: boolean;
  lyrics?: string;
  tags?: string[];
  metrics?: {
    views?: number;
    likes?: number;
    downloads?: number;
    streams?: number;
  };
  category?: 'worship' | 'praise' | 'gospel' | 'contemporary';
}

interface Video {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  youtubeUrl: string;
  category: 'Music Video' | 'Lyrical Video';
  releaseDate: string;
  views?: string;
  featured?: boolean;
  duration?: string;
  tags?: string[];
}

interface EnhancedMusicShowcaseProps {
  songs: Song[];
  videos: Video[];
  showCategories?: boolean;
  showMetrics?: boolean;
  layout?: 'grid' | 'list' | 'featured';
  maxItems?: number;
  featuredFirst?: boolean;
}

const categoryIcons = {
  all: FaMusic,
  worship: FaChurch,
  praise: FaHeart,
  gospel: FaMicrophone,
  contemporary: FaHeadphones,
};

const categoryColors = {
  worship: 'from-ministry-gold/20 to-ministry-burgundy/20',
  praise: 'from-accent-red/20 to-primary-gold/20',
  gospel: 'from-primary-gold/20 to-tech-teal/20',
  contemporary: 'from-tech-teal/20 to-ministry-gold/20',
};

export function EnhancedMusicShowcase({
  songs,
  videos,
  showCategories = true,
  showMetrics = true,
  layout = 'grid',
  maxItems,
  featuredFirst = true
}: EnhancedMusicShowcaseProps) {
  const { currentMode } = useBrandContext();
  const [activeTab, setActiveTab] = useState<'songs' | 'videos'>('songs');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter and sort songs
  const filteredSongs = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? songs 
      : songs.filter(song => song.category === activeCategory);

    if (featuredFirst) {
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      });
    }

    return maxItems ? filtered.slice(0, maxItems) : filtered;
  }, [songs, activeCategory, featuredFirst, maxItems]);

  // Filter and sort videos
  const filteredVideos = useMemo(() => {
    let filtered = videos;

    if (featuredFirst) {
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      });
    }

    return maxItems ? filtered.slice(0, maxItems) : filtered;
  }, [videos, featuredFirst, maxItems]);

  const SongCard = ({ song, index }: { song: Song; index: number }) => {
    return (
      <AnimatedContainer delay={index * 0.1}>
        <Card
          variant="elevated"
          padding="lg"
          hoverEffect="glow"
          className={clsx(
            'group h-full transition-all duration-500',
            'hover:shadow-xl hover:shadow-ministry-burgundy/20',
            song.featured && 'ring-2 ring-primary-gold/50'
          )}
        >
          <div className="flex flex-col h-full">
            {/* Album Art & Play Button */}
            <div className="relative mb-4">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gradient-to-br from-ministry-gold/20 to-ministry-burgundy/20">
                {song.albumArt ? (
                  <Image
                    src={song.albumArt}
                    alt={`${song.title} album art`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaMusic className="text-6xl text-ministry-gold/50" />
                  </div>
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary-gold/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <FaPlay className="text-background-dark text-xl ml-1" />
                  </div>
                </div>
                
                {/* Featured Badge */}
                {song.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded-full animate-pulse">
                      FEATURED
                    </span>
                  </div>
                )}

                {/* New Release Badge */}
                {song.isNew && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-accent-red text-white text-xs font-bold rounded-full">
                      NEW
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Song Details */}
            <div className="flex-grow">
              <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-ministry-gold transition-colors duration-300">
                {song.title}
              </h3>
              
              <p className="text-gray-600 dark:text-text-secondary text-sm mb-3 line-clamp-2">
                {song.description}
              </p>

              {/* Song Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-text-tertiary">
                  <div className="flex items-center space-x-1">
                    <FaCalendar />
                    <span>{new Date(song.releaseDate).getFullYear()}</span>
                  </div>
                  {song.duration && (
                    <div className="flex items-center space-x-1">
                      <FaHeadphones />
                      <span>{song.duration}</span>
                    </div>
                  )}
                </div>

                {/* Category & Genre */}
                {(song.category || song.genre) && (
                  <div className="flex flex-wrap gap-2">
                    {song.category && (
                      <span className={clsx(
                        'px-2 py-1 text-xs font-semibold rounded-full',
                        song.category === 'worship' && 'bg-ministry-gold/20 text-ministry-burgundy',
                        song.category === 'praise' && 'bg-accent-red/20 text-accent-red',
                        song.category === 'gospel' && 'bg-primary-gold/20 text-primary-gold-dark',
                        song.category === 'contemporary' && 'bg-tech-teal/20 text-tech-teal-dark'
                      )}>
                        {song.category}
                      </span>
                    )}
                    {song.genre && (
                      <span className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                        {song.genre}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Metrics */}
              {showMetrics && song.metrics && (
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-text-tertiary mb-4">
                  {song.metrics.views && (
                    <div className="flex items-center space-x-1">
                      <FaEye />
                      <span>{song.metrics.views.toLocaleString()}</span>
                    </div>
                  )}
                  {song.metrics.streams && (
                    <div className="flex items-center space-x-1">
                      <FaHeadphones />
                      <span>{song.metrics.streams.toLocaleString()}</span>
                    </div>
                  )}
                  {song.metrics.downloads && (
                    <div className="flex items-center space-x-1">
                      <FaDownload />
                      <span>{song.metrics.downloads.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-auto">
              {song.youtubeUrl && (
                <Link href={song.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <EnhancedButton
                    variant="ministry"
                    size="sm"
                    fullWidth
                    icon={<FaYoutube />}
                    iconPosition="left"
                  >
                    YouTube
                  </EnhancedButton>
                </Link>
              )}
              {song.mdundoUrl && (
                <Link href={song.mdundoUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <EnhancedButton
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<FaDownload />}
                    iconPosition="left"
                  >
                    Mdundo
                  </EnhancedButton>
                </Link>
              )}
            </div>
          </div>
        </Card>
      </AnimatedContainer>
    );
  };

  const VideoCard = ({ video, index }: { video: Video; index: number }) => {
    return (
      <AnimatedContainer delay={index * 0.1}>
        <Card
          variant="elevated"
          padding="none"
          hoverEffect="lift"
          className={clsx(
            'overflow-hidden group h-full',
            'hover:shadow-xl hover:shadow-ministry-burgundy/20 transition-all duration-500'
          )}
        >
          <Link href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="h-full flex flex-col">
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-ministry-gold/20 to-ministry-burgundy/20 flex items-center justify-center overflow-hidden">
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <FaPlay className="text-6xl text-ministry-gold/50 group-hover:scale-110 transition-transform duration-300" />
              )}
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <FaPlay className="text-gray-900 text-2xl ml-1" />
                </div>
              </div>
              
              {/* Featured Badge */}
              {video.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-accent-red text-white text-xs font-bold rounded-full animate-pulse">
                    FEATURED
                  </span>
                </div>
              )}

              {/* Category Badge */}
              <div className="absolute bottom-4 left-4">
                <span className={clsx(
                  'px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm',
                  video.category === 'Music Video' ? 'bg-accent-red/80 text-white' : 'bg-primary-gold/80 text-background-dark'
                )}>
                  {video.category}
                </span>
              </div>

              {/* Views */}
              {video.views && (
                <div className="absolute bottom-4 right-4">
                  <span className="px-2 py-1 bg-background-dark/80 text-white text-xs rounded backdrop-blur-sm">
                    {video.views} views
                  </span>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-ministry-gold transition-colors duration-300 line-clamp-2">
                {video.title}
              </h3>
              
              <p className="text-gray-600 dark:text-text-secondary text-sm mb-3 line-clamp-3 flex-grow">
                {video.description}
              </p>
              
              {/* Video Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-text-tertiary mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                <span>{new Date(video.releaseDate).toLocaleDateString()}</span>
                {video.duration && <span>{video.duration}</span>}
              </div>
            </div>
          </Link>
        </Card>
      </AnimatedContainer>
    );
  };

  return (
    <div className={clsx(
      'w-full',
      currentMode === 'ministry' && brandGradients.ministry
    )}>
      {/* Header */}
      <div className="text-center mb-12">
        <AnimatedContainer>
          <h2 className="text-4xl font-heading font-bold text-ministry-burgundy dark:text-ministry-gold mb-4">
            Music Ministry
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
            Contemporary gospel music that inspires worship and transforms lives
          </p>
        </AnimatedContainer>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('songs')}
            className={clsx(
              'px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300',
              activeTab === 'songs'
                ? 'bg-ministry-burgundy text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-ministry-burgundy'
            )}
          >
            Songs ({songs.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={clsx(
              'px-6 py-3 rounded-md font-semibold text-sm transition-all duration-300',
              activeTab === 'videos'
                ? 'bg-ministry-burgundy text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-ministry-burgundy'
            )}
          >
            Videos ({videos.length})
          </button>
        </div>
      </div>

      {/* Category Filters (for songs) */}
      {showCategories && activeTab === 'songs' && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['all', 'worship', 'praise', 'gospel', 'contemporary'].map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const isActive = activeCategory === category;
            
            return (
              <EnhancedButton
                key={category}
                variant={isActive ? 'ministry' : 'ghost'}
                size="sm"
                icon={<Icon />}
                iconPosition="left"
                onClick={() => setActiveCategory(category)}
                className={clsx(
                  'transition-all duration-300',
                  isActive && 'shadow-lg scale-105'
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </EnhancedButton>
            );
          })}
        </div>
      )}

      {/* Content Grid */}
      <div className="mb-8">
        {activeTab === 'songs' ? (
          filteredSongs.length === 0 ? (
            <div className="text-center py-12">
              <FaMusic className="text-6xl text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-text-secondary mb-2">
                No songs found
              </h3>
              <p className="text-gray-500 dark:text-text-tertiary">
                Check back later for new releases.
              </p>
            </div>
          ) : (
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSongs.map((song, index) => (
                <SongCard key={song._id} song={song} index={index} />
              ))}
            </StaggeredContainer>
          )
        ) : (
          filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <FaYoutube className="text-6xl text-gray-300 dark:text-gray-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-text-secondary mb-2">
                No videos found
              </h3>
              <p className="text-gray-500 dark:text-text-tertiary">
                Check back later for new video releases.
              </p>
            </div>
          ) : (
            <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => (
                <VideoCard key={video._id} video={video} index={index} />
              ))}
            </StaggeredContainer>
          )
        )}
      </div>

      {/* View All Link */}
      {maxItems && (
        <div className="text-center">
          <AnimatedContainer>
            <Link href="/music">
              <EnhancedButton
                variant="ministry"
                size="lg"
                icon={<FaMusic />}
                iconPosition="right"
              >
                Explore All Music
              </EnhancedButton>
            </Link>
          </AnimatedContainer>
        </div>
      )}
    </div>
  );
}