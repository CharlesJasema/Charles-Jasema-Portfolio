'use client';

import { useState, useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversionRate: number;
  topPages: Array<{ page: string; views: number }>;
  topEvents: Array<{ event: string; count: number }>;
  realtimeUsers: number;
}

interface AnalyticsDashboardProps {
  className?: string;
  showRealtime?: boolean;
  showTopContent?: boolean;
}

export function AnalyticsDashboard({ 
  className = '', 
  showRealtime = true,
  showTopContent = true 
}: AnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const analytics = useAnalytics();

  useEffect(() => {
    // Simulate analytics data fetching
    // In a real implementation, this would fetch from GA4 API
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual GA4 API calls
        const mockData: AnalyticsData = {
          pageViews: 1250,
          uniqueVisitors: 890,
          conversionRate: 3.2,
          topPages: [
            { page: '/', views: 450 },
            { page: '/music', views: 320 },
            { page: '/portfolio', views: 280 },
            { page: '/about', views: 200 },
          ],
          topEvents: [
            { event: 'cta_click', count: 45 },
            { event: 'music_play', count: 38 },
            { event: 'portfolio_view', count: 32 },
            { event: 'social_follow', count: 28 },
          ],
          realtimeUsers: 12,
        };
        
        setAnalyticsData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to load analytics data');
        analytics.trackError('Analytics Dashboard Error', err instanceof Error ? err.message : 'Unknown error', 'AnalyticsDashboard');
      } finally {
        setIsLoading(false);
      }
    };

    if (analytics.isEnabled) {
      fetchAnalyticsData();
    } else {
      setIsLoading(false);
      setError('Analytics not configured');
    }
  }, [analytics]);

  if (!analytics.isEnabled) {
    return (
      <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h3>
          <p className="text-gray-400">
            Analytics is not configured. Add your Google Analytics Measurement ID to enable tracking.
          </p>
          <div className="mt-4 p-4 bg-slate-700 rounded-lg text-left">
            <p className="text-sm text-gray-300 mb-2">To enable analytics:</p>
            <ol className="text-sm text-gray-400 space-y-1">
              <li>1. Get your GA4 Measurement ID from Google Analytics</li>
              <li>2. Add it to your .env.local file:</li>
              <li className="font-mono bg-slate-600 p-2 rounded mt-2">
                NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
              </li>
              <li>3. Restart your development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-slate-700 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-700 rounded-lg p-4">
                <div className="h-4 bg-slate-600 rounded mb-2 w-1/2"></div>
                <div className="h-8 bg-slate-600 rounded w-3/4"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-slate-700 rounded-lg p-4">
                <div className="h-4 bg-slate-600 rounded mb-4 w-1/3"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-3 bg-slate-600 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h3>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-gold text-background-dark rounded-lg hover:bg-primary-gold/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return null;
  }

  return (
    <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Analytics Dashboard</h3>
        {showRealtime && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">
              {analyticsData.realtimeUsers} active users
            </span>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Page Views</h4>
          <p className="text-2xl font-bold text-white">{analyticsData.pageViews.toLocaleString()}</p>
        </div>
        
        <div className="bg-slate-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Unique Visitors</h4>
          <p className="text-2xl font-bold text-white">{analyticsData.uniqueVisitors.toLocaleString()}</p>
        </div>
        
        <div className="bg-slate-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Conversion Rate</h4>
          <p className="text-2xl font-bold text-primary-gold">{analyticsData.conversionRate}%</p>
        </div>
      </div>

      {showTopContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Top Pages</h4>
            <div className="space-y-3">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-500 w-4">
                      {index + 1}
                    </span>
                    <span className="text-sm text-white font-medium">
                      {page.page === '/' ? 'Home' : page.page.replace('/', '').charAt(0).toUpperCase() + page.page.slice(2)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Events */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Top Events</h4>
            <div className="space-y-3">
              {analyticsData.topEvents.map((event, index) => (
                <div key={event.event} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-500 w-4">
                      {index + 1}
                    </span>
                    <span className="text-sm text-white font-medium">
                      {event.event.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {event.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-600">
        <p className="text-xs text-gray-500 text-center">
          Data updates every 24 hours. Real-time data may have delays.
        </p>
      </div>
    </div>
  );
}

// Analytics Summary Component for smaller displays
export function AnalyticsSummary({ className = '' }: { className?: string }) {
  const analytics = useAnalytics();
  const [stats] = useState({
    todayViews: 45,
    weeklyGrowth: 12.5,
    activeUsers: 8
  });

  if (!analytics.isEnabled) {
    return null;
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg p-4 ${className}`}>
      <h4 className="text-sm font-medium text-gray-400 mb-3">Quick Stats</h4>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-white">{stats.todayViews}</p>
          <p className="text-xs text-gray-400">Today</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-400">+{stats.weeklyGrowth}%</p>
          <p className="text-xs text-gray-400">This Week</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-lg font-bold text-white">{stats.activeUsers}</p>
          </div>
          <p className="text-xs text-gray-400">Active</p>
        </div>
      </div>
    </div>
  );
}