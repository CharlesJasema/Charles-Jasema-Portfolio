'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaFacebook, FaMusic } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { NewsletterForm } from './NewsletterForm';
import { FooterCTAs } from './cta';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="footer"
      className="bg-slate-100 dark:bg-slate-900 border-t border-gold/20"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Footer CTAs */}
      <div className="bg-gradient-to-r from-primary-gold/5 via-accent-red/5 to-tech-teal/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FooterCTAs />
        </div>
      </div>

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
            <nav aria-label="Footer navigation">
              <ul className="space-y-2" role="list">
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
            </nav>
          </div>

          {/* Social Media - Professional */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Professional</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Software Engineering & Design
            </p>
            <nav aria-label="Professional social media links">
              <ul className="flex flex-wrap gap-3 mb-4" role="list">
                <li>
                  <a
                    href={siteConfig.professional.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="LinkedIn - Professional profile"
                    title="LinkedIn"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.professional.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Twitter/X - Professional updates"
                    title="Twitter/X"
                  >
                    <FaTwitter size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.professional.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="YouTube - Code & Design tutorials"
                    title="YouTube - Code & Design"
                  >
                    <FaYoutube size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.professional.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gold transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="GitHub - Open source projects"
                    title="GitHub"
                  >
                    <FaGithub size={24} />
                  </a>
                </li>
              </ul>
            </nav>

            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 mt-6">Music Ministry</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Gospel Music & Worship
            </p>
            <nav aria-label="Music ministry social media links">
              <ul className="flex flex-wrap gap-3" role="list">
                <li>
                  <a
                    href={siteConfig.music.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Instagram - Music Ministry photos and updates"
                    title="Instagram - Music"
                  >
                    <FaInstagram size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.music.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Twitter/X - Music Ministry updates"
                    title="Twitter/X - Music"
                  >
                    <FaTwitter size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.music.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="YouTube - Music Ministry videos and worship songs"
                    title="YouTube - Music"
                  >
                    <FaYoutube size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.music.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Facebook - Music Ministry community"
                    title="Facebook"
                  >
                    <FaFacebook size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.music.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="TikTok - Music Ministry short videos"
                    title="TikTok"
                  >
                    <SiTiktok size={24} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.music.mdundo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-accent-red transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Mdundo - Stream and download gospel music"
                    title="Mdundo - Stream Music"
                  >
                    <FaMusic size={24} />
                  </a>
                </li>
              </ul>
            </nav>
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

      </div>
    </footer>
  );
}
