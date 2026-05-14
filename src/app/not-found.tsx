import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FaHome, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary-gold mb-4">404</h1>
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-text-secondary mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" className="inline-flex items-center gap-2">
              <FaHome />
              <span>Go Home</span>
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="ghost" className="inline-flex items-center gap-2">
              <FaSearch />
              <span>Browse Portfolio</span>
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link href="/music" className="hover:text-primary-gold transition-colors">
              Music
            </Link>
            <Link href="/about" className="hover:text-primary-gold transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary-gold transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="hover:text-primary-gold transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}