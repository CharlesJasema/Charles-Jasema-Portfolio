'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCode, FaPalette, FaVideo, FaMusic, FaExternalLinkAlt, FaGithub, FaExpand, FaCompress, FaClock, FaUsers, FaQuoteLeft, FaStar, FaLightbulb, FaTools, FaGraduationCap } from 'react-icons/fa';
import { Card, AnimatedContainer } from '@/components/ui';
import { SocialShare } from '@/components/social';
import { clsx } from 'clsx';

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

interface ProjectCardProps {
  project: Project;
  index: number;
}

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

// Get category background color
const getCategoryBgColor = (category: string) => {
  switch (category) {
    case 'software': return 'bg-primary-gold/10';
    case 'design': return 'bg-tech-teal/10';
    case 'videography': return 'bg-primary-gold/10';
    case 'music': return 'bg-accent-red/10';
    default: return 'bg-primary-gold/10';
  }
};

// Get tech stack category color
const getTechStackColor = (category: string) => {
  switch (category) {
    case 'frontend': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'backend': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'database': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'devops': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    case 'design': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasExtendedInfo = project.challenges || project.solutions || project.detailedTechStack || 
                         project.testimonial || project.keyFeatures || project.lessonsLearned ||
                         project.duration || project.teamSize || project.myRole;

  return (
    <AnimatedContainer delay={index * 100}>
      <Card
        variant="elevated"
        padding="none"
        className={clsx(
          'overflow-hidden group cursor-pointer transition-all duration-300',
          'hover:scale-105 hover:shadow-2xl hover:-translate-y-2',
          project.featured && 'ring-2 ring-primary-gold/50',
          isExpanded && 'ring-2 ring-tech-teal/50'
        )}
      >
        {/* Project Image */}
        <div className="aspect-video bg-gradient-to-br from-primary-gold/20 via-tech-teal/20 to-accent-red/20 flex items-center justify-center relative overflow-hidden">
          {project.images && project.images.length > 0 && project.images[0].url ? (
            <Image
              src={project.images[0].url}
              alt={project.images[0].alt || project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
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
            <div className="absolute top-4 right-4 px-3 py-1 bg-primary-gold text-background-dark text-xs font-bold rounded-full z-10 animate-pulse">
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
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub className="text-background-dark" />
              </a>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className={clsx(
              'text-xs font-semibold uppercase tracking-wide',
              getCategoryColor(project.category)
            )}>
              {project.category}
            </span>
            
            {/* Project Meta Info */}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              {project.duration && (
                <div className="flex items-center gap-1">
                  <FaClock />
                  <span>{project.duration}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-1">
                  <FaUsers />
                  <span>{project.teamSize === 1 ? 'Solo' : `${project.teamSize} people`}</span>
                </div>
              )}
            </div>
          </div>
          
          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-gold transition-colors duration-300">
            {project.title}
          </h3>
          
          {project.myRole && (
            <p className="text-sm text-tech-teal font-semibold mb-2">
              Role: {project.myRole}
            </p>
          )}
          
          <p className="text-gray-600 dark:text-text-secondary text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags && project.tags.length > 0 && project.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
            {project.tags && project.tags.length > 3 && (
              <span className="px-3 py-1 bg-primary-gold/10 text-primary-gold text-xs rounded-full font-semibold">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Expand/Collapse Button and Social Share */}
          <div className="flex items-center justify-between">
            {hasExtendedInfo && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 text-sm text-tech-teal hover:text-tech-teal/80 font-semibold transition-colors duration-200"
              >
                {isExpanded ? <FaCompress /> : <FaExpand />}
                <span>{isExpanded ? 'Show Less' : 'Show Details'}</span>
              </button>
            )}

            {/* Social Share */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <SocialShare
                url={project.liveUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://charlesjasema.com'}/portfolio`}
                title={`${project.title} - Charles Jasema Portfolio`}
                description={project.description}
                variant="compact"
                className="scale-75"
              />
            </div>
          </div>
        </div>

        {/* Extended Information */}
        {isExpanded && hasExtendedInfo && (
          <AnimatedContainer animation="slideUp" className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-6 pt-6">
              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FaStar className="text-primary-gold" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Key Features</h4>
                  </div>
                  <ul className="space-y-1 pl-6">
                    {project.keyFeatures.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-text-secondary flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-gold rounded-full mt-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Challenges & Solutions */}
              {(project.challenges || project.solutions) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.challenges && project.challenges.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FaLightbulb className="text-accent-red" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Challenges</h4>
                      </div>
                      <ul className="space-y-1">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="text-sm text-gray-700 dark:text-text-secondary flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-accent-red rounded-full mt-2 flex-shrink-0"></span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.solutions && project.solutions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FaTools className="text-tech-teal" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Solutions</h4>
                      </div>
                      <ul className="space-y-1">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="text-sm text-gray-700 dark:text-text-secondary flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-tech-teal rounded-full mt-2 flex-shrink-0"></span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Tech Stack */}
              {project.detailedTechStack && project.detailedTechStack.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FaCode className="text-primary-gold" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Tech Stack</h4>
                  </div>
                  <div className="space-y-3">
                    {project.detailedTechStack.map((stack, index) => (
                      <div key={index}>
                        <span className={clsx(
                          'inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 capitalize',
                          getTechStackColor(stack.category)
                        )}>
                          {stack.category}
                        </span>
                        <div className="flex flex-wrap gap-1 ml-2">
                          {stack.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Testimonial */}
              {project.testimonial && (
                <div className={clsx('p-4 rounded-lg', getCategoryBgColor(project.category))}>
                  <div className="flex items-start gap-3">
                    <FaQuoteLeft className={clsx('text-2xl mt-1 flex-shrink-0', getCategoryColor(project.category))} />
                    <div>
                      <p className="text-sm text-gray-700 dark:text-text-secondary italic mb-3">
                        "{project.testimonial.text}"
                      </p>
                      <div className="text-xs">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {project.testimonial.author}
                        </p>
                        <p className="text-gray-600 dark:text-text-tertiary">
                          {project.testimonial.role}
                          {project.testimonial.company && ` at ${project.testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lessons Learned */}
              {project.lessonsLearned && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FaGraduationCap className="text-tech-teal" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Lessons Learned</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-text-secondary leading-relaxed pl-6">
                    {project.lessonsLearned}
                  </p>
                </div>
              )}
            </div>
          </AnimatedContainer>
        )}
      </Card>
    </AnimatedContainer>
  );
}