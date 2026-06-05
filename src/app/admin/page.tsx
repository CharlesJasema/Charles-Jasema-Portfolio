'use client'

import { useState, useEffect } from 'react'

interface SanityTestResult {
  success: boolean
  message: string
  projectId?: string
  dataset?: string
  error?: string
}

export default function FastAdminPage() {
  const [testResult, setTestResult] = useState<SanityTestResult | null>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/sanity-test')
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Charles Jasema - Quick Admin</h1>
          
          {/* Connection Status */}
          <div className="mb-6 p-4 rounded-lg bg-gray-50">
            <h2 className="font-semibold mb-3">🔗 Sanity CMS Status</h2>
            {loading ? (
              <div className="text-blue-600">Testing connection...</div>
            ) : testResult ? (
              <div className={testResult.success ? 'text-green-600' : 'text-red-600'}>
                {testResult.success ? '✅ Connected' : '❌ Connection Issues'}
                {testResult.error && <div className="text-sm mt-1">Error: {testResult.error}</div>}
              </div>
            ) : null}
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <a href="/" className="block w-full bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700">
              🏠 View Website
            </a>
            
            <button 
              onClick={() => window.open('https://charlesjasema.sanity.studio', '_blank')}
              className="block w-full bg-red-600 text-white text-center py-3 rounded hover:bg-red-700"
            >
              🎨 Open Sanity Studio (External)
            </button>
            
            <a href="/api/sanity-test" target="_blank" className="block w-full bg-green-600 text-white text-center py-3 rounded hover:bg-green-700">
              🔍 Test API Connection
            </a>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Quick Start:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Use external Sanity Studio for content management</li>
              <li>• Check API connection if content isn't loading</li>
              <li>• Visit main website to see changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}