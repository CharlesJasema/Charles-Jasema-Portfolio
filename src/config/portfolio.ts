/**
 * CONFIGURATION FILE - LEGACY DATA
 * 
 * PURPOSE: This file serves as emergency fallback when Sanity CMS is unavailable
 * 
 * IMPORTANT:
 * - All dynamic content (projects, descriptions, images) should come from Sanity CMS
 * - This file exists only as a safety net for degraded service scenarios
 * - UI constants (categories, labels) can remain here
 * 
 * TO UPDATE CONTENT: Use Sanity Studio at /studio
 * 
 * ---
 * 
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
    id: 'karibu-groceries',
    title: 'Karibu Groceries Co. Ltd - E-commerce & Inventory System',
    category: 'software' as const,
    description: 'Scalable inventory and sales management system with role-based access control, built for improved business efficiency and user experience.',
    image: '/images/karibu-groceries-screenshot.jpg',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'CI/CD', 'E-commerce', 'Inventory Management'],
    link: 'https://demo-karibu-groceries.vercel.app',
    github: 'https://github.com/CharlesJasema/Karibu-Groceries-Ltd-Uganda.git',
    featured: true,
    order: 1,
    challenges: [
      'Building scalable inventory management for multiple product categories',
      'Implementing role-based access control for different user types',
      'Creating responsive UI for improved business efficiency',
      'Integrating real-time inventory updates and notifications'
    ],
    solutions: [
      'Designed robust PostgreSQL database schema with proper relationships',
      'Implemented JWT-based authentication with role-based permissions',
      'Built responsive React frontend with Material-UI components',
      'Used Docker for consistent development and deployment environments'
    ],
    detailedTechStack: [
      {
        category: 'frontend',
        technologies: ['React 18', 'Material-UI', 'Redux Toolkit', 'TypeScript']
      },
      {
        category: 'backend',
        technologies: ['Node.js', 'Express.js', 'JWT Authentication', 'Bcrypt']
      },
      {
        category: 'database',
        technologies: ['PostgreSQL', 'Sequelize ORM', 'Database Migrations']
      },
      {
        category: 'devops',
        technologies: ['Docker', 'CI/CD Pipeline', 'GitHub Actions', 'Environment Config']
      }
    ],
    duration: '3 months',
    teamSize: 1,
    myRole: 'Full-Stack Developer & System Architect',
    keyFeatures: [
      'Comprehensive inventory management with low-stock alerts',
      'Role-based access control (Admin, Manager, Staff)',
      'Real-time sales reporting and analytics dashboard',
      'Product categorization with search and filtering',
      'Responsive design for mobile and desktop use',
      'Automated backup and data recovery system',
      'Multi-location inventory tracking',
      'Integration with point-of-sale systems'
    ]
  },
  {
    id: 'charles-jasema-portfolio',
    title: 'Charles Jasema Portfolio & Digital Platform',
    category: 'software' as const,
    description: 'Comprehensive digital platform featuring portfolio showcase, music ministry platform, blog system, and business website with advanced CMS integration, analytics, and performance optimization.',
    image: '/images/portfolio-website-screenshot.jpg',
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
      text: 'This portfolio system perfectly showcases my diverse skills across software development, music ministry, and digital design. It serves as both a professional platform and a creative outlet, demonstrating my ability to build comprehensive digital solutions.',
      author: 'Charles Jasema',
      role: 'Developer & Designer',
      company: 'Personal Portfolio Project'
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
    id: 'cam-connect-app',
    title: 'CAM CONNECT - Hospitality Services Platform',
    category: 'software' as const,
    description: 'Mobile application for premium hospitality services including accommodation booking, conference facilities, and loyalty rewards system.',
    image: '/images/cam-connect-app-screenshot.jpg',
    tags: ['React Native', 'Mobile Development', 'Hospitality', 'Booking System', 'Loyalty Program', 'UI/UX Design'],
    link: 'https://cam-connect-app.com',
    github: 'https://github.com/charlesjasema/cam-connect',
    featured: true,
    order: 3,
    challenges: [
      'Creating intuitive mobile booking experience',
      'Implementing loyalty points and rewards system', 
      'Designing for premium hospitality market',
      'Managing real-time booking availability'
    ],
    solutions: [
      'Built native mobile app with React Native',
      'Integrated comprehensive loyalty program with points tracking',
      'Designed premium UI with focus on user experience',
      'Implemented real-time availability checking and booking confirmation'
    ],
    detailedTechStack: [
      {
        category: 'mobile',
        technologies: ['React Native', 'Mobile Development', 'Cross-platform']
      },
      {
        category: 'backend',
        technologies: ['Node.js', 'Real-time APIs', 'Booking System']
      },
      {
        category: 'features',
        technologies: ['Loyalty Program', 'Rewards System', 'Payment Integration']
      }
    ],
    duration: '4 months',
    teamSize: 2,
    myRole: 'Lead Mobile Developer & UI/UX Designer',
    testimonial: {
      text: 'As a multi-service business handling restaurant operations, accommodation, construction, and youth skill training programs, we needed a highly versatile digital solution. The application built for us delivered exactly that. It has significantly improved our internal coordination, allowing us to serve the people of Koboko District more effectively. The positive impact on our service delivery is clear.',
      author: 'Aloro Peter Satimon',
      role: 'Manager',
      company: 'Cam Connect Ltd'
    },
    keyFeatures: [
      'User account management and profiles',
      'Premium hospitality service bookings',
      'Loyalty points and rewards tracking',
      'Conference and accommodation reservations',
      'Real-time availability and pricing',
      'Push notifications for bookings and offers',
      'Secure payment processing',
      'Customer service and support integration'
    ]
  },
  {
    id: 'church-management-system',
    title: 'Church Management & Live Streaming Platform',
    category: 'software' as const,
    description: 'Complete church management system with member registration, event management, donation tracking, and integrated live streaming capabilities for worship services.',
    image: '/images/church-management-preview.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe', 'WebRTC', 'Express.js'],
    link: 'https://demo-church-system.vercel.app',
    github: 'https://github.com/charlesjasema/church-management',
    featured: true,
    order: 2,
    challenges: [
      'Real-time member engagement during live services',
      'Secure donation processing with multiple payment methods',
      'Scalable live streaming for 500+ concurrent viewers',
      'Member data privacy and GDPR compliance',
      'Mobile-first design for diverse congregation demographics'
    ],
    solutions: [
      'Implemented WebRTC for high-quality live streaming with chat',
      'Integrated Stripe and mobile money APIs for secure donations',
      'Used Socket.io for real-time prayer requests and announcements',
      'Built comprehensive admin dashboard with role-based access',
      'Created responsive PWA for offline access to sermons and content'
    ],
    detailedTechStack: [
      {
        category: 'frontend',
        technologies: ['React 18', 'TypeScript', 'Material-UI', 'PWA', 'WebRTC']
      },
      {
        category: 'backend',
        technologies: ['Node.js', 'Express.js', 'Socket.io', 'JWT Auth', 'Multer']
      },
      {
        category: 'database',
        technologies: ['MongoDB', 'Mongoose', 'Redis Cache', 'GridFS']
      },
      {
        category: 'devops',
        technologies: ['Docker', 'AWS EC2', 'CloudFront CDN', 'PM2']
      }
    ],
    duration: '4 months',
    teamSize: 2,
    myRole: 'Lead Full-Stack Developer',
    testimonial: {
      text: 'Charles delivered an exceptional church management system that transformed how we connect with our congregation. The live streaming feature kept us connected during challenging times.',
      author: 'Pastor John Mawa',
      role: 'Senior Pastor',
      company: 'Victory Christian Center'
    },
    keyFeatures: [
      'Member registration and profile management',
      'Live streaming with real-time chat and prayer requests',
      'Secure online donation system with receipt generation',
      'Event management and RSVP tracking',
      'Sermon library with search and categorization',
      'Mobile app for iOS and Android',
      'Admin dashboard with comprehensive analytics',
      'Email and SMS notification system'
    ],
    lessonsLearned: 'This project taught me the importance of understanding user needs in faith-based communities and how technology can strengthen spiritual connections while maintaining the personal touch that makes church community special.'
  },
];

export type PortfolioProject = typeof portfolioProjects[number];
export type ProjectCategory = 'all' | 'software' | 'design' | 'videography' | 'music';
