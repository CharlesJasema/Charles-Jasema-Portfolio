'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaFacebook, FaMusic } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { NewsletterForm } from './NewsletterForm';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-gold mb-4">{siteConfig.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gold transition-colors"
            >
              <FaEnvelope size={16} />
              <span className="text-sm">{siteConfig.contact.email}</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/music" className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors">
                  Music Ministry
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors">
                  Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media - Professional */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Professional</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Software Engineering & Design
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <a
                href={siteConfig.professional.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
                aria-label="LinkedIn - Professional"
                title="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={siteConfig.professional.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
                aria-label="Twitter/X - Professional"
                title="Twitter/X"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={siteConfig.professional.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
                aria-label="YouTube - Code & Design"
                title="YouTube - Code & Design"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href={siteConfig.professional.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub size={24} />
              </a>
            </div>

            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 mt-6">Music Ministry</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Gospel Music & Worship
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={siteConfig.music.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors"
                aria-label="Instagram - Music Ministry"
                title="Instagram - Music"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={siteConfig.music.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors"
                aria-label="Twitter/X - Music Ministry"
                title="Twitter/X - Music"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={siteConfig.music.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors"
                aria-label="YouTube - Music Ministry"
                title="YouTube - Music"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href={siteConfig.music.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors"
                aria-label="Facebook - Music Ministry"
                title="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={siteConfig.music.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors"
                aria-label="TikTok - Music Ministry"
                title="TikTok"
              >
                <SiTiktok size={24} />
              </a>
              <a
                href={siteConfig.music.mdundo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors"
                aria-label="Mdundo - Stream Music"
                title="Mdundo - Stream Music"
              >
                <FaMusic size={24} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Subscribe to get the latest updates and insights.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/10 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Developed by <span className="text-gold font-semibold">{siteConfig.name}</span> | Software Engineer & Designer
            </p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/privacy" className="text-gray-500 hover:text-gold text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gold text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gold text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Admin Note */}
        <div className="mt-6 pt-6 border-t border-gold/10">
          <p className="text-gray-600 text-xs text-center">
            💡 <strong>Admin:</strong> To update social media links and contact information, edit{' '}
            <code className="bg-slate-800 px-2 py-1 rounded text-gold">src/config/site.ts</code>
          </p>
        </div>
      </div>
    </footer>
  );
}
