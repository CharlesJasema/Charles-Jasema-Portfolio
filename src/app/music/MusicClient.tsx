'use client';

import { useState, useMemo } from 'react';
import { SongCard } from './SongCard';
import { MusicFilter, FilterState } from './MusicFilter';
import { EmptyState } from '@/components/ui';

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

interface MusicClientProps {
  songs: Song[];
}

export function MusicClient({ songs }: MusicClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    album: 'all',
    featured: false,
    collaboration: false,
    hasStory: false,
  });

  const filteredSongs = useMemo(() => {
    return songs.filter(song => {
      // Album filter
      if (filters.album !== 'all' && song.album !== filters.album) {
        return false;
      }

      // Featured filter
      if (filters.featured && !song.featured) {
        return false;
      }

      // Collaboration filter
      if (filters.collaboration && !song.isCollaboration) {
        return false;
      }

      // Has story filter
      if (filters.hasStory && !song.songStory) {
        return false;
      }

      return true;
    });
  }, [songs, filters]);

  if (songs.length === 0) {
    return (
      <EmptyState
        title="No Songs Available"
        message="Songs are being loaded from the content management system."
      />
    );
  }

  return (
    <div>
      <MusicFilter
        onFilterChange={setFilters}
        songCount={songs.length}
        filteredCount={filteredSongs.length}
      />

      {filteredSongs.length === 0 ? (
        <EmptyState
          title="No Songs Match Your Filters"
          message="Try adjusting your filter criteria to see more songs."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSongs.map((song, index) => (
            <SongCard key={song._id} song={song} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}