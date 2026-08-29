import Link from 'next/link';
import Image from 'next/image';
import { EnhancedButton, Card } from '@/components/ui';
import { EnhancedPortfolioShowcase } from '@/components/portfolio';
import { EnhancedMusicShowcase } from '@/components/music';
import { HeroImage } from '@/components/HeroImage';
import { FaCode, FaPalette, FaMusic, FaVideo, FaArrowRight, FaImage } from 'react-icons/fa';

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default function HomePage() {
  // Temporarily use mock data for build
  const personalInfo = null;
  const featuredContent = { songs: [], projects: [], blogPosts: [] };
  const featuredSkills = [];

  // Default values when personalInfo is null
  const defaultPersonalInfo = {
    name: 'Charles Jasema',
    title: 'Software Engineer, Designer & Gospel Artist',
    shortBio: 'Passionate software engineer and gospel music artist spreading hope through technology and worship.',
    bio: ['Passionate software engineer and gospel music artist spreading hope through technology and worship.']
  };

  // Use personalInfo if available, otherwise use defaults
  const displayInfo = personalInfo || defaultPersonalInfo;

  // Destructure featured content with defaults
  const { songs = [], projects = [], blogPosts = [] } = featuredContent || {};

  // Group skills by category
  const skillsByCategory = featuredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-background-dark dark:via-slate-900 dark:to-background-dark opacity-50" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold">
                <span className="text-gray-900 dark:text-white">Hi, I'm </span>
                <span className="text-primary-gold">{displayInfo.name}</span>
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-text-secondary mt-4 mb-6">
                {displayInfo.title}
              </p>
              
              <p className="text-lg text-gray-600 dark:text-text-tertiary mb-8 max-w-xl">
                {displayInfo.shortBio || displayInfo.bio[0]}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/portfolio">
                  <EnhancedButton variant="primary" size="lg" className="w-full sm:w-auto" icon={<FaArrowRight />} iconPosition="right">
                    View My Work
                  </EnhancedButton>
                </Link>
                <Link href="/contact">
                  <EnhancedButton variant="ghost" size="lg" className="w-full sm:w-auto">
                    Get In Touch
                  </EnhancedButton>
                </Link>
              </div>

              {/* Professional Services Icons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                  <FaCode className="text-primary-gold" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Software Engineering</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                  <FaPalette className="text-tech-teal" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Graphics Design</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                  <FaMusic className="text-accent-red" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gospel Music</span>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                <HeroImage
                  src="/images/charles-jasema-professional-portrait.jpg"
                  alt="Charles Jada Sebit Emmanuel - Professional Portrait"
                  fallbackSrc="/images/charles-jasema-business-portrait.jpg"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                {/* Floating Achievement Badge */}
                <div className="absolute -top-4 -right-4 bg-primary-gold text-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold">TC #333373</span>
                </div>
                {/* Experience Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-gold">4+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
              Bridging technology and creativity to deliver exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Software Engineering */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-primary-gold text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Software Engineering
              </h3>
              {skillsByCategory.software && skillsByCategory.software.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary text-left">
                  {skillsByCategory.software.slice(0, 5).map((skill) => (
                    <li key={skill._id}>• {skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-text-secondary text-sm">
                  Building scalable web applications with modern technologies and best practices
                </p>
              )}
            </Card>

            {/* Graphics Design */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-tech-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPalette className="text-tech-teal text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Graphics Design
              </h3>
              {skillsByCategory.design && skillsByCategory.design.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary text-left">
                  {skillsByCategory.design.slice(0, 5).map((skill) => (
                    <li key={skill._id}>• {skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-text-secondary text-sm">
                  Creating stunning visual identities and user interfaces that captivate
                </p>
              )}
            </Card>

            {/* Gospel Music */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMusic className="text-accent-red text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Gospel Music
              </h3>
              {skillsByCategory.music && skillsByCategory.music.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary text-left">
                  {skillsByCategory.music.slice(0, 5).map((skill) => (
                    <li key={skill._id}>• {skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-text-secondary text-sm">
                  Worship leader and gospel artist spreading hope through music
                </p>
              )}
            </Card>

            {/* Videography */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaVideo className="text-primary-gold text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Videography
              </h3>
              {skillsByCategory.videography && skillsByCategory.videography.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-600 dark:text-text-tertiary text-left">
                  {skillsByCategory.videography.slice(0, 5).map((skill) => (
                    <li key={skill._id}>• {skill.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 dark:text-text-secondary text-sm">
                  Capturing moments and telling stories through compelling video content
                </p>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            Whether you need a performer for your event or a developer for your project, Charles is here to help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <EnhancedButton variant="primary" size="lg">
                Get In Touch
              </EnhancedButton>
            </Link>
            <Link href="/portfolio">
              <EnhancedButton variant="secondary" size="lg">
                View Portfolio
              </EnhancedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}