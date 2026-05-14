'use client';

import { CTA, CTAProps } from './CTA';

// Icon components for CTAs
const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6 0h6" />
  </svg>
);

const HireIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
  </svg>
);

const SubscribeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const FollowIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// Preset CTA components with predefined styling and content
interface PresetCTAProps extends Omit<CTAProps, 'type' | 'icon' | 'children'> {
  text?: string;
}

export function BookMeCTA({ 
  text = "Book Me for Your Event", 
  href = "/booking",
  variant = "primary",
  size = "lg",
  ...props 
}: PresetCTAProps) {
  return (
    <CTA
      type="book"
      variant={variant}
      size={size}
      href={href}
      icon={<BookIcon />}
      ariaLabel="Book Charles Jasema for your event"
      tracking={{
        category: 'Booking',
        label: 'Book Me CTA - Music Page'
      }}
      {...props}
    >
      {text}
    </CTA>
  );
}

export function HireMeCTA({ 
  text = "Hire Me for Your Project", 
  href = "/contact",
  variant = "secondary",
  size = "lg",
  ...props 
}: PresetCTAProps) {
  return (
    <CTA
      type="hire"
      variant={variant}
      size={size}
      href={href}
      icon={<HireIcon />}
      ariaLabel="Hire Charles Jasema for your project"
      tracking={{
        category: 'Portfolio',
        label: 'Hire Me CTA - Portfolio Page'
      }}
      {...props}
    >
      {text}
    </CTA>
  );
}

export function SubscribeCTA({ 
  text = "Subscribe to Updates", 
  href = "#newsletter",
  variant = "outline",
  size = "md",
  ...props 
}: PresetCTAProps) {
  return (
    <CTA
      type="subscribe"
      variant={variant}
      size={size}
      href={href}
      icon={<SubscribeIcon />}
      ariaLabel="Subscribe to Charles Jasema's newsletter"
      tracking={{
        category: 'Engagement',
        label: 'Subscribe CTA - Blog Page'
      }}
      {...props}
    >
      {text}
    </CTA>
  );
}

export function ContactMeCTA({ 
  text = "Contact Me", 
  href = "/contact",
  variant = "ghost",
  size = "md",
  ...props 
}: PresetCTAProps) {
  return (
    <CTA
      type="contact"
      variant={variant}
      size={size}
      href={href}
      icon={<ContactIcon />}
      ariaLabel="Contact Charles Jasema"
      tracking={{
        category: 'Contact',
        label: 'Contact Me CTA - General'
      }}
      {...props}
    >
      {text}
    </CTA>
  );
}

export function DownloadCTA({ 
  text = "Download", 
  href,
  onClick,
  variant = "outline",
  size = "sm",
  ...props 
}: PresetCTAProps) {
  return (
    <CTA
      type="download"
      variant={variant}
      size={size}
      href={href}
      onClick={onClick}
      icon={<DownloadIcon />}
      ariaLabel="Download file"
      tracking={{
        category: 'Downloads',
        label: 'Download CTA'
      }}
      {...props}
    >
      {text}
    </CTA>
  );
}

export function FollowCTA({ 
  text = "Follow Me", 
  href,
  variant = "ghost",
  size = "sm",
  external = true,
  ...props 
}: PresetCTAProps) {
  return (
    <CTA
      type="follow"
      variant={variant}
      size={size}
      href={href}
      external={external}
      icon={<FollowIcon />}
      ariaLabel="Follow Charles Jasema on social media"
      tracking={{
        category: 'Social',
        label: 'Follow CTA'
      }}
      {...props}
    >
      {text}
    </CTA>
  );
}