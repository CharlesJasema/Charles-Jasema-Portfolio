import Link from 'next/link';
import { FaCode, FaPalette, FaVideo, FaMusic } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { getProjects } from '@/lib/sanity.queries';
import { portfolioProjects } from '@/config/portfolio';
import PortfolioClient from './PortfolioClient';

// Enable ISR with 60-second revalidation
export const revalidate = 60;

const categories = [
  { id: 'all', label: 'All Projects', icon: null },
  { id: 'software', label: 'Software', icon: FaCode },
  { id: 'design', label: 'Design', icon: FaPalette },
  { id: 'videography', label: 'Videography', icon: FaVideo },
  { id: 'music', label: 'Music', icon: FaMusic },
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-gray-900 dark:text-white">My </span>
            <span className="text-primary-gold">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
            Explore my collection of projects across software development, graphics design, 
            videography, and gospel music ministry.
          </p>
        </div>
      </section>

      {/* Client-side filtering component */}
      <PortfolioClient projects={projects} categories={categories} />

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary-gold/10 via-accent-red/10 to-tech-teal/10 rounded-2xl p-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-gray-700 dark:text-text-secondary text-lg mb-8">
            Let's collaborate and bring your vision to life. Whether it's software, design, or creative work, 
            I'm here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Start a Project
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Learn More About Me
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
