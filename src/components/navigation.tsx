'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { ThemeToggle } from './ThemeToggle';
import { imagesConfig } from '@/config/images';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Music', href: '/music' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Booking', href: '/booking' },
];

export function Navigation(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={clsx(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-background-dark/95 backdrop-blur-md shadow-lg border-b border-primary-gold/20'
          : 'bg-background-dark border-b border-primary-gold/20'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            aria-label="Charles Jasema Home"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <Image
                src={imagesConfig.logos.codeDesignLogo}
                alt="Charles Jasema Logo"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <span className="hidden sm:inline text-primary-gold font-heading font-bold text-lg group-hover:text-primary-gold/80 transition-colors">
              Charles Jasema
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'relative font-nav font-medium transition-colors duration-300',
                    'hover:text-primary-gold',
                    'focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark rounded px-2 py-1',
                    isActive(item.href)
                      ? 'text-primary-gold'
                      : 'text-text-secondary'
                  )}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-gold" />
                  )}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              'md:hidden p-2 rounded transition-colors duration-300',
              'focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark',
              isOpen ? 'text-accent-red' : 'text-primary-gold hover:text-primary-gold/80'
            )}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden pb-6 space-y-2 animate-fadeIn"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'block px-4 py-3 rounded-sm font-nav font-medium transition-all duration-300',
                  'focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 focus:ring-offset-background-dark',
                  isActive(item.href)
                    ? 'bg-primary-gold/10 text-primary-gold border-l-4 border-primary-gold'
                    : 'text-text-secondary hover:bg-primary-gold/5 hover:text-primary-gold hover:border-l-4 hover:border-primary-gold/50'
                )}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-text-secondary text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm -z-10 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
