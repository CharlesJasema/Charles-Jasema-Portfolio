/**
 * Downloads Center Component
 * 
 * Comprehensive downloads interface with search, filtering,
 * and secure download management
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  Grid3x3, 
  List, 
  Code, 
  Music, 
  BookOpen, 
  FileCode,
  Eye,
  ExternalLink,
  Clock,
  HardDrive,
  Tag,
  Loader2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useBrandContext } from '@/components/ui/BrandContext';
import { EnhancedButton } from '@/components/ui/EnhancedButton';

interface FileItem {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  description?: string;
  category: 'portfolio' | 'music' | 'resources' | 'templates';
  thumbnailUrl?: string;
  createdAt: string;
  modifiedAt: string;
  tags: string[];
  downloadCount: number;
}

interface FileCategories {
  [key: string]: {
    name: string;
    description: string;
    icon: string;
    color: string;
  };
}

interface DownloadsCenterProps {
  className?: string;
}

export function DownloadsCenter({ className = '' }: DownloadsCenterProps = {}) {
  const { currentBrand } = useBrandContext();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
  const [categories, setCategories] = useState<FileCategories>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'downloads'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFiles, setTotalFiles] = useState(0);
  const filesPerPage = 12;

  // Download state
  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(new Set());

  // Load files from API
  useEffect(() => {
    loadFiles();
  }, [selectedCategory, currentPage]);

  // Filter and sort files when search or sort changes
  useEffect(() => {
    filterAndSortFiles();
  }, [files, searchQuery, sortBy, sortOrder]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        limit: filesPerPage.toString(),
        offset: ((currentPage - 1) * filesPerPage).toString(),
      });

      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/downloads/list?${params}`);
      const data = await response.json();

      if (data.success) {
        setFiles(data.files);
        setCategories(data.categories);
        setTotalFiles(data.pagination.total);
      } else {
        setError(data.message || 'Failed to load files');
      }
    } catch (error) {
      console.error('Load files error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortFiles = () => {
    let filtered = [...files];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(query) ||
        file.description?.toLowerCase().includes(query) ||
        file.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime();
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        case 'downloads':
          comparison = a.downloadCount - b.downloadCount;
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    setFilteredFiles(filtered);
  };

  const handleDownload = async (file: FileItem) => {
    try {
      setDownloadingFiles(prev => new Set([...prev, file.id]));

      const response = await fetch(`/api/downloads/${encodeURIComponent(file.id)}`);
      const data = await response.json();

      if (data.success) {
        // Open download URL in new tab
        window.open(data.downloadUrl, '_blank');
        
        // Update download count (optimistic update)
        setFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, downloadCount: f.downloadCount + 1 }
            : f
        ));
      } else {
        alert(data.message || 'Download failed. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please check your connection and try again.');
    } finally {
      setDownloadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(file.id);
        return newSet;
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      portfolio: Code,
      music: Music,
      resources: BookOpen,
      templates: FileCode,
    };
    return icons[category as keyof typeof icons] || FileCode;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      portfolio: 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900',
      music: 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900',
      resources: 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900',
      templates: 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900',
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Download className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Downloads Center
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Access Charles Jasema's portfolio resources, music files, code templates, and learning materials. 
          All downloads are free and designed to help you in your creative and professional journey.
        </p>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Object.entries(categories).map(([key, category]) => {
          const IconComponent = getCategoryIcon(key);
          const isSelected = selectedCategory === key;
          
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedCategory(key);
                setCurrentPage(1);
              }}
              className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getCategoryColor(key)}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className={`font-semibold mb-2 ${
                isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
              }`}>
                {category.name}
              </h3>
              <p className={`text-sm ${
                isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {category.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files, tags, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View and Sort Controls */}
          <div className="flex items-center gap-4">
            {/* View Mode */}
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as typeof sortBy);
                setSortOrder(order as typeof sortOrder);
              }}
              className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="size-desc">Largest First</option>
              <option value="size-asc">Smallest First</option>
              <option value="downloads-desc">Most Downloaded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-3" />
          <span className="text-gray-600 dark:text-gray-400">Loading files...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                Unable to Load Files
              </h3>
              <p className="text-red-700 dark:text-red-300 mb-3">{error}</p>
              <EnhancedButton
                onClick={() => loadFiles()}
                size="sm"
                variant="outline"
              >
                Try Again
              </EnhancedButton>
            </div>
          </div>
        </div>
      )}

      {/* Files Grid/List */}
      {!loading && !error && (
        <>
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Files Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery 
                  ? 'Try adjusting your search query or filters'
                  : 'No files available in this category'
                }
              </p>
            </div>
          ) : (
            <>
              {/* Files Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {filteredFiles.map((file) => {
                    const CategoryIcon = getCategoryIcon(file.category);
                    const isDownloading = downloadingFiles.has(file.id);
                    
                    return (
                      <div
                        key={file.id}
                        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        {/* File Preview/Thumbnail */}
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                          {file.thumbnailUrl ? (
                            <img 
                              src={file.thumbnailUrl} 
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <CategoryIcon className="w-12 h-12 text-gray-400" />
                          )}
                          
                          {/* Category Badge */}
                          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(file.category)}`}>
                            {categories[file.category]?.name || file.category}
                          </div>
                        </div>

                        {/* File Info */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">
                            {file.name}
                          </h3>
                          
                          {file.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                              {file.description}
                            </p>
                          )}

                          {/* File Meta */}
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <HardDrive className="w-3 h-3" />
                              {formatFileSize(file.size)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {file.downloadCount}
                            </span>
                          </div>

                          {/* Tags */}
                          {file.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {file.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              {file.tags.length > 3 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  +{file.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Download Button */}
                          <EnhancedButton
                            onClick={() => handleDownload(file)}
                            disabled={isDownloading}
                            size="sm"
                            className="w-full"
                          >
                            {isDownloading ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Preparing...
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </>
                            )}
                          </EnhancedButton>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* List View */
                <div className="space-y-2 mb-8">
                  {filteredFiles.map((file) => {
                    const CategoryIcon = getCategoryIcon(file.category);
                    const isDownloading = downloadingFiles.has(file.id);
                    
                    return (
                      <div
                        key={file.id}
                        className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(file.category)}`}>
                            <CategoryIcon className="w-5 h-5" />
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                              {file.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>{formatFileSize(file.size)}</span>
                              <span>{file.downloadCount} downloads</span>
                              <span>{new Date(file.modifiedAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Download Button */}
                          <EnhancedButton
                            onClick={() => handleDownload(file)}
                            disabled={isDownloading}
                            size="sm"
                          >
                            {isDownloading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </EnhancedButton>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalFiles > filesPerPage && (
                <div className="flex items-center justify-center gap-2">
                  <EnhancedButton
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </EnhancedButton>
                  
                  <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {Math.ceil(totalFiles / filesPerPage)}
                  </span>
                  
                  <EnhancedButton
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage >= Math.ceil(totalFiles / filesPerPage)}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </EnhancedButton>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Footer Note */}
      <div className="mt-16 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Free Resources for Everyone
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All downloads are provided free of charge to support the developer and creative community. 
            If you find these resources helpful, consider sharing them with others or connecting with Charles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <EnhancedButton href="/contact" size="sm">
              Get in Touch
            </EnhancedButton>
            <EnhancedButton href="/portfolio" variant="outline" size="sm">
              View Portfolio
            </EnhancedButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { DownloadsCenterProps };
export default DownloadsCenter;