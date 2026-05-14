'use client';

import { useState } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui';

interface MusicFilterProps {
  onFilterChange: (filters: FilterState) => void;
  songCount: number;
  filteredCount: number;
}

export interface FilterState {
  album: string;
  featured: boolean;
  collaboration: boolean;
  hasStory: boolean;
}

export function MusicFilter({ onFilterChange, songCount, filteredCount }: MusicFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    album: 'all',
    featured: false,
    collaboration: false,
    hasStory: false,
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      album: 'all',
      featured: false,
      collaboration: false,
      hasStory: false,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.album !== 'all' || filters.featured || filters.collaboration || filters.hasStory;

  return (
    <div className="mb-8">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="secondary"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2"
        >
          <FaFilter />
          <span>Filter Songs</span>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-accent-red text-white text-xs rounded-full">
              {Object.values(filters).filter(v => v !== 'all' && v !== false).length}
            </span>
          )}
        </Button>
        
        <div className="text-sm text-gray-600 dark:text-text-tertiary">
          Showing {filteredCount} of {songCount} songs
        </div>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Options</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FaTimes />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Album Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Album
              </label>
              <select
                value={filters.album}
                onChange={(e) => handleFilterChange('album', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent-red focus:border-transparent"
              >
                <option value="all">All Albums</option>
                <option value="Singles">Singles</option>
                <option value="Collaborations">Collaborations</option>
              </select>
            </div>

            {/* Featured Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Special
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => handleFilterChange('featured', e.target.checked)}
                    className="rounded border-gray-300 text-accent-red focus:ring-accent-red"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Featured Only</span>
                </label>
              </div>
            </div>

            {/* Collaboration Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.collaboration}
                    onChange={(e) => handleFilterChange('collaboration', e.target.checked)}
                    className="rounded border-gray-300 text-tech-teal focus:ring-tech-teal"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Collaborations</span>
                </label>
              </div>
            </div>

            {/* Has Story Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasStory}
                    onChange={(e) => handleFilterChange('hasStory', e.target.checked)}
                    className="rounded border-gray-300 text-primary-gold focus:ring-primary-gold"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Has Story</span>
                </label>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}