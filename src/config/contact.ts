/**
 * Contact Page Configuration
 * 
 * ⚠️ ADMIN: Edit this file to update your contact page content
 */

export const contactConfig = {
  // Page Header
  header: {
    title: 'Get In Touch',
    subtitle: 'Have a project in mind? Let\'s collaborate and create something amazing together.',
  },

  // Contact Methods
  methods: [
    {
      id: 'email',
      icon: 'envelope',
      title: 'Email',
      value: 'contact@charlesjasema.com', // Will be overridden by siteConfig
      description: 'Send me an email anytime',
      color: 'primary-gold',
    },
    {
      id: 'whatsapp',
      icon: 'whatsapp',
      title: 'WhatsApp',
      value: '+254 XXX XXX XXX', // Will be overridden by siteConfig
      description: 'Chat with me on WhatsApp',
      color: 'tech-teal',
    },
    {
      id: 'phone',
      icon: 'phone',
      title: 'Phone',
      value: '+254 XXX XXX XXX', // Will be overridden by siteConfig
      description: 'Give me a call',
      color: 'accent-red',
    },
  ],

  // Contact Form
  form: {
    title: 'Send a Message',
    subtitle: 'Fill out the form below and I\'ll get back to you as soon as possible.',
    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Your full name',
        required: true,
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'your@email.com',
        required: true,
      },
      {
        id: 'subject',
        label: 'Subject',
        type: 'text',
        placeholder: 'What is this about?',
        required: true,
      },
      {
        id: 'service',
        label: 'Service Interested In',
        type: 'select',
        placeholder: 'Select a service',
        required: false,
        options: [
          'Software Development',
          'Graphics Design',
          'Music Ministry / Booking',
          'Videography',
          'General Inquiry',
          'Other',
        ],
      },
      {
        id: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Tell me about your project or inquiry...',
        required: true,
        rows: 6,
      },
    ],
    submitButton: {
      text: 'Send Message',
      loadingText: 'Sending...',
    },
    successMessage: 'Thank you for your message! I\'ll get back to you soon.',
    errorMessage: 'Oops! Something went wrong. Please try again or contact me directly via email.',
  },

  // Social Media Section
  social: {
    title: 'Connect on Social Media',
    subtitle: 'Follow me on social media for updates and behind-the-scenes content',
  },

  // FAQ Section
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'What services do you offer?',
        answer: 'I offer software development, graphics design, videography, and music ministry services. Whether you need a website, brand identity, video production, or worship music, I can help bring your vision to life.',
      },
      {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while a comprehensive brand identity could take 4-6 weeks. I\'ll provide a detailed timeline during our initial consultation.',
      },
      {
        question: 'Do you work with clients remotely?',
        answer: 'Yes! I work with clients worldwide through video calls, email, and project management tools. Distance is no barrier to creating amazing work together.',
      },
      {
        question: 'What are your rates?',
        answer: 'Rates vary based on project scope, complexity, and timeline. Contact me with your project details for a custom quote. I offer competitive pricing and flexible payment options.',
      },
      {
        question: 'Are you available for music ministry bookings?',
        answer: 'Yes! I\'m available for worship nights, church services, conferences, and special events. Contact me to discuss your event details and check my availability.',
      },
    ],
  },
} as const;

export type ContactConfig = typeof contactConfig;
