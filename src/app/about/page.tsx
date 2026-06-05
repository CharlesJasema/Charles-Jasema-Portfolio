import Image from 'next/image';
import Link from 'next/link';
import { Button, AnimatedContainer } from '@/components/ui';
import { AboutPageCTAs } from '@/components/cta';
import { FaCode, FaPalette, FaMusic, FaVideo, FaGraduationCap, FaBriefcase, FaAward, FaDownload, FaHeart, FaGamepad, FaCamera, FaBook } from 'react-icons/fa';
import { siteConfig } from '@/config/site';
import { imagesConfig } from '@/config/images';
import { generateMetadata as generateSEOMetadata, generateKeywords, generatePersonSchema, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: `About ${siteConfig.name} - Software Engineer, Designer & Gospel Artist`,
  description: 'Discover the comprehensive journey of Charles Jasema - a passionate software engineer, creative designer, and gospel music artist. Explore my technical expertise in full-stack development, creative skills in design and videography, music ministry achievements, educational background, and the faith-driven mission behind all my work.',
  keywords: generateKeywords([
    'About Charles Jasema',
    'Software Engineer Biography',
    'Gospel Artist Story',
    'Full Stack Developer',
    'Worship Leader',
    'Graphics Designer',
    'Videographer',
    'Faith-driven Developer',
    'Christian Software Engineer',
    'Uganda Developer',
    'South Sudan Gospel Artist',
    'Computer Science Graduate',
    'AWS Certified Developer',
    'React Specialist',
    'Next.js Expert',
    'TypeScript Developer',
    'UI/UX Designer',
    'Music Producer',
    'Worship Ministry',
    'Tech Entrepreneur',
    'Freelance Developer',
    'Professional Biography',
    'Career Journey',
    'Skills and Expertise',
    'Education and Certifications',
    'Personal Values',
    'Christian Values in Tech',
    'Ministry Through Technology',
    'Gospel Music Ministry',
    'Jasema Worship Team',
  ]),
  url: '/about',
  type: 'profile',
  image: '/images/professional image.JPG',
});

export default function AboutPage() {
  const personSchema = generatePersonSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100 to-white dark:from-background-dark dark:to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <AnimatedContainer delay={0.2}>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto relative rounded-lg overflow-hidden shadow-2xl shadow-primary-gold/20 hover:shadow-primary-gold/30 transition-shadow duration-500">
                  <Image
                    src={imagesConfig.profile.professional}
                    alt={`${siteConfig.name} - Professional Photo`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-gold/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-tech-teal/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </AnimatedContainer>

            {/* Introduction */}
            <AnimatedContainer>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
                <span className="text-gray-900 dark:text-white">About </span>
                <span className="text-primary-gold">{siteConfig.name}</span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-text-secondary mb-6">
                {siteConfig.title}
              </p>
              
              {/* Enhanced Bio - Multiple Paragraphs */}
              <div className="space-y-4 mb-8">
                <p className="text-gray-600 dark:text-text-tertiary leading-relaxed">
                  I'm a passionate software engineer, creative designer, and gospel music artist based in {siteConfig.contact.location}. 
                  With a unique blend of technical expertise and creative vision, I craft digital experiences that inspire and make a difference. 
                  My journey spans across software development, graphics design, videography, and worship ministry, allowing me to bring a 
                  holistic approach to every project I undertake.
                </p>
                
                <p className="text-gray-600 dark:text-text-tertiary leading-relaxed">
                  My technical journey began with a deep curiosity about how things work and a desire to build solutions that matter. 
                  I specialize in full-stack web development using modern technologies like React, Next.js, and TypeScript, while also 
                  having extensive experience in backend development, database design, and cloud architecture. Every line of code I write 
                  is driven by a commitment to excellence and a heart to serve others.
                </p>
                
                <p className="text-gray-600 dark:text-text-tertiary leading-relaxed">
                  Beyond technology, my creative side finds expression through graphics design and music ministry. I believe that great 
                  design tells a story, and great music touches the soul. Whether I'm designing a brand identity, developing a web application, 
                  or leading worship, my goal is always the same: to create something beautiful, meaningful, and impactful that brings glory to God.
                </p>
                
                <p className="text-gray-600 dark:text-text-tertiary leading-relaxed">
                  When I'm not coding or creating, you'll find me exploring new technologies, mentoring aspiring developers, or working on 
                  my next gospel music project. I'm always excited to collaborate with like-minded individuals and organizations who share 
                  a passion for excellence and making a positive impact in the world.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button variant="primary" size="lg">
                    Get In Touch
                  </Button>
                </Link>
                <Button variant="secondary" size="lg">
                  <FaDownload className="mr-2" />
                  Download CV
                </Button>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Skills & Expertise
              </h2>
              <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
                A diverse skill set spanning technology, design, and creative arts, honed through years of passionate learning and real-world application
              </p>
            </div>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Software Engineering */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-primary-gold/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-gold/20 transition-colors duration-300">
                <FaCode className="text-primary-gold text-3xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                Software Engineering
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary">
                <li>• Full-Stack Web Development</li>
                <li>• React, Next.js, TypeScript</li>
                <li>• Node.js, Python, Java</li>
                <li>• Database Design & Management</li>
                <li>• API Development & Integration</li>
                <li>• Cloud Services (AWS, Azure)</li>
                <li>• DevOps & CI/CD Pipelines</li>
                <li>• Microservices Architecture</li>
              </ul>
            </div>

            {/* Graphics Design */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-tech-teal/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-tech-teal/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-tech-teal/20 transition-colors duration-300">
                <FaPalette className="text-tech-teal text-3xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                Graphics Design
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary">
                <li>• Brand Identity Design</li>
                <li>• UI/UX Design</li>
                <li>• Adobe Creative Suite</li>
                <li>• Figma, Sketch</li>
                <li>• Logo & Marketing Materials</li>
                <li>• Print & Digital Design</li>
                <li>• Web Design & Prototyping</li>
                <li>• Design Systems</li>
              </ul>
            </div>

            {/* Music Ministry */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-accent-red/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-red/20 transition-colors duration-300">
                <FaMusic className="text-accent-red text-3xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                Gospel Music
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary">
                <li>• Worship Leading</li>
                <li>• Songwriting & Composition</li>
                <li>• Music Production</li>
                <li>• Vocal Performance</li>
                <li>• Audio Engineering</li>
                <li>• Live Performance</li>
                <li>• Music Arrangement</li>
                <li>• Studio Recording</li>
              </ul>
            </div>

            {/* Videography */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-primary-gold/10 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-gold/20 transition-colors duration-300">
                <FaVideo className="text-primary-gold text-3xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                Videography
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary">
                <li>• Video Production</li>
                <li>• Video Editing</li>
                <li>• Adobe Premiere Pro</li>
                <li>• Final Cut Pro</li>
                <li>• Motion Graphics</li>
                <li>• Color Grading</li>
                <li>• Live Streaming</li>
                <li>• Documentary Production</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Education & Certifications
              </h2>
              <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
                Continuous learning and professional development through formal education and industry certifications
              </p>
            </div>
          </AnimatedContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Formal Education */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mb-4">
                <FaGraduationCap className="text-primary-gold text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Bachelor's in Computer Science
              </h3>
              <p className="text-gray-600 dark:text-text-tertiary text-sm mb-3">
                University Name • 2020-2024
              </p>
              <p className="text-gray-700 dark:text-text-secondary text-sm mb-4">
                Specialized in software engineering, web development, and database systems. 
                Graduated with honors and completed multiple real-world projects.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-primary-gold/10 text-primary-gold rounded-full">Honors Graduate</span>
                <span className="text-xs px-2 py-1 bg-tech-teal/10 text-tech-teal rounded-full">Software Engineering</span>
              </div>
            </div>

            {/* Professional Certifications */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-tech-teal/10 rounded-full flex items-center justify-center mb-4">
                <FaAward className="text-tech-teal text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Professional Certifications
              </h3>
              <p className="text-gray-600 dark:text-text-tertiary text-sm mb-3">
                Industry-recognized certifications
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-text-secondary mb-4">
                <li>• AWS Certified Developer</li>
                <li>• Google Cloud Professional</li>
                <li>• Microsoft Azure Fundamentals</li>
                <li>• React Developer Certification</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-accent-red/10 text-accent-red rounded-full">Cloud Expert</span>
                <span className="text-xs px-2 py-1 bg-primary-gold/10 text-primary-gold rounded-full">React Specialist</span>
              </div>
            </div>

            {/* Continuous Learning */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mb-4">
                <FaBook className="text-accent-red text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Continuous Learning
              </h3>
              <p className="text-gray-600 dark:text-text-tertiary text-sm mb-3">
                Always staying current with technology
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-text-secondary mb-4">
                <li>• Advanced TypeScript Patterns</li>
                <li>• System Design & Architecture</li>
                <li>• AI/ML Integration</li>
                <li>• Modern DevOps Practices</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-tech-teal/10 text-tech-teal rounded-full">Self-Learner</span>
                <span className="text-xs px-2 py-1 bg-primary-gold/10 text-primary-gold rounded-full">Tech Enthusiast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <AnimatedContainer>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                My Journey
              </h2>
              <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
                Key milestones in my professional and creative journey, shaped by faith, passion, and a commitment to excellence
              </p>
            </div>
          </AnimatedContainer>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-gold via-tech-teal to-accent-red hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="relative pl-0 md:pl-20 group">
                <div className="absolute left-6 top-2 w-5 h-5 bg-primary-gold rounded-full border-4 border-white dark:border-slate-900 hidden md:block group-hover:scale-125 transition-transform duration-300"></div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary-gold/20 transition-colors duration-300">
                      <FaGraduationCap className="text-primary-gold text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-primary-gold">2020 - 2024</span>
                        <span className="text-xs px-3 py-1 bg-primary-gold/10 text-primary-gold rounded-full">Education</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        Bachelor's Degree in Computer Science
                      </h3>
                      <p className="text-gray-600 dark:text-text-tertiary mb-3">
                        University Name | {siteConfig.contact.location}
                      </p>
                      <p className="text-gray-700 dark:text-text-secondary text-sm">
                        Specialized in software engineering, web development, and database systems. 
                        Graduated with honors and completed multiple real-world projects including a full-stack 
                        e-commerce platform and a mobile app for local businesses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-0 md:pl-20 group">
                <div className="absolute left-6 top-2 w-5 h-5 bg-tech-teal rounded-full border-4 border-white dark:border-slate-900 hidden md:block group-hover:scale-125 transition-transform duration-300"></div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-tech-teal/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-tech-teal/20 transition-colors duration-300">
                      <FaBriefcase className="text-tech-teal text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-tech-teal">2022 - Present</span>
                        <span className="text-xs px-3 py-1 bg-tech-teal/10 text-tech-teal rounded-full">Professional</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        Freelance Software Engineer & Designer
                      </h3>
                      <p className="text-gray-600 dark:text-text-tertiary mb-3">
                        Self-Employed | Remote
                      </p>
                      <p className="text-gray-700 dark:text-text-secondary text-sm">
                        Building custom web applications, designing brand identities, and creating digital experiences 
                        for clients across various industries. Successfully delivered 20+ projects including e-commerce 
                        platforms, business websites, and mobile applications. Specializing in full-stack development 
                        and UI/UX design with a focus on performance and user experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-0 md:pl-20 group">
                <div className="absolute left-6 top-2 w-5 h-5 bg-accent-red rounded-full border-4 border-white dark:border-slate-900 hidden md:block group-hover:scale-125 transition-transform duration-300"></div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent-red/20 transition-colors duration-300">
                      <FaMusic className="text-accent-red text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-accent-red">2018 - Present</span>
                        <span className="text-xs px-3 py-1 bg-accent-red/10 text-accent-red rounded-full">Ministry</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        Gospel Music Artist & Worship Leader
                      </h3>
                      <p className="text-gray-600 dark:text-text-tertiary mb-3">
                        Charles Jasema Music | {siteConfig.contact.location}
                      </p>
                      <p className="text-gray-700 dark:text-text-secondary text-sm">
                        Leading worship, writing original gospel songs, and producing music that inspires faith. 
                        Released multiple singles including "Grace Abounds" and "Faithful God" with over 10,000 streams. 
                        Performed at various churches and events, touching lives through music ministry and leading 
                        congregations in worship experiences that draw hearts closer to God.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="relative pl-0 md:pl-20 group">
                <div className="absolute left-6 top-2 w-5 h-5 bg-primary-gold rounded-full border-4 border-white dark:border-slate-900 hidden md:block group-hover:scale-125 transition-transform duration-300"></div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary-gold/20 transition-colors duration-300">
                      <FaAward className="text-primary-gold text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-primary-gold">2023</span>
                        <span className="text-xs px-3 py-1 bg-primary-gold/10 text-primary-gold rounded-full">Achievement</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        Launched Premium Portfolio Platform
                      </h3>
                      <p className="text-gray-600 dark:text-text-tertiary mb-3">
                        Personal Project
                      </p>
                      <p className="text-gray-700 dark:text-text-secondary text-sm">
                        Designed and developed this comprehensive portfolio platform to showcase my work across 
                        software engineering, design, and music ministry. Built with Next.js, TypeScript, Sanity CMS, 
                        and modern web technologies. Features include dynamic content management, responsive design, 
                        performance optimization, and seamless user experience across all devices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Interests & Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-background-dark">
        <div className="max-w-7xl mx-auto">
          <AnimatedContainer>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Beyond the Code
              </h2>
              <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
                The values, interests, and passions that shape who I am and how I approach my work
              </p>
            </div>
          </AnimatedContainer>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Core Values */}
            <AnimatedContainer delay={0.2}>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mb-6">
                  <FaHeart className="text-accent-red text-3xl" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  Core Values
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent-red rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Faith-Centered</h4>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary">
                        My faith in God is the foundation of everything I do, guiding my decisions and inspiring excellence in all my work.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Excellence & Quality</h4>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary">
                        I believe in delivering nothing but the best, whether it's code, design, or music - quality is never negotiable.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-tech-teal rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Continuous Learning</h4>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary">
                        Technology evolves rapidly, and I'm committed to staying current with the latest trends and best practices.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent-red rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Servant Leadership</h4>
                      <p className="text-sm text-gray-600 dark:text-text-tertiary">
                        I believe in using my skills to serve others and make a positive impact in my community and beyond.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContainer>

            {/* Personal Interests */}
            <AnimatedContainer delay={0.4}>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mb-6">
                  <FaGamepad className="text-primary-gold text-3xl" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  Personal Interests
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300">
                    <FaCamera className="text-tech-teal text-2xl mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Photography</h4>
                    <p className="text-xs text-gray-600 dark:text-text-tertiary">Capturing moments</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300">
                    <FaBook className="text-accent-red text-2xl mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Reading</h4>
                    <p className="text-xs text-gray-600 dark:text-text-tertiary">Tech & theology</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300">
                    <FaMusic className="text-primary-gold text-2xl mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Music Production</h4>
                    <p className="text-xs text-gray-600 dark:text-text-tertiary">Creating beats</p>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-300">
                    <FaGamepad className="text-tech-teal text-2xl mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Gaming</h4>
                    <p className="text-xs text-gray-600 dark:text-text-tertiary">Strategy games</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-primary-gold/10 to-accent-red/10 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Fun Fact</h4>
                  <p className="text-sm text-gray-700 dark:text-text-secondary">
                    I can solve a Rubik's cube in under 2 minutes and I've written over 50 original songs! 
                    I also enjoy mentoring young developers and leading tech workshops at my local church.
                  </p>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AboutPageCTAs />
        </div>
      </section>
    </div>
    </>
  );
}
