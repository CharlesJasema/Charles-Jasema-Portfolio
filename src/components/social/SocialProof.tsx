'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

interface SocialStats {
  platform: string;
  followers: number;
  label: string;
  icon: JSX.Element;
  color: string;
  url: string;
}

interface SocialProofProps {
  className?: string;
  variant?: 'horizontal' | 'grid' | 'compact';
  showIcons?: boolean;
  animated?: boolean;
}

// Mock data - In a real implementation, you'd fetch this from APIs or update manually
const socialStats: SocialStats[] = [
  {
    platform: 'YouTube',
    followers: 1200, // Update with actual subscriber count
    label: 'Subscribers',
    url: 'https://www.youtube.com/@charlesjasema',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: 'text-red-500'
  },
  {
    platform: 'Mdundo',
    followers: 5600, // Update with actual play count or followers
    label: 'Plays',
    url: 'https://www.mdundo.com/artist/charles-jasema',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
      </svg>
    ),
    color: 'text-orange-500'
  },
  {
    platform: 'GitHub',
    followers: 45, // Update with actual follower count
    label: 'Followers',
    url: 'https://github.com/charlesjasema',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
      </svg>
    ),
    color: 'text-gray-300'
  },
  {
    platform: 'LinkedIn',
    followers: 320, // Update with actual connection count
    label: 'Connections',
    url: 'https://www.linkedin.com/in/charlesjasema',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'text-blue-600'
  }
];

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function AnimatedCounter({ 
  target, 
  duration = 2000 
}: { 
  target: number; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(target * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration]);

  return <span>{formatNumber(count)}</span>;
}

export function SocialProof({ 
  className = '', 
  variant = 'horizontal',
  showIcons = true,
  animated = true
}: SocialProofProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for social stats
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const containerClasses = {
    horizontal: 'flex flex-wrap items-center justify-center gap-4',
    grid: 'grid grid-cols-2 lg:grid-cols-4 gap-4',
    compact: 'flex items-center gap-6'
  };

  if (isLoading) {
    return (
      <div className={`${containerClasses[variant]} ${className}`}>
        {socialStats.map((_, index) => (
          <LoadingSkeleton key={index} variant="card" className="h-20 w-32" />
        ))}
      </div>
    );
  }

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      {socialStats.map((stat) => (
        <a
          key={stat.platform}
          href={stat.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label={`${stat.followers} ${stat.label} on ${stat.platform}`}
        >
          <Card 
            variant="glass" 
            padding="md"
            className="
              text-center transition-all duration-300 
              hover:scale-105 hover:shadow-lg cursor-pointer
              border border-slate-600 hover:border-primary-gold/50
            "
          >
            <div className="flex flex-col items-center gap-2">
              {showIcons && (
                <div className={`${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                  {stat.icon}
                </div>
              )}
              
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-white">
                  {animated && isVisible ? (
                    <AnimatedCounter target={stat.followers} />
                  ) : (
                    formatNumber(stat.followers)
                  )}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {stat.platform}
                </div>
              </div>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}

// Compact version for use in headers or sidebars
export function SocialProofCompact({ className = '' }: { className?: string }) {
  const totalFollowers = socialStats.reduce((sum, stat) => sum + stat.followers, 0);

  return (
    <div className={`flex items-center gap-2 text-sm text-gray-400 ${className}`}>
      <svg className="w-4 h-4 text-primary-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>
        <strong className="text-white">{formatNumber(totalFollowers)}+</strong> followers across platforms
      </span>
    </div>
  );
}