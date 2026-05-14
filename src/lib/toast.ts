import toast from 'react-hot-toast';

export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => toast.promise(promise, messages),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
};

// Predefined toast messages for common actions
export const toastMessages = {
  download: {
    loading: 'Preparing download...',
    success: 'Download started successfully!',
    error: 'Failed to download file. Please try again.',
  },
  form: {
    loading: 'Submitting form...',
    success: 'Form submitted successfully!',
    error: 'Failed to submit form. Please try again.',
  },
  contact: {
    loading: 'Sending message...',
    success: 'Message sent successfully! We\'ll get back to you soon.',
    error: 'Failed to send message. Please try again.',
  },
  booking: {
    loading: 'Processing booking request...',
    success: 'Booking request sent successfully!',
    error: 'Failed to send booking request. Please try again.',
  },
  newsletter: {
    loading: 'Subscribing to newsletter...',
    success: 'Successfully subscribed to newsletter!',
    error: 'Failed to subscribe. Please try again.',
  },
  copy: {
    success: 'Copied to clipboard!',
    error: 'Failed to copy to clipboard.',
  },
  share: {
    success: 'Link copied for sharing!',
    error: 'Failed to copy share link.',
  },
};