# Email Service Module

This module provides a robust, multi-provider email delivery system with automatic failover, retry logic, and comprehensive error handling.

## Overview

The email service supports multiple email providers (SendGrid, Resend, AWS SES) with priority-based fallback. If the primary provider fails, the system automatically tries the next available provider.

## Files

- **types.ts** - TypeScript type definitions for email service
- **config.ts** - Configuration loader and validator
- **config.test.ts** - Unit tests for configuration loader
- **config-demo.ts** - Demo script to test configuration

## Architecture

### Provider Priority

Providers are tried in priority order (1 = highest):

1. **SendGrid** (Priority 1)
2. **Resend** (Priority 2)
3. **AWS SES** (Priority 3)

### Retry Logic

Each provider gets up to 3 retry attempts with exponential backoff:
- Attempt 1: Immediate
- Attempt 2: Wait 2 seconds
- Attempt 3: Wait 4 seconds

If all attempts fail for all providers, the submission is logged for manual retrieval.

## Configuration

### Required Environment Variables

```bash
# Required for all configurations
CONTACT_EMAIL=contact@charlesjasema.com  # Where contact form submissions are sent
FROM_EMAIL=noreply@charlesjasema.com     # Default sender email
FROM_NAME=Charles Jasema                  # Default sender name
```

### Optional Environment Variables

```bash
# Email service settings (with defaults)
EMAIL_MAX_RETRIES=3         # Max retries per provider
EMAIL_RETRY_DELAY=1000      # Base delay for exponential backoff (ms)
EMAIL_TIMEOUT=30000         # Email send timeout (ms)

# Reply-to address (optional)
REPLY_TO_EMAIL=contact@charlesjasema.com
```

### Provider Configuration

Configure one or more providers for redundancy:

#### SendGrid (Priority 1)

```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@charlesjasema.com
```

#### Resend (Priority 2)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@charlesjasema.com
```

#### AWS SES (Priority 3)

```bash
AWS_SES_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SES_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_SES_REGION=us-east-1
AWS_SES_FROM_EMAIL=noreply@charlesjasema.com
```

## Usage

### Initialize Configuration

```typescript
import { initializeEmailConfig } from '@/lib/email/config';

// Initialize on app startup (e.g., in layout.tsx or middleware)
const emailConfig = initializeEmailConfig();
```

### Load Configuration

```typescript
import { loadEmailConfig, validateEmailConfig } from '@/lib/email/config';

try {
  const config = loadEmailConfig();
  const isValid = validateEmailConfig(config);
  
  if (isValid) {
    console.log('Email configuration loaded successfully');
  }
} catch (error) {
  console.error('Failed to load email configuration:', error);
}
```

### Get Provider Information

```typescript
import { 
  getProviderConfig, 
  isProviderEnabled, 
  getPrimaryProvider 
} from '@/lib/email/config';

const config = loadEmailConfig();

// Get specific provider
const sendgrid = getProviderConfig(config, 'sendgrid');

// Check if provider is enabled
const isEnabled = isProviderEnabled(config, 'resend');

// Get primary provider
const primary = getPrimaryProvider(config);
console.log(`Primary provider: ${primary?.provider}`);
```

### Mask Sensitive Values

```typescript
import { maskSensitiveValue } from '@/lib/email/config';

const apiKey = 'sk_test_1234567890abcdef';
const masked = maskSensitiveValue(apiKey);
console.log(masked); // Output: "sk_t...cdef"
```

## Type Definitions

### EmailConfig

```typescript
interface EmailConfig {
  providers: EmailProviderConfig[];  // Sorted by priority
  contactEmail: string;              // Recipient for contact forms
  fromEmail: string;                 // Default sender email
  fromName: string;                  // Default sender name
  maxRetries: number;                // Max retry attempts per provider
  retryDelay: number;                // Base delay for exponential backoff (ms)
  timeout: number;                   // Email send timeout (ms)
}
```

### EmailProviderConfig

```typescript
interface EmailProviderConfig {
  provider: 'sendgrid' | 'resend' | 'aws-ses';
  enabled: boolean;
  priority: number;                  // 1 = highest priority
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyTo?: string;
  // AWS SES specific
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}
```

### EmailProvider Interface

All provider implementations must implement this interface:

```typescript
interface EmailProvider {
  name: EmailProviderType;
  send(message: EmailMessage): Promise<EmailResult>;
  validateConfig(): boolean;
}
```

### EmailMessage

```typescript
interface EmailMessage {
  to: string | string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
}
```

### EmailResult

```typescript
interface EmailResult {
  success: boolean;
  messageId?: string;
  provider: string;
  timestamp: Date;
  deliveryTime: number;              // milliseconds
  error?: string;
  errorCode?: string;
}
```

## Error Handling

### Configuration Errors

The configuration loader throws errors for:

- Missing required environment variables (CONTACT_EMAIL, FROM_EMAIL)
- Invalid email formats
- Missing provider credentials

### Validation

```typescript
import { loadEmailConfig, validateEmailConfig } from '@/lib/email/config';

try {
  const config = loadEmailConfig();
  
  if (!validateEmailConfig(config)) {
    console.error('Invalid email configuration');
  }
} catch (error) {
  if (error instanceof Error) {
    console.error('Configuration error:', error.message);
  }
}
```

## Logging

The configuration loader logs:

- ✓ Successfully loaded providers (with masked API keys)
- ⚠️  Warnings for missing providers
- ❌ Errors for invalid configuration

Example output:

```
[Email Config] Validating email configuration...
[Email Config] ✓ Found 2 configured provider(s):
[Email Config]   - sendgrid (priority 1)
[Email Config]     API Key: SG.x...cdef
[Email Config]     From: Charles Jasema <noreply@charlesjasema.com>
[Email Config]   - resend (priority 2)
[Email Config]     API Key: re_x...789z
[Email Config]     From: Charles Jasema <noreply@charlesjasema.com>
[Email Config] ✓ Contact Email: contact@charlesjasema.com
[Email Config] ✓ Max Retries: 3
[Email Config] ✓ Retry Delay: 1000ms
[Email Config] ✓ Timeout: 30000ms
[Email Config] ✓ Email configuration is valid
```

## Testing

Run the demo script to test your configuration:

```bash
npx tsx src/lib/email/config-demo.ts
```

Run unit tests:

```bash
npm test src/lib/email/config.test.ts
```

## Fallback Mode

If no email providers are configured, the system operates in fallback mode:

- Email submissions are logged to the console
- No actual emails are sent
- Useful for development and testing

## Security

### Sensitive Value Masking

All API keys and secrets are masked in logs:
- Shows first 4 and last 4 characters
- Example: `sk_test_1234567890abcdef` → `sk_t...cdef`

### Environment Variable Protection

- Never commit `.env.local` or `.env.production` to version control
- Use `.env.example` as a template
- Rotate API keys regularly

## Next Steps

After completing this task (2.1), the following tasks will implement:

- **Task 2.2-2.4**: Individual provider implementations (SendGrid, Resend, AWS SES)
- **Task 2.5**: Email template engine with React Email
- **Task 2.6**: Main EmailService with fallback and retry logic
- **Task 2.7**: Email delivery logging and monitoring
- **Task 2.8-2.9**: Property-based and unit tests

## Requirements Satisfied

This implementation satisfies the following acceptance criteria:

- ✓ **Requirement 2.1**: Email service reads configuration from environment variables
- ✓ **Requirement 2.2**: Email service validates configuration on startup with clear error messages
- ✓ **Requirement 2.3**: Multiple providers configured with priority order
- ✓ **Requirement 2.4**: Sensitive values (API keys) masked in log outputs
- ✓ **Requirement 2.6**: Environment-specific configuration support
