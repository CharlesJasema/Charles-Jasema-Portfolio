/**
 * Email Service Module
 * 
 * Public API exports for the email service module.
 */

// Type exports
export type {
  EmailProviderType,
  EmailStatus,
  EmailAttachment,
  EmailMessage,
  EmailResult,
  EmailProvider,
  EmailProviderConfig,
  ContactSubmission,
  EmailDeliveryLog,
  EmailConfig,
  EmailHealthStatus,
} from './types';

// Configuration exports
export {
  loadEmailConfig,
  validateEmailConfig,
  maskSensitiveValue,
  getProviderConfig,
  isProviderEnabled,
  getPrimaryProvider,
  initializeEmailConfig,
  getEmailConfig,
} from './config';
