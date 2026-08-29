'use client';

import { Card } from '../ui';
import { HeroImage } from '@/components/HeroImage';

export function EnhancedPortfolioShowcase({ className = '' }) {
  const projects = [
    {
      id: 1,
      title: 'Karibu Groceries Co. Ltd – E-commerce & Inventory System',
      description: 'Built a scalable inventory and sales management system with role-based access. Developed responsive UI for improved user experience and business efficiency.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'CI/CD'],
      image: '/images/karibu-groceries-preview.jpg',
      status: 'Completed',
      github: 'https://github.com/CharlesJasema/Karibu-Groceries-Ltd-Uganda.git',
      liveUrl: null
    },
    {
      id: 2,
      title: 'CAM Connect Mobile App',
      description: 'Developed a communication and collaboration mobile application. Improved digital connectivity and user interaction features.',
      technologies: ['JavaScript', 'Mobile Development Tools'],
      image: '/images/cam-connect-app-screenshot.jpg',
      status: 'Completed',
      github: 'https://github.com/CharlesJasema/CAM-CONNECT-MOBILE-APP.git',
      liveUrl: null
    },
    {
      id: 3,
      title: 'Portfolio Website – Personal Brand Platform',
      description: 'Designed and developed a responsive personal portfolio website. Showcased technical and design skills for professional visibility.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      image: '/images/portfolio-website-preview.jpg',
      status: 'Completed',
      github: 'https://github.com/CharlesJasema/Charles-Jasema-Portfolio.git',
      liveUrl: 'https://charlesjasema.com'
    },
  ];

  return (
    <section className={`py-16 bg-gray-50 dark:bg-slate-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcasing professional software development work across web applications, mobile apps, and database systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <HeroImage
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-primary-gold bg-opacity-10 text-primary-gold rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Project Links */}
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm bg-primary-gold text-white rounded hover:bg-primary-gold-dark transition-colors"
                    >
                      Live Site
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}