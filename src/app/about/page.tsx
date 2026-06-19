import Image from 'next/image';
import Link from 'next/link';
import { Button, AnimatedContainer } from '@/components/ui';
import { AboutPageCTAs } from '@/components/cta';
import { FaCode, FaPalette, FaMusic, FaVideo, FaGraduationCap, FaBriefcase, FaDownload, FaHeart, FaBook } from 'react-icons/fa';
import { siteConfig } from '@/config/site';
import { generateMetadata as generateSEOMetadata, generateKeywords, generatePersonSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { getPersonalInfo, getEducation, getWorkExperience, getSkills } from '@/lib/sanity.queries';

// Force dynamic rendering to prevent build-time API calls
export const dynamic = 'force-dynamic';

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
  ]),
  url: '/about',
  type: 'profile',
  image: '/images/professional image.JPG',
});

export default async function AboutPage() {
  // Fetch data from Sanity
  const personalInfo = await getPersonalInfo();
  const education = await getEducation();
  const workExperience = await getWorkExperience();
  const skills = await getSkills();

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const personSchema = generatePersonSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading personal information...</p>
      </div>
    );
  }

  const categoryIcons: Record<string, any> = {
    software: FaCode,
    design: FaPalette,
    music: FaMusic,
    videography: FaVideo,
  };

  const categoryColors: Record<string, string> = {
    software: 'primary-gold',
    design: 'tech-teal',
    music: 'accent-red',
    videography: 'primary-gold',
  };

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
                    {personalInfo.professionalPhoto?.url ? (
                      <Image
                        src={personalInfo.professionalPhoto.url}
                        alt={personalInfo.professionalPhoto.alt || `${personalInfo.name} - Professional Photo`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <FaCode className="text-slate-400 text-6xl" />
                      </div>
                    )}
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
                  <span className="text-primary-gold">{personalInfo.name}</span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-text-secondary mb-6">
                  {personalInfo.title}
                </p>
                
                {/* Bio Paragraphs */}
                <div className="space-y-4 mb-8">
                  {personalInfo.bio.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 dark:text-text-tertiary leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button variant="primary" size="lg">
                      Get In Touch
                    </Button>
                  </Link>
                  {personalInfo.cvDownloadUrl && (
                    <a 
                      href={personalInfo.cvDownloadUrl} 
                      download="Charles-Jasema-CV.pdf"
                      className="inline-block"
                    >
                      <Button variant="secondary" size="lg">
                        <FaDownload className="mr-2" />
                        Download CV
                      </Button>
                    </a>
                  )}
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
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
                const Icon = categoryIcons[category] || FaCode;
                const color = categoryColors[category] || 'primary-gold';
                const categoryTitles: Record<string, string> = {
                  software: 'Software Engineering',
                  design: 'Graphics Design',
                  music: 'Gospel Music',
                  videography: 'Videography',
                };

                return (
                  <div 
                    key={category}
                    className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-primary-gold/10 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className={`w-16 h-16 bg-${color}/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-${color}/20 transition-colors duration-300`}>
                      <Icon className={`text-${color} text-3xl group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                      {categoryTitles[category] || category}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary">
                      {categorySkills.slice(0, 8).map((skill) => (
                        <li key={skill._id}>• {skill.name}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-background-dark">
          <div className="max-w-7xl mx-auto">
            <AnimatedContainer>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  Education & Training
                </h2>
                <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
                  Continuous learning and professional development through formal education and specialized training
                </p>
              </div>
            </AnimatedContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu) => (
                <div 
                  key={edu._id}
                  className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mb-4">
                    <FaGraduationCap className="text-primary-gold text-3xl" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 dark:text-text-tertiary text-sm mb-3">
                    {edu.institution} • {edu.startDate}{edu.endDate && ` - ${edu.endDate}`}
                  </p>
                  {edu.description && (
                    <p className="text-gray-700 dark:text-text-secondary text-sm mb-4">
                      {edu.description}
                    </p>
                  )}
                  {edu.skills && edu.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.slice(0, 6).map((skill, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-primary-gold/10 text-primary-gold rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <AnimatedContainer>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  Professional Journey
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
                {workExperience.map((work, index) => {
                  const colors = ['primary-gold', 'tech-teal', 'accent-red'];
                  const color = colors[index % colors.length];
                  const categoryIcons: Record<string, any> = {
                    software: FaCode,
                    'it-support': FaBriefcase,
                    'music-ministry': FaMusic,
                    design: FaPalette,
                  };
                  const Icon = categoryIcons[work.category] || FaBriefcase;

                  return (
                    <div key={work._id} className="relative pl-0 md:pl-20 group">
                      <div className={`absolute left-6 top-2 w-5 h-5 bg-${color} rounded-full border-4 border-white dark:border-slate-900 hidden md:block group-hover:scale-125 transition-transform duration-300`}></div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 bg-${color}/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-${color}/20 transition-colors duration-300`}>
                            <Icon className={`text-${color} text-xl`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <span className={`text-sm font-semibold text-${color}`}>
                                {work.startDate} - {work.isCurrent ? 'Present' : work.endDate}
                              </span>
                              <span className={`text-xs px-3 py-1 bg-${color}/10 text-${color} rounded-full`}>
                                {work.employmentType}
                              </span>
                            </div>
                            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                              {work.position}
                            </h3>
                            <p className="text-gray-600 dark:text-text-tertiary mb-3">
                              {work.company} | {work.location || 'Remote'}
                            </p>
                            <p className="text-gray-700 dark:text-text-secondary text-sm mb-4">
                              {work.description}
                            </p>
                            {work.achievements && work.achievements.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                                <ul className="space-y-1">
                                  {work.achievements.slice(0, 3).map((achievement, i) => (
                                    <li key={i} className="text-sm text-gray-600 dark:text-text-tertiary">
                                      • {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Personal Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-background-dark">
          <div className="max-w-7xl mx-auto">
            <AnimatedContainer>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                  Beyond the Code
                </h2>
                <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
                  The values and passions that drive my work and define my journey
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
                          My faith in Christ is the foundation of everything I do, guiding my decisions and inspiring excellence in all my work.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-red rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Excellence & Quality</h4>
                        <p className="text-sm text-gray-600 dark:text-text-tertiary">
                          I believe in delivering work that exceeds expectations, paying attention to every detail and continuously improving my craft.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-red rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Servant Leadership</h4>
                        <p className="text-sm text-gray-600 dark:text-text-tertiary">
                          Using my skills to serve others, mentor aspiring developers, and make a positive impact in my community.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>

              {/* Interests & Passions */}
              <AnimatedContainer delay={0.3}>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mb-6">
                    <FaBook className="text-primary-gold text-3xl" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    Interests & Passions
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Continuous Learning</h4>
                        <p className="text-sm text-gray-600 dark:text-text-tertiary">
                          Always exploring new technologies, design trends, and creative techniques to stay at the forefront of my fields.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Mentorship</h4>
                        <p className="text-sm text-gray-600 dark:text-text-tertiary">
                          Passionate about helping aspiring developers and designers grow, sharing knowledge and experiences to empower others.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Gospel Music Ministry</h4>
                        <p className="text-sm text-gray-600 dark:text-text-tertiary">
                          Creating and performing music that inspires worship, draws hearts to God, and spreads hope and encouragement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedContainer>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AboutPageCTAs />
      </div>
    </>
  );
}
