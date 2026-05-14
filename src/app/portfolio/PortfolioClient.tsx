'use client';

import { useState } from 'react';
import { FaCode, FaPalette, FaVideo, FaMusic } from 'react-icons/fa';
import { Button, EmptyState } from '@/components/ui';
import { ProjectCard } from './ProjectCard';
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
  challenges?: string[];
  solutions?: string[];
  detailedTechStack?: Array<{
    category: string;
    technologies: string[];
  }>;
  duration?: string;
  teamSize?: number;
  myRole?: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
    company?: string;
  };
  keyFeatures?: string[];
  lessonsLearned?: string;
}

interface PortfolioClientProps {
  projects: Project[];
  categories: readonly { id: string; label: string; icon: string | null }[];
}

// Icon mapping
const iconMap: Record<string, any> = {
  FaCode,
  FaPalette,
  FaVideo,
  FaMusic,
};

export default function PortfolioClient({ projects, categories }: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  // Sort projects by order and featured status
  const sortedProjects = [...projects].sort((a, b) => {
    // Featured projects first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then by order
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });

  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all' 
    ? sortedProjects 
    : sortedProjects.filter(project => project.category === activeCategory);

  // Get project count for each category
  const getCategoryCount = (category: Category) => {
    if (category === 'all') return projects.length;
    return projects.filter(p => p.category === category).length;
  };

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No Projects Available"
        message="Projects are being loaded from the content management system."
      />
    );
  }

  return (
    <>
      {/* Filter Buttons */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon ? iconMap[category.icon] : null;
              const isActive = activeCategory === category.id;
              const count = getCategoryCount(category.id as Category);

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as Category)}
                  className={clsx(
                    'px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105',
                    isActive
                      ? 'bg-primary-gold text-background-dark shadow-lg shadow-primary-gold/30 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:shadow-md'
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
          <div className="mb-8 text-center">
            <p className="text-gray-600 dark:text-text-tertiary">
              Showing <span className="font-bold text-primary-gold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
              {activeCategory !== 'all' && (
                <span> in <span className="font-bold text-primary-gold capitalize">{activeCategory}</span></span>
              )}
            </p>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <EmptyState
              title="No Projects Found"
              message="No projects match your current filter. Try selecting a different category."
              action={
                <Button
                  variant="primary"
                  onClick={() => setActiveCategory('all')}
                >
                  View All Projects
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
