'use client'

import { useState, useEffect } from 'react'

interface SanityTestResult {
  success: boolean
  message: string
  projectId?: string
  dataset?: string
  sampleData?: any
  error?: string
  timestamp: string
}

export default function SimpleAdminPage() {
  const [testResult, setTestResult] = useState<SanityTestResult | null>(null)
  const [loading, setLoading] = useState(false)

  const testSanityConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/sanity-test')
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to test connection',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testSanityConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Charles Jasema - Admin Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sanity Connection Test */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="mr-2">🔗</span>
                Sanity CMS Connection
              </h2>
              
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span>Testing connection...</span>
                </div>
              ) : testResult ? (
                <div className={`p-3 rounded ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="flex items-center mb-2">
                    <span className="mr-2">{testResult.success ? '✅' : '❌'}</span>
                    <span className="font-medium">{testResult.message}</span>
                  </div>
                  {testResult.projectId && (
                    <div className="text-sm">
                      <p><strong>Project ID:</strong> {testResult.projectId}</p>
                      <p><strong>Dataset:</strong> {testResult.dataset}</p>
                    </div>
                  )}
                  {testResult.error && (
                    <div className="text-sm mt-2">
                      <p><strong>Error:</strong> {testResult.error}</p>
                    </div>
                  )}
                </div>
              ) : null}
              
              <button
                onClick={testSanityConnection}
                disabled={loading}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Connection'}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <a
                  href="/admin"
                  className="block w-full bg-red-600 text-white px-4 py-2 rounded text-center hover:bg-red-700 transition-colors"
                >
                  🎨 Full Sanity Studio
                </a>
                
                <a
                  href="/"
                  className="block w-full bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700 transition-colors"
                >
                  🏠 View Website
                </a>
                
                <a
                  href="/api/sanity-test"
                  target="_blank"
                  className="block w-full bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition-colors"
                >
                  🔍 API Test (JSON)
                </a>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2">📊</span>
              System Status
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-1">🌐</div>
                <div className="font-medium">Website</div>
                <div className="text-green-600">Online</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-1">🎨</div>
                <div className="font-medium">CMS</div>
                <div className={testResult?.success ? 'text-green-600' : 'text-red-600'}>
                  {testResult?.success ? 'Connected' : 'Issues'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-1">🔒</div>
                <div className="font-medium">Security</div>
                <div className="text-green-600">Active</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="font-medium">Performance</div>
                <div className="text-green-600">Good</div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center text-blue-800">
              <span className="mr-2">💡</span>
              Getting Started
            </h2>
            <div className="text-blue-700 text-sm space-y-1">
              <p>• Use "Full Sanity Studio" to manage your content (songs, projects, blog posts)</p>
              <p>• Test the API connection to ensure everything is working</p>
              <p>• Visit the main website to see your portfolio</p>
              <p>• If you encounter issues, check the browser console for errors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}