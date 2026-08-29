export const siteConfig = {
  name: 'Charles Jada Sebit Emmanuel',
  title: 'Charles Jasema - Software Engineer, Graphics Designer & Gospel Artist',
  description: 'Professional software engineer, full-stack developer, graphics designer, and contemporary gospel artist. Specializing in React, Node.js, mobile development, and worship ministry. Available for hire.',
  url: 'https://charlesjasema.com',
  ogImage: 'https://charlesjasema.com/images/charles-jasema-business-banner.jpg',
  keywords: [
    'Charles Jasema',
    'Charles Jada Sebit Emmanuel',
    'Software Engineer',
    'Full Stack Developer',
    'Graphics Designer',
    'Gospel Artist',
    'React Developer',
    'Node.js Developer',
    'Mobile App Developer',
    'IT Support Specialist',
    'Worship Leader',
    'South Sudan Developer',
    'Uganda Developer',
    'Freelance Developer',
    'Web Development Services',
    'App Development',
    'Graphics Design Services',
    'Music Ministry',
    'Contemporary Gospel',
    'Project Management',
    'Digital Literacy Training',
    'Hire Developer',
    'Remote Developer',
  ],
  authors: [
    {
      name: 'Charles Jada Sebit Emmanuel',
      url: 'https://charlesjasema.com',
    },
  ],
  creator: 'Charles Jada Sebit Emmanuel',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://charlesjasema.com',
    title: 'Charles Jasema - Software Engineer & Gospel Artist',
    description: 'Professional software engineer, graphics designer, and gospel artist. Building technology solutions and spreading hope through music.',
    siteName: 'Charles Jasema Portfolio',
    images: [
      {
        url: 'https://charlesjasema.com/images/charles-jasema-business-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Charles Jada Sebit Emmanuel - Professional Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charles Jasema - Software Engineer & Gospel Artist',
    description: 'Professional software engineer, graphics designer, and gospel artist. Building technology solutions and spreading hope through music.',
    images: ['https://charlesjasema.com/images/charles-jasema-business-banner.jpg'],
    creator: '@charlesjasema',
  },
  linkedin: {
    profile: 'https://linkedin.com/in/charles-jada-sebit-emmanuel',
  },
  github: {
    profile: 'https://github.com/charlesjasema',
  },
};

export function generateMetadata({ 
  title, 
  description, 
  image, 
  noIndex = false,
  canonical,
  type = 'website' 
}) {
  const metadata = {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.title,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    openGraph: {
      ...siteConfig.openGraph,
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.title,
      description: description || siteConfig.description,
      type,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.title,
        },
      ] : siteConfig.openGraph.images,
    },
    twitter: {
      ...siteConfig.twitter,
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.title,
      description: description || siteConfig.description,
      images: image ? [image] : siteConfig.twitter.images,
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  if (canonical) {
    metadata.alternates = {
      canonical,
    };
  }

  return metadata;
}