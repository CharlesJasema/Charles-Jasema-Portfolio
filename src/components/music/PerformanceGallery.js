'use client';

import { useState } from 'react';
import { ImageCarousel } from '../ui/ImageCarousel';
import { Card } from '../ui';

export function PerformanceGallery({ className = '' }) {
  const performanceImages = [
    {
      src: '/images/ministry/Performance 1.png',
      alt: 'Charles Jasema Live Performance 1',
      title: 'Gospel Worship Service'
    },
    {
      src: '/images/ministry/Performance 2.png',
      alt: 'Charles Jasema Live Performance 2', 
      title: 'Community Outreach Concert'
    },
    {
      src: '/images/ministry/Performance 3.png',
      alt: 'Charles Jasema Live Performance 3',
      title: 'Youth Ministry Event'
    },
    {
      src: '/images/ministry/Performance 4.png',
      alt: 'Charles Jasema Live Performance 4',
      title: 'Church Revival Meeting'
    },
    {
      src: '/images/ministry/Performance 5.png',
      alt: 'Charles Jasema Live Performance 5',
      title: 'Gospel Music Festival'
    }
  ];

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Performance Gallery
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Moments from live ministry performances, spreading hope and faith through gospel music.
          </p>
        </div>

        <Card className="p-6">
          <ImageCarousel
            images={performanceImages.map(img => img.src)}
            alt="Charles Jasema Performance Gallery"
            autoPlay={true}
            interval={4000}
            showThumbnails={true}
            className="rounded-lg shadow-lg"
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {performanceImages.slice(0, 3).map((performance, index) => (
              <div key={index} className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {performance.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Live Ministry Performance
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}