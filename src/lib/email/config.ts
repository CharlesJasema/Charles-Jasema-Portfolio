/**
 * Email Configuration Loader
 * 
 * Loads and validates email provider configuration from environment variables.
 * Supports multiple email providers (SendGrid, Resend, AWS SES) with priority-based fallback.
 */

import type { EmailConfig, EmailProviderConfig, EmailProviderType } from './types';

/**
 * Mask sensitive values for logging
 * Shows only first 4 and last 4 characters
 */
export function maskSensitiveValue(value: string): string {
  if (!value || value.length <= 8) {
    return '****';
  }
  return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Load SendGrid provider configuration from environment
 */
function loadSendGridConfig(): EmailProviderConfig | null {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || process.env.FROM_EMAIL;
  const fromName = process.env.FROM_NAME || 'Charles Jasema';
  const replyTo = process.env.REPLY_TO_EMAIL;

  if (!apiKey || !fromEmail) {
    return null;
  }

  if (!isValidEmail(fromEmail)) {
    console.error(`[Email Config] Invalid SendGrid from email: ${fromEmail}`);
    return null;
  }

  return {
    provider: 'sendgrid',
    enabled: true,
    priority: 1, // Highest priority
    apiKey,
    fromEmail,
    fromName,
    replyTo,
  };
}

/**
 * Load Resend provider configuration from environment
 */
function loadResendConfig(): EmailProviderConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.FROM_EMAIL;
  const fromName = process.env.FROM_NAME || 'Charles Jasema';
  const replyTo = process.env.REPLY_TO_EMAIL;

  if (!apiKey || !fromEmail) {
    return null;
  }

  if (!isValidEmail(fromEmail)) {
    console.error(`[Email Config] Invalid Resend from email: ${fromEmail}`);
    return null;
  }

  return {
    provider: 'resend',
    enabled: true,
    priority: 2, // Second priority
    apiKey,
    fromEmail,
    fromName,
    replyTo,
  };
}

/**
 * Load AWS SES provider configuration from environment
 */
function loadAWSSESConfig(): EmailProviderConfig | null {
  const accessKeyId = process.env.AWS_SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_SES_REGION || process.env.AWS_REGION || 'us-east-1';
  const fromEmail = process.env.AWS_SES_FROM_EMAIL || process.env.FROM_EMAIL;
  const fromName = process.env.FROM_NAME || 'Charles Jasema';
  const replyTo = process.env.REPLY_TO_EMAIL;

  if (!accessKeyId || !secretAccessKey || !fromEmail) {
    return null;
  }

  if (!isValidEmail(fromEmail)) {
    console.error(`[Email Config] Invalid AWS SES from email: ${fromEmail}`);
    return null;
  }

  return {
    provider: 'aws-ses',
    enabled: true,
    priority: 3, // Third priority
    apiKey: secretAccessKey, // Store in apiKey field for consistency
    fromEmail,
    fromName,
    replyTo,
    region,
    accessKeyId,
    secretAccessKey,
  };
}

/**
 * Load all email provider configurations
 */
function loadProviders(): EmailProviderConfig[] {
  const providers: EmailProviderConfig[] = [];

  // Attempt to load each provider
  const sendgrid = loadSendGridConfig();
  const resend = loadResendConfig();
  const awsSes = loadAWSSESConfig();

  if (sendgrid) providers.push(sendgrid);
  if (resend) providers.push(resend);
  if (awsSes) providers.push(awsSes);

  // Sort by priority (lowest number = highest priority)
  return providers.sort((a, b) => a.priority - b.priority);
}

/**
 * Load and validate email configuration from environment variables
 * 
 * @returns EmailConfig object with all providers and settings
 * @throws Error if no providers are configured or required settings are missing
 */
export function loadEmailConfig(): EmailConfig {
  const providers = loadProviders();
  const contactEmail = process.env.CONTACT_EMAIL || process.env.SENDGRID_FROM_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || process.env.SENDGRID_FROM_EMAIL;
  const fromName = process.env.FROM_NAME || 'Charles Jasema';

  // Validate required configuration
  if (!contactEmail) {
    throw new Error(
      '[Email Config] CONTACT_EMAIL environment variable is required for receiving contact form submissions'
    );
  }

  if (!isValidEmail(contactEmail)) {
    throw new Error(`[Email Config] Invalid CONTACT_EMAIL format: ${contactEmail}`);
  }

  if (!fromEmail) {
    throw new Error('[Email Config] FROM_EMAIL environment variable is required');
  }

  if (!isValidEmail(fromEmail)) {
    throw new Error(`[Email Config] Invalid FROM_EMAIL format: ${fromEmail}`);
  }

  if (providers.length === 0) {
    console.warn(
      '[Email Config] No email providers configured. Email submissions will be logged only.'
    );
  }

  // Default configuration values
  const maxRetries = parseInt(process.env.EMAIL_MAX_RETRIES || '3', 10);
  const retryDelay = parseInt(process.env.EMAIL_RETRY_DELAY || '1000', 10); // 1 second base delay
  const timeout = parseInt(process.env.EMAIL_TIMEOUT || '30000', 10); // 30 seconds

  const config: EmailConfig = {
    providers,
    contactEmail,
    fromEmail,
    fromName,
    maxRetries,
    retryDelay,
    timeout,
  };

  return config;
}

/**
 * Validate email configuration on application startup
 * Logs configuration details with sensitive values masked
 * 
 * @param config Email configuration to validate
 * @returns true if configuration is valid, false otherwise
 */
export function validateEmailConfig(config: EmailConfig): boolean {
  console.log('[Email Config] Validating email configuration...');

  // Check contact email
  if (!config.contactEmail || !isValidEmail(config.contactEmail)) {
    console.error('[Email Config] Invalid contact email configuration');
    return false;
  }

  // Check from email
  if (!config.fromEmail || !isValidEmail(config.fromEmail)) {
    console.error('[Email Config] Invalid from email configuration');
    return false;
  }

  // Log provider configuration (masked)
  if (config.providers.length === 0) {
    console.warn('[Email Config] ⚠️  No email providers configured!');
    console.warn('[Email Config] Email submissions will be logged to console only.');
    return true; // Still valid, just no providers
  }

  console.log(`[Email Config] ✓ Found ${config.providers.length} configured provider(s):`);

  config.providers.forEach((provider) => {
    const maskedKey = maskSensitiveValue(provider.apiKey);
    console.log(`[Email Config]   - ${provider.provider} (priority ${provider.priority})`);
    console.log(`[Email Config]     API Key: ${maskedKey}`);
    console.log(`[Email Config]     From: ${provider.fromName} <${provider.fromEmail}>`);
    
    if (provider.replyTo) {
      console.log(`[Email Config]     Reply-To: ${provider.replyTo}`);
    }

    if (provider.provider === 'aws-ses' && provider.region) {
      console.log(`[Email Config]     Region: ${provider.region}`);
    }
  });

  console.log(`[Email Config] ✓ Contact Email: ${config.contactEmail}`);
  console.log(`[Email Config] ✓ Max Retries: ${config.maxRetries}`);
  console.log(`[Email Config] ✓ Retry Delay: ${config.retryDelay}ms`);
  console.log(`[Email Config] ✓ Timeout: ${config.timeout}ms`);
  console.log('[Email Config] ✓ Email configuration is valid');

  return true;
}

/**
 * Get a specific provider configuration by type
 * 
 * @param config Email configuration
 * @param providerType Provider type to retrieve
 * @returns Provider configuration or undefined if not found
 */
export function getProviderConfig(
  config: EmailConfig,
  providerType: EmailProviderType
): EmailProviderConfig | undefined {
  return config.providers.find((p) => p.provider === providerType);
}

/**
 * Check if a specific provider is configured and enabled
 * 
 * @param config Email configuration
 * @param providerType Provider type to check
 * @returns true if provider is configured and enabled
 */
export function isProviderEnabled(
  config: EmailConfig,
  providerType: EmailProviderType
): boolean {
  const provider = getProviderConfig(config, providerType);
  return provider?.enabled || false;
}

/**
 * Get the primary (highest priority) provider configuration
 * 
 * @param config Email configuration
 * @returns Primary provider configuration or undefined if no providers
 */
export function getPrimaryProvider(config: EmailConfig): EmailProviderConfig | undefined {
  return config.providers[0]; // Already sorted by priority
}

/**
 * Initialize email configuration singleton
 * This should be called once at application startup
 */
let emailConfigInstance: EmailConfig | null = null;

export function initializeEmailConfig(): EmailConfig {
  if (emailConfigInstance) {
    return emailConfigInstance;
  }

  try {
    emailConfigInstance = loadEmailConfig();
    validateEmailConfig(emailConfigInstance);
    return emailConfigInstance;
  } catch (error) {
    console.error('[Email Config] Failed to initialize email configuration:', error);
    throw error;
  }
}

/**
 * Get the current email configuration instance
 * Returns null if not yet initialized
 */
export function getEmailConfig(): EmailConfig | null {
  return emailConfigInstance;
}
