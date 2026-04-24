import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Charles Jasema',
  description: 'Admin dashboard for managing website content',
  robots: {
    index: false, // Don't index admin page
    follow: false,
  },
};
