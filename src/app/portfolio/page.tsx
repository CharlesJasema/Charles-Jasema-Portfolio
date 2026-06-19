import { AnimatedContainer } from '@/components/ui';
import { SocialFollow } from '@/components/social';
import { PortfolioPageCTAs } from '@/components/cta';
import { getProjects } from '@/lib/sanity.queries';
// INTENTIONAL: Emergency fallback data when Sanity CMS is unavailable
// This ensures portfolio page always displays content for visitors
import { portfolioProjects } from '@/config/portfolio';
import PortfolioClient from './PortfolioClient';
import { generateMetadata as generateSEOMetadata, generateKeywords } from '@/lib/seo';
import { siteConfig } from '@/config/site';

// Enable ISR with 60-second revalidation
export const revalidate = 60;

export const metadata = generateSEOMetadata({
  title: `${siteConfig.name} Portfolio - Software Development, Design & Creative Projects`,
  description: 'Explore the comprehensive portfolio of Charles Jasema showcasing professional software development projects, creative design work, videography, and music production. View web applications, mobile apps, brand identities, UI/UX designs, and multimedia projects built with modern technologies like React, Next.js, TypeScript, and more.',
  keywords: generateKeywords([
    'Charles Jasema Portfolio',
    'Software Development Portfolio',
    'Web Development Projects',
    'Full Stack Developer Portfolio',
    'React Projects',
    'Next.js Applications',
    'TypeScript Projects',
    'JavaScript Portfolio',
    'Frontend Development',
    'Backend Development',
    'Mobile App Development',
    'UI/UX Design Portfolio',
    'Graphics Design Projects',
    'Brand Identity Design',
    'Logo Design',
    'Web Design',
    'Responsive Design',
    'User Experience Design',
    'User Interface Design',
    'Design Systems',
    'Videography Portfolio',
    'Video Production',
    'Video Editing',
    'Motion Graphics',
    'Music Production Portfolio',
    'Audio Engineering',
    'Creative Projects',
    'Professional Portfolio',
    'Freelance Developer',
    'Client Projects',
    'Case Studies',
    'Project Showcase',
    'Technical Skills',
    'Creative Skills',
    'Professional Work',
    'Software Engineer Portfolio',
    'Designer Portfolio',
    'Multimedia Portfolio',
    'Digital Solutions',
    'Custom Development',
    'E-commerce Development',
    'CMS Development',
    'API Development',
    'Database Design',
    'Cloud Solutions',
    'Performance Optimization',
    'SEO Optimization',
    'Accessibility Compliance',
    'Cross-browser Compatibility',
    'Mobile-first Design',
    'Progressive Web Apps',
    'Modern Web Technologies',
  ]),
  url: '/portfolio',
  type: 'website',
  image: '/images/Code & Design Banner.jpeg',
});

// Category configuration with icon names (not components)
const categories = [
  { id: 'all', label: 'All Projects', icon: null },
  { id: 'software', label: 'Software', icon: 'FaCode' },
  { id: 'design', label: 'Design', icon: 'FaPalette' },
  { id: 'videography', label: 'Videography', icon: 'FaVideo' },
  { id: 'music', label: 'Music', icon: 'FaMusic' },
] as const;

export default async function PortfolioPage() {
  // Fetch data from Sanity with error handling
  let projects = [];
  let error = null;

  try {
    projects = await getProjects();
  } catch (err) {
    console.error('Error fetching projects from Sanity:', err);
    error = err;
    // Fallback to config data if Sanity fails
    projects = portfolioProjects.map((project, index) => ({
      _id: `fallback-project-${index}`,
      ...project,
      images: [],
    }));
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {(error as any) && (
        <div className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 px-4 py-3 rounded">
            <p className="text-sm">
              <strong>Note:</strong> Displaying cached content. Some information may not be up to date.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedContainer>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
              <span className="text-gray-900 dark:text-white">My </span>
              <span className="text-primary-gold">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-700 dark:text-text-secondary max-w-3xl mx-auto mb-8">
              Explore my collection of projects across software development, graphics design, 
              videography, and gospel music ministry. Each project tells a story of challenges overcome, 
              solutions implemented, and lessons learned.
            </p>
            <div className="bg-gradient-to-r from-primary-gold/10 via-tech-teal/10 to-accent-red/10 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-gray-800 dark:text-text-primary font-semibold">
                <span className="text-primary-gold">Featured:</span> Projects with detailed case studies, 
                technical challenges, and client testimonials
              </p>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Client-side filtering component */}
      <PortfolioClient projects={projects} categories={categories} />

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <PortfolioPageCTAs />
        </div>
      </section>

      {/* Social Follow Section */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedContainer>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Connect with Charles Jasema
            </h2>
            <p className="text-gray-700 dark:text-text-secondary mb-8">
              Follow my journey across platforms for project updates, behind-the-scenes content, and professional insights.
            </p>
            <SocialFollow variant="grid" showLabels={true} showUsernames={true} />
          </AnimatedContainer>
        </div>
      </section>
    </div>
  );
}
