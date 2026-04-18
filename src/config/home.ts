/**
 * Homepage Content Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update your homepage content
 * All text, descriptions, and featured content can be customized here.
 */

export const homeConfig = {
  // Hero Section
  hero: {
    greeting: 'Hi, I\'m',
    tagline: 'Crafting digital experiences through code, design, and worship. Building software that matters and creating music that inspires.',
    buttons: [
      {
        text: 'View My Work',
        link: '/portfolio',
        variant: 'primary' as const,
      },
      {
        text: 'Get In Touch',
        link: '/contact',
        variant: 'ghost' as const,
      },
      {
        text: 'Download CV',
        link: '#', // Update with actual CV link
        variant: 'secondary' as const,
        icon: 'download',
      },
    ],
  },

  // What I Do Section
  services: {
    title: 'What I Do',
    subtitle: 'Bridging technology and creativity to deliver exceptional results',
    items: [
      {
        id: 'software',
        icon: 'code',
        color: 'primary-gold',
        title: 'Software Engineering',
        description: 'Building scalable web applications with modern technologies and best practices',
      },
      {
        id: 'design',
        icon: 'palette',
        color: 'tech-teal',
        title: 'Graphics Design',
        description: 'Creating stunning visual identities and user interfaces that captivate',
      },
      {
        id: 'music',
        icon: 'music',
        color: 'accent-red',
        title: 'Gospel Music',
        description: 'Worship leader and gospel artist spreading hope through music',
      },
      {
        id: 'videography',
        icon: 'video',
        color: 'primary-gold',
        title: 'Videography',
        description: 'Capturing moments and telling stories through compelling video content',
      },
    ],
  },

  // Featured Work Section
  featuredWork: {
    title: 'Featured Work',
    subtitle: 'A showcase of my recent projects across different domains',
    viewAllButton: {
      text: 'View All Projects',
      link: '/portfolio',
    },
    projects: [
      {
        id: 'software-featured',
        category: 'Software Development',
        categoryColor: 'primary-gold',
        title: 'E-Commerce Platform',
        description: 'Full-stack web application with payment integration and real-time inventory management',
        link: '/portfolio',
        icon: 'code',
      },
      {
        id: 'design-featured',
        category: 'Graphics Design',
        categoryColor: 'tech-teal',
        title: 'Brand Identity Design',
        description: 'Complete brand identity including logo, color palette, and marketing materials',
        link: '/portfolio',
        icon: 'palette',
      },
      {
        id: 'music-featured',
        category: 'Gospel Music',
        categoryColor: 'accent-red',
        title: 'Latest Worship Album',
        description: 'Collection of original worship songs inspiring faith and hope',
        link: '/music',
        icon: 'music',
      },
    ],
  },

  // Call to Action Section
  cta: {
    title: 'Let\'s Work Together',
    description: 'Have a project in mind? Whether it\'s software development, design, or music production, I\'d love to hear from you.',
    buttons: [
      {
        text: 'Start a Project',
        link: '/contact',
        variant: 'primary' as const,
      },
      {
        text: 'Explore Music Ministry',
        link: '/music',
        variant: 'secondary' as const,
      },
    ],
  },
} as const;

export type HomeConfig = typeof homeConfig;
