/**
 * Secure Service Worker for Charles Jasema Portfolio
 * 
 * Implements caching strategies with security best practices
 */

const CACHE_NAME = 'charles-jasema-portfolio-v1';
const RUNTIME_CACHE = 'runtime-cache';
const PRECACHE_URLS = [
  '/',
  '/portfolio',
  '/music', 
  '/contact',
  '/about',
  '/manifest.json',
  '/images/charles-jasema-professional-headshot.jpg',
  '/images/charles-jasema-code-design-logo.jpg'
];

// Security headers to add to cached responses
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};

/**
 * Install event - precache essential resources
 */
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Precaching resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .catch((error) => {
        console.error('Precaching failed:', error);
      })
  );
  
  // Skip waiting to activate immediately
  self.skipWaiting();
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // Claim all clients immediately
  self.clients.claim();
});

/**
 * Fetch event - implement caching strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Skip requests with suspicious patterns
  if (isSuspiciousRequest(request)) {
    console.warn('Blocking suspicious request:', request.url);
    return;
  }
  
  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same-origin requests
    if (url.pathname.startsWith('/api/')) {
      // API requests - network first
      event.respondWith(networkFirst(request));
    } else if (url.pathname.startsWith('/images/') || url.pathname.startsWith('/_next/static/')) {
      // Static assets - cache first
      event.respondWith(cacheFirst(request));
    } else {
      // Pages - stale while revalidate
      event.respondWith(staleWhileRevalidate(request));
    }
  } else {
    // Cross-origin requests - network only with security checks
    event.respondWith(networkOnlySecure(request));
  }
});

/**
 * Network first strategy - good for API requests
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return addSecurityHeaders(networkResponse);
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return addSecurityHeaders(cachedResponse);
    }
    
    // Return error page for failed API requests
    return new Response(
      JSON.stringify({ error: 'Network unavailable' }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/json',
          ...SECURITY_HEADERS
        }
      }
    );
  }
}

/**
 * Cache first strategy - good for static assets
 */
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return addSecurityHeaders(cachedResponse);
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return addSecurityHeaders(networkResponse);
  } catch (error) {
    console.log('Failed to fetch asset:', error);
    return new Response('Asset unavailable', { 
      status: 404,
      headers: SECURITY_HEADERS
    });
  }
}

/**
 * Stale while revalidate strategy - good for pages
 */
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Start fetch in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(RUNTIME_CACHE);
      cache.then((cache) => cache.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch((error) => {
    console.log('Background fetch failed:', error);
    return null;
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return addSecurityHeaders(cachedResponse);
  }
  
  // Otherwise wait for network
  try {
    const networkResponse = await fetchPromise;
    return addSecurityHeaders(networkResponse);
  } catch (error) {
    return new Response('Page unavailable offline', {
      status: 503,
      headers: {
        'Content-Type': 'text/html',
        ...SECURITY_HEADERS
      }
    });
  }
}

/**
 * Network only with security checks - for cross-origin requests
 */
async function networkOnlySecure(request) {
  // Validate cross-origin request
  const url = new URL(request.url);
  const allowedDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'www.google-analytics.com',
    'googletagmanager.com',
    'cdn.sanity.io',
    'api.sanity.io',
    'vitals.vercel-analytics.com'
  ];
  
  if (!allowedDomains.some(domain => url.hostname.includes(domain))) {
    console.warn('Blocked request to unauthorized domain:', url.hostname);
    return new Response('Unauthorized', { 
      status: 403,
      headers: SECURITY_HEADERS
    });
  }
  
  try {
    const response = await fetch(request);
    return addSecurityHeaders(response);
  } catch (error) {
    console.log('Cross-origin request failed:', error);
    return new Response('External resource unavailable', {
      status: 503,
      headers: SECURITY_HEADERS
    });
  }
}

/**
 * Check for suspicious request patterns
 */
function isSuspiciousRequest(request) {
  const url = request.url.toLowerCase();
  const suspiciousPatterns = [
    /\.\./,  // Path traversal
    /<script/,  // XSS attempts
    /javascript:/,  // JavaScript protocol
    /data:.*base64/,  // Data URLs
    /eval\(/,  // Code execution
    /exec\(/,  // Command execution
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(url));
}

/**
 * Add security headers to responses
 */
function addSecurityHeaders(response) {
  if (!response) return response;
  
  // Clone response to make it mutable
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  });
  
  // Add security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  
  return newResponse;
}

/**
 * Handle push notifications
 */
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }
  
  try {
    const data = event.data.json();
    
    // Validate notification data
    if (!data.title || typeof data.title !== 'string') {
      console.warn('Invalid notification data');
      return;
    }
    
    const options = {
      body: data.body || '',
      icon: '/images/icon-192x192.png',
      badge: '/images/icon-96x96.png',
      tag: 'charles-jasema-notification',
      requireInteraction: false,
      silent: false,
      data: {
        url: data.url || '/',
        timestamp: Date.now()
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Push notification error:', error);
  }
});

/**
 * Handle notification click
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if the page is already open
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Open new window if not already open
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

/**
 * Handle background sync
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

/**
 * Sync contact form data when back online
 */
async function syncContactForm() {
  try {
    // This would sync any pending contact form submissions
    console.log('Syncing contact form data...');
    // Implementation would depend on your specific needs
  } catch (error) {
    console.error('Contact form sync failed:', error);
  }
}

/**
 * Handle message from main thread
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});