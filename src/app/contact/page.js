'use client';

import { useState, useEffect } from 'react';
import { FaEnvelope, FaWhatsapp, FaPhone, FaLinkedin, FaTwitter, FaYoutube, FaGithub, FaInstagram, FaFacebook, FaMusic, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { EnhancedButton, Card, Input, TextArea, Select } from '@/components/ui';
import { ContactPageCTAs } from '@/components/cta';
import { sendContactEmail } from '@/lib/newsletter';
import toast from 'react-hot-toast';

// Simple rate limiting
const rateLimitMap = new Map();

function isRateLimited(userIP) {
  const now = Date.now();
  const limit = 5;
  const window = 15 * 60 * 1000; // 15 minutes
  
  if (!rateLimitMap.has(userIP)) {
    rateLimitMap.set(userIP, []);
  }
  
  const requests = rateLimitMap.get(userIP);
  const validRequests = requests.filter(time => now - time < window);
  
  if (validRequests.length >= limit) {
    return true;
  }
  
  validRequests.push(now);
  rateLimitMap.set(userIP, validRequests);
  return false;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [validationErrors, setValidationErrors] = useState([]);

  const serviceOptions = [
    { value: '', label: 'Select a service...', disabled: true },
    { value: 'web-development', label: '💻 Web Development' },
    { value: 'mobile-app-development', label: '📱 Mobile App Development' },
    { value: 'graphics-design', label: '🎨 Graphics Design & Branding' },
    { value: 'videography', label: '🎥 Videography & Video Production' },
    { value: 'it-support', label: '🔧 IT Support & Consultation' },
    { value: 'music-ministry', label: '🎵 Music Ministry & Performance' },
    { value: 'project-management', label: '📊 Project Management' },
    { value: 'digital-literacy-training', label: '🎓 Digital Literacy Training' },
    { value: 'collaboration', label: '🤝 Partnership & Collaboration' },
    { value: 'consultation', label: '💡 Technical Consultation' },
    { value: 'other', label: '📋 Other Services' },
  ];

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name?.trim()) {
      errors.push('Name is required');
    } else if (formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!formData.subject?.trim()) {
      errors.push('Subject is required for better context');
    }
    
    if (!formData.service) {
      errors.push('Please select a service to help us understand your needs');
    }
    
    if (!formData.message?.trim()) {
      errors.push('Message is required');
    } else if (formData.message.trim().length < 20) {
      errors.push('Please provide more details in your message (minimum 20 characters)');
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simple rate limiting check
      const userIP = 'client-side'; // In real app, would be handled server-side
      if (isRateLimited(userIP)) {
        throw new Error('Too many submissions. Please wait before trying again.');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          service: '',
          message: '',
        });
        toast.success('✅ Message sent successfully! I\'ll get back to you soon.');
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast.error(`❌ ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Let's <span className="text-primary-gold">Connect</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you need a developer for your next project or a performer for your event, 
            I'm here to help bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Send Me a Message
              </h2>
              
              {validationErrors.length > 0 && (
                <Card className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800" padding="md">
                  <div className="flex items-center text-red-600 dark:text-red-400 mb-2">
                    <FaExclamationCircle className="mr-2" />
                    <span className="font-semibold">Please fix the following errors:</span>
                  </div>
                  <ul className="list-disc list-inside text-red-600 dark:text-red-400 text-sm">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </Card>
              )}
              
              {submitStatus === 'success' && (
                <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" padding="md">
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <FaCheckCircle className="mr-2" />
                    <span className="font-semibold">Message sent successfully! I'll get back to you soon.</span>
                  </div>
                </Card>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Full Name *"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Charles Jasema"
                    className="w-full"
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="charles@example.com"
                    className="w-full"
                  />
                </div>

                <Input
                  label="Subject *"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project inquiry, collaboration, etc."
                  className="w-full"
                />

                <Select
                  label="Service Needed *"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full"
                >
                  {serviceOptions.map((option, index) => (
                    <option key={index} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                <TextArea
                  label="Message *"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project, event, or how I can help you..."
                  className="w-full"
                />

                <div className="flex flex-col sm:flex-row gap-4">
                  <EnhancedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </EnhancedButton>
                  
                  <a 
                    href="https://wa.me/256785446877?text=Hi%20Charles%2C%20I'd%20like%20to%20discuss%20a%20project%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <EnhancedButton
                      variant="secondary" 
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <FaWhatsapp className="mr-2" />
                      WhatsApp Me
                    </EnhancedButton>
                  </a>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get In Touch
              </h2>
              
              <div className="space-y-8">
                {/* Direct Contact */}
                <Card padding="lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FaEnvelope className="text-primary-gold mr-3" />
                    Direct Contact
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-500 mr-3" />
                      <a href="mailto:brocharles001@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                        brocharles001@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <FaWhatsapp className="text-green-500 mr-3" />
                      <a href="https://wa.me/256785446877" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition-colors">
                        +256 785 446 877
                      </a>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-blue-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">+256 785 446 877</span>
                    </div>
                  </div>
                </Card>

                {/* Professional Links */}
                <Card padding="lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FaLinkedin className="text-tech-teal mr-3" />
                    Professional
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <a href="https://www.linkedin.com/in/charles-jada-sebit-emmanuel" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <FaLinkedin className="mr-2" />
                      LinkedIn
                    </a>
                    <a href="https://github.com/charlesjasema" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                      <FaGithub className="mr-2" />
                      GitHub
                    </a>
                    <a href="mailto:brocharles001@gmail.com" className="flex items-center text-red-600 hover:text-red-800 transition-colors">
                      <FaEnvelope className="mr-2" />
                      Email
                    </a>
                  </div>
                </Card>

                {/* Music & Ministry */}
                <Card padding="lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FaMusic className="text-accent-red mr-3" />
                    Music & Ministry
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <a href="https://youtube.com/@CharlesJasemaMusic" target="_blank" rel="noopener noreferrer" className="flex items-center text-red-600 hover:text-red-800 transition-colors">
                      <FaYoutube className="mr-2" />
                      YouTube
                    </a>
                    <a href="https://www.instagram.com/charlesjasemamusic?utm_source=qr&igsh=bG00aGt0c2tua3Fu&igsi=bG00aGt0c2tua3Fu" target="_blank" rel="noopener noreferrer" className="flex items-center text-pink-600 hover:text-pink-800 transition-colors">
                      <FaInstagram className="mr-2" />
                      Instagram
                    </a>
                    <a href="https://facebook.com/charlesjasema" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                      <FaFacebook className="mr-2" />
                      Facebook
                    </a>
                    <a href="https://www.tiktok.com/@charlesjasemamusic?*r=1&*t=ZS-992gfpOYO9t" target="_blank" rel="noopener noreferrer" className="flex items-center text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors">
                      <SiTiktok className="mr-2" />
                      TikTok
                    </a>
                  </div>
                </Card>

                {/* Response Time */}
                <Card padding="lg" className="bg-gradient-to-r from-primary-gold/10 to-tech-teal/10">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Response Time
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    I typically respond within <strong>24 hours</strong> for project inquiries 
                    and <strong>2-4 hours</strong> for urgent requests via WhatsApp.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <ContactPageCTAs />
        </div>
      </section>
    </div>
  );
}