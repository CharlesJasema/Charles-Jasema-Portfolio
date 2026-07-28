/**
 * Newsletter Banner Component
 * 
 * Eye-catching newsletter signup banner for homepage and landing pages
 * Features brand-aware design and compelling call-to-action
 */

'use client';

import React from 'react';
import { Mail, Star, TrendingUp, Users } from 'lucide-react';
import { useBrandContext } from '@/components/ui/BrandContext';
import NewsletterSignup from './NewsletterSignup';

interface NewsletterBannerProps {
  className?: string;
  variant?: 'hero' | 'section' | 'footer';
  showStats?: boolean;
}

const stats = [
  { label: 'Subscribers', value: '500+', icon: Users },
  { label: 'Projects Shared', value: '50+', icon: TrendingUp },
  { label: 'Satisfaction', value: '98%', icon: Star },
];

export function NewsletterBanner({ 
  className = '', 
  variant = 'section',
  showStats = true,
}: NewsletterBannerProps) {
  const { currentBrand } = useBrandContext();

  const getBrandGradient = () => {
    if (currentBrand === 'ministry') {
      return 'from-purple-600 via-purple-700 to-indigo-800';
    } else if (currentBrand === 'professional') {
      return 'from-blue-600 via-blue-700 to-indigo-800';
    }
    return 'from-blue-600 via-purple-600 to-indigo-700';
  };

  const getContent = () => {
    if (currentBrand === 'ministry') {
      return {
        title: 'Join the Ministry Newsletter',
        subtitle: 'Stay Connected with Charles\'s Musical Journey',
        description: 'Get exclusive access to new worship songs, ministry updates, event announcements, and spiritual insights delivered straight to your inbox.',
        benefits: [
          'New song releases and music videos',
          'Upcoming worship events and concerts',
          'Ministry testimonies and prayer requests',
          'Exclusive worship resources and chord charts',
        ],
      };
    } else if (currentBrand === 'professional') {
      return {
        title: 'Professional Updates Newsletter',
        subtitle: 'Stay Ahead with Charles\'s Latest Work',
        description: 'Receive updates on cutting-edge projects, tech insights, design trends, and professional development tips from an experienced software engineer.',
        benefits: [
          'Latest web development projects and case studies',
          'Graphics design portfolio updates',
          'Tech tutorials and industry insights',
          'Professional tips and career advice',
        ],
      };
    }
    
    // Unified brand
    return {
      title: 'Join Charles Jasema\'s Newsletter',
      subtitle: 'Portfolio Updates & Ministry News in One Place',
      description: 'Get the best of both worlds - professional project updates and music ministry news, plus exclusive content you won\'t find anywhere else.',
      benefits: [
        'Professional portfolio and project updates',
        'New music releases and ministry events',
        'Behind-the-scenes content and insights',
        'Exclusive tutorials and resources',
      ],
    };
  };

  const content = getContent();

  if (variant === 'hero') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getBrandGradient()}`} />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />

        {/* Content */}
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center text-white mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Mail className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
              <NewsletterSignup 
                variant="modal"
                source={currentBrand === 'ministry' ? 'music' : 'portfolio'}
                showInterests={false}
                title=""
                description="Join thousands of subscribers getting exclusive updates"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getBrandGradient()}`} />
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="w-12 h-1 bg-white/30 rounded-full" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.title}
            </h2>
            <p className="text-lg text-white/90 mb-6">
              {content.subtitle}
            </p>
            <p className="text-white/80 mb-8">
              {content.description}
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <span className="text-white/90 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            {showStats && (
              <div className="flex flex-wrap gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <stat.icon className="w-5 h-5 text-white/70" />
                    <div>
                      <div className="text-lg font-bold">{stat.value}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Newsletter Signup */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl">
              <NewsletterSignup 
                source={currentBrand === 'ministry' ? 'music' : 'portfolio'}
                showInterests={true}
                title=""
                description="Get exclusive updates delivered to your inbox"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { NewsletterBannerProps };
export default NewsletterBanner;