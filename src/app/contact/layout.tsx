import { generateMetadata as generateSEOMetadata, generateKeywords, generateBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata = generateSEOMetadata({
  title: `Contact ${siteConfig.name} - Get In Touch for Projects & Collaborations`,
  description: 'Get in touch with Charles Jasema for software development projects, design work, music collaborations, or ministry opportunities. Available for freelance web development, full-stack applications, graphics design, videography, and gospel music projects. Contact via email, WhatsApp, or social media.',
  keywords: generateKeywords([
    'Contact Charles Jasema',
    'Hire Software Developer',
    'Freelance Developer',
    'Web Development Services',
    'Software Development Consultation',
    'Full Stack Developer Hire',
    'React Developer for Hire',
    'Next.js Developer Services',
    'TypeScript Developer',
    'Frontend Developer Services',
    'Backend Developer Services',
    'Graphics Design Services',
    'Logo Design Services',
    'Brand Identity Design',
    'UI/UX Design Services',
    'Web Design Services',
    'Videography Services',
    'Video Production Services',
    'Video Editing Services',
    'Gospel Music Collaboration',
    'Worship Leader Booking',
    'Music Production Services',
    'Gospel Artist Booking',
    'Ministry Collaboration',
    'Church Technology Services',
    'Christian Developer',
    'Faith-based Projects',
    'Nonprofit Technology',
    'Ministry Website Development',
    'Church App Development',
    'Gospel Music Production',
    'Worship Team Services',
    'Event Booking',
    'Performance Booking',
    'Speaking Engagement',
    'Tech Consultation',
    'Project Collaboration',
    'Custom Development',
    'E-commerce Development',
    'CMS Development',
    'Mobile App Development',
    'Database Development',
    'API Development',
    'Cloud Solutions',
    'Digital Transformation',
    'Business Solutions',
    'Startup Development',
    'MVP Development',
    'Prototype Development',
    'Technical Consulting',
    'Code Review Services',
    'Mentorship Services',
    'Training Services',
    'Workshop Services',
  ]),
  url: '/contact',
  type: 'website',
  image: '/images/professional image.JPG',
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}