/**
 * Recruiter Mode Authentication
 * 
 * Provides secure authentication system for recruiters to access
 * enhanced portfolio features, private projects, and contact information
 */

interface RecruiterSession {
  id: string;
  authenticated: boolean;
  accessLevel: 'basic' | 'premium' | 'full';
  expiresAt: number;
  features: string[];
  metadata: {
    loginTime: string;
    userAgent?: string;
    ip?: string;
  };
}

interface AuthResult {
  success: boolean;
  session?: RecruiterSession;
  error?: string;
  accessToken?: string;
}

class RecruiterAuthService {
  private readonly ACCESS_PASSWORD: string;
  private readonly SESSION_SECRET: string;
  private readonly SESSION_DURATION: number;
  private activeSessions: Map<string, RecruiterSession> = new Map();

  constructor() {
    this.ACCESS_PASSWORD = process.env.RECRUITER_ACCESS_PASSWORD || '';
    this.SESSION_SECRET = process.env.RECRUITER_SESSION_SECRET || '';
    this.SESSION_DURATION = parseInt(process.env.RECRUITER_SESSION_DURATION || '86400000'); // 24 hours default
  }

  /**
   * Check if recruiter authentication is configured
   */
  public isConfigured(): boolean {
    return !!(this.ACCESS_PASSWORD && this.SESSION_SECRET);
  }

  /**
   * Authenticate recruiter with password
   */
  public authenticate(password: string, userInfo?: {
    userAgent?: string;
    ip?: string;
  }): AuthResult {
    try {
      if (!this.isConfigured()) {
        return { success: false, error: 'Recruiter access not configured' };
      }

      // Validate password
      if (!password || password !== this.ACCESS_PASSWORD) {
        // Log failed attempt for security monitoring
        console.log('Recruiter authentication failed:', {
          timestamp: new Date().toISOString(),
          ip: userInfo?.ip?.replace(/\d+/g, 'XXX'),
          userAgent: userInfo?.userAgent?.substring(0, 50),
        });
        
        return { success: false, error: 'Invalid access password' };
      }

      // Generate session
      const sessionId = this.generateSessionId();
      const expiresAt = Date.now() + this.SESSION_DURATION;

      const session: RecruiterSession = {
        id: sessionId,
        authenticated: true,
        accessLevel: 'full',
        expiresAt,
        features: [
          'private_projects',
          'detailed_experience',
          'contact_information',
          'salary_expectations',
          'availability_status',
          'references',
          'certifications',
          'downloadable_resume',
          'project_source_code',
        ],
        metadata: {
          loginTime: new Date().toISOString(),
          userAgent: userInfo?.userAgent,
          ip: userInfo?.ip,
        },
      };

      // Store session
      this.activeSessions.set(sessionId, session);

      // Generate access token
      const accessToken = this.generateAccessToken(sessionId);

      // Log successful authentication
      console.log('Recruiter authentication successful:', {
        sessionId: sessionId.substring(0, 8) + '***',
        timestamp: new Date().toISOString(),
        expiresAt: new Date(expiresAt).toISOString(),
        ip: userInfo?.ip?.replace(/\d+/g, 'XXX'),
      });

      return {
        success: true,
        session,
        accessToken,
      };
    } catch (error) {
      console.error('Recruiter authentication error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Validate session and access token
   */
  public validateSession(accessToken: string): {
    isValid: boolean;
    session?: RecruiterSession;
    error?: string;
  } {
    try {
      if (!accessToken) {
        return { isValid: false, error: 'No access token provided' };
      }

      // Decode session ID from access token
      const sessionId = this.decodeAccessToken(accessToken);
      if (!sessionId) {
        return { isValid: false, error: 'Invalid access token format' };
      }

      // Get session
      const session = this.activeSessions.get(sessionId);
      if (!session) {
        return { isValid: false, error: 'Session not found' };
      }

      // Check expiry
      if (Date.now() > session.expiresAt) {
        this.activeSessions.delete(sessionId);
        return { isValid: false, error: 'Session expired' };
      }

      return { isValid: true, session };
    } catch (error) {
      console.error('Session validation error:', error);
      return { isValid: false, error: 'Session validation failed' };
    }
  }

  /**
   * Extend session duration
   */
  public extendSession(sessionId: string): boolean {
    try {
      const session = this.activeSessions.get(sessionId);
      if (!session || Date.now() > session.expiresAt) {
        return false;
      }

      session.expiresAt = Date.now() + this.SESSION_DURATION;
      this.activeSessions.set(sessionId, session);
      
      return true;
    } catch (error) {
      console.error('Session extension error:', error);
      return false;
    }
  }

  /**
   * Logout and invalidate session
   */
  public logout(sessionId: string): boolean {
    try {
      const deleted = this.activeSessions.delete(sessionId);
      
      if (deleted) {
        console.log('Recruiter session logged out:', {
          sessionId: sessionId.substring(0, 8) + '***',
          timestamp: new Date().toISOString(),
        });
      }
      
      return deleted;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  /**
   * Clean up expired sessions
   */
  public cleanupExpiredSessions(): number {
    let cleaned = 0;
    const now = Date.now();
    
    for (const [sessionId, session] of this.activeSessions.entries()) {
      if (now > session.expiresAt) {
        this.activeSessions.delete(sessionId);
        cleaned++;
      }
    }
    
    if (cleaned > 0) {
      console.log(`Cleaned up ${cleaned} expired recruiter sessions`);
    }
    
    return cleaned;
  }

  /**
   * Get active sessions count (for monitoring)
   */
  public getActiveSessionsCount(): number {
    this.cleanupExpiredSessions(); // Clean up before counting
    return this.activeSessions.size;
  }

  /**
   * Generate secure session ID
   */
  private generateSessionId(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generate access token from session ID
   */
  private generateAccessToken(sessionId: string): string {
    // Simple encoding - in production, use JWT or similar
    const timestamp = Date.now().toString(36);
    const data = `${sessionId}:${timestamp}`;
    
    // Basic encryption (in production, use proper encryption)
    return Buffer.from(data).toString('base64url');
  }

  /**
   * Decode session ID from access token
   */
  private decodeAccessToken(accessToken: string): string | null {
    try {
      const data = Buffer.from(accessToken, 'base64url').toString('utf8');
      const [sessionId] = data.split(':');
      return sessionId || null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get enhanced portfolio data for recruiters
   */
  public getEnhancedPortfolioData(): {
    privateProjects: any[];
    detailedExperience: any[];
    contactInfo: any;
    availability: any;
    references: any[];
    certifications: any[];
  } {
    return {
      privateProjects: [
        {
          id: 'private-1',
          title: 'Enterprise Banking System',
          description: 'Full-stack banking application with microservices architecture, real-time transactions, and advanced security features.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
          highlights: [
            'Processed 10,000+ daily transactions',
            'Implemented end-to-end encryption',
            'Achieved 99.9% uptime',
            'GDPR and PCI DSS compliant'
          ],
          duration: '8 months',
          team: '12 developers',
          role: 'Senior Full-Stack Developer & Tech Lead',
        },
        {
          id: 'private-2',
          title: 'Healthcare Management Platform',
          description: 'Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine capabilities.',
          technologies: ['Next.js', 'TypeScript', 'MongoDB', 'WebRTC', 'AWS', 'Stripe'],
          highlights: [
            'Served 5,000+ healthcare providers',
            'HIPAA compliant architecture',
            'Real-time video consultations',
            'Automated billing integration'
          ],
          duration: '6 months',
          team: '8 developers',
          role: 'Lead Frontend Developer',
        },
      ],
      
      detailedExperience: [
        {
          company: 'TechSolutions Uganda Ltd',
          position: 'Senior Software Engineer',
          duration: '2022 - Present',
          location: 'Kampala, Uganda',
          responsibilities: [
            'Lead development of client web applications using React and Next.js',
            'Architect scalable backend systems with Node.js and cloud infrastructure',
            'Mentor junior developers and conduct code reviews',
            'Collaborate with product managers and designers on technical requirements',
            'Implement CI/CD pipelines and automated testing strategies'
          ],
          achievements: [
            'Increased application performance by 40% through optimization',
            'Led migration of legacy systems to modern tech stack',
            'Established coding standards and best practices for the team',
            'Delivered 15+ successful projects ahead of schedule'
          ],
        },
        {
          company: 'Digital Innovations Hub',
          position: 'Full-Stack Developer',
          duration: '2020 - 2022',
          location: 'Remote',
          responsibilities: [
            'Developed and maintained multiple client websites and web applications',
            'Created responsive designs and user interfaces',
            'Integrated third-party APIs and payment systems',
            'Provided technical support and maintenance services'
          ],
          achievements: [
            'Built 20+ professional websites for local businesses',
            'Increased client satisfaction scores to 95%+',
            'Reduced development time by 30% through reusable components',
            'Expanded service offerings to include mobile app development'
          ],
        },
      ],
      
      contactInfo: {
        email: 'brocharles001@gmail.com',
        phone: '+256 785 446 877',
        whatsapp: '+256 785 446 877',
        linkedin: 'https://linkedin.com/in/charlesjasema',
        location: 'Kampala, Uganda',
        timezone: 'EAT (UTC+3)',
        preferredContact: 'WhatsApp or Email',
        responseTime: 'Usually within 2-4 hours during business days',
      },
      
      availability: {
        status: 'Open to opportunities',
        startDate: 'Immediately available',
        workType: ['Full-time', 'Contract', 'Part-time'],
        remote: true,
        relocation: 'Open to relocation for the right opportunity',
        salaryExpectation: {
          currency: 'USD',
          range: '$2,000 - $4,000 per month',
          note: 'Negotiable based on role and responsibilities'
        },
        preferredRoles: [
          'Senior Full-Stack Developer',
          'Frontend Team Lead',
          'Software Architect',
          'Technical Consultant'
        ],
      },
      
      references: [
        {
          name: 'Sarah Mitchell',
          position: 'Engineering Manager',
          company: 'TechSolutions Uganda Ltd',
          email: 'sarah.mitchell@techsolutions.ug',
          phone: '+256 XXX XXX XXX',
          relationship: 'Direct Supervisor (2 years)',
        },
        {
          name: 'David Okello',
          position: 'Product Manager',
          company: 'Digital Innovations Hub',
          email: 'david@digitalinnovations.com',
          phone: '+256 XXX XXX XXX',
          relationship: 'Collaborator (1.5 years)',
        },
        {
          name: 'Pastor James Mukasa',
          position: 'Senior Pastor',
          company: 'Restoration Church',
          email: 'pastor.james@restoration.ug',
          phone: '+256 XXX XXX XXX',
          relationship: 'Ministry Supervisor (3 years)',
        },
      ],
      
      certifications: [
        {
          name: 'AWS Certified Solutions Architect',
          issuer: 'Amazon Web Services',
          date: '2023',
          credentialId: 'AWS-XXXX-XXXX',
          verificationUrl: 'https://aws.amazon.com/verification',
        },
        {
          name: 'Google Analytics Certified',
          issuer: 'Google',
          date: '2023',
          credentialId: 'GOOGLE-XXXX-XXXX',
          verificationUrl: 'https://skillshop.exceedlms.com/profiles/verify',
        },
        {
          name: 'React Advanced Certification',
          issuer: 'Meta (Facebook)',
          date: '2022',
          credentialId: 'META-XXXX-XXXX',
          verificationUrl: 'https://developers.facebook.com/certification',
        },
      ],
    };
  }
}

// Export singleton instance
export const recruiterAuthService = new RecruiterAuthService();

// Export types
export type { RecruiterSession, AuthResult };
export { RecruiterAuthService };