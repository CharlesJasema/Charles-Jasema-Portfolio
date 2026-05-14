'use client'

import { useState, useEffect } from 'react'
import { TawkToAPI } from './TawkToScript'

/**
 * Tawk.to Test Panel Component
 * 
 * Development tool for testing Tawk.to integration
 * Only visible in development mode
 */

interface TawkToStatus {
  isLoaded: boolean
  isOnline: boolean
  isHidden: boolean
  isMaximized: boolean
  unreadCount: number
  propertyId: string | undefined
  widgetId: string | undefined
}

export function TawkToTestPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [status, setStatus] = useState<TawkToStatus>({
    isLoaded: false,
    isOnline: false,
    isHidden: false,
    isMaximized: false,
    unreadCount: 0,
    propertyId: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
    widgetId: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID
  })

  // Only show in development mode
  const isDevelopment = process.env.NODE_ENV === 'development'

  useEffect(() => {
    if (!isDevelopment) return

    const checkTawkToStatus = () => {
      setStatus({
        isLoaded: !!window.Tawk_API,
        isOnline: TawkToAPI.isChatOnline(),
        isHidden: TawkToAPI.isChatHidden(),
        isMaximized: TawkToAPI.isChatMaximized(),
        unreadCount: TawkToAPI.getUnreadCount(),
        propertyId: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
        widgetId: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID
      })
    }

    // Check status every 2 seconds
    const interval = setInterval(checkTawkToStatus, 2000)
    
    // Initial check
    checkTawkToStatus()

    return () => clearInterval(interval)
  }, [isDevelopment])

  if (!isDevelopment) {
    return null
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
        title="Toggle Tawk.to Test Panel"
      >
        💬
      </button>

      {/* Test Panel */}
      {isVisible && (
        <div className="fixed bottom-16 left-4 z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Tawk.to Test Panel</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Configuration Status */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Configuration</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Property ID:</span>
                <span className={status.propertyId ? 'text-green-600' : 'text-red-600'}>
                  {status.propertyId ? '✓ Set' : '✗ Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Widget ID:</span>
                <span className={status.widgetId ? 'text-green-600' : 'text-red-600'}>
                  {status.widgetId ? '✓ Set' : '✗ Missing'}
                </span>
              </div>
            </div>
          </div>

          {/* Widget Status */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Widget Status</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Loaded:</span>
                <span className={status.isLoaded ? 'text-green-600' : 'text-red-600'}>
                  {status.isLoaded ? '✓ Yes' : '✗ No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Online:</span>
                <span className={status.isOnline ? 'text-green-600' : 'text-orange-600'}>
                  {status.isOnline ? '✓ Online' : '⚠ Offline'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Hidden:</span>
                <span className={status.isHidden ? 'text-orange-600' : 'text-green-600'}>
                  {status.isHidden ? '⚠ Hidden' : '✓ Visible'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Maximized:</span>
                <span className={status.isMaximized ? 'text-blue-600' : 'text-gray-600'}>
                  {status.isMaximized ? '📖 Open' : '📕 Closed'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Unread:</span>
                <span className="text-blue-600">
                  {status.unreadCount} messages
                </span>
              </div>
            </div>
          </div>

          {/* Widget Controls */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Controls</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={TawkToAPI.showWidget}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                disabled={!status.isLoaded}
              >
                Show
              </button>
              <button
                onClick={TawkToAPI.hideWidget}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                disabled={!status.isLoaded}
              >
                Hide
              </button>
              <button
                onClick={TawkToAPI.maximize}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                disabled={!status.isLoaded}
              >
                Open
              </button>
              <button
                onClick={TawkToAPI.minimize}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                disabled={!status.isLoaded}
              >
                Close
              </button>
            </div>
          </div>

          {/* Test Actions */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Test Actions</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  TawkToAPI.setAttributes({
                    name: 'Test User',
                    email: 'test@example.com'
                  })
                  alert('Test attributes set!')
                }}
                className="w-full px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                disabled={!status.isLoaded}
              >
                Set Test Attributes
              </button>
              <button
                onClick={() => {
                  TawkToAPI.addTags(['test', 'development'])
                  alert('Test tags added!')
                }}
                className="w-full px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600"
                disabled={!status.isLoaded}
              >
                Add Test Tags
              </button>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Environment</h4>
            <div className="text-xs bg-gray-100 p-2 rounded">
              <div>Property: {status.propertyId || 'Not set'}</div>
              <div>Widget: {status.widgetId || 'Not set'}</div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div>
            <h4 className="font-semibold mb-2">Troubleshooting</h4>
            <div className="text-xs space-y-1">
              {!status.propertyId && (
                <div className="text-red-600">
                  ⚠ Add NEXT_PUBLIC_TAWK_PROPERTY_ID to .env.local
                </div>
              )}
              {!status.widgetId && (
                <div className="text-red-600">
                  ⚠ Add NEXT_PUBLIC_TAWK_WIDGET_ID to .env.local
                </div>
              )}
              {!status.isLoaded && status.propertyId && status.widgetId && (
                <div className="text-orange-600">
                  ⚠ Script not loaded. Check console for errors.
                </div>
              )}
              {status.isLoaded && !status.isOnline && (
                <div className="text-orange-600">
                  ⚠ Widget offline. Check Tawk.to dashboard.
                </div>
              )}
              {status.isLoaded && status.isHidden && (
                <div className="text-orange-600">
                  ⚠ Widget hidden. Click 'Show' to make visible.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TawkToTestPanel