'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCode, FaPalette, FaVideo, FaMusic, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Card, Button } from '@/components/ui';
import { clsx } from 'clsx';

type Category = 'all' | 'software' | 'design' | 'videography' | 'music';

interface Project {
  _id: string;
  title: string;
  category: string;
  description: string;
  images: Array<{ url: string; alt?: string }>;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order?: number;
}

interface PortfolioClientProps {
  projects: Project[];
  categories: readonly { id: string; label: string; icon: any }[];
}

export default function PortfolioClient({ projects, categories }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Get project count for each category
  const getCategoryCount = (category: Category) => {
    if (category === 'all') return projects.length;
    return projects.filter(p => p.category === category).length;
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'software': return 'text-primary-gold';
      case 'design': return 'text-tech-teal';
      case 'videography': return 'text-primary-gold';
      case 'music': return 'text-accent-red';
      default: return 'text-primary-gold';
    }
  };

  return (
    <>
      {/* Filter Buttons */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              const count = getCategoryCount(category.id as Category);

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as Category)}
                  className={clsx(
                    'px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2',
                    isActive
                      ? 'bg-primary-gold text-background-dark shadow-lg shadow-primary-gold/30 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  )}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${category.label}`}
                >
                  {Icon && <Icon className="text-lg" />}
                  <span>{category.label}</span>
                  <span className={clsx(
                    'ml-1 px-2 py-0.5 rounded-full text-xs font-bold',
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

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Project Count */}
          <div className="mb-8">
            <p className="text-gray-600 dark:text-text-tertiary text-center">
              Showing <span className="font-bold text-primary-gold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
              {activeCategory !== 'all' && (
                <span> in <span className="font-bold text-primary-gold capitalize">{activeCategory}</span></span>
              )}
            </p>
          </div>

          {/* Projects Grid with Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project._id}
                variant="elevated"
                padding="none"
                className={clsx(
                  'overflow-hidden group cursor-pointer transition-all duration-300',
                  'hover:scale-105 hover:shadow-2xl',
                  'animate-fadeIn'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-gold/20 via-tech-teal/20 to-accent-red/20 flex items-center justify-center relative overflow-hidden">
                  {project.images && project.images.length > 0 && project.images[0].url ? (
                    <Image
                      src={project.images[0].url}
                      alt={project.images[0].alt || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    /* Category Icon */
                    <div className="absolute inset-0 flex items-center justify-center">
                      {project.category === 'software' && <FaCode className="text-8xl text-primary-gold/30 group-hover:scale-110 transition-transform duration-300" />}
                      {project.category === 'design' && <FaPalette className="text-8xl text-tech-teal/30 group-hover:scale-110 transition-transform duration-300" />}
                      {project.category === 'videography' && <FaVideo className="text-8xl text-primary-gold/30 group-hover:scale-110 transition-transform duration-300" />}
                      {project.category === 'music' && <FaMusic className="text-8xl text-accent-red/30 group-hover:scale-110 transition-transform duration-300" />}
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded-full z-10">
                      FEATURED
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        aria-label="View project"
                      >
                        <FaExternalLinkAlt className="text-background-dark" />
                      </a>
                    )}
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        aria-label="View GitHub repository"
                      >
                        <FaGithub className="text-background-dark" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={clsx(
                      'text-xs font-semibold uppercase tracking-wide',
                      getCategoryColor(project.category)
                    )}>
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-gold transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-text-secondary text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 bg-primary-gold/10 text-primary-gold text-xs rounded-full font-semibold">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-text-tertiary text-lg mb-4">
                No projects found in this category.
              </p>
              <Button
                variant="primary"
                onClick={() => setActiveCategory('all')}
              >
                View All Projects
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
