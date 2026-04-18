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
    id: '1',
    title: 'E-Commerce Platform',
    category: 'software' as const,
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.',
    image: '/placeholder',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    link: '#', // Update with actual project link
    github: '#', // Update with actual GitHub link
    featured: true,
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
  },
  {
    id: '9',
    title: 'Portfolio Website',
    category: 'software' as const,
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
    category: 'design' as const,
    description: 'Complete restaurant branding including menu design, signage, and promotional materials.',
    image: '/placeholder',
    tags: ['Branding', 'Print Design', 'Adobe Suite'],
    link: '#',
    featured: false,
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
  },
];

export type PortfolioProject = typeof portfolioProjects[number];
export type ProjectCategory = 'all' | 'software' | 'design' | 'videography' | 'music';
