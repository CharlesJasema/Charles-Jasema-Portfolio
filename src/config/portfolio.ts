/**
 * Portfolio Projects Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update your portfolio projects
 * Add, remove, or modify projects without touching the page code.
 * 
 * Instructions:
 * - category: 'software' | 'design' | 'videography' | 'music'
 * - featured: true/false (featured projects get a badge)
 * - image: Path to project image (will be added later)
 * - tags: Array of technology/skill tags
 * - link: External project link (optional)
 * - github: GitHub repository link (optional)
 */

export const portfolioProjects = [
  {
    id: 'portfolio-system',
    title: 'Charles Jasema Portfolio & Digital Platform',
    category: 'software' as const,
    description: 'Comprehensive digital platform featuring portfolio showcase, music ministry platform, blog system, and business website with advanced CMS integration, analytics, and performance optimization.',
    image: '/images/Code & Design Banner.jpeg',
    tags: ['Next.js 14', 'TypeScript', 'Sanity CMS', 'Tailwind CSS', 'Vercel', 'Google Analytics', 'PWA', 'SEO'],
    link: 'https://charlesjasema.com',
    github: 'https://github.com/charlesjasema/portfolio',
    featured: true,
    order: 1,
    challenges: [
      'Integrating multiple content types (music, projects, blog) in a unified CMS',
      'Implementing advanced SEO with structured data for different content types',
      'Optimizing performance while maintaining rich interactive features',
      'Creating a responsive design that works across all devices and screen sizes',
      'Building a scalable architecture for future growth and content expansion'
    ],
    solutions: [
      'Designed flexible Sanity CMS schemas with validation and relationships',
      'Implemented comprehensive SEO system with dynamic metadata generation',
      'Used Next.js 14 with ISR, image optimization, and code splitting',
      'Applied mobile-first responsive design with Tailwind CSS',
      'Built modular component architecture with TypeScript for maintainability'
    ],
    detailedTechStack: [
      {
        category: 'frontend',
        technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
      },
      {
        category: 'backend',
        technologies: ['Next.js API Routes', 'Sanity CMS', 'Webhook Integration', 'ISR']
      },
      {
        category: 'database',
        technologies: ['Sanity Content Lake', 'GROQ Queries', 'Real-time Updates']
      },
      {
        category: 'devops',
        technologies: ['Vercel Deployment', 'GitHub Actions', 'Environment Management', 'Performance Monitoring']
      },
      {
        category: 'design',
        technologies: ['Figma', 'Adobe Creative Suite', 'Responsive Design', 'Accessibility (WCAG 2.1)']
      }
    ],
    duration: '3 months',
    teamSize: 1,
    myRole: 'Full-Stack Developer & Designer',
    testimonial: {
      text: 'This portfolio system perfectly captures Charles\'s diverse talents and provides an excellent platform for showcasing his work across multiple disciplines.',
      author: 'Development Team',
      role: 'Technical Review',
      company: 'Charles Jasema Digital'
    },
    keyFeatures: [
      'Multi-content CMS with Sanity integration for music, projects, and blog',
      'Advanced SEO with structured data and social media optimization',
      'Performance-optimized with Core Web Vitals scores above 95',
      'Fully responsive design with mobile-first approach',
      'Analytics integration with Google Analytics 4 and conversion tracking',
      'Live chat system with context-aware greetings',
      'Progressive Web App (PWA) capabilities',
      'Accessibility compliant (WCAG 2.1 AA)',
      'Social media integration with sharing and follow functionality',
      'Contact and booking system with multiple conversion paths'
    ],
    lessonsLearned: 'Building this comprehensive platform taught me the importance of balancing feature richness with performance, the value of proper content architecture planning, and how to create scalable systems that can grow with business needs.'
  },
  {
    id: '1',
    title: 'E-Commerce Platform',
    category: 'software' as const,
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image: '/placeholder',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    link: '#', // Update with actual project link
    github: '#', // Update with actual GitHub link
    featured: true,
    order: 2,
  },
  {
    id: '2',
    title: 'Task Management App',
    category: 'software' as const,
    description: 'Collaborative task management application with real-time updates and team collaboration features.',
    image: '/placeholder',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    link: '#',
    github: '#',
    featured: true,
    order: 3,
  },
  {
    id: '3',
    title: 'Brand Identity Design',
    category: 'design' as const,
    description: 'Complete brand identity including logo, color palette, typography, and marketing materials.',
    image: '/placeholder',
    tags: ['Adobe Illustrator', 'Photoshop', 'Branding'],
    link: '#',
    featured: true,
    order: 4,
  },
  {
    id: '4',
    title: 'Mobile App UI/UX',
    category: 'design' as const,
    description: 'Modern mobile app interface design with intuitive user experience and beautiful animations.',
    image: '/placeholder',
    tags: ['Figma', 'UI/UX', 'Mobile Design'],
    link: '#',
    featured: false,
    order: 5,
  },
  {
    id: '5',
    title: 'Corporate Video Production',
    category: 'videography' as const,
    description: 'Professional corporate video showcasing company culture and values with cinematic quality.',
    image: '/placeholder',
    tags: ['Premiere Pro', 'After Effects', 'Color Grading'],
    link: '#',
    featured: true,
    order: 6,
  },
  {
    id: '6',
    title: 'Music Video Production',
    category: 'videography' as const,
    description: 'Creative music video with storytelling, visual effects, and professional editing.',
    image: '/placeholder',
    tags: ['Final Cut Pro', 'Motion Graphics', 'Cinematography'],
    link: '#',
    featured: false,
    order: 7,
  },
  {
    id: '7',
    title: 'Worship Album - "Hope Rising"',
    category: 'music' as const,
    description: 'Original worship album featuring 10 songs of hope, faith, and inspiration.',
    image: '/placeholder',
    tags: ['Songwriting', 'Production', 'Worship'],
    link: '#',
    featured: true,
    order: 8,
  },
  {
    id: '8',
    title: 'Single - "Grace Abounds"',
    category: 'music' as const,
    description: 'Powerful worship single about God\'s amazing grace and unconditional love.',
    image: '/placeholder',
    tags: ['Gospel', 'Worship', 'Original'],
    link: '#',
    featured: false,
    order: 9,
  },
  {
    id: '10',
    title: 'Restaurant Branding',
    category: 'design' as const,
    description: 'Complete restaurant branding including menu design, signage, and promotional materials.',
    image: '/placeholder',
    tags: ['Branding', 'Print Design', 'Adobe Suite'],
    link: '#',
    featured: false,
    order: 10,
  },
  {
    id: '11',
    title: 'Event Highlight Reel',
    category: 'videography' as const,
    description: 'Dynamic event highlight video capturing the energy and excitement of a live event.',
    image: '/placeholder',
    tags: ['Video Editing', 'Color Grading', 'Sound Design'],
    link: '#',
    featured: false,
    order: 11,
  },
  {
    id: '12',
    title: 'Live Worship Session',
    category: 'music' as const,
    description: 'Live worship recording featuring original songs and powerful worship moments.',
    image: '/placeholder',
    tags: ['Live Performance', 'Worship', 'Recording'],
    link: '#',
    featured: false,
    order: 12,
  },
];

export type PortfolioProject = typeof portfolioProjects[number];
export type ProjectCategory = 'all' | 'software' | 'design' | 'videography' | 'music';
