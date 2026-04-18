import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { FaCode, FaPalette, FaMusic, FaVideo, FaGraduationCap, FaBriefcase, FaAward, FaDownload } from 'react-icons/fa';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: `About ${siteConfig.name} - Software Engineer, Designer & Gospel Artist`,
  description: 'Learn about my journey as a software engineer, graphics designer, and gospel music artist. Discover my skills, experience, and passion for creating impactful digital experiences.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100 to-white dark:from-background-dark dark:to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative rounded-lg overflow-hidden shadow-2xl shadow-primary-gold/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-tech-teal/20 flex items-center justify-center">
                  <div className="text-center">
                    <FaCode className="text-8xl text-primary-gold mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Professional Image</p>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-gold/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-tech-teal/10 rounded-full blur-2xl"></div>
            </div>

            {/* Introduction */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
                <span className="text-gray-900 dark:text-white">About </span>
                <span className="text-primary-gold">{siteConfig.name}</span>
              </h1>
              <p className="text-xl text-gray-700 dark:text-text-secondary mb-6">
                {siteConfig.title}
              </p>
              <p className="text-gray-600 dark:text-text-tertiary mb-8 leading-relaxed">
                I'm a passionate software engineer, creative designer, and gospel music artist based in {siteConfig.contact.location}. 
                With a unique blend of technical expertise and creative vision, I craft digital experiences that inspire and make a difference. 
                My journey spans across software development, graphics design, videography, and worship ministry, allowing me to bring a 
                holistic approach to every project I undertake.
              </p>
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
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Skills & Expertise
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
              A diverse skill set spanning technology, design, and creative arts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Software Engineering */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-primary-gold/10 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mb-4">
                <FaCode className="text-primary-gold text-3xl" />
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
              </ul>
            </div>

            {/* Graphics Design */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-tech-teal/10 transition-all duration-300">
              <div className="w-16 h-16 bg-tech-teal/10 rounded-full flex items-center justify-center mb-4">
                <FaPalette className="text-tech-teal text-3xl" />
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
              </ul>
            </div>

            {/* Music Ministry */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-accent-red/10 transition-all duration-300">
              <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mb-4">
                <FaMusic className="text-accent-red text-3xl" />
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
              </ul>
            </div>

            {/* Videography */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 hover:shadow-lg hover:shadow-primary-gold/10 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mb-4">
                <FaVideo className="text-primary-gold text-3xl" />
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
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-background-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              My Journey
            </h2>
            <p className="text-gray-700 dark:text-text-secondary text-lg max-w-2xl mx-auto">
              Key milestones in my professional and creative journey
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-gold/30 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="relative pl-0 md:pl-20">
                <div className="absolute left-6 top-2 w-5 h-5 bg-primary-gold rounded-full border-4 border-white dark:border-slate-900 hidden md:block"></div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
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
                        Graduated with honors and completed multiple real-world projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-0 md:pl-20">
                <div className="absolute left-6 top-2 w-5 h-5 bg-tech-teal rounded-full border-4 border-white dark:border-slate-900 hidden md:block"></div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-tech-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
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
                        for clients across various industries. Specializing in full-stack development and UI/UX design.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-0 md:pl-20">
                <div className="absolute left-6 top-2 w-5 h-5 bg-accent-red rounded-full border-4 border-white dark:border-slate-900 hidden md:block"></div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center flex-shrink-0">
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
                        Released multiple singles and performed at various churches and events.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="relative pl-0 md:pl-20">
                <div className="absolute left-6 top-2 w-5 h-5 bg-primary-gold rounded-full border-4 border-white dark:border-slate-900 hidden md:block"></div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
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
                        software engineering, design, and music ministry. Built with Next.js, TypeScript, and modern web technologies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-gold/10 via-accent-red/10 to-tech-teal/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-8">
            Whether you need a software solution, a stunning design, or music for your event, 
            I'm here to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portfolio">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                View My Work
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Start a Conversation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
