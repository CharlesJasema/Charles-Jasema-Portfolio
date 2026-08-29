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

  // Career Timeline (Latest to Oldest)
  timeline: [
    // LATEST ACHIEVEMENTS & EDUCATION
    {
      id: '1',
      period: 'Nov. 2025 - Mar. 2026',
      type: 'Education',
      icon: 'graduation',
      color: 'primary-gold',
      title: 'Certificate in Software Engineering (JavaScript)',
      organization: 'Refactory Academy',
      location: 'Kampala, Uganda',
      description: `Intensive training in modern JavaScript, web development, React, Node.js, and full-stack development practices.`,
    },
    {
      id: '2',
      period: '2026',
      type: 'Achievement',
      icon: 'award',
      color: 'primary-gold',
      title: 'Premium Portfolio Platform Launch',
      organization: 'Personal Project',
      location: 'Kampala, Uganda',
      description: `Designed and developed comprehensive portfolio platform showcasing work across software engineering, design, and music ministry. Built with Next.js 14, TypeScript, Tailwind CSS, and modern web technologies.`,
    },
    {
      id: '3',
      period: 'June 2025 - Feb. 2026',
      type: 'Professional',
      icon: 'briefcase',
      color: 'tech-teal',
      title: 'Graphics Designer (Full-time)',
      organization: 'Authentic Impressions Graphics Ltd',
      location: 'Koboko, Uganda',
      description: `Provided administrative and documentation support for clients. Designed communication materials including posters, flyers, and certificates. Managed digital files and customer documentation. Assisted clients with professional document formatting (CVs, reports).`,
    },
    {
      id: '4',
      period: 'Apr. 2022 - Apr. 2024',
      type: 'Education',
      icon: 'graduation',
      color: 'primary-gold',
      title: 'Diploma in Theology',
      organization: 'Global Theological Seminary',
      location: 'Jinja, Uganda',
      description: `Studied biblical theology, pastoral ministry, and Christian leadership. Deepened understanding of faith and ministry practice.`,
    },
    {
      id: '5',
      period: 'Mar. 2023 - Mar. 2024',
      type: 'Education',
      icon: 'graduation',
      color: 'primary-gold',
      title: 'Certificate in Computer Application User',
      organization: 'Purenita Vocational and Skills Center',
      location: 'Koboko, Uganda',
      description: `Gained practical skills in computer applications, office productivity tools, and digital literacy.`,
    },
    {
      id: '6',
      period: 'Mar. 2022 - Oct. 2024',
      type: 'Professional',
      icon: 'briefcase',
      color: 'tech-teal',
      title: 'IT Officer & Computer Literacy Facilitator',
      organization: 'Agape Heart International Organization',
      location: 'Koboko, Uganda',
      description: `Conducted community training sessions on ICT and employability skills. Supported program documentation, reporting, and digital record management. Mobilized and sensitized youth and community members for training and outreach. Promoted responsible use of technology and supported livelihoods initiatives.`,
    },
    {
      id: '7',
      period: '2019 - 2020',
      type: 'Education',
      icon: 'graduation',
      color: 'primary-gold',
      title: 'Uganda Advanced Certificate of Education (UACE)',
      organization: 'Standard High School-Zzana',
      location: 'Kampala, Uganda',
      description: `Completed A-Level education, preparing for higher education and professional development.`,
    },
    {
      id: '8',
      period: '2017 - 2018',
      type: 'Education',
      icon: 'graduation',
      color: 'primary-gold',
      title: 'Uganda Certificate of Education (UCE)',
      organization: 'Vurra Secondary School',
      location: 'Arua, Uganda',
      description: `Completed O-Level secondary education with focus on sciences and humanities.`,
    },
    {
      id: '9',
      period: '2017 - Present',
      type: 'Volunteer',
      icon: 'award',
      color: 'accent-red',
      title: 'Community Volunteer & Youth Mentor',
      organization: 'Scripture Union South Sudan Refugee Ministry / Local Church Programs',
      location: 'Uganda',
      description: `Led youth mentorship and empowerment initiatives. Organized community sensitization sessions and training workshops. Provided counseling and guidance to young people.`,
    },
    {
      id: '10',
      period: '2015 - Present',
      type: 'Ministry',
      icon: 'music',
      color: 'accent-red',
      title: 'Gospel Music Artist & Worship Leader',
      organization: 'Charles Jasema Music',
      location: 'Yei, South Sudan / Kampala, Uganda',
      description: `Started music ministry in 2015 in Yei, South Sudan with first song "Kuyeyeju". Formerly known as "Bro Charles" until 2016. Moved to Uganda in 2016 and adopted stage name "Charles Jasema" (acronym from Jada, Sebit, Emmanuel). Released 12 singles, writes all songs and lyrics. Music resonates with audiences aged 10-45, inspiring many to turn to Christ.`,
    },
    {
      id: '11',
      period: '2007 - 2014',
      type: 'Education',
      icon: 'graduation',
      color: 'primary-gold',
      title: 'Primary Leaving Certificate (PLC)',
      organization: 'Lupapa Primary School',
      location: 'Yei, South Sudan',
      description: `Completed primary education in South Sudan, building foundational knowledge and skills.`,
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
