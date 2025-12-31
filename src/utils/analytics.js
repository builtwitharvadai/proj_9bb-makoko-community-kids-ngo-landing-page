/**
 * Analytics Integration Utilities
 * 
 * Provides comprehensive analytics tracking including Google Analytics 4,
 * Facebook Pixel, and LinkedIn Insight Tag with privacy-compliant consent management.
 * 
 * @module analytics
 * @version 1.0.0
 */

/**
 * Analytics configuration and state management
 */
const AnalyticsConfig = {
  // Google Analytics 4 Measurement ID
  ga4MeasurementId: null,
  
  // Facebook Pixel ID
  fbPixelId: null,
  
  // LinkedIn Partner ID
  linkedInPartnerId: null,
  
  // Consent state
  consent: {
    analytics: false,
    marketing: false,
    preferences: false,
  },
  
  // Initialization state
  initialized: {
    ga4: false,
    facebook: false,
    linkedin: false,
  },
  
  // Debug mode
  debug: false,
  
  // Queue for events before initialization
  eventQueue: [],
};

/**
 * Initialize analytics with configuration
 * 
 * @param {Object} config - Analytics configuration
 * @param {string} [config.ga4MeasurementId] - Google Analytics 4 Measurement ID
 * @param {string} [config.fbPixelId] - Facebook Pixel ID
 * @param {string} [config.linkedInPartnerId] - LinkedIn Partner ID
 * @param {boolean} [config.debug=false] - Enable debug mode
 * @param {Object} [config.consent] - Initial consent state
 * @returns {Promise<void>}
 */
export async function initializeAnalytics(config = {}) {
  try {
    // Set configuration
    AnalyticsConfig.ga4MeasurementId = config.ga4MeasurementId || null;
    AnalyticsConfig.fbPixelId = config.fbPixelId || null;
    AnalyticsConfig.linkedInPartnerId = config.linkedInPartnerId || null;
    AnalyticsConfig.debug = config.debug || false;
    
    // Set initial consent if provided
    if (config.consent) {
      AnalyticsConfig.consent = {
        ...AnalyticsConfig.consent,
        ...config.consent,
      };
    }
    
    // Load consent from storage
    loadConsentFromStorage();
    
    // Initialize analytics services based on consent
    const initPromises = [];
    
    if (AnalyticsConfig.consent.analytics && AnalyticsConfig.ga4MeasurementId) {
      initPromises.push(initializeGA4());
    }
    
    if (AnalyticsConfig.consent.marketing) {
      if (AnalyticsConfig.fbPixelId) {
        initPromises.push(initializeFacebookPixel());
      }
      if (AnalyticsConfig.linkedInPartnerId) {
        initPromises.push(initializeLinkedInInsight());
      }
    }
    
    await Promise.allSettled(initPromises);
    
    // Process queued events
    processEventQueue();
    
    logDebug('Analytics initialized', {
      ga4: AnalyticsConfig.initialized.ga4,
      facebook: AnalyticsConfig.initialized.facebook,
      linkedin: AnalyticsConfig.initialized.linkedin,
      consent: AnalyticsConfig.consent,
    });
  } catch (error) {
    logError('Failed to initialize analytics', error);
    throw error;
  }
}

/**
 * Initialize Google Analytics 4
 * 
 * @returns {Promise<void>}
 */
async function initializeGA4() {
  try {
    if (!AnalyticsConfig.ga4MeasurementId) {
      throw new Error('GA4 Measurement ID not configured');
    }
    
    if (AnalyticsConfig.initialized.ga4) {
      logDebug('GA4 already initialized');
      return;
    }
    
    // Load gtag.js script
    await loadScript(
      `https://www.googletagmanager.com/gtag/js?id=${AnalyticsConfig.ga4MeasurementId}`,
      'ga4-script'
    );
    
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    
    // Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', AnalyticsConfig.ga4MeasurementId, {
      send_page_view: true,
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });
    
    AnalyticsConfig.initialized.ga4 = true;
    logDebug('GA4 initialized successfully');
  } catch (error) {
    logError('Failed to initialize GA4', error);
    throw error;
  }
}

/**
 * Initialize Facebook Pixel
 * 
 * @returns {Promise<void>}
 */
async function initializeFacebookPixel() {
  try {
    if (!AnalyticsConfig.fbPixelId) {
      throw new Error('Facebook Pixel ID not configured');
    }
    
    if (AnalyticsConfig.initialized.facebook) {
      logDebug('Facebook Pixel already initialized');
      return;
    }
    
    // Initialize Facebook Pixel
    /* eslint-disable */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    
    window.fbq('init', AnalyticsConfig.fbPixelId);
    window.fbq('track', 'PageView');
    
    AnalyticsConfig.initialized.facebook = true;
    logDebug('Facebook Pixel initialized successfully');
  } catch (error) {
    logError('Failed to initialize Facebook Pixel', error);
    throw error;
  }
}

/**
 * Initialize LinkedIn Insight Tag
 * 
 * @returns {Promise<void>}
 */
async function initializeLinkedInInsight() {
  try {
    if (!AnalyticsConfig.linkedInPartnerId) {
      throw new Error('LinkedIn Partner ID not configured');
    }
    
    if (AnalyticsConfig.initialized.linkedin) {
      logDebug('LinkedIn Insight already initialized');
      return;
    }
    
    // Initialize LinkedIn Insight Tag
    window._linkedin_partner_id = AnalyticsConfig.linkedInPartnerId;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
    
    await loadScript('https://snap.licdn.com/li.lms-analytics/insight.min.js', 'linkedin-insight-script');
    
    AnalyticsConfig.initialized.linkedin = true;
    logDebug('LinkedIn Insight initialized successfully');
  } catch (error) {
    logError('Failed to initialize LinkedIn Insight', error);
    throw error;
  }
}

/**
 * Track page view
 * 
 * @param {Object} options - Page view options
 * @param {string} [options.page_title] - Page title
 * @param {string} [options.page_location] - Page URL
 * @param {string} [options.page_path] - Page path
 */
export function trackPageView(options = {}) {
  try {
    const pageData = {
      page_title: options.page_title || document.title,
      page_location: options.page_location || window.location.href,
      page_path: options.page_path || window.location.pathname,
    };
    
    // Track in GA4
    if (AnalyticsConfig.initialized.ga4 && window.gtag) {
      window.gtag('event', 'page_view', pageData);
      logDebug('GA4 page view tracked', pageData);
    }
    
    // Track in Facebook Pixel
    if (AnalyticsConfig.initialized.facebook && window.fbq) {
      window.fbq('track', 'PageView');
      logDebug('Facebook page view tracked');
    }
    
    // LinkedIn automatically tracks page views
    
  } catch (error) {
    logError('Failed to track page view', error);
  }
}

/**
 * Track custom event
 * 
 * @param {string} eventName - Event name
 * @param {Object} [eventParams] - Event parameters
 */
export function trackEvent(eventName, eventParams = {}) {
  try {
    if (!eventName) {
      throw new Error('Event name is required');
    }
    
    // Queue event if not initialized
    if (!isAnyAnalyticsInitialized()) {
      AnalyticsConfig.eventQueue.push({ eventName, eventParams, timestamp: Date.now() });
      logDebug('Event queued', { eventName, eventParams });
      return;
    }
    
    // Track in GA4
    if (AnalyticsConfig.initialized.ga4 && window.gtag) {
      window.gtag('event', eventName, eventParams);
      logDebug('GA4 event tracked', { eventName, eventParams });
    }
    
    // Track in Facebook Pixel
    if (AnalyticsConfig.initialized.facebook && window.fbq) {
      window.fbq('trackCustom', eventName, eventParams);
      logDebug('Facebook event tracked', { eventName, eventParams });
    }
    
    // Track in LinkedIn (conversion events)
    if (AnalyticsConfig.initialized.linkedin && window.lintrk) {
      window.lintrk('track', { conversion_id: eventParams.conversion_id || null });
      logDebug('LinkedIn event tracked', { eventName });
    }
    
  } catch (error) {
    logError('Failed to track event', error);
  }
}

/**
 * Track donation event
 * 
 * @param {Object} donationData - Donation data
 * @param {number} donationData.amount - Donation amount
 * @param {string} donationData.currency - Currency code
 * @param {string} [donationData.frequency] - Donation frequency (one-time, monthly, etc.)
 * @param {string} [donationData.method] - Payment method
 */
export function trackDonation(donationData) {
  try {
    const { amount, currency, frequency = 'one-time', method = 'unknown' } = donationData;
    
    if (!amount || !currency) {
      throw new Error('Amount and currency are required for donation tracking');
    }
    
    const eventParams = {
      value: amount,
      currency: currency.toUpperCase(),
      frequency,
      payment_method: method,
    };
    
    // Track in GA4
    if (AnalyticsConfig.initialized.ga4 && window.gtag) {
      window.gtag('event', 'donation', eventParams);
      logDebug('GA4 donation tracked', eventParams);
    }
    
    // Track in Facebook Pixel
    if (AnalyticsConfig.initialized.facebook && window.fbq) {
      window.fbq('track', 'Donate', {
        value: amount,
        currency: currency.toUpperCase(),
      });
      logDebug('Facebook donation tracked', eventParams);
    }
    
    // Track in LinkedIn
    if (AnalyticsConfig.initialized.linkedin && window.lintrk) {
      window.lintrk('track', { conversion_id: 'donation' });
      logDebug('LinkedIn donation tracked');
    }
    
  } catch (error) {
    logError('Failed to track donation', error);
  }
}

/**
 * Track form submission
 * 
 * @param {Object} formData - Form data
 * @param {string} formData.form_name - Form name
 * @param {string} [formData.form_type] - Form type (contact, volunteer, etc.)
 */
export function trackFormSubmission(formData) {
  try {
    const { form_name, form_type = 'unknown' } = formData;
    
    if (!form_name) {
      throw new Error('Form name is required for form submission tracking');
    }
    
    const eventParams = {
      form_name,
      form_type,
    };
    
    trackEvent('form_submission', eventParams);
    
    // Track lead in Facebook Pixel
    if (AnalyticsConfig.initialized.facebook && window.fbq) {
      window.fbq('track', 'Lead', { content_name: form_name });
      logDebug('Facebook lead tracked', { form_name });
    }
    
  } catch (error) {
    logError('Failed to track form submission', error);
  }
}

/**
 * Update consent preferences
 * 
 * @param {Object} consent - Consent preferences
 * @param {boolean} [consent.analytics] - Analytics consent
 * @param {boolean} [consent.marketing] - Marketing consent
 * @param {boolean} [consent.preferences] - Preferences consent
 */
export async function updateConsent(consent) {
  try {
    // Update consent state
    AnalyticsConfig.consent = {
      ...AnalyticsConfig.consent,
      ...consent,
    };
    
    // Save to storage
    saveConsentToStorage();
    
    // Update GA4 consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consent.analytics ? 'granted' : 'denied',
        ad_storage: consent.marketing ? 'granted' : 'denied',
        personalization_storage: consent.preferences ? 'granted' : 'denied',
      });
    }
    
    // Initialize or disable services based on consent
    if (consent.analytics && !AnalyticsConfig.initialized.ga4 && AnalyticsConfig.ga4MeasurementId) {
      await initializeGA4();
    }
    
    if (consent.marketing) {
      if (!AnalyticsConfig.initialized.facebook && AnalyticsConfig.fbPixelId) {
        await initializeFacebookPixel();
      }
      if (!AnalyticsConfig.initialized.linkedin && AnalyticsConfig.linkedInPartnerId) {
        await initializeLinkedInInsight();
      }
    }
    
    logDebug('Consent updated', AnalyticsConfig.consent);
    
    // Dispatch consent update event
    window.dispatchEvent(new CustomEvent('analytics:consent-updated', {
      detail: { consent: AnalyticsConfig.consent },
    }));
    
  } catch (error) {
    logError('Failed to update consent', error);
    throw error;
  }
}

/**
 * Get current consent state
 * 
 * @returns {Object} Current consent state
 */
export function getConsent() {
  return { ...AnalyticsConfig.consent };
}

/**
 * Load script dynamically
 * 
 * @param {string} src - Script source URL
 * @param {string} id - Script element ID
 * @returns {Promise<void>}
 */
function loadScript(src, id) {
  return new Promise((resolve, reject) => {
    try {
      // Check if script already exists
      if (document.getElementById(id)) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      
      script.onload = () => {
        logDebug(`Script loaded: ${id}`);
        resolve();
      };
      
      script.onerror = () => {
        const error = new Error(`Failed to load script: ${src}`);
        logError('Script load error', error);
        reject(error);
      };
      
      document.head.appendChild(script);
    } catch (error) {
      logError('Failed to create script element', error);
      reject(error);
    }
  });
}

/**
 * Check if any analytics service is initialized
 * 
 * @returns {boolean} True if any service is initialized
 */
function isAnyAnalyticsInitialized() {
  return AnalyticsConfig.initialized.ga4 || 
         AnalyticsConfig.initialized.facebook || 
         AnalyticsConfig.initialized.linkedin;
}

/**
 * Process queued events
 */
function processEventQueue() {
  try {
    if (AnalyticsConfig.eventQueue.length === 0) {
      return;
    }
    
    logDebug(`Processing ${AnalyticsConfig.eventQueue.length} queued events`);
    
    const queue = [...AnalyticsConfig.eventQueue];
    AnalyticsConfig.eventQueue = [];
    
    queue.forEach(({ eventName, eventParams }) => {
      trackEvent(eventName, eventParams);
    });
    
  } catch (error) {
    logError('Failed to process event queue', error);
  }
}

/**
 * Save consent to local storage
 */
function saveConsentToStorage() {
  try {
    const consentData = {
      consent: AnalyticsConfig.consent,
      timestamp: Date.now(),
    };
    localStorage.setItem('analytics_consent', JSON.stringify(consentData));
    logDebug('Consent saved to storage');
  } catch (error) {
    logError('Failed to save consent to storage', error);
  }
}

/**
 * Load consent from local storage
 */
function loadConsentFromStorage() {
  try {
    const stored = localStorage.getItem('analytics_consent');
    if (stored) {
      const { consent, timestamp } = JSON.parse(stored);
      
      // Check if consent is still valid (30 days)
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp < thirtyDaysInMs) {
        AnalyticsConfig.consent = consent;
        logDebug('Consent loaded from storage', consent);
      } else {
        logDebug('Stored consent expired');
        localStorage.removeItem('analytics_consent');
      }
    }
  } catch (error) {
    logError('Failed to load consent from storage', error);
  }
}

/**
 * Log debug message
 * 
 * @param {string} message - Debug message
 * @param {*} [data] - Additional data
 */
function logDebug(message, data) {
  if (AnalyticsConfig.debug) {
    console.log(`[Analytics] ${message}`, data || '');
  }
}

/**
 * Log error message
 * 
 * @param {string} message - Error message
 * @param {Error|Object} error - Error object or additional context
 */
function logError(message, error) {
  const errorContext = {
    message,
    timestamp: new Date().toISOString(),
    url: window.location.href,
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
  
  console.error('[Analytics Error]', errorContext);
}

/**
 * Clean up analytics resources
 */
export function destroyAnalytics() {
  try {
    // Remove scripts
    const scripts = ['ga4-script', 'linkedin-insight-script'];
    scripts.forEach(id => {
      const script = document.getElementById(id);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
    
    // Clear global variables
    delete window.gtag;
    delete window.dataLayer;
    delete window.fbq;
    delete window._linkedin_partner_id;
    delete window._linkedin_data_partner_ids;
    delete window.lintrk;
    
    // Reset state
    AnalyticsConfig.initialized = {
      ga4: false,
      facebook: false,
      linkedin: false,
    };
    AnalyticsConfig.eventQueue = [];
    
    logDebug('Analytics destroyed');
  } catch (error) {
    logError('Failed to destroy analytics', error);
  }
}

// Export configuration for testing
export { AnalyticsConfig };