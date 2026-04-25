'use client';

import { useState } from 'react';
import { FaEnvelope, FaWhatsapp, FaPhone, FaLinkedin, FaTwitter, FaYoutube, FaGithub, FaInstagram, FaFacebook, FaMusic, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { Button, Card, Input, TextArea, Select } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { contactConfig } from '@/config/contact';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission (replace with actual API call later)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', service: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                <FaExclamationCircle className="text-red-600 dark:text-red-400 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-red-800 dark:text-red-200">
                  {contactConfig.form.errorMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
      <section className="px-4 sm:px-6 lg:px-8">
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
    </div>
  );
}
