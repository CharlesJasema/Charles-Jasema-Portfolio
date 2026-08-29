import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope, FaVideo } from 'react-icons/fa';
import { LogoImage } from '@/components/ui/LogoImage';
import { socialLinks as configSocialLinks } from '@/lib/config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinksData = [
    {
      href: configSocialLinks.professional.linkedin,
      icon: FaLinkedin,
      label: 'LinkedIn',
      category: 'professional'
    },
    {
      href: configSocialLinks.professional.github,
      icon: FaGithub,
      label: 'GitHub',
      category: 'professional'
    },
    {
      href: configSocialLinks.contact.credly,
      icon: FaEnvelope,
      label: 'Credly Certifications',
      category: 'professional'
    },
    {
      href: configSocialLinks.professional.twitter,
      icon: FaVideo,
      label: 'X (Twitter)',
      category: 'professional'
    },
    {
      href: configSocialLinks.professional.youtube,
      icon: FaYoutube,
      label: 'YouTube (Code & Design)',
      category: 'professional'
    },
    {
      href: configSocialLinks.music.instagram,
      icon: FaInstagram,
      label: 'Instagram (Music)',
      category: 'music'
    },
    {
      href: configSocialLinks.music.tiktok,
      icon: FaVideo,
      label: 'TikTok (Music)',
      category: 'music'
    },
    {
      href: configSocialLinks.music.youtube,
      icon: FaYoutube,
      label: 'YouTube (Music)',
      category: 'music'
    },
    {
      href: configSocialLinks.music.facebook,
      icon: FaVideo,
      label: 'Facebook (Music)',
      category: 'music'
    },
    {
      href: configSocialLinks.music.mdundo,
      icon: FaVideo,
      label: 'Mdundo',
      category: 'music'
    },
    {
      href: configSocialLinks.contact.whatsapp,
      icon: FaWhatsapp,
      label: 'WhatsApp',
      category: 'contact'
    },
    {
      href: configSocialLinks.contact.email,
      icon: FaEnvelope,
      label: 'Email',
      category: 'contact'
    }
  ];

  const quickLinks = [
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/music', label: 'Music' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-[#0B132B] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <LogoImage
                src="/images/logos/code-design-logo.jpg" 
                alt="Charles Jasema Professional Logo" 
                className="w-12 h-12 rounded-full border-2 border-[#D4AF37]"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Charles Jada Sebit Emmanuel</h3>
                <p className="text-gray-400 text-sm">Software Engineer & Gospel Artist</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Purpose-driven professional bridging technology and creativity to deliver exceptional results 
              across software engineering, graphics design, and gospel music.
            </p>
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <span className="font-semibold">TC #333373</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-400">4+ Years Experience</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-[#D4AF37] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-[#D4AF37] mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <p>brocharles001@gmail.com</p>
              <p>+256 785 446 877</p>
              <p>Kampala, Uganda</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-gray-700 pt-8">
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-[#D4AF37] mb-6 text-center">Connect With Me</h4>
            
            {/* Professional Links */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-400 mb-3">Professional</h5>
              <div className="flex flex-wrap justify-center gap-4">
                {socialLinksData
                  .filter(link => link.category === 'professional')
                  .map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-[#800000] text-gray-300 hover:text-white rounded-lg transition-all duration-200"
                      aria-label={link.label}
                    >
                      <link.icon className="text-[#D4AF37]" />
                      <span className="text-sm">{link.label}</span>
                    </a>
                  ))}
              </div>
            </div>

            {/* Music Links */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-400 mb-3">Music & Ministry</h5>
              <div className="flex flex-wrap justify-center gap-4">
                {socialLinksData
                  .filter(link => link.category === 'music')
                  .map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-[#800000] text-gray-300 hover:text-white rounded-lg transition-all duration-200"
                      aria-label={link.label}
                    >
                      <link.icon className="text-[#D4AF37]" />
                      <span className="text-sm">{link.label}</span>
                    </a>
                  ))}
              </div>
            </div>

            {/* Contact Links */}
            <div>
              <h5 className="text-sm font-medium text-gray-400 mb-3">Direct Contact</h5>
              <div className="flex flex-wrap justify-center gap-4">
                {socialLinksData
                  .filter(link => link.category === 'contact')
                  .map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-[#800000] text-gray-300 hover:text-white rounded-lg transition-all duration-200"
                      aria-label={link.label}
                    >
                      <link.icon className="text-[#D4AF37]" />
                      <span className="text-sm">{link.label}</span>
                    </a>
                  ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm pt-8 border-t border-gray-700">
            <p>© {currentYear} Charles Jada Sebit Emmanuel. All rights reserved.</p>
            <p className="mt-2">Built with passion for technology and gospel music.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}