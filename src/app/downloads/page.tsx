/**
 * Downloads Page
 * 
 * Public downloads center featuring Charles Jasema's portfolio resources,
 * music files, templates, and learning materials with secure cloud storage
 */

import React from 'react';
import { Metadata } from 'next';
import DownloadsCenter from '@/components/downloads/DownloadsCenter';

export const metadata: Metadata = {
  title: 'Downloads | Charles Jasema',
  description: 'Download Charles Jasema\'s portfolio resources, music files, code templates, and learning materials. Free access to professional development resources and worship music.',
  keywords: 'Charles Jasema downloads, portfolio resources, music downloads, code templates, web development resources, worship music, gospel songs',
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900">
      <DownloadsCenter />
    </div>
  );
}