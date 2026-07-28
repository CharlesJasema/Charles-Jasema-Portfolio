/**
 * Recruiter Access Page
 * 
 * Secure authentication portal for recruiters to access
 * enhanced portfolio features and private information
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  User, 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  DollarSign,
  Award,
  Download,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  LogOut
} from 'lucide-react';
import { EnhancedButton } from '@/components/ui/EnhancedButton';

interface RecruiterSession {
  id: string;
  accessLevel: string;
  features: string[];
  expiresAt: number;
}

interface PortfolioData {
  privateProjects: any[];
  detailedExperience: any[];
  contactInfo: any;
  availability: any;
  references: any[];
  certifications: any[];
}

export default function RecruiterPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<RecruiterSession | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // Generate CSRF token on mount
  useEffect(() => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    setCsrfToken(token);

    // Check for existing session
    validateExistingSession();
  }, []);

  const validateExistingSession = async () => {
    try {
      const token = localStorage.getItem('recruiter_token');
      if (!token) return;

      const response = await fetch('/api/recruiter/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          action: 'validate',
          accessToken: token,
          csrfToken,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        setSession(data.session);
        loadPortfolioData(token);
      } else {
        localStorage.removeItem('recruiter_token');
      }
    } catch (error) {
      console.error('Session validation error:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError('Please enter the access password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/recruiter/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          action: 'login',
          password: password.trim(),
          csrfToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('recruiter_token', data.accessToken);
        setIsAuthenticated(true);
        setSession(data.session);
        setPassword('');
        loadPortfolioData(data.accessToken);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadPortfolioData = async (token: string) => {
    try {
      const response = await fetch('/api/recruiter/portfolio', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setPortfolioData(data.data);
      } else {
        console.error('Failed to load portfolio data:', data.message);
      }
    } catch (error) {
      console.error('Portfolio data error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('recruiter_token');
      if (token) {
        await fetch('/api/recruiter/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({
            action: 'logout',
            accessToken: token,
            csrfToken,
          }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('recruiter_token');
      setIsAuthenticated(false);
      setSession(null);
      setPortfolioData(null);
    }
  };

  const formatSalary = (range: string) => {
    return range;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Recruiter Access Portal
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Access enhanced portfolio information and private projects
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Access Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter recruiter access password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <EnhancedButton
              type="submit"
              disabled={loading || !password.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Access Portfolio
                </>
              )}
            </EnhancedButton>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              For recruitment inquiries, contact Charles directly:
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:brocharles001@gmail.com"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a
                href="https://wa.me/256785446877"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recruiter Portal
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Access Level: {session?.accessLevel}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Session expires: {session ? new Date(session.expiresAt).toLocaleTimeString() : ''}
              </span>
              <EnhancedButton
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </EnhancedButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact & Availability */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a 
                    href={`mailto:${portfolioData.contactInfo.email}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    {portfolioData.contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a 
                    href={`tel:${portfolioData.contactInfo.phone}`}
                    className="text-gray-900 dark:text-white"
                  >
                    {portfolioData.contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {portfolioData.contactInfo.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Availability
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {portfolioData.availability.status}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date:</p>
                  <p className="text-gray-900 dark:text-white">{portfolioData.availability.startDate}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Work Types:</p>
                  <div className="flex flex-wrap gap-1">
                    {portfolioData.availability.workType.map((type: string) => (
                      <span 
                        key={type}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Salary Expectation:</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-gray-900 dark:text-white">
                      {portfolioData.availability.salaryExpectation.range} {portfolioData.availability.salaryExpectation.currency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {portfolioData.availability.salaryExpectation.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certifications
              </h3>
              
              <div className="space-y-3">
                {portfolioData.certifications.map((cert) => (
                  <div key={cert.name} className="border border-gray-100 dark:border-gray-700 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">{cert.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer} • {cert.date}</p>
                    <a 
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 mt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Verify
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Private Projects */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6" />
                Private Projects
              </h2>
              
              <div className="space-y-6">
                {portfolioData.privateProjects.map((project) => (
                  <div key={project.id} className="border border-gray-100 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Duration:</p>
                        <p className="text-gray-900 dark:text-white">{project.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Team Size:</p>
                        <p className="text-gray-900 dark:text-white">{project.team}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech: string) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Key Highlights:</p>
                      <ul className="space-y-1">
                        {project.highlights.map((highlight: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Experience */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <User className="w-6 h-6" />
                Professional Experience
              </h2>
              
              <div className="space-y-6">
                {portfolioData.detailedExperience.map((experience, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {experience.position}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {experience.company}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>{experience.duration}</p>
                        <p>{experience.location}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Responsibilities:</h4>
                        <ul className="space-y-1">
                          {experience.responsibilities.map((resp: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* References */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Professional References
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {portfolioData.references.map((reference, index) => (
                  <div key={index} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{reference.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{reference.position}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{reference.company}</p>
                    <p className="text-xs text-gray-500 mb-3">{reference.relationship}</p>
                    
                    <div className="space-y-1">
                      <a 
                        href={`mailto:${reference.email}`}
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                      >
                        <Mail className="w-3 h-3" />
                        Email
                      </a>
                      {reference.phone !== '+256 XXX XXX XXX' && (
                        <a 
                          href={`tel:${reference.phone}`}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <Phone className="w-3 h-3" />
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Download Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to Connect?</h3>
            <p className="text-blue-100 mb-6">
              Download Charles's detailed resume or schedule a conversation to discuss opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EnhancedButton
                href="mailto:brocharles001@gmail.com?subject=Recruitment Opportunity"
                external
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 border-white/20"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </EnhancedButton>
              <EnhancedButton
                href="https://wa.me/256785446877?text=Hi Charles, I'm interested in discussing a recruitment opportunity."
                external
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 border-white/20"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp Chat
              </EnhancedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}