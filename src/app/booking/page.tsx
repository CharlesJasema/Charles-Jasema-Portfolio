'use client';

import { useState } from 'react';
import { FaCode, FaPalette, FaMusic, FaMicrophone, FaVideo, FaCalendar, FaCheckCircle, FaExclamationCircle, FaClock, FaCheck } from 'react-icons/fa';
import { Button, Card, Input, TextArea, Select } from '@/components/ui';
import { bookingConfig, BookingService } from '@/config/booking';
import { clsx } from 'clsx';

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    date: '',
    time: '',
    details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleServiceSelect = (service: BookingService) => {
    setSelectedService(service);
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission (replace with actual API call later)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', organization: '', date: '', time: '', details: '' });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSelectedService(null);
      }, 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'code': return FaCode;
      case 'palette': return FaPalette;
      case 'music': return FaMusic;
      case 'microphone': return FaMicrophone;
      case 'video': return FaVideo;
      case 'calendar': return FaCalendar;
      default: return FaCalendar;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            <span className="text-gray-900 dark:text-white">{bookingConfig.header.title}</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-text-secondary max-w-3xl mx-auto">
            {bookingConfig.header.subtitle}
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16 bg-slate-100 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {bookingConfig.process.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingConfig.process.steps.map((step) => (
              <Card key={step.number} variant="elevated" padding="lg" className="text-center">
                <div className="w-16 h-16 bg-primary-gold text-background-dark rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-text-tertiary">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Selection */}
      {!selectedService && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Choose a Service
              </h2>
              <p className="text-gray-700 dark:text-text-secondary">
                Select the service you'd like to book
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookingConfig.services.map((service) => {
                const Icon = getServiceIcon(service.icon);
                
                return (
                  <Card
                    key={service.id}
                    variant="elevated"
                    padding="lg"
                    className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className={clsx(
                      'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
                      service.color === 'primary-gold' && 'bg-primary-gold/10',
                      service.color === 'tech-teal' && 'bg-tech-teal/10',
                      service.color === 'accent-red' && 'bg-accent-red/10'
                    )}>
                      <Icon className={clsx(
                        'text-3xl',
                        service.color === 'primary-gold' && 'text-primary-gold',
                        service.color === 'tech-teal' && 'text-tech-teal',
                        service.color === 'accent-red' && 'text-accent-red'
                      )} />
                    </div>

                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 text-center">
                      {service.name}
                    </h3>

                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-text-tertiary mb-4">
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>{service.duration}</span>
                      </div>
                      <div className="font-semibold text-primary-gold">
                        {service.price}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-text-secondary mb-4 text-center">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-text-tertiary">
                          <FaCheck className="text-primary-gold flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button variant="primary" className="w-full">
                      Select Service
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Booking Form */}
      {selectedService && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <Card variant="elevated" padding="xl">
              {/* Selected Service Info */}
              <div className="mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                      {selectedService.name}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-text-tertiary">
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>{selectedService.duration}</span>
                      </div>
                      <div className="font-semibold text-primary-gold">
                        {selectedService.price}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedService(null);
                      setSubmitStatus('idle');
                    }}
                  >
                    Change Service
                  </Button>
                </div>
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
                  <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 dark:text-green-200 font-semibold mb-1">
                      Booking Request Submitted!
                    </p>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      {bookingConfig.form.successMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                  <FaExclamationCircle className="text-red-600 dark:text-red-400 text-xl flex-shrink-0 mt-0.5" />
                  <p className="text-red-800 dark:text-red-200">
                    {bookingConfig.form.errorMessage}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                    {bookingConfig.form.title}
                  </h3>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name <span className="text-accent-red">*</span>
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
                      Email Address <span className="text-accent-red">*</span>
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

                {/* Phone and Organization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone Number <span className="text-accent-red">*</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+254 XXX XXX XXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Organization / Church
                    </label>
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      placeholder="Optional"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Preferred Date <span className="text-accent-red">*</span>
                    </label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Preferred Time <span className="text-accent-red">*</span>
                    </label>
                    <Select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </Select>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label htmlFor="details" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Additional Details <span className="text-accent-red">*</span>
                  </label>
                  <TextArea
                    id="details"
                    name="details"
                    placeholder="Tell me more about your event, project, or requirements..."
                    value={formData.details}
                    onChange={handleChange}
                    rows={5}
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
                  {isSubmitting ? bookingConfig.form.submitButton.loadingText : bookingConfig.form.submitButton.text}
                </Button>
              </form>
            </Card>
          </div>
        </section>
      )}

      {/* Availability & Policy */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Availability */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {bookingConfig.availability.title}
              </h3>
              <p className="text-gray-700 dark:text-text-secondary mb-4">
                {bookingConfig.availability.message}
              </p>
              <div className="bg-primary-gold/10 rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {bookingConfig.availability.workingHours}
                </p>
              </div>
            </Card>

            {/* Cancellation Policy */}
            <Card variant="elevated" padding="lg">
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {bookingConfig.policy.title}
              </h3>
              <ul className="space-y-2">
                {bookingConfig.policy.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-text-secondary">
                    <FaCheck className="text-primary-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
