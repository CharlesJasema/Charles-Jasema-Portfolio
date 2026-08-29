'use client';

import { useState } from 'react';
import { Card, EnhancedButton, ImageCarousel } from '@/components/ui';
import { HeroImage } from '@/components/HeroImage';
import { FaGithub, FaExternalLinkAlt, FaCode, FaMobile, FaGlobe, FaUsers } from 'react-icons/fa';
import { projectUrls, siteConfig } from '@/lib/config';

export default function PortfolioPage() {
  // CV Projects - EXACT from Charles Jasema's CV (Only the 3 main projects)
  const projects = [
    {
      id: 1,
      title: 'Karibu Groceries Co. Ltd – E-commerce & Inventory System',
      description: 'Built a scalable inventory and sales management system with role-based access. Developed responsive UI for improved user experience and business efficiency.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'CI/CD'],
      category: 'Full-Stack',
      status: 'Completed',
      github: projectUrls.karibuGroceries,
      images: [
        '/images/projects/karibu-groceries-screenshot.jpg',
        '/images/projects/KGL Hero image.png',
        '/images/projects/KGL Logo.png'
      ],
      icon: <FaCode className="text-[#D4AF37]" />
    },
    {
      id: 2,
      title: 'Cam Connect Mobile App',
      description: 'Developed a communication and collaboration mobile application. Improved digital connectivity and user interaction features.',
      technologies: ['JavaScript', 'Mobile Development Tools'],
      category: 'Mobile',
      status: 'Completed',
      github: projectUrls.camConnect,
      images: [
        '/images/projects/Cam Connect Project Image 1..jpg',
        '/images/projects/Cam Connect Project Image 2..jpg'
      ],
      icon: <FaMobile className="text-[#800000]" />
    },
    {
      id: 3,
      title: 'Portfolio Website – Personal Brand Platform',
      description: 'Designed and developed a responsive personal portfolio website. Showcased technical and design skills for professional visibility.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'Web',
      status: 'Completed',
      github: projectUrls.portfolio,
      liveUrl: siteConfig.url,
      images: ['/images/professional/Home Page HERO Image.png'],
      icon: <FaGlobe className="text-[#D4AF37]" />
    }
  ];

  // Professional Experience from CV
  const experience = [
    {
      title: 'Graphics Designer',
      company: 'Authentic Impressions Graphics Ltd',
      period: 'June 2025 – Feb 2026',
      location: 'Uganda',
      responsibilities: [
        'Designed high-quality branding materials including logos, posters, flyers, banners, and social media content',
        'Developed consistent visual identities for clients across multiple industries',
        'Translated client ideas into professional, market-ready design concepts',
        'Prepared print-ready files and coordinated with printing teams for production accuracy',
        'Improved brand engagement through creative and modern design solutions'
      ]
    },
    {
      title: 'IT Officer & Computer Literacy Facilitator',
      company: 'Agape Heart International Organization',
      period: 'March 2022 – October 2024',
      location: 'Uganda',
      responsibilities: [
        'Provided technical support for hardware, software, and network systems within the organization',
        'Installed and configured operating systems, applications, and office productivity tools',
        'Conducted computer literacy training sessions for youth and community members',
        'Developed beginner-friendly ICT training materials and guides',
        'Supported digital inclusion initiatives for refugees and host communities',
        'Maintained IT equipment and ensured system uptime and reliability'
      ]
    },
    {
      title: 'Project Officer',
      company: 'Agape Heart International Organization',
      period: 'April 2022 – December 2023',
      location: 'Uganda',
      responsibilities: [
        'Coordinated project planning, implementation, and monitoring for community ICT initiatives',
        'Supported proposal writing and documentation for new projects',
        'Conducted regular field visits, ensuring smooth implementation and timely reporting',
        'Delivered ICT training workshops, building digital literacy among refugees and host communities',
        'Provided IT support, troubleshooting hardware/software issues, and maintaining system uptime'
      ]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Full-Stack', 'Mobile', 'Web'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Professional Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <HeroImage
            src="/images/professional/PortFolio page HERO Image.png"
            alt="Charles Jasema Portfolio - Professional Work"
            fallbackSrc="/images/professional/charles-jasema-professional.jpg"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/90 via-[#0B132B]/70 to-[#0B132B]/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-[#D4AF37] font-medium">
            Showcasing Technical and Creative Excellence
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#D4AF37] text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-slate-700 text-[#0B132B] dark:text-white hover:bg-[#D4AF37]/10 hover:text-[#800000] dark:hover:bg-[#D4AF37]/20 dark:hover:text-[#D4AF37]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#D4AF37]">
                <div className="relative h-64">
                  <ImageCarousel
                    images={project.images}
                    alt={project.title}
                    className="w-full h-full"
                    autoPlay={project.images.length > 1}
                    interval={4000}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 p-3 rounded-full">
                      {project.icon}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 text-sm rounded-full font-medium">
                      {project.status}
                    </span>
                  </div>
                  {project.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {project.images.length} images
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#0B132B] dark:text-white mb-4">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-[#D4AF37]/10 text-[#800000] rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <EnhancedButton className="bg-[#0B132B] hover:bg-[#800000] text-white px-4 py-3 rounded-lg transition-all duration-300 w-full flex items-center justify-center gap-2">
                          <FaGithub /> GitHub
                        </EnhancedButton>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <EnhancedButton className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-4 py-3 rounded-lg transition-all duration-300 w-full flex items-center justify-center gap-2">
                          <FaExternalLinkAlt /> Live Site
                        </EnhancedButton>
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B132B] mb-4">
              Professional Experience
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              4+ years of experience in project coordination, IT support, and technical solution delivery
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <Card key={index} className="p-8 border-l-4 border-[#D4AF37] hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0B132B] mb-2">
                      {job.title}
                    </h3>
                    <p className="text-[#800000] font-semibold text-lg">
                      {job.company}
                    </p>
                    <p className="text-gray-600">
                      {job.location} • {job.period}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex} className="flex items-start text-gray-700">
                      <span className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-4 flex-shrink-0"></span>
                      <span className="leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}