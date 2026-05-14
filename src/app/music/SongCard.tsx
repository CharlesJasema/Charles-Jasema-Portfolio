'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaMusic, FaExpand, FaCompress, FaUsers, FaRecordVinyl, FaHeart, FaPlay } from 'react-icons/fa';
import { SiSpotify, SiApplemusic } from 'react-icons/si';
import { Card, AnimatedContainer } from '@/components/ui';
import { SocialShare } from '@/components/social';
import { urlFor } from '@/lib/sanity.image';
import { clsx } from 'clsx';

interface Song {
  _id: string;
  title: string;
  description: string;
  duration: string;
  releaseDate: string;
  album: string;
  mdundoUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  audioFile?: any;
  songStory?: string;
  recordingDetails?: string;
  collaborators?: string[];
  albumArt?: any;
  featured?: boolean;
  isNew?: boolean;
  isCollaboration?: boolean;
  isFirstSong?: boolean;
}

interface SongCardProps {
  song: Song;
  index: number;
}

export function SongCard({ song, index }: SongCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasExtendedInfo = song.songStory || song.recordingDetails || (song.collaborators && song.collaborators.length > 0);

  return (
    <AnimatedContainer delay={index * 100}>
      <Card
        variant="elevated"
        padding="lg"
        className={clsx(
          'hover:shadow-2xl transition-all duration-300 group',
          song.featured && 'ring-2 ring-accent-red/50',
          isExpanded && 'ring-2 ring-primary-gold/50'
        )}
      >
        <div className="flex items-start gap-4">
          {/* Album Art */}
          {song.albumArt ? (
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300">
              <Image
                src={urlFor(song.albumArt).width(80).height(80).url()}
                alt={`${song.title} album art`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-accent-red/20 to-primary-gold/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <FaMusic className="text-3xl text-accent-red" />
            </div>
          )}

          {/* Song Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-accent-red transition-colors duration-300">
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
                    FEATURED
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
            <div className="flex flex-wrap gap-2 mb-4">
              <a
                href={song.mdundoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors text-sm hover:scale-105 transform duration-200"
              >
                <FaMusic />
                <span>Mdundo</span>
              </a>
              
              {song.spotifyUrl && (
                <a
                  href={song.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm hover:scale-105 transform duration-200"
                >
                  <SiSpotify />
                  <span>Spotify</span>
                </a>
              )}
              
              {song.appleMusicUrl && (
                <a
                  href={song.appleMusicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm hover:scale-105 transform duration-200"
                >
                  <SiApplemusic />
                  <span>Apple Music</span>
                </a>
              )}

              {song.audioFile && (
                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-tech-teal text-white rounded-lg hover:bg-tech-teal/90 transition-colors text-sm hover:scale-105 transform duration-200">
                  <FaPlay />
                  <span>Preview</span>
                </button>
              )}
            </div>

            {/* Social Share and Actions */}
            <div className="flex items-center justify-between">
              {/* Expand/Collapse Button */}
              {hasExtendedInfo && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center gap-2 text-sm text-accent-red hover:text-accent-red/80 font-semibold transition-colors duration-200"
                >
                  {isExpanded ? <FaCompress /> : <FaExpand />}
                  <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                </button>
              )}

              {/* Social Share */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <SocialShare
                  url={song.mdundoUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://charlesjasema.com'}/music`}
                  title={`${song.title} - Charles Jasema`}
                  description={song.description}
                  variant="compact"
                  className="scale-75"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Extended Information */}
        {isExpanded && hasExtendedInfo && (
          <AnimatedContainer animation="slideUp" className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {/* Song Story */}
              {song.songStory && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaHeart className="text-accent-red" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Song Story</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-text-secondary leading-relaxed pl-6">
                    {song.songStory}
                  </p>
                </div>
              )}

              {/* Recording Details */}
              {song.recordingDetails && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaRecordVinyl className="text-primary-gold" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Recording Details</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-text-secondary leading-relaxed pl-6">
                    {song.recordingDetails}
                  </p>
                </div>
              )}

              {/* Collaborators */}
              {song.collaborators && song.collaborators.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaUsers className="text-tech-teal" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Collaborators</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6">
                    {song.collaborators.map((collaborator, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-tech-teal/10 text-tech-teal text-xs rounded-full"
                      >
                        {collaborator}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedContainer>
        )}
      </Card>
    </AnimatedContainer>
  );
}