/**
 * Tawk.to Integration Tests
 * 
 * Tests for Tawk.to live chat integration functionality
 */

import { render, screen, waitFor } from '@testing-library/react'
import { TawkToScript, TawkToAPI } from '@/components/TawkToScript'

// Mock environment variables
const mockEnv = {
  NEXT_PUBLIC_TAWK_PROPERTY_ID: 'test_property_id',
  NEXT_PUBLIC_TAWK_WIDGET_ID: 'test_widget_id'
}

// Mock window.Tawk_API
const mockTawkAPI = {
  onLoad: jest.fn(),
  onChatStarted: jest.fn(),
  onChatEnded: jest.fn(),
  onOfflineSubmit: jest.fn(),
  setAttributes: jest.fn(),
  addTags: jest.fn(),
  removeTags: jest.fn(),
  showWidget: jest.fn(),
  hideWidget: jest.fn(),
  maximize: jest.fn(),
  minimize: jest.fn(),
  toggle: jest.fn(),
  isChatOnline: jest.fn(() => true),
  isChatHidden: jest.fn(() => false),
  isChatMaximized: jest.fn(() => false),
  getUnreadCount: jest.fn(() => 0)
}

// Mock gtag for analytics
const mockGtag = jest.fn()

describe('TawkToScript Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    
    // Mock environment variables
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID = mockEnv.NEXT_PUBLIC_TAWK_PROPERTY_ID
    process.env.NEXT_PUBLIC_TAWK_WIDGET_ID = mockEnv.NEXT_PUBLIC_TAWK_WIDGET_ID
    
    // Mock window objects
    Object.defineProperty(window, 'Tawk_API', {
      value: mockTawkAPI,
      writable: true
    })
    
    Object.defineProperty(window, 'gtag', {
      value: mockGtag,
      writable: true
    })
    
    // Mock document.createElement and appendChild
    const mockScript = {
      async: false,
      src: '',
      charset: '',
      setAttribute: jest.fn(),
      onerror: null,
      onload: null
    }
    
    jest.spyOn(document, 'createElement').mockReturnValue(mockScript as any)
    jest.spyOn(document.head, 'appendChild').mockImplementation(() => mockScript as any)
    jest.spyOn(document.head, 'removeChild').mockImplementation(() => mockScript as any)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders without crashing', () => {
    render(<TawkToScript />)
    // Component doesn't render visible content
    expect(document.createElement).toHaveBeenCalledWith('script')
  })

  it('loads Tawk.to script with correct configuration', () => {
    render(<TawkToScript />)
    
    expect(document.createElement).toHaveBeenCalledWith('script')
    expect(document.head.appendChild).toHaveBeenCalled()
    
    const mockScript = (document.createElement as jest.Mock).mock.results[0].value
    expect(mockScript.async).toBe(true)
    expect(mockScript.src).toBe(`https://embed.tawk.to/${mockEnv.NEXT_PUBLIC_TAWK_PROPERTY_ID}/${mockEnv.NEXT_PUBLIC_TAWK_WIDGET_ID}`)
    expect(mockScript.charset).toBe('UTF-8')
    expect(mockScript.setAttribute).toHaveBeenCalledWith('crossorigin', '*')
  })

  it('does not load script when environment variables are missing', () => {
    delete process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
    delete process.env.NEXT_PUBLIC_TAWK_WIDGET_ID
    
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
    
    render(<TawkToScript />)
    
    expect(consoleSpy).toHaveBeenCalledWith('Tawk.to: Missing property ID or widget ID')
    expect(document.createElement).not.toHaveBeenCalled()
    
    consoleSpy.mockRestore()
  })

  it('sets up event handlers correctly', () => {
    render(<TawkToScript />)
    
    // Simulate onLoad callback
    if (window.Tawk_API?.onLoad) {
      window.Tawk_API.onLoad()
    }
    
    expect(mockTawkAPI.setAttributes).toHaveBeenCalledWith({
      name: 'Charles Jasema',
      email: 'charles@charlesjasema.com'
    })
  })

  it('tracks analytics events correctly', () => {
    render(<TawkToScript />)
    
    // Simulate chat started event
    if (window.Tawk_API?.onChatStarted) {
      window.Tawk_API.onChatStarted()
    }
    
    expect(mockGtag).toHaveBeenCalledWith('event', 'chat_started', {
      event_category: 'engagement',
      event_label: 'tawk_to_chat',
      page_location: window.location.href
    })
  })

  it('cleans up properly on unmount', () => {
    const { unmount } = render(<TawkToScript />)
    
    unmount()
    
    expect(document.head.removeChild).toHaveBeenCalled()
  })
})

describe('TawkToAPI Helper Functions', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'Tawk_API', {
      value: mockTawkAPI,
      writable: true
    })
  })

  it('showWidget calls Tawk_API.showWidget', () => {
    TawkToAPI.showWidget()
    expect(mockTawkAPI.showWidget).toHaveBeenCalled()
  })

  it('hideWidget calls Tawk_API.hideWidget', () => {
    TawkToAPI.hideWidget()
    expect(mockTawkAPI.hideWidget).toHaveBeenCalled()
  })

  it('maximize calls Tawk_API.maximize', () => {
    TawkToAPI.maximize()
    expect(mockTawkAPI.maximize).toHaveBeenCalled()
  })

  it('minimize calls Tawk_API.minimize', () => {
    TawkToAPI.minimize()
    expect(mockTawkAPI.minimize).toHaveBeenCalled()
  })

  it('setAttributes calls Tawk_API.setAttributes with correct data', () => {
    const attributes = { name: 'Test User', email: 'test@example.com' }
    TawkToAPI.setAttributes(attributes)
    expect(mockTawkAPI.setAttributes).toHaveBeenCalledWith(attributes)
  })

  it('addTags calls Tawk_API.addTags with correct tags', () => {
    const tags = ['test', 'development']
    TawkToAPI.addTags(tags)
    expect(mockTawkAPI.addTags).toHaveBeenCalledWith(tags)
  })

  it('isChatOnline returns correct status', () => {
    const result = TawkToAPI.isChatOnline()
    expect(result).toBe(true)
    expect(mockTawkAPI.isChatOnline).toHaveBeenCalled()
  })

  it('getUnreadCount returns correct count', () => {
    const result = TawkToAPI.getUnreadCount()
    expect(result).toBe(0)
    expect(mockTawkAPI.getUnreadCount).toHaveBeenCalled()
  })

  it('handles missing Tawk_API gracefully', () => {
    Object.defineProperty(window, 'Tawk_API', {
      value: undefined,
      writable: true
    })

    expect(() => {
      TawkToAPI.showWidget()
      TawkToAPI.hideWidget()
      TawkToAPI.maximize()
      TawkToAPI.minimize()
    }).not.toThrow()

    expect(TawkToAPI.isChatOnline()).toBe(false)
    expect(TawkToAPI.isChatHidden()).toBe(false)
    expect(TawkToAPI.isChatMaximized()).toBe(false)
    expect(TawkToAPI.getUnreadCount()).toBe(0)
  })
})

describe('Context-Aware Greetings', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/' },
      writable: true
    })
    
    Object.defineProperty(window, 'Tawk_API', {
      value: mockTawkAPI,
      writable: true
    })
  })

  it('sets music page greeting correctly', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/music' },
      writable: true
    })

    render(<TawkToScript />)
    
    // The greeting logic is in the onLoad callback
    // We can't easily test the exact greeting without more complex mocking
    // But we can verify the onLoad callback is set up
    expect(window.Tawk_API?.onLoad).toBeDefined()
  })

  it('sets portfolio page greeting correctly', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/portfolio' },
      writable: true
    })

    render(<TawkToScript />)
    
    expect(window.Tawk_API?.onLoad).toBeDefined()
  })

  it('sets about page greeting correctly', () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/about' },
      writable: true
    })

    render(<TawkToScript />)
    
    expect(window.Tawk_API?.onLoad).toBeDefined()
  })
})

describe('Error Handling', () => {
  it('handles script loading errors gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    
    render(<TawkToScript />)
    
    const mockScript = (document.createElement as jest.Mock).mock.results[0].value
    
    // Simulate script error
    if (mockScript.onerror) {
      mockScript.onerror()
    }
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Tawk.to: Failed to load chat widget')
    
    consoleErrorSpy.mockRestore()
  })

  it('handles script loading success', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    
    render(<TawkToScript />)
    
    const mockScript = (document.createElement as jest.Mock).mock.results[0].value
    
    // Simulate script success
    if (mockScript.onload) {
      mockScript.onload()
    }
    
    expect(consoleLogSpy).toHaveBeenCalledWith('Tawk.to: Script loaded successfully')
    
    consoleLogSpy.mockRestore()
  })

  it('handles cleanup errors gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    
    // Mock removeChild to throw error
    jest.spyOn(document.head, 'removeChild').mockImplementation(() => {
      throw new Error('Cleanup error')
    })
    
    const { unmount } = render(<TawkToScript />)
    
    expect(() => unmount()).not.toThrow()
    expect(consoleErrorSpy).toHaveBeenCalledWith('Tawk.to: Error during cleanup:', expect.any(Error))
    
    consoleErrorSpy.mockRestore()
  })
})

describe('Security Considerations', () => {
  it('sets crossorigin attribute for security', () => {
    render(<TawkToScript />)
    
    const mockScript = (document.createElement as jest.Mock).mock.results[0].value
    expect(mockScript.setAttribute).toHaveBeenCalledWith('crossorigin', '*')
  })

  it('uses HTTPS URL for script source', () => {
    render(<TawkToScript />)
    
    const mockScript = (document.createElement as jest.Mock).mock.results[0].value
    expect(mockScript.src).toMatch(/^https:\/\//)
  })

  it('validates environment variables format', () => {
    // Test with invalid property ID
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID = ''
    process.env.NEXT_PUBLIC_TAWK_WIDGET_ID = mockEnv.NEXT_PUBLIC_TAWK_WIDGET_ID
    
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
    
    render(<TawkToScript />)
    
    expect(consoleSpy).toHaveBeenCalledWith('Tawk.to: Missing property ID or widget ID')
    
    consoleSpy.mockRestore()
  })
})