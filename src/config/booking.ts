/**
 * Booking Page Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update your booking page content
 * Configure services, pricing, availability, and booking form settings.
 */

export const bookingConfig = {
  // Page Header
  header: {
    title: 'Book My Services',
    subtitle: 'Schedule a consultation or book me for your event. Choose a service and select your preferred date and time.',
  },

  // Services Available for Booking
  services: [
    {
      id: 'software-consultation',
      name: 'Software Development Consultation',
      category: 'software',
      duration: '60 minutes',
      price: 'Free',
      description: 'Discuss your software project requirements, get technical advice, and receive a project estimate.',
      icon: 'code',
      color: 'primary-gold',
      features: [
        'Project scope discussion',
        'Technical recommendations',
        'Timeline and cost estimate',
        'Q&A session',
      ],
    },
    {
      id: 'design-consultation',
      name: 'Design Consultation',
      category: 'design',
      duration: '45 minutes',
      price: 'Free',
      description: 'Review your design needs, discuss brand identity, and explore creative solutions for your project.',
      icon: 'palette',
      color: 'tech-teal',
      features: [
        'Design needs assessment',
        'Brand strategy discussion',
        'Creative direction',
        'Portfolio review',
      ],
    },
    {
      id: 'worship-event',
      name: 'Worship Event / Church Service',
      category: 'music',
      duration: '2-3 hours',
      price: 'Contact for quote',
      description: 'Book me for worship leading at your church service, conference, or special event.',
      icon: 'music',
      color: 'accent-red',
      features: [
        'Live worship leading',
        'Original and contemporary songs',
        'Sound check included',
        'Flexible setlist',
      ],
    },
    {
      id: 'music-production',
      name: 'Music Production Session',
      category: 'music',
      duration: '3-4 hours',
      price: 'Contact for quote',
      description: 'Professional music production, recording, and mixing services for your songs.',
      icon: 'microphone',
      color: 'accent-red',
      features: [
        'Recording session',
        'Mixing and mastering',
        'Production guidance',
        'Final deliverables',
      ],
    },
    {
      id: 'video-production',
      name: 'Video Production',
      category: 'videography',
      duration: 'Full day',
      price: 'Contact for quote',
      description: 'Professional video production services for events, music videos, or promotional content.',
      icon: 'video',
      color: 'primary-gold',
      features: [
        'Pre-production planning',
        'Professional filming',
        'Post-production editing',
        'Final video delivery',
      ],
    },
    {
      id: 'general-meeting',
      name: 'General Meeting',
      category: 'general',
      duration: '30 minutes',
      price: 'Free',
      description: 'General discussion about potential collaboration or project inquiry.',
      icon: 'calendar',
      color: 'tech-teal',
      features: [
        'Introductory meeting',
        'Project discussion',
        'Service overview',
        'Next steps planning',
      ],
    },
  ],

  // Booking Form
  form: {
    title: 'Complete Your Booking',
    fields: [
      {
        id: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Your full name',
        required: true,
      },
      {
        id: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'your@email.com',
        required: true,
      },
      {
        id: 'phone',
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+254 XXX XXX XXX',
        required: true,
      },
      {
        id: 'organization',
        label: 'Organization / Church (Optional)',
        type: 'text',
        placeholder: 'Your organization or church name',
        required: false,
      },
      {
        id: 'date',
        label: 'Preferred Date',
        type: 'date',
        placeholder: '',
        required: true,
      },
      {
        id: 'time',
        label: 'Preferred Time',
        type: 'select',
        placeholder: 'Select a time',
        required: true,
        options: [
          '09:00 AM',
          '10:00 AM',
          '11:00 AM',
          '12:00 PM',
          '01:00 PM',
          '02:00 PM',
          '03:00 PM',
          '04:00 PM',
          '05:00 PM',
          '06:00 PM',
        ],
      },
      {
        id: 'details',
        label: 'Additional Details',
        type: 'textarea',
        placeholder: 'Tell me more about your event, project, or requirements...',
        required: true,
        rows: 5,
      },
    ],
    submitButton: {
      text: 'Submit Booking Request',
      loadingText: 'Submitting...',
    },
    successMessage: 'Thank you for your booking request! I\'ll review your request and get back to you within 24 hours to confirm availability.',
    errorMessage: 'Oops! Something went wrong. Please try again or contact me directly.',
  },

  // Availability Notice
  availability: {
    title: 'Availability Notice',
    message: 'I typically respond to booking requests within 24 hours. For urgent bookings, please contact me directly via WhatsApp or phone.',
    workingHours: 'Monday - Saturday: 9:00 AM - 6:00 PM EAT',
  },

  // Booking Process
  process: {
    title: 'How It Works',
    steps: [
      {
        number: 1,
        title: 'Choose a Service',
        description: 'Select the service that best fits your needs from the options above.',
      },
      {
        number: 2,
        title: 'Pick Date & Time',
        description: 'Choose your preferred date and time slot for the booking.',
      },
      {
        number: 3,
        title: 'Submit Request',
        description: 'Fill out the booking form with your details and submit your request.',
      },
      {
        number: 4,
        title: 'Confirmation',
        description: 'I\'ll review your request and send you a confirmation within 24 hours.',
      },
    ],
  },

  // Cancellation Policy
  policy: {
    title: 'Cancellation Policy',
    items: [
      'Free cancellation up to 48 hours before the scheduled time',
      'Cancellations within 48 hours may incur a fee',
      'For event bookings, please discuss cancellation terms during confirmation',
      'Rescheduling is available subject to availability',
    ],
  },
} as const;

export type BookingConfig = typeof bookingConfig;
export type BookingService = typeof bookingConfig.services[number];
