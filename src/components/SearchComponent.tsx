/**
 * Search Component
 * 
 * Comprehensive search functionality with fuzzy matching, keyboard navigation,
 * and accessibility features for portfolio content.
 */

'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { clsx } from 'clsx';
import { keyboardUtils, ariaUtils, focusUtils } from '@/lib/accessibility';
import { inputValidation } from '@/lib/security';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'project' | 'song' | 'blog' | 'service';
  category: string;
  tags?: string[];
  relevance: number;
}

interface SearchComponentProps {
  placeholder?: string;
  maxResults?: number;
  onResultSelect?: (result: SearchResult) => void;
  className?: string;
  data?: SearchResult[];
}

// Mock search data - in a real app, this would come from an API or CMS
const defaultSearchData: SearchResult[] = [
  {
    id: '1',
    title: 'Charles Jasema Portfolio',
    description: 'Full-stack developer and worship leader portfolio website',
    url: '/',
    type: 'page',
    category: 'Portfolio',
    tags: ['portfolio', 'developer', 'worship', 'music'],
    relevance: 0,
  },
  {
    id: '2',
    title: 'About Me',
    description: 'Learn about Charles Jasema - developer, designer, and worship leader',
    url: '/about',
    type: 'page',
    category: 'About',
    tags: ['about', 'biography', 'skills', 'experience'],
    relevance: 0,
  },
  {
    id: '3',
    title: 'Software Development',
    description: 'Custom web applications, mobile apps, and software solutions',
    url: '/services#software',
    type: 'service',
    category: 'Services',
    tags: ['software', 'development', 'web', 'mobile', 'apps'],
    relevance: 0,
  },
  {
    id: '4',
    title: 'Graphics Design',
    description: 'Logo design, branding, and visual identity services',
    url: '/services#design',
    type: 'service',
    category: 'Services',
    tags: ['design', 'graphics', 'logo', 'branding', 'visual'],
    relevance: 0,
  },
  {
    id: '5',
    title: 'Music Ministry',
    description: 'Worship leading, music production, and ministry services',
    url: '/music',
    type: 'page',
    category: 'Music',
    tags: ['music', 'worship', 'ministry', 'production', 'leading'],
    relevance: 0,
  },
  {
    id: '6',
    title: 'Contact',
    description: 'Get in touch for projects, collaborations, or inquiries',
    url: '/contact',
    type: 'page',
    category: 'Contact',
    tags: ['contact', 'inquiries', 'projects', 'collaboration'],
    relevance: 0,
  },
];

/**
 * Fuzzy search implementation
 */
const fuzzySearch = (query: string, text: string): number => {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match gets highest score
  if (textLower.includes(queryLower)) {
    return 1.0;
  }
  
  // Calculate fuzzy match score
  let score = 0;
  let queryIndex = 0;
  
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      score += 1;
      queryIndex++;
    }
  }
  
  return queryIndex === queryLower.length ? score / query.length : 0;
};

/**
 * Search function with relevance scoring
 */
const searchItems = (query: string, data: SearchResult[]): SearchResult[] => {
  if (!query.trim()) return [];
  
  const sanitizedQuery = inputValidation.sanitizeString(query, 100);
  
  return data
    .map(item => {
      const titleScore = fuzzySearch(sanitizedQuery, item.title) * 3;
      const descriptionScore = fuzzySearch(sanitizedQuery, item.description) * 2;
      const categoryScore = fuzzySearch(sanitizedQuery, item.category) * 1.5;
      const tagsScore = item.tags 
        ? Math.max(...item.tags.map(tag => fuzzySearch(sanitizedQuery, tag))) * 1.2
        : 0;
      
      const totalScore = titleScore + descriptionScore + categoryScore + tagsScore;
      
      return {
        ...item,
        relevance: totalScore,
      };
    })
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);
};

export const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = 'Search portfolio...',
  maxResults = 10,
  onResultSelect,
  className,
  data = defaultSearchData,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [results, setResults] = useState<SearchResult[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const searchId = ariaUtils.generateId('search');
  const resultsId = ariaUtils.generateId('search-results');

  // Debounced search
  const debouncedSearch = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return (searchQuery: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const searchResults = searchItems(searchQuery, data);
        setResults(searchResults.slice(0, maxResults));
        setSelectedIndex(-1);
      }, 300);
    };
  }, [data, maxResults]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = inputValidation.sanitizeString(e.target.value, 100);
    setQuery(value);
    
    if (value.trim()) {
      setIsOpen(true);
      debouncedSearch(value);
    } else {
      setIsOpen(false);
      setResults([]);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) {
      if (e.key === keyboardUtils.keys.ESCAPE) {
        handleClose();
      }
      return;
    }

    switch (e.key) {
      case keyboardUtils.keys.ARROW_DOWN:
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
        
      case keyboardUtils.keys.ARROW_UP:
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
        
      case keyboardUtils.keys.ENTER:
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
        
      case keyboardUtils.keys.ESCAPE:
        e.preventDefault();
        handleClose();
        break;
    }
  };

  // Handle result selection
  const handleResultSelect = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    if (onResultSelect) {
      onResultSelect(result);
    } else {
      // Default behavior: navigate to URL
      window.location.href = result.url;
    }
    
    // Announce selection to screen readers
    ariaUtils.announce(`Selected ${result.title}`, 'polite');
  };

  // Handle close
  const handleClose = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [selectedIndex]);

  return (
    <div ref={searchRef} className={clsx('relative', className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        
        <input
          ref={inputRef}
          id={searchId}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder={placeholder}
          className={clsx(
            'block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600',
            'rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
            'placeholder-gray-500 dark:placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent',
            'transition-colors duration-200'
          )}
          aria-label="Search portfolio content"
          aria-describedby={resultsId}
          aria-haspopup="listbox"
          aria-controls={isOpen ? resultsId : undefined}
          aria-activedescendant={
            selectedIndex >= 0 ? `${resultsId}-item-${selectedIndex}` : undefined
          }
          autoComplete="off"
          spellCheck="false"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && results.length > 0 && (
        <div
          ref={resultsRef}
          id={resultsId}
          role="listbox"
          aria-label="Search results"
          className={clsx(
            'absolute z-50 w-full mt-1 bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg',
            'max-h-96 overflow-y-auto'
          )}
        >
          {results.map((result, index) => (
            <div
              key={result.id}
              id={`${resultsId}-item-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={clsx(
                'px-4 py-3 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0',
                'hover:bg-gray-50 dark:hover:bg-gray-700',
                index === selectedIndex && 'bg-primary-gold/10 dark:bg-primary-gold/20',
                'transition-colors duration-150'
              )}
              onClick={() => handleResultSelect(result)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {result.title}
                    </h3>
                    <span className={clsx(
                      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                      'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    )}>
                      {result.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {result.description}
                  </p>
                  {result.tags && result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-primary-gold/10 text-primary-gold"
                        >
                          {tag}
                        </span>
                      ))}
                      {result.tags.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{result.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="ml-3 flex-shrink-0 text-xs text-gray-400">
                  {index === selectedIndex && (
                    <span aria-label="Press Enter to select">↵</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && query.trim() && results.length === 0 && (
        <div
          className={clsx(
            'absolute z-50 w-full mt-1 bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg',
            'px-4 py-6 text-center'
          )}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No results found for "{query}"
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Try different keywords or check spelling
          </p>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      {isOpen && results.length > 0 && (
        <div className="sr-only" aria-live="polite">
          Use arrow keys to navigate, Enter to select, Escape to close
        </div>
      )}
    </div>
  );
};

/**
 * Search Modal Component for full-screen search
 */
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: SearchResult[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const focusManager = focusUtils.createFocusManager();

  useEffect(() => {
    if (isOpen) {
      focusManager.save();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      focusManager.restore();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, focusManager]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search Portfolio
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg"
              aria-label="Close search"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          
          <SearchComponent
            placeholder="Search for projects, services, music, and more..."
            maxResults={8}
            onResultSelect={(result) => {
              window.location.href = result.url;
              onClose();
            }}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;