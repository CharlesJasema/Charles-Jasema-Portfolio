'use client';

import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { showToast } from '@/lib/toast';

interface AnalyticsTestPanelProps {
  className?: string;
}

export function AnalyticsTestPanel({ className = '' }: AnalyticsTestPanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const analytics = useAnalytics();

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testCTATracking = () => {
    analytics.trackCTA('Test CTA Button', '/test-page', 'primary');
    addTestResult('✅ CTA tracking test fired');
    showToast.success('CTA tracking test completed');
  };

  const testSocialTracking = () => {
    analytics.trackSocial.share('Facebook', 'test-content', 'Test Content Title');
    analytics.trackSocial.follow('Twitter', '/test-page');
    addTestResult('✅ Social tracking tests fired');
    showToast.success('Social tracking tests completed');
  };

  const testMusicTracking = () => {
    analytics.trackMusic.play('Test Song', 'Charles Jasema', 'Website Player', 180);
    setTimeout(() => {
      analytics.trackMusic.pause('Test Song', 45);
    }, 1000);
    setTimeout(() => {
      analytics.trackMusic.complete('Test Song', 180);
    }, 2000);
    addTestResult('✅ Music tracking sequence fired');
    showToast.success('Music tracking tests completed');
  };

  const testPortfolioTracking = () => {
    analytics.trackPortfolio.view('Test Project', 'Web Development', 30);
    analytics.trackPortfolio.interact('Test Project', 'click_demo_link');
    addTestResult('✅ Portfolio tracking tests fired');
    showToast.success('Portfolio tracking tests completed');
  };

  const testConversionTracking = () => {
    analytics.trackConversion.lead('Test Form', 'contact_form');
    analytics.trackConversion.booking('Music Performance', 'CTA Click');
    analytics.trackConversion.hiring('Web Development', 'Portfolio View', '$5000-$10000');
    analytics.trackConversion.newsletter('/test-page', 'Footer CTA');
    addTestResult('✅ Conversion tracking tests fired');
    showToast.success('Conversion tracking tests completed');
  };

  const testEcommerceTracking = () => {
    analytics.trackEcommerce.addToCart('Music Performance', 500);
    setTimeout(() => {
      analytics.trackEcommerce.beginCheckout('Music Performance', 500);
    }, 1000);
    setTimeout(() => {
      analytics.trackEcommerce.purchase('test-transaction-123', 'Music Performance', 500);
    }, 2000);
    addTestResult('✅ Ecommerce tracking sequence fired');
    showToast.success('Ecommerce tracking tests completed');
  };

  const testDownloadTracking = () => {
    analytics.trackDownload('test-cv.pdf', 'PDF', 'About Page');
    analytics.trackDownload('test-song.mp3', 'Audio', 'Music Page');
    addTestResult('✅ Download tracking tests fired');
    showToast.success('Download tracking tests completed');
  };

  const testFormTracking = () => {
    analytics.trackForm('Contact Form', '/contact', true);
    setTimeout(() => {
      analytics.trackForm('Newsletter Form', '/home', false);
    }, 1000);
    addTestResult('✅ Form tracking tests fired');
    showToast.success('Form tracking tests completed');
  };

  const testSearchTracking = () => {
    analytics.trackSearch('test query', '/search', 5);
    addTestResult('✅ Search tracking test fired');
    showToast.success('Search tracking test completed');
  };

  const testErrorTracking = () => {
    analytics.trackError('Test Error', 'This is a test error message', 'AnalyticsTestPanel');
    addTestResult('✅ Error tracking test fired');
    showToast.success('Error tracking test completed');
  };

  const runAllTests = async () => {
    clearResults();
    addTestResult('🚀 Starting comprehensive analytics test suite...');
    
    const tests = [
      { name: 'CTA Tracking', fn: testCTATracking },
      { name: 'Social Tracking', fn: testSocialTracking },
      { name: 'Music Tracking', fn: testMusicTracking },
      { name: 'Portfolio Tracking', fn: testPortfolioTracking },
      { name: 'Conversion Tracking', fn: testConversionTracking },
      { name: 'Ecommerce Tracking', fn: testEcommerceTracking },
      { name: 'Download Tracking', fn: testDownloadTracking },
      { name: 'Form Tracking', fn: testFormTracking },
      { name: 'Search Tracking', fn: testSearchTracking },
      { name: 'Error Tracking', fn: testErrorTracking },
    ];

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      addTestResult(`⏳ Running ${test.name}...`);
      test.fn();
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between tests
    }

    addTestResult('🎉 All analytics tests completed!');
    showToast.success('All analytics tests completed successfully!');
  };

  if (!isVisible) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={() => setIsVisible(true)}
          className="bg-primary-gold text-background-dark px-4 py-2 rounded-lg shadow-lg hover:bg-primary-gold/90 transition-colors text-sm font-medium"
        >
          📊 Analytics Test
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-slate-800 rounded-lg shadow-xl border border-slate-600 w-96 max-h-96 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-slate-700 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-semibold text-sm">Analytics Test Panel</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Status */}
      <div className="px-4 py-2 bg-slate-750 border-b border-slate-600">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${analytics.isEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-300">
            Analytics: {analytics.isEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {/* Test Buttons */}
      <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={testCTATracking}
            disabled={!analytics.isEnabled}
            className="px-3 py-2 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Test CTA
          </button>
          
          <button
            onClick={testSocialTracking}
            disabled={!analytics.isEnabled}
            className="px-3 py-2 bg-purple-600 text-white rounded text-xs hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Test Social
          </button>
          
          <button
            onClick={testMusicTracking}
            disabled={!analytics.isEnabled}
            className="px-3 py-2 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Test Music
          </button>
          
          <button
            onClick={testPortfolioTracking}
            disabled={!analytics.isEnabled}
            className="px-3 py-2 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Test Portfolio
          </button>
          
          <button
            onClick={testConversionTracking}
            disabled={!analytics.isEnabled}
            className="px-3 py-2 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Test Conversions
          </button>
          
          <button
            onClick={testEcommerceTracking}
            disabled={!analytics.isEnabled}
            className="px-3 py-2 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Test Ecommerce
          </button>
        </div>

        <div className="pt-2 border-t border-slate-600">
          <button
            onClick={runAllTests}
            disabled={!analytics.isEnabled}
            className="w-full px-3 py-2 bg-primary-gold text-background-dark rounded text-sm font-medium hover:bg-primary-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            🚀 Run All Tests
          </button>
        </div>

        <button
          onClick={clearResults}
          className="w-full px-3 py-1 bg-slate-600 text-white rounded text-xs hover:bg-slate-500 transition-colors"
        >
          Clear Results
        </button>
      </div>

      {/* Results */}
      {testResults.length > 0 && (
        <div className="border-t border-slate-600 bg-slate-900 max-h-32 overflow-y-auto">
          <div className="p-3">
            <h4 className="text-xs font-medium text-gray-400 mb-2">Test Results:</h4>
            <div className="space-y-1">
              {testResults.slice(-5).map((result, index) => (
                <div key={index} className="text-xs text-gray-300 font-mono">
                  {result}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!analytics.isEnabled && (
        <div className="p-3 bg-red-900/20 border-t border-red-800">
          <p className="text-xs text-red-400">
            Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env.local to enable analytics testing.
          </p>
        </div>
      )}
    </div>
  );
}