/**
 * About Page Content Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update your About page content
 * All information here can be customized without touching the page code.
 */

export const aboutConfig = {
  // Hero Section
  hero: {
    greeting: 'About',
    introduction: `I am a creative and technical professional committed to using innovation, design, and storytelling to inspire transformation. As a Software Engineer, I build scalable digital solutions that solve real-world problems. As a Graphics Designer, I craft impactful visual identities that strengthen brands and engage communities. As an IT Professional, I empower individuals and organizations through technical support and digital literacy. And as a Videographer, I capture and produce compelling content that communicates stories with clarity and creativity.

Beyond my professional career, I am deeply devoted to my music ministry as a Gospel Artist and Worship Leader. Through composing, recording, and performing gospel music, I share messages of faith, hope, and resilience, using music as a powerful tool to uplift and transform lives.

My journey is fueled by a passion for excellence, integrity, and service. Whether developing applications, designing brands, supporting ICT systems, producing visual content, or ministering through music, I strive to merge creativity with purpose.

At the heart of my mission is a simple truth: to combine technology, creativity, and worship to serve communities, empower individuals, and create lasting impact.`,
  },

  // Skills & Expertise
  skills: [
    {
      id: 'software',
      title: 'Software Engineering',
      icon: 'code',
      color: 'primary-gold',
      items: [
        'Full-Stack Web Development',
        'React, Next.js, TypeScript',
        'Node.js, Python, Java',
        'Database Design & Management',
        'API Development & Integration',
        'Cloud Services (AWS, Azure)',
      ],
    },
    {
      id: 'design',
      title: 'Graphics Design',
      icon: 'palette',
      color: 'tech-teal',
      items: [
        'Brand Identity Design',
        'UI/UX Design',
        'Adobe Creative Suite',
        'Figma, Sketch',
        'Logo & Marketing Materials',
        'Print & Digital Design',
      ],
    },
    {
      id: 'music',
      title: 'Gospel Music',
      icon: 'music',
      color: 'accent-red',
      items: [
        'Worship Leading',
        'Songwriting & Composition',
        'Music Production',
        'Vocal Performance',
        'Audio Engineering',
        'Live Performance',
      ],
    },
    {
      id: 'videography',
      title: 'Videography',
      icon: 'video',
      color: 'primary-gold',
      items: [
        'Video Production',
        'Video Editing',
        'Adobe Premiere Pro',
        'Final Cut Pro',
        'Motion Graphics',
        'Color Grading',
      ],
    },
  ],

  // Career Timeline
  timeline: [
    {
      id: '1',
      period: '2020 - 2024',
      type: 'Education',
      icon: 'graduation',
      color: 'primary-gold',
      title: 'Bachelor\'s Degree in Computer Science',
      organization: 'University Name',
      location: 'Kampala, Uganda',
      description: `Specialized in software engineering, web development, and database systems. 
      Graduated with honors and completed multiple real-world projects.`,
    },
    {
      id: '2',
      period: '2022 - Present',
      type: 'Professional',
      icon: 'briefcase',
      color: 'tech-teal',
      title: 'Software Developer & Graphics Designer',
      organization: 'Authentic Impressions Graphics LTD',
      location: 'Kampala, Uganda',
      description: `Building custom web applications, designing brand identities, and creating digital experiences 
      for clients across various industries. Specializing in full-stack development using React, Node.js, Django, and PostgreSQL.`,
    },
    {
      id: '3',
      period: '2021 - Present',
      type: 'Professional',
      icon: 'briefcase',
      color: 'tech-teal',
      title: 'IT Officer & Computer Literacy Facilitator',
      organization: 'Agape Heart International Organization',
      location: 'Kampala, Uganda',
      description: `Delivering technical support, digital literacy training, and ICT systems management. 
      Over 2+ years of experience in ICT systems, data management, and humanitarian program support.`,
    },
    {
      id: '4',
      period: '2015 - Present',
      type: 'Ministry',
      icon: 'music',
      color: 'accent-red',
      title: 'Gospel Music Artist & Worship Leader',
      organization: 'Charles Jasema Music',
      location: 'Kampala, Uganda',
      description: `Leading worship, writing original gospel songs, and producing music that inspires faith. 
      Released 15+ singles and performed at various churches and events across Uganda and South Sudan.`,
    },
    {
      id: '5',
      period: '2023',
      type: 'Achievement',
      icon: 'award',
      color: 'primary-gold',
      title: 'Launched Premium Portfolio Platform',
      organization: 'Personal Project',
      location: '',
      description: `Designed and developed this comprehensive portfolio platform to showcase my work across 
      software engineering, design, and music ministry. Built with Next.js, TypeScript, and modern web technologies.`,
    },
  ],

  // Call to Action
  cta: {
    title: 'Let\'s Create Something Amazing Together',
    description: `Whether you need a software solution, a stunning design, or music for your event, 
    I'm here to bring your vision to life.`,
    primaryButton: {
      text: 'View My Work',
      link: '/portfolio',
    },
    secondaryButton: {
      text: 'Start a Conversation',
      link: '/contact',
    },
  },
} as const;

export type AboutConfig = typeof aboutConfig;
