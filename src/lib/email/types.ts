/**
 * Email Provider Types and Interfaces
 * 
 * Defines the core types for email service functionality including provider configuration,
 * email messages, delivery results, and contact form submissions.
 */

/**
 * Supported email provider types
 */
export type EmailProviderType = 'sendgrid' | 'resend' | 'aws-ses';

/**
 * Email delivery status
 */
export type EmailStatus = 'pending' | 'sent' | 'failed';

/**
 * Email attachment interface
 */
export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
  disposition?: 'attachment' | 'inline';
}

/**
 * Base email message structure
 */
export interface EmailMessage {
  to: string | string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
}

/**
 * Email delivery result
 */
export interface EmailResult {
  success: boolean;
  messageId?: string;
  provider: string;
  timestamp: Date;
  deliveryTime: number; // milliseconds
  error?: string;
  errorCode?: string;
}

/**
 * Base interface that all email providers must implement
 */
export interface EmailProvider {
  name: EmailProviderType;
  send(message: EmailMessage): Promise<EmailResult>;
  validateConfig(): boolean;
}

/**
 * Email provider configuration
 */
export interface EmailProviderConfig {
  provider: EmailProviderType;
  enabled: boolean;
  priority: number; // 1 = highest priority
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
  // AWS SES specific
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

/**
 * Contact form submission data
 */
export interface ContactSubmission {
  id: string; // UUID
  name: string; // 2-100 characters
  email: string; // Valid email format
  subject: string; // 5-200 characters
  service?: string; // Optional service type
  message: string; // 10-2000 characters
  csrfToken: string;
  timestamp: Date;
  userAgent: string;
  ipAddress?: string; // Optional, hashed for privacy
  status: EmailStatus;
  provider?: EmailProviderType;
  attempts: number;
  lastAttempt?: Date;
  error?: string;
}

/**
 * Email delivery log entry
 */
export interface EmailDeliveryLog {
  id: string;
  submissionId: string;
  provider: EmailProviderType;
  timestamp: Date;
  status: 'success' | 'failure';
  deliveryTime: number; // milliseconds
  errorCode?: string;
  errorMessage?: string;
}

/**
 * Email service configuration loaded from environment
 */
export interface EmailConfig {
  providers: EmailProviderConfig[];
  contactEmail: string; // Recipient for contact form submissions
  fromEmail: string; // Default sender email
  fromName: string; // Default sender name
  maxRetries: number; // Maximum retry attempts per provider
  retryDelay: number; // Base delay for exponential backoff (ms)
  timeout: number; // Email send timeout (ms)
}

/**
 * Email service health status
 */
export interface EmailHealthStatus {
  healthy: boolean;
  providersAvailable: number;
  successRate: number; // 0-1
  averageDeliveryTime: number; // milliseconds
  lastCheck: Date;
  errors: string[];
}
