import Link from 'next/link';
import { Button, Card } from '@/components/ui';
import { FaCode, FaPalette, FaMusic, FaVideo, FaArrowRight } from 'react-icons/fa';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 dark:from-background-dark dark:via-slate-900 dark:to-background-dark opacity-50" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="space-y-6">
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
              <Button variant="primary" size="lg">
                Get In Touch
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="secondary" size="lg">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
