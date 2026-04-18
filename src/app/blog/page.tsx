'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCalendar, FaClock, FaTag, FaArrowRight, FaSearch } from 'react-icons/fa';
import { Card, Button } from '@/components/ui';
import { blogConfig, BlogCategory } from '@/config/blog';
import { clsx } from 'clsx';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles based on category and search
  const filteredArticles = blogConfig.articles.filter((article) => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Sort articles: featured first, then by date
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  // Get category count
  const getCategoryCount = (category: BlogCategory) => {
    if (category === 'all') return blogConfig.articles.length;
    return blogConfig.articles.filter(a => a.category === category).length;
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const cat = blogConfig.categories.find(c => c.id === category);
    return cat?.color || 'primary-gold';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-gray-900 dark:text-white">{blogConfig.header.title}</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
            {blogConfig.header.subtitle}
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-primary-gold focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {blogConfig.categories.map((category) => {
              const isActive = activeCategory === category.id;
              const count = getCategoryCount(category.id as BlogCategory);

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as BlogCategory)}
                  className={clsx(
                    'px-6 py-3 rounded-lg font-semibold transition-all duration-300',
                    isActive
                      ? 'bg-primary-gold text-background-dark shadow-lg shadow-primary-gold/30 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  )}
                  aria-pressed={isActive}
                >
                  <span>{category.label}</span>
                  <span className={clsx(
                    'ml-2 px-2 py-0.5 rounded-full text-xs font-bold',
                    isActive 
                      ? 'bg-background-dark/20 text-background-dark' 
                      : 'bg-primary-gold/10 text-primary-gold'
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Article Count */}
          <div className="mb-8">
            <p className="text-gray-600 dark:text-text-tertiary text-center">
              Showing <span className="font-bold text-primary-gold">{sortedArticles.length}</span> {sortedArticles.length === 1 ? 'article' : 'articles'}
              {activeCategory !== 'all' && (
                <span> in <span className="font-bold text-primary-gold capitalize">{activeCategory}</span></span>
              )}
              {searchQuery && (
                <span> matching "<span className="font-bold text-primary-gold">{searchQuery}</span>"</span>
              )}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article, index) => (
              <Card
                key={article.id}
                variant="elevated"
                padding="none"
                className={clsx(
                  'overflow-hidden group cursor-pointer transition-all duration-300',
                  'hover:scale-105 hover:shadow-2xl',
                  'animate-fadeIn'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Article Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-gold/20 via-tech-teal/20 to-accent-red/20 flex items-center justify-center relative">
                  <div className="text-6xl text-gray-400 dark:text-gray-600">📝</div>
                  
                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded-full">
                      FEATURED
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className={clsx(
                    'absolute top-4 left-4 px-3 py-1 text-white text-xs font-bold rounded-full',
                    article.category === 'software' && 'bg-primary-gold',
                    article.category === 'design' && 'bg-tech-teal',
                    article.category === 'music' && 'bg-accent-red',
                    article.category === 'tutorial' && 'bg-primary-gold',
                    article.category === 'personal' && 'bg-tech-teal'
                  )}>
                    {article.category.toUpperCase()}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-text-tertiary mb-3">
                    <div className="flex items-center gap-1">
                      <FaCalendar />
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-gold transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-text-secondary text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        <FaTag className="text-xs" />
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="px-2 py-1 bg-primary-gold/10 text-primary-gold text-xs rounded font-semibold">
                        +{article.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-primary-gold hover:text-primary-gold/80 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  >
                    Read Article
                    <FaArrowRight />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {sortedArticles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-text-tertiary text-lg mb-4">
                No articles found matching your criteria.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary-gold/10 via-accent-red/10 to-tech-teal/10 rounded-2xl p-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-8">
            Subscribe to get the latest articles, tutorials, and insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:border-primary-gold focus:outline-none"
            />
            <Button variant="primary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
