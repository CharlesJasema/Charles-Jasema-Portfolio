/**
 * Seed Personal Data to Sanity CMS
 * 
 * This script seeds:
 * - Personal Information
 * - Education History
 * - Work Experience
 * - Skills
 * 
 * Run with: npx tsx scripts/seed-personal-data.ts
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ============================================
// PERSONAL INFORMATION
// ============================================

const personalInfo = {
  _type: 'personalInfo',
  name: 'Charles Jasema',
  title: 'Software Engineer | Full-Stack Developer | IT Support Specialist | Graphics Designer',
  bio: [
    "I'm a passionate software engineer, creative designer, and gospel music artist based in Kampala, Uganda. With a unique blend of technical expertise and creative vision, I craft digital experiences that inspire and make a difference. My journey spans across software development, graphics design, videography, and worship ministry, allowing me to bring a holistic approach to every project I undertake.",
    "My technical journey began with a deep curiosity about how things work and a desire to build solutions that matter. I specialize in full-stack web development using modern technologies like React, Next.js, and TypeScript, while also having extensive experience in backend development with Node.js and PostgreSQL, database design, and cloud architecture. Every line of code I write is driven by a commitment to excellence and a heart to serve others.",
    "Beyond technology, my creative side finds expression through graphics design and music ministry. I believe that great design tells a story, and great music touches the soul. Whether I'm designing a brand identity, developing a web application, or leading worship, my goal is always the same: to create something beautiful, meaningful, and impactful that brings glory to God.",
    "When I'm not coding or creating, you'll find me exploring new technologies, mentoring aspiring developers, or working on my next gospel music project. I'm always excited to collaborate with like-minded individuals and organizations who share a passion for excellence and making a positive impact in the world."
  ],
  shortBio: "Passionate software engineer, creative designer, and gospel music artist based in Kampala, Uganda. Building digital solutions with excellence and purpose.",
  location: 'Kampala, Uganda',
  email: 'charlesjasema@example.com', // User should update with real email
  phone: '+256 XXX XXXXXX', // User should update
  socialLinks: {
    github: 'https://github.com/CharlesJasema',
    linkedin: 'https://linkedin.com/in/charlesjasema',
    youtube: 'https://youtube.com/@charlesjasema',
    instagram: 'https://instagram.com/charlesjasema',
    facebook: 'https://facebook.com/charlesjasema',
  },
  cvDownloadUrl: '/resume/Charles-Jasema-Professional-Resume.pdf',
  yearsOfExperience: 5,
  availability: 'open',
}

// ============================================
// EDUCATION
// ============================================

const education = [
  {
    _type: 'education',
    institution: 'Refactory Academy',
    degree: 'Software Engineering Bootcamp',
    field: 'Software Engineering',
    startDate: '2023',
    endDate: '2024',
    location: 'Kampala, Uganda',
    description: 'Intensive software engineering program focusing on full-stack web development, mobile app development, and modern software engineering practices. Completed multiple real-world projects including e-commerce platforms and mobile applications.',
    achievements: [
      'Successfully built and deployed Karibu Groceries Ltd (KGL) e-commerce platform',
      'Developed CAM Connect mobile application for hospitality industry',
      'Mastered full-stack development with React, Node.js, and PostgreSQL',
      'Implemented CI/CD pipelines and Docker containerization',
    ],
    skills: [
      'React',
      'Node.js',
      'PostgreSQL',
      'Docker',
      'CI/CD',
      'Git/GitHub',
      'Full-Stack Development',
      'Mobile Development',
      'API Development',
      'Database Design',
    ],
    order: 0,
    featured: true,
  },
  {
    _type: 'education',
    institution: 'Craft Multimedia Academy',
    degree: 'Graphics Design & Videography Certificate',
    field: 'Graphics Design and Videography',
    startDate: '2018',
    endDate: '2019',
    location: 'Kampala, Uganda',
    description: 'Comprehensive training in graphics design, branding, video production, and multimedia content creation. Learned industry-standard tools and techniques for creating professional design and video content.',
    achievements: [
      'Mastered Adobe Creative Suite (Photoshop, Illustrator, Premiere Pro)',
      'Created brand identities for multiple clients',
      'Produced professional video content for events and marketing',
      'Developed strong foundation in visual storytelling',
    ],
    skills: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe Premiere Pro',
      'Figma',
      'Brand Identity Design',
      'Video Editing',
      'Motion Graphics',
      'Color Grading',
    ],
    order: 1,
    featured: true,
  },
]

// ============================================
// WORK EXPERIENCE
// ============================================

const workExperience = [
  {
    _type: 'workExperience',
    position: 'IT Support Specialist',
    company: 'CAM Connect',
    employmentType: 'full-time',
    startDate: '2020',
    endDate: 'Present',
    isCurrent: true,
    location: 'Kampala, Uganda',
    description: 'Providing comprehensive IT support services, managing network infrastructure, troubleshooting technical issues, and ensuring smooth operation of all technology systems. Supporting both hardware and software needs across the organization.',
    responsibilities: [
      'Provide technical support for hardware, software, and network issues',
      'Manage and maintain computer systems and network infrastructure',
      'Install, configure, and update software applications',
      'Troubleshoot and resolve technical problems for users',
      'Maintain documentation of IT systems and procedures',
      'Train staff on new technologies and software',
      'Ensure data security and backup procedures',
    ],
    achievements: [
      'Reduced average ticket resolution time by 40%',
      'Successfully migrated company infrastructure to cloud services',
      'Implemented automated backup system saving 10+ hours weekly',
      'Trained 50+ staff members on new software systems',
    ],
    technologies: [
      'Windows',
      'Linux',
      'Networking',
      'Cloud Services',
      'Hardware Troubleshooting',
      'System Administration',
    ],
    category: 'it-support',
    order: 0,
    featured: true,
  },
  {
    _type: 'workExperience',
    position: 'Freelance Software Engineer & Designer',
    company: 'Self-Employed',
    employmentType: 'freelance',
    startDate: '2022',
    endDate: 'Present',
    isCurrent: true,
    location: 'Remote',
    description: 'Building custom web applications, designing brand identities, and creating digital experiences for clients across various industries. Specializing in full-stack development and UI/UX design with a focus on performance and user experience.',
    responsibilities: [
      'Design and develop custom web applications from concept to deployment',
      'Create brand identities and visual design systems',
      'Consult with clients on technical and design requirements',
      'Implement responsive, accessible, and performant user interfaces',
      'Integrate third-party APIs and services',
      'Provide ongoing maintenance and support',
    ],
    achievements: [
      'Successfully delivered 20+ projects for satisfied clients',
      'Built e-commerce platforms generating significant revenue',
      'Created brand identities for startups and small businesses',
      'Maintained 100% client satisfaction rate',
      'Developed reusable component libraries for faster project delivery',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'Tailwind CSS',
      'Figma',
      'Git/GitHub',
    ],
    category: 'software',
    order: 1,
    featured: true,
  },
  {
    _type: 'workExperience',
    position: 'Worship Leader & Gospel Music Artist',
    company: 'Charles Jasema Music Ministry',
    employmentType: 'ministry',
    startDate: '2015',
    endDate: 'Present',
    isCurrent: true,
    location: 'Kampala, Uganda',
    description: 'Leading worship services, writing original gospel songs, and producing music that inspires faith and draws hearts closer to God. Released multiple singles with thousands of streams, performing at churches and events across Uganda.',
    responsibilities: [
      'Lead weekly worship services at local church',
      'Write and compose original gospel songs',
      'Produce and record music in professional studios',
      'Perform at churches, conferences, and events',
      'Mentor and train aspiring worship leaders',
      'Collaborate with other artists on gospel projects',
    ],
    achievements: [
      'Released 8 original gospel songs',
      'Accumulated 10,000+ streams across platforms',
      'Featured song "A Call" reached regional audiences',
      'Led worship for congregations of 500+ people',
      'Mentored 15+ worship team members',
      'Produced music videos with 20,000+ views',
    ],
    technologies: [
      'Vocals',
      'Piano/Keyboard',
      'Music Production',
      'Songwriting',
      'Audio Engineering',
      'Live Performance',
    ],
    category: 'music-ministry',
    order: 2,
    featured: true,
  },
]

// ============================================
// SKILLS
// ============================================

const skills = [
  // Software Engineering Skills
  {
    _type: 'skill',
    name: 'Full-Stack Web Development',
    category: 'software',
    subcategory: 'frontend',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 3,
    description: 'Building complete web applications from frontend to backend with modern technologies',
    relatedTools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js'],
    icon: 'FaCode',
    order: 0,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'React & Next.js',
    category: 'software',
    subcategory: 'frontend',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 3,
    description: 'Expert in building modern, performant React applications and Next.js projects',
    relatedTools: ['React Hooks', 'Context API', 'Server Components', 'App Router'],
    icon: 'FaReact',
    order: 1,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'TypeScript',
    category: 'software',
    subcategory: 'frontend',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 2,
    description: 'Writing type-safe JavaScript code for better maintainability',
    relatedTools: ['Type Definitions', 'Interfaces', 'Generics'],
    icon: 'SiTypescript',
    order: 2,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'Node.js & Backend Development',
    category: 'software',
    subcategory: 'backend',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 3,
    description: 'Building scalable server-side applications and RESTful APIs',
    relatedTools: ['Express.js', 'REST APIs', 'Authentication', 'Middleware'],
    icon: 'FaNodeJs',
    order: 3,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'PostgreSQL & Database Design',
    category: 'software',
    subcategory: 'database',
    proficiencyLevel: 'intermediate',
    yearsOfExperience: 3,
    description: 'Designing and managing relational databases for web applications',
    relatedTools: ['SQL', 'Database Modeling', 'Query Optimization'],
    icon: 'SiPostgresql',
    order: 4,
    featured: false,
  },
  {
    _type: 'skill',
    name: 'Docker & CI/CD',
    category: 'software',
    subcategory: 'devops',
    proficiencyLevel: 'intermediate',
    yearsOfExperience: 2,
    description: 'Containerizing applications and automating deployment pipelines',
    relatedTools: ['Docker', 'Docker Compose', 'GitHub Actions'],
    icon: 'FaDocker',
    order: 5,
    featured: false,
  },
  {
    _type: 'skill',
    name: 'Git & GitHub',
    category: 'software',
    subcategory: 'devops',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 4,
    description: 'Version control and collaborative development workflows',
    relatedTools: ['Git', 'GitHub', 'Pull Requests', 'Code Review'],
    icon: 'FaGithub',
    order: 6,
    featured: false,
  },
  
  // Graphics Design Skills
  {
    _type: 'skill',
    name: 'Brand Identity Design',
    category: 'design',
    subcategory: 'brand',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 5,
    description: 'Creating cohesive brand identities from logos to full visual systems',
    relatedTools: ['Adobe Illustrator', 'Figma', 'Brand Guidelines'],
    icon: 'FaPalette',
    order: 10,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'UI/UX Design',
    category: 'design',
    subcategory: 'ui-ux',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 4,
    description: 'Designing user-centered interfaces and experiences',
    relatedTools: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping'],
    icon: 'FaFigma',
    order: 11,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'Adobe Creative Suite',
    category: 'design',
    subcategory: 'other',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 6,
    description: 'Professional design work using industry-standard Adobe tools',
    relatedTools: ['Photoshop', 'Illustrator', 'InDesign', 'After Effects'],
    icon: 'SiAdobe',
    order: 12,
    featured: false,
  },
  {
    _type: 'skill',
    name: 'Print & Digital Design',
    category: 'design',
    subcategory: 'print',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 5,
    description: 'Creating designs for both print and digital mediums',
    relatedTools: ['Photoshop', 'Illustrator', 'InDesign'],
    icon: 'FaPrint',
    order: 13,
    featured: false,
  },
  
  // Music Skills
  {
    _type: 'skill',
    name: 'Worship Leading',
    category: 'music',
    subcategory: 'performance',
    proficiencyLevel: 'expert',
    yearsOfExperience: 9,
    description: 'Leading congregational worship with passion and excellence',
    relatedTools: ['Vocals', 'Piano', 'Guitar', 'Stage Presence'],
    icon: 'FaMusic',
    order: 20,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'Songwriting & Composition',
    category: 'music',
    subcategory: 'songwriting',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 9,
    description: 'Writing original gospel songs with meaningful lyrics',
    relatedTools: ['Lyrics', 'Melody', 'Chord Progressions'],
    icon: 'FaPen',
    order: 21,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'Music Production',
    category: 'music',
    subcategory: 'production',
    proficiencyLevel: 'intermediate',
    yearsOfExperience: 5,
    description: 'Producing and recording professional music tracks',
    relatedTools: ['DAW', 'Mixing', 'Mastering', 'Audio Engineering'],
    icon: 'FaRecordVinyl',
    order: 22,
    featured: false,
  },
  
  // Videography Skills
  {
    _type: 'skill',
    name: 'Video Editing',
    category: 'videography',
    subcategory: 'editing',
    proficiencyLevel: 'advanced',
    yearsOfExperience: 5,
    description: 'Professional video editing and post-production',
    relatedTools: ['Adobe Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve'],
    icon: 'FaVideo',
    order: 30,
    featured: true,
  },
  {
    _type: 'skill',
    name: 'Video Production',
    category: 'videography',
    subcategory: 'video-production',
    proficiencyLevel: 'intermediate',
    yearsOfExperience: 5,
    description: 'Planning and executing video shoots for various projects',
    relatedTools: ['Camera Operation', 'Lighting', 'Sound Recording'],
    icon: 'FaCamera',
    order: 31,
    featured: false,
  },
  {
    _type: 'skill',
    name: 'Motion Graphics',
    category: 'videography',
    subcategory: 'motion',
    proficiencyLevel: 'intermediate',
    yearsOfExperience: 3,
    description: 'Creating animated graphics for video content',
    relatedTools: ['After Effects', 'Motion Design', 'Animation'],
    icon: 'FaFilm',
    order: 32,
    featured: false,
  },
]

// ============================================
// SEED FUNCTION
// ============================================

async function seedPersonalData() {
  console.log('🌱 Starting to seed personal data to Sanity CMS...\n')

  try {
    // 1. Seed Personal Information
    console.log('📝 Seeding personal information...')
    const personalInfoResult = await client.create(personalInfo)
    console.log(`✅ Personal info created: ${personalInfoResult._id}\n`)

    // 2. Seed Education
    console.log('🎓 Seeding education entries...')
    for (const edu of education) {
      const result = await client.create(edu)
      console.log(`✅ Education created: ${result._id} - ${edu.institution}`)
    }
    console.log(`✅ Total education entries: ${education.length}\n`)

    // 3. Seed Work Experience
    console.log('💼 Seeding work experience entries...')
    for (const work of workExperience) {
      const result = await client.create(work)
      console.log(`✅ Work experience created: ${result._id} - ${work.position} at ${work.company}`)
    }
    console.log(`✅ Total work experience entries: ${workExperience.length}\n`)

    // 4. Seed Skills
    console.log('🛠️  Seeding skills...')
    for (const skill of skills) {
      const result = await client.create(skill)
      console.log(`✅ Skill created: ${result._id} - ${skill.name}`)
    }
    console.log(`✅ Total skills: ${skills.length}\n`)

    console.log('🎉 Personal data seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Personal Info: 1`)
    console.log(`   - Education: ${education.length}`)
    console.log(`   - Work Experience: ${workExperience.length}`)
    console.log(`   - Skills: ${skills.length}`)
    console.log(`   - Total: ${1 + education.length + workExperience.length + skills.length} documents`)
    
    console.log('\n🚀 Next steps:')
    console.log('   1. Go to Sanity Studio (http://localhost:3333)')
    console.log('   2. Verify all content is created correctly')
    console.log('   3. Upload professional photo to Personal Information')
    console.log('   4. Update email and phone number in Personal Information')
    console.log('   5. Run the dev server to see content on About page')

  } catch (error) {
    console.error('❌ Error seeding personal data:', error)
    process.exit(1)
  }
}

// Run the seeding
seedPersonalData()
