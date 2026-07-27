'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { FaCode, FaPalette, FaVideo, FaMusic, FaExternalLinkAlt, FaGithub, FaEye, FaHeart, FaFilter } from 'react-icons/fa';
import { 
  Card, 
  EnhancedButton, 
  AnimatedContainer, 
  StaggeredContainer,
  useBrandContext,
  brandGradients,
  getBrandClasses
} from '@/components/ui';

interface Project {
  _id: string;
  title: string;
  description: string;
  category: 'software' | 'design' | 'videography' | 'music';
  technologies?: string[];
  tags?: string[];
  images?: Array<{
    url: string;
    alt: string;
  }>;
  links?: {
    live?: string;
    github?: string;
    demo?: string;
  };
  featured?: boolean;
  brandContext?: 'professional' | 'ministry' | 'unified';
  metrics?: {
    views?: number;
    likes?: number;
    downloads?: number;
  };
  status?: 'completed' | 'in-progress' | 'concept';
  year?: number;
}

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface EnhancedPortfolioShowcaseProps {
  projects: Project[];
  categories: Category[];
  showFilters?: boolean;
  showMetrics?: boolean;
  layout?: 'grid' | 'masonry' | 'list';
  maxProjects?: number;
}

const categoryIcons = {
  all: FaEye,
  software: FaCode,
  design: FaPalette,
  videography: FaVideo,
  music: FaMusic,
};

export function EnhancedPortfolioShowcase({
  projects,
  categories,
  showFilters = true,
  showMetrics = true,
  layout = 'grid',
  maxProjects
}: EnhancedPortfolioShowcaseProps) {
  const { currentMode } = useBrandContext();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'popularity' | 'name'>('date');

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeCategory);

    // Apply brand context filtering
    if (currentMode === 'professional') {
      filtered = filtered.filter(project => 
        ['software', 'design', 'videography'].includes(project.category) ||
        project.brandContext === 'professional'
      );
    } else if (currentMode === 'ministry') {
      filtered = filtered.filter(project => 
        project.category === 'music' || 
        project.brandContext === 'ministry'
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          const aPopularity = (a.metrics?.views || 0) + (a.metrics?.likes || 0);
          const bPopularity = (b.metrics?.views || 0) + (b.metrics?.likes || 0);
          return bPopularity - aPopularity;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return (b.year || 0) - (a.year || 0);
      }
    });

    // Apply maxProjects limit
    return maxProjects ? filtered.slice(0, maxProjects) : filtered;
  }, [projects, activeCategory, currentMode, sortBy, maxProjects]);

  const CategoryFilter = ({ category }: { category: Category }) => {
    const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || FaEye;
    const isActive = activeCategory === category.id;

    return (
      <EnhancedButton
        variant={isActive ? 'primary' : 'ghost'}
        size="sm"
        icon={<Icon />}
        iconPosition="left"
        onClick={() => setActiveCategory(category.id)}
        className={clsx(
          'transition-all duration-300',
          isActive && 'shadow-lg scale-105'
        )}
        aria-pressed={isActive}
      >
        <span className="hidden sm:inline">{category.label}</span>
      </EnhancedButton>
    );
  };

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const brandClass = getBrandClasses(currentMode, 'primary');
    
    return (
      <AnimatedContainer delay={index * 0.1}>
        <Card
          variant="elevated"
          padding="none"
          hoverEffect="lift"
          className={clsx(
            'overflow-hidden group h-full',
            'hover:shadow-xl hover:shadow-primary-gold/20 transition-all duration-500'
          )}
        >
          {/* Project Image */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
            {project.images?.[0] ? (
              <Image
                src={project.images[0].url}
                alt={project.images[0].alt || project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  {categoryIcons[project.category] && 
                    React.createElement(categoryIcons[project.category], {
                      className: "text-6xl text-slate-400 mb-2"
                    })
                  }
                  <p className="text-slate-500 text-sm">Preview Coming Soon</p>
                </div>
              </div>
            )}
            
            {/* Status Badge */}
            {project.status && project.status !== 'completed' && (
              <div className="absolute top-4 left-4">
                <span className={clsx(
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  project.status === 'in-progress' ? 'bg-yellow-500 text-yellow-900' :
                  project.status === 'concept' ? 'bg-purple-500 text-white' : ''
                )}>
                  {project.status === 'in-progress' ? 'In Progress' : 'Concept'}
                </span>
              </div>
            )}

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded-full animate-pulse">
                  FEATURED
                </span>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4">
              <span className={clsx(
                'px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm',
                project.category === 'software' && 'bg-tech-teal/80 text-white',
                project.category === 'design' && 'bg-purple-500/80 text-white',
                project.category === 'videography' && 'bg-blue-500/80 text-white',
                project.category === 'music' && 'bg-accent-red/80 text-white'
              )}>
                {project.category}
              </span>
            </div>

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {project.links?.live && (
                  <Link
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-primary-gold text-background-dark rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label={`View ${project.title} live`}
                  >
                    <FaExternalLinkAlt className="text-sm" />
                  </Link>
                )}
                {project.links?.github && (
                  <Link
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-gray-900 rounded-full hover:scale-110 transition-transform duration-200"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub className="text-sm" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="p-6">
            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-gold transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-gray-600 dark:text-text-secondary text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 text-xs bg-primary-gold/20 text-primary-gold rounded">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Metrics */}
            {showMetrics && project.metrics && (
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-text-tertiary border-t border-gray-200 dark:border-gray-700 pt-4">
                {project.metrics.views && (
                  <div className="flex items-center space-x-1">
                    <FaEye />
                    <span>{project.metrics.views.toLocaleString()}</span>
                  </div>
                )}
                {project.metrics.likes && (
                  <div className="flex items-center space-x-1">
                    <FaHeart />
                    <span>{project.metrics.likes.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </AnimatedContainer>
    );
  };

  return (
    <div className={clsx(
      'w-full',
      currentMode !== 'unified' && brandGradients[currentMode]
    )}>
      {/* Header with Brand-Aware Styling */}
      <div className="text-center mb-12">
        <AnimatedContainer>
          <h2 className={clsx(
            'text-4xl font-heading font-bold mb-4',
            currentMode === 'professional' && 'text-professional-blue',
            currentMode === 'ministry' && 'text-ministry-burgundy',
            currentMode === 'unified' && 'text-primary-gold'
          )}>
            {currentMode === 'professional' && 'Professional Portfolio'}
            {currentMode === 'ministry' && 'Ministry Projects'}
            {currentMode === 'unified' && 'Featured Projects'}
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
            {currentMode === 'professional' && 'Showcasing software engineering, design, and technical excellence'}
            {currentMode === 'ministry' && 'Music, worship, and creative ministry projects'}
            {currentMode === 'unified' && 'A comprehensive showcase of technical skills and creative ministry'}
          </p>
        </AnimatedContainer>
      </div>

      {/* Filters and Controls */}
      {showFilters && (
        <div className="mb-8 space-y-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <CategoryFilter key={category.id} category={category} />
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 text-sm">
              <FaFilter className="text-gray-500" />
              <span className="text-gray-700 dark:text-text-secondary">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-gold focus:border-primary-gold"
              >
                <option value="date">Latest First</option>
                <option value="popularity">Most Popular</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="mb-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-300 dark:text-gray-600 mb-4">
              {categoryIcons[activeCategory as keyof typeof categoryIcons] && 
                React.createElement(categoryIcons[activeCategory as keyof typeof categoryIcons])
              }
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-text-secondary mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-text-tertiary">
              Try selecting a different category or check back later for updates.
            </p>
          </div>
        ) : (
          <StaggeredContainer
            className={clsx(
              layout === 'grid' && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
              layout === 'list' && 'space-y-6',
              layout === 'masonry' && 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8'
            )}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </StaggeredContainer>
        )}
      </div>

      {/* Load More / View All */}
      {maxProjects && projects.length > maxProjects && (
        <div className="text-center">
          <AnimatedContainer>
            <Link href="/portfolio">
              <EnhancedButton
                variant="outline"
                size="lg"
                icon={<FaExternalLinkAlt />}
                iconPosition="right"
              >
                View All Projects
              </EnhancedButton>
            </Link>
          </AnimatedContainer>
        </div>
      )}
    </div>
  );
}