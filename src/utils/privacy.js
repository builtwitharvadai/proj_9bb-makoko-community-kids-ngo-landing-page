/**
 * Privacy and Consent Management Utilities
 * 
 * Provides comprehensive privacy utilities including cookie consent management,
 * analytics opt-out functionality, and GDPR compliance features. Implements
 * user preference storage and management with secure, privacy-first patterns.
 * 
 * @module utils/privacy
 * @version 1.0.0
 */

/**
 * Privacy consent types
 * @enum {string}
 */
const ConsentType = Object.freeze({
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  PREFERENCES: 'preferences',
});

/**
 * Privacy storage keys
 * @enum {string}
 */
const StorageKey = Object.freeze({
  CONSENT: 'privacy_consent',
  PREFERENCES: 'privacy_preferences',
  OPT_OUT: 'analytics_opt_out',
  CONSENT_TIMESTAMP: 'consent_timestamp',
  CONSENT_VERSION: 'consent_version',
});

/**
 * Current consent policy version
 * Increment when privacy policy changes require re-consent
 */
const CONSENT_VERSION = '1.0.0';

/**
 * Consent expiration in days
 */
const CONSENT_EXPIRY_DAYS = 365;

/**
 * Privacy event types
 * @enum {string}
 */
const PrivacyEvent = Object.freeze({
  CONSENT_UPDATED: 'privacy:consent-updated',
  CONSENT_WITHDRAWN: 'privacy:consent-withdrawn',
  PREFERENCES_CHANGED: 'privacy:preferences-changed',
  OPT_OUT_CHANGED: 'privacy:opt-out-changed',
  CONSENT_EXPIRED: 'privacy:consent-expired',
});

/**
 * Default consent state
 */
const DEFAULT_CONSENT = Object.freeze({
  [ConsentType.NECESSARY]: true, // Always true, cannot be disabled
  [ConsentType.ANALYTICS]: false,
  [ConsentType.MARKETING]: false,
  [ConsentType.PREFERENCES]: false,
});

/**
 * Privacy Manager Class
 * Manages user privacy preferences and consent state
 */
class PrivacyManager {
  /**
   * Creates an instance of PrivacyManager
   */
  constructor() {
    this.consent = { ...DEFAULT_CONSENT };
    this.preferences = {};
    this.initialized = false;
    this.listeners = new Map();
    
    // Bind methods
    this.init = this.init.bind(this);
    this.getConsent = this.getConsent.bind(this);
    this.setConsent = this.setConsent.bind(this);
    this.hasConsent = this.hasConsent.bind(this);
    this.withdrawConsent = this.withdrawConsent.bind(this);
    this.isConsentExpired = this.isConsentExpired.bind(this);
    this.getPreferences = this.getPreferences.bind(this);
    this.setPreferences = this.setPreferences.bind(this);
    this.isOptedOut = this.isOptedOut.bind(this);
    this.setOptOut = this.setOptOut.bind(this);
    this.clearAllData = this.clearAllData.bind(this);
    this.exportData = this.exportData.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
  }

  /**
   * Initialize privacy manager
   * Loads stored consent and preferences
   * 
   * @returns {boolean} Success status
   */
  init() {
    try {
      if (this.initialized) {
        this.logWarning('Privacy manager already initialized');
        return true;
      }

      // Check if storage is available
      if (!this.isStorageAvailable()) {
        this.logError('Local storage not available');
        return false;
      }

      // Load stored consent
      const storedConsent = this.loadConsent();
      if (storedConsent) {
        // Check if consent is expired or version mismatch
        if (this.isConsentExpired() || this.isConsentVersionMismatch()) {
          this.logInfo('Consent expired or version mismatch, resetting to defaults');
          this.consent = { ...DEFAULT_CONSENT };
          this.saveConsent();
          this.dispatchEvent(PrivacyEvent.CONSENT_EXPIRED, { reason: 'expired_or_version_mismatch' });
        } else {
          this.consent = storedConsent;
        }
      } else {
        // No stored consent, use defaults
        this.consent = { ...DEFAULT_CONSENT };
        this.saveConsent();
      }

      // Load stored preferences
      const storedPreferences = this.loadPreferences();
      if (storedPreferences) {
        this.preferences = storedPreferences;
      }

      this.initialized = true;
      this.logInfo('Privacy manager initialized', { consent: this.consent });
      
      return true;
    } catch (error) {
      this.logError('Failed to initialize privacy manager', error);
      return false;
    }
  }

  /**
   * Get current consent state
   * 
   * @param {string} [type] - Specific consent type to get
   * @returns {Object|boolean} Consent state or specific consent value
   */
  getConsent(type) {
    if (type) {
      if (!Object.values(ConsentType).includes(type)) {
        this.logWarning('Invalid consent type', { type });
        return false;
      }
      return this.consent[type] || false;
    }
    return { ...this.consent };
  }

  /**
   * Set consent for specific type or multiple types
   * 
   * @param {string|Object} typeOrConsent - Consent type or consent object
   * @param {boolean} [value] - Consent value (if first param is type)
   * @returns {boolean} Success status
   */
  setConsent(typeOrConsent, value) {
    try {
      let updates = {};

      if (typeof typeOrConsent === 'string') {
        // Single consent type update
        if (!Object.values(ConsentType).includes(typeOrConsent)) {
          this.logWarning('Invalid consent type', { type: typeOrConsent });
          return false;
        }

        // Necessary consent cannot be disabled
        if (typeOrConsent === ConsentType.NECESSARY && value === false) {
          this.logWarning('Cannot disable necessary consent');
          return false;
        }

        updates[typeOrConsent] = Boolean(value);
      } else if (typeof typeOrConsent === 'object' && typeOrConsent !== null) {
        // Multiple consent types update
        updates = { ...typeOrConsent };

        // Validate all types
        for (const type of Object.keys(updates)) {
          if (!Object.values(ConsentType).includes(type)) {
            this.logWarning('Invalid consent type in batch update', { type });
            delete updates[type];
          }
        }

        // Ensure necessary consent stays true
        if (updates[ConsentType.NECESSARY] === false) {
          this.logWarning('Cannot disable necessary consent');
          updates[ConsentType.NECESSARY] = true;
        }
      } else {
        this.logWarning('Invalid consent parameter type');
        return false;
      }

      // Apply updates
      const previousConsent = { ...this.consent };
      this.consent = { ...this.consent, ...updates };

      // Save to storage
      this.saveConsent();

      // Dispatch event
      this.dispatchEvent(PrivacyEvent.CONSENT_UPDATED, {
        previous: previousConsent,
        current: this.consent,
        updates,
      });

      this.logInfo('Consent updated', { updates });
      return true;
    } catch (error) {
      this.logError('Failed to set consent', error);
      return false;
    }
  }

  /**
   * Check if user has given consent for specific type
   * 
   * @param {string} type - Consent type to check
   * @returns {boolean} Consent status
   */
  hasConsent(type) {
    if (!Object.values(ConsentType).includes(type)) {
      this.logWarning('Invalid consent type', { type });
      return false;
    }
    return this.consent[type] === true;
  }

  /**
   * Withdraw all non-necessary consent
   * 
   * @returns {boolean} Success status
   */
  withdrawConsent() {
    try {
      const previousConsent = { ...this.consent };

      // Reset all consent except necessary
      this.consent = {
        [ConsentType.NECESSARY]: true,
        [ConsentType.ANALYTICS]: false,
        [ConsentType.MARKETING]: false,
        [ConsentType.PREFERENCES]: false,
      };

      // Save to storage
      this.saveConsent();

      // Dispatch event
      this.dispatchEvent(PrivacyEvent.CONSENT_WITHDRAWN, {
        previous: previousConsent,
        current: this.consent,
      });

      this.logInfo('All consent withdrawn');
      return true;
    } catch (error) {
      this.logError('Failed to withdraw consent', error);
      return false;
    }
  }

  /**
   * Check if consent has expired
   * 
   * @returns {boolean} Expiration status
   */
  isConsentExpired() {
    try {
      const timestamp = localStorage.getItem(StorageKey.CONSENT_TIMESTAMP);
      if (!timestamp) {
        return true;
      }

      const consentDate = new Date(parseInt(timestamp, 10));
      const expiryDate = new Date(consentDate);
      expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);

      return new Date() > expiryDate;
    } catch (error) {
      this.logError('Failed to check consent expiration', error);
      return true; // Assume expired on error
    }
  }

  /**
   * Check if consent version has changed
   * 
   * @returns {boolean} Version mismatch status
   */
  isConsentVersionMismatch() {
    try {
      const storedVersion = localStorage.getItem(StorageKey.CONSENT_VERSION);
      return storedVersion !== CONSENT_VERSION;
    } catch (error) {
      this.logError('Failed to check consent version', error);
      return true; // Assume mismatch on error
    }
  }

  /**
   * Get user preferences
   * 
   * @param {string} [key] - Specific preference key
   * @returns {*} Preferences object or specific preference value
   */
  getPreferences(key) {
    if (key) {
      return this.preferences[key];
    }
    return { ...this.preferences };
  }

  /**
   * Set user preferences
   * 
   * @param {string|Object} keyOrPreferences - Preference key or preferences object
   * @param {*} [value] - Preference value (if first param is key)
   * @returns {boolean} Success status
   */
  setPreferences(keyOrPreferences, value) {
    try {
      let updates = {};

      if (typeof keyOrPreferences === 'string') {
        updates[keyOrPreferences] = value;
      } else if (typeof keyOrPreferences === 'object' && keyOrPreferences !== null) {
        updates = { ...keyOrPreferences };
      } else {
        this.logWarning('Invalid preferences parameter type');
        return false;
      }

      // Apply updates
      const previousPreferences = { ...this.preferences };
      this.preferences = { ...this.preferences, ...updates };

      // Save to storage
      this.savePreferences();

      // Dispatch event
      this.dispatchEvent(PrivacyEvent.PREFERENCES_CHANGED, {
        previous: previousPreferences,
        current: this.preferences,
        updates,
      });

      this.logInfo('Preferences updated', { updates });
      return true;
    } catch (error) {
      this.logError('Failed to set preferences', error);
      return false;
    }
  }

  /**
   * Check if user has opted out of analytics
   * 
   * @returns {boolean} Opt-out status
   */
  isOptedOut() {
    try {
      const optOut = localStorage.getItem(StorageKey.OPT_OUT);
      return optOut === 'true';
    } catch (error) {
      this.logError('Failed to check opt-out status', error);
      return false;
    }
  }

  /**
   * Set analytics opt-out status
   * 
   * @param {boolean} optOut - Opt-out status
   * @returns {boolean} Success status
   */
  setOptOut(optOut) {
    try {
      const previousOptOut = this.isOptedOut();
      const newOptOut = Boolean(optOut);

      localStorage.setItem(StorageKey.OPT_OUT, String(newOptOut));

      // If opting out, also revoke analytics consent
      if (newOptOut) {
        this.setConsent(ConsentType.ANALYTICS, false);
      }

      // Dispatch event
      this.dispatchEvent(PrivacyEvent.OPT_OUT_CHANGED, {
        previous: previousOptOut,
        current: newOptOut,
      });

      this.logInfo('Opt-out status updated', { optOut: newOptOut });
      return true;
    } catch (error) {
      this.logError('Failed to set opt-out status', error);
      return false;
    }
  }

  /**
   * Clear all privacy data
   * Implements GDPR right to erasure
   * 
   * @returns {boolean} Success status
   */
  clearAllData() {
    try {
      // Remove all privacy-related data from storage
      Object.values(StorageKey).forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          this.logWarning('Failed to remove storage key', { key, error });
        }
      });

      // Reset to defaults
      this.consent = { ...DEFAULT_CONSENT };
      this.preferences = {};

      this.logInfo('All privacy data cleared');
      return true;
    } catch (error) {
      this.logError('Failed to clear privacy data', error);
      return false;
    }
  }

  /**
   * Export user privacy data
   * Implements GDPR right to data portability
   * 
   * @returns {Object} Exported privacy data
   */
  exportData() {
    try {
      const data = {
        consent: this.getConsent(),
        preferences: this.getPreferences(),
        optOut: this.isOptedOut(),
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
      };

      this.logInfo('Privacy data exported');
      return data;
    } catch (error) {
      this.logError('Failed to export privacy data', error);
      return null;
    }
  }

  /**
   * Add event listener for privacy events
   * 
   * @param {string} event - Event type
   * @param {Function} callback - Event callback
   * @returns {Function} Cleanup function
   */
  addEventListener(event, callback) {
    if (!Object.values(PrivacyEvent).includes(event)) {
      this.logWarning('Invalid privacy event type', { event });
      return () => {};
    }

    if (typeof callback !== 'function') {
      this.logWarning('Event callback must be a function');
      return () => {};
    }

    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event).add(callback);

    // Return cleanup function
    return () => this.removeEventListener(event, callback);
  }

  /**
   * Remove event listener
   * 
   * @param {string} event - Event type
   * @param {Function} callback - Event callback
   */
  removeEventListener(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  /**
   * Dispatch privacy event
   * 
   * @param {string} event - Event type
   * @param {Object} detail - Event detail
   */
  dispatchEvent(event, detail = {}) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback({ type: event, detail, timestamp: Date.now() });
        } catch (error) {
          this.logError('Error in event listener', error);
        }
      });
    }

    // Also dispatch as DOM event
    try {
      const customEvent = new CustomEvent(event, { detail });
      window.dispatchEvent(customEvent);
    } catch (error) {
      this.logWarning('Failed to dispatch DOM event', error);
    }
  }

  /**
   * Load consent from storage
   * 
   * @returns {Object|null} Stored consent or null
   */
  loadConsent() {
    try {
      const stored = localStorage.getItem(StorageKey.CONSENT);
      if (!stored) {
        return null;
      }

      const consent = JSON.parse(stored);
      
      // Validate consent structure
      if (typeof consent !== 'object' || consent === null) {
        this.logWarning('Invalid stored consent structure');
        return null;
      }

      // Ensure necessary consent is always true
      consent[ConsentType.NECESSARY] = true;

      return consent;
    } catch (error) {
      this.logError('Failed to load consent from storage', error);
      return null;
    }
  }

  /**
   * Save consent to storage
   * 
   * @returns {boolean} Success status
   */
  saveConsent() {
    try {
      localStorage.setItem(StorageKey.CONSENT, JSON.stringify(this.consent));
      localStorage.setItem(StorageKey.CONSENT_TIMESTAMP, String(Date.now()));
      localStorage.setItem(StorageKey.CONSENT_VERSION, CONSENT_VERSION);
      return true;
    } catch (error) {
      this.logError('Failed to save consent to storage', error);
      return false;
    }
  }

  /**
   * Load preferences from storage
   * 
   * @returns {Object|null} Stored preferences or null
   */
  loadPreferences() {
    try {
      const stored = localStorage.getItem(StorageKey.PREFERENCES);
      if (!stored) {
        return null;
      }

      const preferences = JSON.parse(stored);
      
      if (typeof preferences !== 'object' || preferences === null) {
        this.logWarning('Invalid stored preferences structure');
        return null;
      }

      return preferences;
    } catch (error) {
      this.logError('Failed to load preferences from storage', error);
      return null;
    }
  }

  /**
   * Save preferences to storage
   * 
   * @returns {boolean} Success status
   */
  savePreferences() {
    try {
      localStorage.setItem(StorageKey.PREFERENCES, JSON.stringify(this.preferences));
      return true;
    } catch (error) {
      this.logError('Failed to save preferences to storage', error);
      return false;
    }
  }

  /**
   * Check if local storage is available
   * 
   * @returns {boolean} Storage availability
   */
  isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Log informational message
   * 
   * @param {string} message - Log message
   * @param {*} [data] - Additional data
   */
  logInfo(message, data) {
    if (import.meta.env.MODE !== 'production') {
      console.log(`[Privacy] ${message}`, data || '');
    }
  }

  /**
   * Log warning message
   * 
   * @param {string} message - Warning message
   * @param {*} [data] - Additional data
   */
  logWarning(message, data) {
    console.warn(`[Privacy] ${message}`, data || '');
  }

  /**
   * Log error message
   * 
   * @param {string} message - Error message
   * @param {Error|*} error - Error object or additional data
   */
  logError(message, error) {
    const errorContext = {
      message,
      timestamp: new Date().toISOString(),
    };

    if (error instanceof Error) {
      errorContext.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (error) {
      errorContext.details = error;
    }

    console.error('[Privacy Error]', errorContext);
  }
}

// Create singleton instance
const privacyManager = new PrivacyManager();

/**
 * Initialize privacy manager
 * 
 * @returns {boolean} Success status
 */
export function initializePrivacy() {
  return privacyManager.init();
}

/**
 * Get current consent state
 * 
 * @param {string} [type] - Specific consent type
 * @returns {Object|boolean} Consent state
 */
export function getConsent(type) {
  return privacyManager.getConsent(type);
}

/**
 * Set consent
 * 
 * @param {string|Object} typeOrConsent - Consent type or consent object
 * @param {boolean} [value] - Consent value
 * @returns {boolean} Success status
 */
export function setConsent(typeOrConsent, value) {
  return privacyManager.setConsent(typeOrConsent, value);
}

/**
 * Check if user has given consent
 * 
 * @param {string} type - Consent type
 * @returns {boolean} Consent status
 */
export function hasConsent(type) {
  return privacyManager.hasConsent(type);
}

/**
 * Withdraw all consent
 * 
 * @returns {boolean} Success status
 */
export function withdrawConsent() {
  return privacyManager.withdrawConsent();
}

/**
 * Get user preferences
 * 
 * @param {string} [key] - Specific preference key
 * @returns {*} Preferences
 */
export function getPreferences(key) {
  return privacyManager.getPreferences(key);
}

/**
 * Set user preferences
 * 
 * @param {string|Object} keyOrPreferences - Preference key or preferences object
 * @param {*} [value] - Preference value
 * @returns {boolean} Success status
 */
export function setPreferences(keyOrPreferences, value) {
  return privacyManager.setPreferences(keyOrPreferences, value);
}

/**
 * Check if user has opted out of analytics
 * 
 * @returns {boolean} Opt-out status
 */
export function isOptedOut() {
  return privacyManager.isOptedOut();
}

/**
 * Set analytics opt-out status
 * 
 * @param {boolean} optOut - Opt-out status
 * @returns {boolean} Success status
 */
export function setOptOut(optOut) {
  return privacyManager.setOptOut(optOut);
}

/**
 * Clear all privacy data
 * 
 * @returns {boolean} Success status
 */
export function clearPrivacyData() {
  return privacyManager.clearAllData();
}

/**
 * Export user privacy data
 * 
 * @returns {Object} Exported data
 */
export function exportPrivacyData() {
  return privacyManager.exportData();
}

/**
 * Add privacy event listener
 * 
 * @param {string} event - Event type
 * @param {Function} callback - Event callback
 * @returns {Function} Cleanup function
 */
export function onPrivacyEvent(event, callback) {
  return privacyManager.addEventListener(event, callback);
}

/**
 * Export consent types for external use
 */
export { ConsentType, PrivacyEvent };

/**
 * Export privacy manager instance for advanced use cases
 */
export { privacyManager };