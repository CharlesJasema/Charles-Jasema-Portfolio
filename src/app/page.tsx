import Link from 'next/link';
import { Button, Card } from '@/components/ui';
import { FaCode, FaPalette, FaMusic, FaVideo, FaArrowRight, FaDownload } from 'react-icons/fa';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-background-dark dark:via-slate-900 dark:to-background-dark opacity-50" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          {/* Animated Introduction */}
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold">
              <span className="text-gray-900 dark:text-white">Hi, I'm </span>
              <span className="text-primary-gold">{siteConfig.name}</span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
              {siteConfig.title}
            </p>
            
            <p className="text-lg text-gray-600 dark:text-text-tertiary max-w-2xl mx-auto">
              Crafting digital experiences through code, design, and worship. 
              Building software that matters and creating music that inspires.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/portfolio">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  View My Work
                  <FaArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Get In Touch
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <FaDownload className="mr-2" />
                Download CV
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary-gold rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary-gold rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Introduction */}
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
            {/* Software Development */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCode className="text-primary-gold text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Software Engineering
              </h3>
              <p className="text-gray-700 dark:text-text-secondary text-sm">
                Building scalable web applications with modern technologies and best practices
              </p>
            </Card>

            {/* Design */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-tech-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPalette className="text-tech-teal text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Graphics Design
              </h3>
              <p className="text-gray-700 dark:text-text-secondary text-sm">
                Creating stunning visual identities and user interfaces that captivate
              </p>
            </Card>

            {/* Music Ministry */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMusic className="text-accent-red text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Gospel Music
              </h3>
              <p className="text-gray-700 dark:text-text-secondary text-sm">
                Worship leader and gospel artist spreading hope through music
              </p>
            </Card>

            {/* Videography */}
            <Card variant="glass" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaVideo className="text-primary-gold text-3xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Videography
              </h3>
              <p className="text-gray-700 dark:text-text-secondary text-sm">
                Capturing moments and telling stories through compelling video content
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Featured Work
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
              A showcase of my recent projects across different domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Software Project */}
            <Card variant="elevated" padding="none" className="overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-primary-gold/20 to-tech-teal/20 flex items-center justify-center">
                <FaCode className="text-6xl text-primary-gold group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <span className="text-xs text-primary-gold font-semibold uppercase tracking-wide">
                  Software Development
                </span>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mt-2 mb-3">
                  E-Commerce Platform
                </h3>
                <p className="text-gray-700 dark:text-text-secondary text-sm mb-4">
                  Full-stack web application with payment integration and real-time inventory management
                </p>
                <Link href="/portfolio" className="text-primary-gold hover:text-primary-gold/80 text-sm font-semibold inline-flex items-center">
                  View Project
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </Card>

            {/* Design Project */}
            <Card variant="elevated" padding="none" className="overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-tech-teal/20 to-primary-gold/20 flex items-center justify-center">
                <FaPalette className="text-6xl text-tech-teal group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <span className="text-xs text-tech-teal font-semibold uppercase tracking-wide">
                  Graphics Design
                </span>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mt-2 mb-3">
                  Brand Identity Design
                </h3>
                <p className="text-gray-700 dark:text-text-secondary text-sm mb-4">
                  Complete brand identity including logo, color palette, and marketing materials
                </p>
                <Link href="/portfolio" className="text-tech-teal hover:text-tech-teal/80 text-sm font-semibold inline-flex items-center">
                  View Project
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </Card>

            {/* Music Project */}
            <Card variant="elevated" padding="none" className="overflow-hidden group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-accent-red/20 to-primary-gold/20 flex items-center justify-center">
                <FaMusic className="text-6xl text-accent-red group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <span className="text-xs text-accent-red font-semibold uppercase tracking-wide">
                  Gospel Music
                </span>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mt-2 mb-3">
                  Latest Worship Album
                </h3>
                <p className="text-gray-700 dark:text-text-secondary text-sm mb-4">
                  Collection of original worship songs inspiring faith and hope
                </p>
                <Link href="/music" className="text-accent-red hover:text-accent-red/80 text-sm font-semibold inline-flex items-center">
                  Listen Now
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button variant="primary" size="lg">
                View All Projects
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-gold/10 via-accent-red/10 to-tech-teal/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-8">
            Have a project in mind? Whether it's software development, design, or music production,
            I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>
            </Link>
            <Link href="/music">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Explore Music Ministry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
