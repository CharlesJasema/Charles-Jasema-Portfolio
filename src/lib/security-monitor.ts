/**
 * Security Monitoring System
 * 
 * Comprehensive security monitoring and incident response
 */

interface SecurityIncident {
  id: string;
  type: 'xss' | 'sql_injection' | 'csrf' | 'rate_limit' | 'suspicious_request' | 'unauthorized_access';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  ip?: string;
  userAgent?: string;
  url?: string;
  timestamp: number;
  blocked: boolean;
  metadata?: Record<string, any>;
}

interface SecurityMetrics {
  totalIncidents: number;
  blockedRequests: number;
  suspiciousIPs: Set<string>;
  rateLimitHits: number;
  lastIncident?: SecurityIncident;
}

class SecurityMonitor {
  private incidents: SecurityIncident[] = [];
  private metrics: SecurityMetrics = {
    totalIncidents: 0,
    blockedRequests: 0,
    suspiciousIPs: new Set(),
    rateLimitHits: 0,
  };
  private alertHandlers: ((incident: SecurityIncident) => void)[] = [];

  /**
   * Log a security incident
   */
  logIncident(incident: Omit<SecurityIncident, 'id' | 'timestamp'>): void {
    const fullIncident: SecurityIncident = {
      ...incident,
      id: this.generateIncidentId(),
      timestamp: Date.now(),
    };

    this.incidents.push(fullIncident);
    this.updateMetrics(fullIncident);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[SECURITY] ${incident.severity.toUpperCase()}: ${incident.description}`, {
        incident: fullIncident,
      });
    }

    // Trigger alerts for high/critical incidents
    if (incident.severity === 'high' || incident.severity === 'critical') {
      this.alertHandlers.forEach(handler => handler(fullIncident));
    }

    // Clean up old incidents (keep last 1000)
    if (this.incidents.length > 1000) {
      this.incidents = this.incidents.slice(-1000);
    }
  }

  /**
   * Check for suspicious patterns in request
   */
  analyzeRequest(req: {
    url: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
    body?: any;
    ip?: string;
  }): { isSuspicious: boolean; threats: string[] } {
    const threats: string[] = [];
    const { url, method, headers, body, ip } = req;

    // Check for XSS patterns
    const xssPatterns = [
      /<script[^>]*>[\s\S]*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>[\s\S]*?<\/iframe>/gi,
      /eval\s*\(/gi,
    ];

    const checkXSS = (value: string) => {
      return xssPatterns.some(pattern => pattern.test(value));
    };

    // Check URL for XSS
    if (checkXSS(url)) {
      threats.push('XSS_URL');
    }

    // Check headers for XSS
    Object.values(headers).forEach(header => {
      if (typeof header === 'string' && checkXSS(header)) {
        threats.push('XSS_HEADER');
      }
    });

    // Check body for XSS if it's a string
    if (typeof body === 'string' && checkXSS(body)) {
      threats.push('XSS_BODY');
    }

    // Check for SQL injection patterns
    const sqlPatterns = [
      /(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bCREATE\b|\bALTER\b)/gi,
      /(\bUNION\b|\bJOIN\b).*\bSELECT\b/gi,
      /['"]\s*;\s*\w+/gi,
      /\b(OR|AND)\b\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/gi,
    ];

    const checkSQL = (value: string) => {
      return sqlPatterns.some(pattern => pattern.test(value));
    };

    if (checkSQL(url)) {
      threats.push('SQL_INJECTION_URL');
    }

    if (typeof body === 'string' && checkSQL(body)) {
      threats.push('SQL_INJECTION_BODY');
    }

    // Check for path traversal
    if (url.includes('../') || url.includes('..\\')) {
      threats.push('PATH_TRAVERSAL');
    }

    // Check for suspicious file extensions in URL
    const dangerousExtensions = ['.php', '.asp', '.jsp', '.exe', '.bat', '.cmd', '.sh'];
    if (dangerousExtensions.some(ext => url.toLowerCase().includes(ext))) {
      threats.push('DANGEROUS_FILE_REQUEST');
    }

    // Check User-Agent for known bad patterns
    const userAgent = headers['user-agent'] || headers['User-Agent'];
    if (typeof userAgent === 'string') {
      const badUAPatterns = [
        /sqlmap/i,
        /nikto/i,
        /nessus/i,
        /masscan/i,
        /nmap/i,
        /havij/i,
        /w3af/i,
      ];

      if (badUAPatterns.some(pattern => pattern.test(userAgent))) {
        threats.push('MALICIOUS_USER_AGENT');
      }
    }

    // Check for suspicious request patterns
    if (method === 'POST' && !headers['content-type']) {
      threats.push('MISSING_CONTENT_TYPE');
    }

    // Check for extremely large requests
    const contentLength = headers['content-length'];
    if (contentLength && parseInt(contentLength as string) > 10 * 1024 * 1024) { // 10MB
      threats.push('OVERSIZED_REQUEST');
    }

    // Log incidents if threats found
    if (threats.length > 0) {
      this.logIncident({
        type: this.categorizeThreats(threats),
        severity: this.assessSeverity(threats),
        description: `Suspicious request detected: ${threats.join(', ')}`,
        ip,
        userAgent: typeof userAgent === 'string' ? userAgent : undefined,
        url,
        blocked: true,
        metadata: { threats, method },
      });
    }

    return {
      isSuspicious: threats.length > 0,
      threats,
    };
  }

  /**
   * Check rate limits for IP
   */
  checkRateLimit(ip: string, limit: number = 100, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get recent incidents from this IP
    const recentIncidents = this.incidents.filter(
      incident => incident.ip === ip && incident.timestamp > windowStart
    );

    if (recentIncidents.length >= limit) {
      this.logIncident({
        type: 'rate_limit',
        severity: 'medium',
        description: `Rate limit exceeded: ${recentIncidents.length} requests in ${windowMs}ms`,
        ip,
        blocked: true,
        metadata: { requestCount: recentIncidents.length, windowMs },
      });

      this.metrics.rateLimitHits++;
      return false; // Blocked
    }

    return true; // Allowed
  }

  /**
   * Get security metrics
   */
  getMetrics(): SecurityMetrics {
    return { ...this.metrics };
  }

  /**
   * Get recent incidents
   */
  getRecentIncidents(limit: number = 50): SecurityIncident[] {
    return this.incidents.slice(-limit).reverse();
  }

  /**
   * Add alert handler
   */
  onAlert(handler: (incident: SecurityIncident) => void): void {
    this.alertHandlers.push(handler);
  }

  /**
   * Generate security report
   */
  generateReport(): {
    summary: SecurityMetrics;
    recentIncidents: SecurityIncident[];
    topThreats: { type: string; count: number }[];
    suspiciousIPs: { ip: string; incidentCount: number }[];
  } {
    const recentIncidents = this.getRecentIncidents(100);
    
    // Count threats by type
    const threatCounts: Record<string, number> = {};
    recentIncidents.forEach(incident => {
      threatCounts[incident.type] = (threatCounts[incident.type] || 0) + 1;
    });

    const topThreats = Object.entries(threatCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Count incidents by IP
    const ipCounts: Record<string, number> = {};
    recentIncidents.forEach(incident => {
      if (incident.ip) {
        ipCounts[incident.ip] = (ipCounts[incident.ip] || 0) + 1;
      }
    });

    const suspiciousIPs = Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, incidentCount: count }))
      .sort((a, b) => b.incidentCount - a.incidentCount)
      .slice(0, 20);

    return {
      summary: this.getMetrics(),
      recentIncidents: recentIncidents.slice(0, 20),
      topThreats,
      suspiciousIPs,
    };
  }

  private generateIncidentId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private updateMetrics(incident: SecurityIncident): void {
    this.metrics.totalIncidents++;
    if (incident.blocked) {
      this.metrics.blockedRequests++;
    }
    if (incident.ip) {
      this.metrics.suspiciousIPs.add(incident.ip);
    }
    this.metrics.lastIncident = incident;
  }

  private categorizeThreats(threats: string[]): SecurityIncident['type'] {
    if (threats.some(t => t.startsWith('XSS'))) return 'xss';
    if (threats.some(t => t.startsWith('SQL'))) return 'sql_injection';
    if (threats.includes('RATE_LIMIT')) return 'rate_limit';
    return 'suspicious_request';
  }

  private assessSeverity(threats: string[]): SecurityIncident['severity'] {
    const criticalThreats = ['SQL_INJECTION_BODY', 'XSS_BODY'];
    const highThreats = ['SQL_INJECTION_URL', 'XSS_URL', 'PATH_TRAVERSAL'];
    const mediumThreats = ['MALICIOUS_USER_AGENT', 'DANGEROUS_FILE_REQUEST'];

    if (threats.some(t => criticalThreats.includes(t))) return 'critical';
    if (threats.some(t => highThreats.includes(t))) return 'high';
    if (threats.some(t => mediumThreats.includes(t))) return 'medium';
    return 'low';
  }
}

// Create singleton instance
export const securityMonitor = new SecurityMonitor();

// Set up alert handlers
if (typeof window === 'undefined') {
  // Server-side: Log critical incidents
  securityMonitor.onAlert((incident) => {
    console.error('[SECURITY ALERT]', {
      id: incident.id,
      type: incident.type,
      severity: incident.severity,
      description: incident.description,
      ip: incident.ip,
      url: incident.url,
      timestamp: new Date(incident.timestamp).toISOString(),
    });

    // In production, you might want to send alerts to monitoring services
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to monitoring service
      // monitoringService.alert(incident);
    }
  });
}

// Security middleware helper
export function createSecurityMiddleware() {
  return (req: any, res: any, next: any) => {
    const analysis = securityMonitor.analyzeRequest({
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
      ip: req.ip || req.connection.remoteAddress,
    });

    if (analysis.isSuspicious) {
      return res.status(403).json({
        error: 'Request blocked for security reasons',
        requestId: req.headers['x-request-id'] || 'unknown',
      });
    }

    // Check rate limits
    const ip = req.ip || req.connection.remoteAddress;
    if (ip && !securityMonitor.checkRateLimit(ip)) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        retryAfter: 900, // 15 minutes
      });
    }

    next();
  };
}

export default securityMonitor;