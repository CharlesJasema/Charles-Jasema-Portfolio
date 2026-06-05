'use client';

import { useState, useEffect } from 'react';
import { FaEnvelope, FaWhatsapp, FaPhone, FaLinkedin, FaTwitter, FaYoutube, FaGithub, FaInstagram, FaFacebook, FaMusic, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Button, Card, Input, TextArea, Select } from '@/components/ui';
import { ContactPageCTAs } from '@/components/cta';
import { siteConfig } from '@/config/site';
import { contactConfig } from '@/config/contact';
import { inputValidation, csrfProtection, rateLimiting } from '@/lib/security';

// Create rate limiter for contact form (5 submissions per 15 minutes)
const contactRateLimiter = rateLimiting.createRateLimiter(5, 15 * 60 * 1000);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [csrfToken, setCsrfToken] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = csrfProtection.generateToken();
    setCsrfToken(token);
    // Store token in session storage for validation
    sessionStorage.setItem('contact_csrf_token', token);
  }, []);

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    // Validate required fields
    if (!formData.name.trim()) {
      errors.push('Name is required');
    } else if (formData.name.length < 2 || formData.name.length > 100) {
      errors.push('Name must be between 2 and 100 characters');
    }

    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else if (!inputValidation.isValidEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.subject.trim()) {
      errors.push('Subject is required');
    } else if (formData.subject.length < 5 || formData.subject.length > 200) {
      errors.push('Subject must be between 5 and 200 characters');
    }

    if (!formData.message.trim()) {
      errors.push('Message is required');
    } else if (formData.message.length < 10 || formData.message.length > 2000) {
      errors.push('Message must be between 10 and 2000 characters');
    }

    // Check for potential security threats
    const formValidation = inputValidation.validateFormData(formData);
    if (!formValidation.isValid) {
      errors.push(...formValidation.errors);
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setValidationErrors([]);
    setSubmitStatus('idle');

    // Validate form
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    // Check rate limiting
    const clientId = `${navigator.userAgent}_${window.location.hostname}`;
    if (!contactRateLimiter.isAllowed(clientId)) {
      setValidationErrors(['Too many submissions. Please wait before trying again.']);
      setSubmitStatus('error');
      return;
    }

    // Validate CSRF token
    const storedToken = sessionStorage.getItem('contact_csrf_token');
    if (!csrfProtection.validateToken(csrfToken, storedToken || '')) {
      setValidationErrors(['Security validation failed. Please refresh the page and try again.']);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize form data
      const sanitizedData = {
        name: inputValidation.sanitizeString(formData.name, 100),
        email: inputValidation.sanitizeString(formData.email, 254),
        subject: inputValidation.sanitizeString(formData.subject, 200),
        service: inputValidation.sanitizeString(formData.service, 50),
        message: inputValidation.sanitizeString(formData.message, 2000),
        csrfToken: csrfToken,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 200), // Limit user agent length
      };

      // TODO: Replace with actual API call
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', service: '', message: '' });
        
        // Generate new CSRF token for next submission
        const newToken = csrfProtection.generateToken();
        setCsrfToken(newToken);
        sessionStorage.setItem('contact_csrf_token', newToken);
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        const errorData = await response.json();
        setValidationErrors([errorData.message || 'Failed to send message. Please try again.']);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setValidationErrors(['Network error. Please check your connection and try again.']);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Basic input sanitization on change
    const sanitizedValue = inputValidation.sanitizeString(value, name === 'message' ? 2000 : 254);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue,
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-gray-900 dark:text-white">{contactConfig.header.title}</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
            {contactConfig.header.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <Card variant="elevated" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-primary-gold text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Email
              </h3>
              <p className="text-sm text-gray-600 dark:text-text-tertiary mb-3">
                Send me an email anytime
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-primary-gold hover:text-primary-gold/80 font-semibold break-all"
              >
                {siteConfig.contact.email}
              </a>
            </Card>

            {/* WhatsApp */}
            <Card variant="elevated" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-tech-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWhatsapp className="text-tech-teal text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                WhatsApp
              </h3>
              <p className="text-sm text-gray-600 dark:text-text-tertiary mb-3">
                Chat with me on WhatsApp
              </p>
              <a
                href={`https://wa.me/${siteConfig.contact.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tech-teal hover:text-tech-teal/80 font-semibold"
              >
                {siteConfig.contact.phone}
              </a>
            </Card>

            {/* Phone */}
            <Card variant="elevated" padding="lg" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-accent-red text-2xl" />
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Phone
              </h3>
              <p className="text-sm text-gray-600 dark:text-text-tertiary mb-3">
                Give me a call
              </p>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`}
                className="text-accent-red hover:text-accent-red/80 font-semibold"
              >
                {siteConfig.contact.phone}
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" padding="lg">
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                {contactConfig.form.title}
              </h2>
              <p className="text-gray-600 dark:text-text-tertiary">
                {contactConfig.form.subtitle}
              </p>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <FaExclamationCircle className="text-red-600 dark:text-red-400 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 dark:text-red-200 font-semibold mb-2">
                      Please fix the following errors:
                    </p>
                    <ul className="text-red-700 dark:text-red-300 text-sm space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>{error}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-green-800 dark:text-green-200">
                  {contactConfig.form.successMessage}
                </p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && validationErrors.length === 0 && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                <FaExclamationCircle className="text-red-600 dark:text-red-400 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-red-800 dark:text-red-200">
                  {contactConfig.form.errorMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CSRF Token (hidden) */}
              <input type="hidden" name="csrfToken" value={csrfToken} />
              
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Name <span className="text-accent-red">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Email <span className="text-accent-red">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={254}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Subject <span className="text-accent-red">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What is this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={200}
                  required
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Service Interested In
                </label>
                <Select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="software">Software Development</option>
                  <option value="design">Graphics Design</option>
                  <option value="music">Music Ministry / Booking</option>
                  <option value="videography">Videography</option>
                  <option value="general">General Inquiry</option>
                  <option value="other">Other</option>
                </Select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Message <span className="text-accent-red">*</span>
                </label>
                <TextArea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={2000}
                  rows={6}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? contactConfig.form.submitButton.loadingText : contactConfig.form.submitButton.text}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Social Media */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16 bg-slate-100 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {contactConfig.social.title}
            </h2>
            <p className="text-gray-700 dark:text-text-secondary">
              {contactConfig.social.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Professional */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Professional
              </h3>
              <div className="flex flex-wrap gap-4">
                <a href={siteConfig.professional.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center hover:bg-primary-gold/20 transition-colors">
                  <FaLinkedin className="text-primary-gold text-xl" />
                </a>
                <a href={siteConfig.professional.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center hover:bg-primary-gold/20 transition-colors">
                  <FaTwitter className="text-primary-gold text-xl" />
                </a>
                <a href={siteConfig.professional.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center hover:bg-primary-gold/20 transition-colors">
                  <FaYoutube className="text-primary-gold text-xl" />
                </a>
                <a href={siteConfig.professional.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-primary-gold/10 rounded-full flex items-center justify-center hover:bg-primary-gold/20 transition-colors">
                  <FaGithub className="text-primary-gold text-xl" />
                </a>
              </div>
            </Card>

            {/* Music Ministry */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Music Ministry
              </h3>
              <div className="flex flex-wrap gap-4">
                <a href={siteConfig.music.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center hover:bg-accent-red/20 transition-colors">
                  <FaInstagram className="text-accent-red text-xl" />
                </a>
                <a href={siteConfig.music.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center hover:bg-accent-red/20 transition-colors">
                  <FaTwitter className="text-accent-red text-xl" />
                </a>
                <a href={siteConfig.music.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center hover:bg-accent-red/20 transition-colors">
                  <FaYoutube className="text-accent-red text-xl" />
                </a>
                <a href={siteConfig.music.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center hover:bg-accent-red/20 transition-colors">
                  <FaFacebook className="text-accent-red text-xl" />
                </a>
                <a href={siteConfig.music.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center hover:bg-accent-red/20 transition-colors">
                  <SiTiktok className="text-accent-red text-xl" />
                </a>
                <a href={siteConfig.music.mdundo} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-accent-red/10 rounded-full flex items-center justify-center hover:bg-accent-red/20 transition-colors">
                  <FaMusic className="text-accent-red text-xl" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {contactConfig.faq.title}
            </h2>
          </div>

          <div className="space-y-4">
            {contactConfig.faq.items.map((item, index) => (
              <Card key={index} variant="elevated" padding="lg">
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-700 dark:text-text-secondary">
                  {item.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional CTAs */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ContactPageCTAs />
        </div>
      </section>
    </div>
  );
}
