'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCode, FaPalette, FaVideo, FaMusic, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { Card, Button } from '@/components/ui';
import { clsx } from 'clsx';

// Project categories
type Category = 'all' | 'software' | 'design' | 'videography' | 'music';

interface Project {
  id: string;
  title: string;
  category: Category;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

// Sample projects data (will be replaced with CMS data later)
const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    category: 'software',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image: '/placeholder',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'Task Management App',
    category: 'software',
    description: 'Collaborative task management application with real-time updates and team collaboration features.',
    image: '/placeholder',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: '3',
    title: 'Brand Identity Design',
    category: 'design',
    description: 'Complete brand identity including logo, color palette, typography, and marketing materials.',
    image: '/placeholder',
    tags: ['Adobe Illustrator', 'Photoshop', 'Branding'],
    link: '#',
    featured: true,
  },
  {
    id: '4',
    title: 'Mobile App UI/UX',
    category: 'design',
    description: 'Modern mobile app interface design with intuitive user experience and beautiful animations.',
    image: '/placeholder',
    tags: ['Figma', 'UI/UX', 'Mobile Design'],
    link: '#',
    featured: false,
  },
  {
    id: '5',
    title: 'Corporate Video Production',
    category: 'videography',
    description: 'Professional corporate video showcasing company culture and values with cinematic quality.',
    image: '/placeholder',
    tags: ['Premiere Pro', 'After Effects', 'Color Grading'],
    link: '#',
    featured: true,
  },
  {
    id: '6',
    title: 'Music Video Production',
    category: 'videography',
    description: 'Creative music video with storytelling, visual effects, and professional editing.',
    image: '/placeholder',
    tags: ['Final Cut Pro', 'Motion Graphics', 'Cinematography'],
    link: '#',
    featured: false,
  },
  {
    id: '7',
    title: 'Worship Album - "Hope Rising"',
    category: 'music',
    description: 'Original worship album featuring 10 songs of hope, faith, and inspiration.',
    image: '/placeholder',
    tags: ['Songwriting', 'Production', 'Worship'],
    link: '#',
    featured: true,
  },
  {
    id: '8',
    title: 'Single - "Grace Abounds"',
    category: 'music',
    description: 'Powerful worship single about God\'s amazing grace and unconditional love.',
    image: '/placeholder',
    tags: ['Gospel', 'Worship', 'Original'],
    link: '#',
    featured: false,
  },
  {
    id: '9',
    title: 'Portfolio Website',
    category: 'software',
    description: 'Custom portfolio website built with modern web technologies and best practices.',
    image: '/placeholder',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    link: '#',
    github: '#',
    featured: false,
  },
  {
    id: '10',
    title: 'Restaurant Branding',
    category: 'design',
    description: 'Complete restaurant branding including menu design, signage, and promotional materials.',
    image: '/placeholder',
    tags: ['Branding', 'Print Design', 'Adobe Suite'],
    link: '#',
    featured: false,
  },
  {
    id: '11',
    title: 'Event Highlight Reel',
    category: 'videography',
    description: 'Dynamic event highlight video capturing the energy and excitement of a live event.',
    image: '/placeholder',
    tags: ['Video Editing', 'Color Grading', 'Sound Design'],
    link: '#',
    featured: false,
  },
  {
    id: '12',
    title: 'Live Worship Session',
    category: 'music',
    description: 'Live worship recording featuring original songs and powerful worship moments.',
    image: '/placeholder',
    tags: ['Live Performance', 'Worship', 'Recording'],
    link: '#',
    featured: false,
  },
];

const categories = [
  { id: 'all', label: 'All Projects', icon: null },
  { id: 'software', label: 'Software', icon: FaCode },
  { id: 'design', label: 'Design', icon: FaPalette },
  { id: 'videography', label: 'Videography', icon: FaVideo },
  { id: 'music', label: 'Music', icon: FaMusic },
] as const;

export default function PortfolioPage() {
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
  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'software': return 'text-primary-gold';
      case 'design': return 'text-tech-teal';
      case 'videography': return 'text-primary-gold';
      case 'music': return 'text-accent-red';
      default: return 'text-primary-gold';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-gray-900 dark:text-white">My </span>
            <span className="text-primary-gold">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
            Explore my collection of projects across software development, graphics design, 
            videography, and gospel music ministry.
          </p>
        </div>
      </section>

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
                key={project.id}
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
                  {/* Category Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.category === 'software' && <FaCode className="text-8xl text-primary-gold/30 group-hover:scale-110 transition-transform duration-300" />}
                    {project.category === 'design' && <FaPalette className="text-8xl text-tech-teal/30 group-hover:scale-110 transition-transform duration-300" />}
                    {project.category === 'videography' && <FaVideo className="text-8xl text-primary-gold/30 group-hover:scale-110 transition-transform duration-300" />}
                    {project.category === 'music' && <FaMusic className="text-8xl text-accent-red/30 group-hover:scale-110 transition-transform duration-300" />}
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded-full">
                      FEATURED
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                        aria-label="View project"
                      >
                        <FaExternalLinkAlt className="text-background-dark" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
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

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary-gold/10 via-accent-red/10 to-tech-teal/10 rounded-2xl p-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-8">
            Let's collaborate and bring your vision to life. Whether it's software, design, or creative work, 
            I'm here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Learn More About Me
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
