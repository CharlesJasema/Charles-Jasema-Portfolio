'use client';

import { useState } from 'react';
import { showToast } from '@/lib/toast';
import { createAccessibleButtonProps } from '@/lib/accessibility';
import { useAnalytics } from '@/hooks/useAnalytics';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'compact';
  showLabels?: boolean;
  contentType?: string; // For analytics tracking
}

interface SharePlatform {
  name: string;
  icon: JSX.Element;
  shareUrl: (url: string, title: string, description?: string) => string;
  color: string;
  ariaLabel: string;
}

const sharePlatforms: SharePlatform[] = [
  {
    name: 'Facebook',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    shareUrl: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
    color: 'hover:text-blue-600',
    ariaLabel: 'Share on Facebook'
  },
  {
    name: 'Twitter',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    shareUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    color: 'hover:text-blue-400',
    ariaLabel: 'Share on Twitter'
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    shareUrl: (url, title, description) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || '')}`,
    color: 'hover:text-blue-700',
    ariaLabel: 'Share on LinkedIn'
  },
  {
    name: 'WhatsApp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
      </svg>
    ),
    shareUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    color: 'hover:text-green-500',
    ariaLabel: 'Share on WhatsApp'
  }
];

export function SocialShare({ 
  url, 
  title, 
  description, 
  className = '', 
  variant = 'horizontal',
  showLabels = false,
  contentType = 'page'
}: SocialShareProps) {
  const [isSharing, setIsSharing] = useState(false);
  const analytics = useAnalytics();

  const handleShare = async (platform: SharePlatform) => {
    try {
      setIsSharing(true);
      
      // Track share event with enhanced analytics
      analytics.trackSocial.share(platform.name, contentType, title);
      
      // Check if Web Share API is available and use it for mobile
      if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        await navigator.share({
          title,
          text: description,
          url,
        });
        showToast.success('Content shared successfully!');
        return;
      }

      // Fallback to platform-specific sharing
      const shareUrl = platform.shareUrl(url, title, description);
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
      
      showToast.success(`Shared on ${platform.name}!`);
    } catch (error) {
      console.error('Error sharing:', error);
      analytics.trackError('Share Error', error instanceof Error ? error.message : 'Unknown error', 'SocialShare');
      showToast.error('Failed to share content. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      
      // Track copy link event
      analytics.trackSocial.share('Copy Link', contentType, title);
      
      showToast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Error copying link:', error);
      analytics.trackError('Copy Link Error', error instanceof Error ? error.message : 'Unknown error', 'SocialShare');
      showToast.error('Failed to copy link. Please try again.');
    }
  };

  const containerClasses = {
    horizontal: 'flex flex-wrap items-center gap-2',
    vertical: 'flex flex-col gap-2',
    compact: 'flex items-center gap-1'
  };

  return (
    <div className={`${containerClasses[variant]} ${className}`}>
      <span className="text-sm font-medium text-gray-300 mr-2">Share:</span>
      
      {sharePlatforms.map((platform) => (
        <button
          key={platform.name}
          onClick={() => handleShare(platform)}
          disabled={isSharing}
          className={`
            inline-flex items-center justify-center gap-2 px-3 py-2 
            text-gray-400 transition-all duration-200 rounded-md
            hover:bg-slate-700 ${platform.color} focus:outline-none 
            focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 
            focus:ring-offset-slate-800 disabled:opacity-50 
            disabled:cursor-not-allowed min-h-[44px] min-w-[44px]
          `}
          {...createAccessibleButtonProps(platform.ariaLabel, { disabled: isSharing })}
        >
          {platform.icon}
          {showLabels && (
            <span className="text-sm font-medium">{platform.name}</span>
          )}
        </button>
      ))}

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="
          inline-flex items-center justify-center gap-2 px-3 py-2 
          text-gray-400 transition-all duration-200 rounded-md
          hover:bg-slate-700 hover:text-primary-gold focus:outline-none 
          focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 
          focus:ring-offset-slate-800 min-h-[44px] min-w-[44px]
        "
        {...createAccessibleButtonProps('Copy link to clipboard')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        {showLabels && (
          <span className="text-sm font-medium">Copy Link</span>
        )}
      </button>
    </div>
  );
}