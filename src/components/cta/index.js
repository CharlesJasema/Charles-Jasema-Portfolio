import Link from 'next/link';
import { EnhancedButton } from '../ui';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export function StickyContactCTA() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col space-y-2">
      <a
        href="https://wa.me/256785446877"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
        aria-label="Contact via WhatsApp"
      >
        <FaWhatsapp size={20} />
      </a>
      <Link
        href="/contact"
        className="w-12 h-12 bg-primary-gold hover:bg-primary-gold-dark text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
        aria-label="Contact page"
      >
        <FaEnvelope size={20} />
      </Link>
    </div>
  );
}

// Page-specific CTA components
export function ContactPageCTAs() {
  return (
    <div className="bg-gradient-to-r from-primary-gold/10 to-accent-red/10 rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Ready to Work Together?
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Let's discuss your project and create something amazing together.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://wa.me/256785446877" target="_blank" rel="noopener noreferrer">
          <EnhancedButton variant="primary" className="w-full sm:w-auto">
            WhatsApp
          </EnhancedButton>
        </a>
        <a href="mailto:brocharles001@gmail.com">
          <EnhancedButton variant="secondary" className="w-full sm:w-auto">
            Send Email
          </EnhancedButton>
        </a>
      </div>
    </div>
  );
}

export function BlogPageCTAs() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Stay Updated
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Subscribe to get the latest insights on technology, design, and music.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/newsletter">
          <EnhancedButton variant="primary" className="w-full sm:w-auto">
            Subscribe
          </EnhancedButton>
        </Link>
        <Link href="/contact">
          <EnhancedButton variant="ghost" className="w-full sm:w-auto">
            Contact Me
          </EnhancedButton>
        </Link>
      </div>
    </div>
  );
}

export function AboutPageCTAs() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Let's Connect
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Whether you need a developer, designer, or performer for your next event.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/portfolio">
          <EnhancedButton variant="primary" className="w-full sm:w-auto">
            View Portfolio
          </EnhancedButton>
        </Link>
        <Link href="/contact">
          <EnhancedButton variant="secondary" className="w-full sm:w-auto">
            Get In Touch
          </EnhancedButton>
        </Link>
      </div>
    </div>
  );
}

export function MusicPageCTAs() {
  return (
    <div className="bg-gradient-to-r from-red-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Experience Live Worship
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Book Charles for your church service, wedding, or Christian event.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/booking">
          <EnhancedButton variant="primary" className="w-full sm:w-auto">
            Book Performance
          </EnhancedButton>
        </Link>
        <a href="https://www.youtube.com/@CharlesJasemaMusic" target="_blank" rel="noopener noreferrer">
          <EnhancedButton variant="secondary" className="w-full sm:w-auto">
            Watch Videos
          </EnhancedButton>
        </a>
      </div>
    </div>
  );
}

export function PortfolioPageCTAs() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Ready for Your Project?
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Let's collaborate and bring your vision to life with expert development and design.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/contact">
          <EnhancedButton variant="primary" className="w-full sm:w-auto">
            Start Project
          </EnhancedButton>
        </Link>
        <a href="/charles-jasema-cv.pdf" target="_blank" rel="noopener noreferrer">
          <EnhancedButton variant="ghost" className="w-full sm:w-auto">
            Download CV
          </EnhancedButton>
        </a>
      </div>
    </div>
  );
}