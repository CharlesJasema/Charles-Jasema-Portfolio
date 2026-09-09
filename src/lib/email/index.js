/**
 * Email Service Module
 * 
 * Public API exports for the email service module.
 */

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
