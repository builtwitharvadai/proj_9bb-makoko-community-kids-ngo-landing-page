/**
 * Social Media Configuration and Integration Utilities
 * 
 * Provides centralized configuration for social media integrations including
 * platform URLs, API settings, widget configurations, and error handling.
 * Implements privacy-first loading with fallback mechanisms.
 * 
 * @module utils/socialConfig
 * @version 1.0.0
 */

/**
 * Social media platform identifiers
 * Using symbols to prevent typos and provide type safety
 */
const PLATFORMS = Object.freeze({
  FACEBOOK: Symbol('facebook'),
  INSTAGRAM: Symbol('instagram'),
  TWITTER: Symbol('twitter'),
  LINKEDIN: Symbol('linkedin'),
  YOUTUBE: Symbol('youtube'),
});

/**
 * Widget loading states
 */
const WIDGET_STATE = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error',
  FALLBACK: 'fallback',
});

/**
 * Social media platform configurations
 * Contains URLs, handles, and platform-specific settings
 */
const SOCIAL_PLATFORMS = Object.freeze({
  facebook: {
    name: 'Facebook',
    url: 'https://www.facebook.com/MakokoCommunityKids',
    handle: '@MakokoCommunityKids',
    icon: 'facebook',
    color: '#1877F2',
    ariaLabel: 'Visit our Facebook page',
    widgetEnabled: true,
    widgetType: 'page',
    privacyMode: true,
  },
  instagram: {
    name: 'Instagram',
    url: 'https://www.instagram.com/makokokids',
    handle: '@makokokids',
    icon: 'instagram',
    color: '#E4405F',
    ariaLabel: 'Follow us on Instagram',
    widgetEnabled: true,
    widgetType: 'profile',
    privacyMode: true,
  },
  twitter: {
    name: 'Twitter',
    url: 'https://twitter.com/MakokoCommunity',
    handle: '@MakokoCommunity',
    icon: 'twitter',
    color: '#1DA1F2',
    ariaLabel: 'Follow us on Twitter',
    widgetEnabled: true,
    widgetType: 'timeline',
    privacyMode: true,
  },
  linkedin: {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/makoko-community-kids',
    handle: 'Makoko Community Kids',
    icon: 'linkedin',
    color: '#0A66C2',
    ariaLabel: 'Connect with us on LinkedIn',
    widgetEnabled: false,
    widgetType: 'company',
    privacyMode: true,
  },
  youtube: {
    name: 'YouTube',
    url: 'https://www.youtube.com/@MakokoCommunityKids',
    handle: '@MakokoCommunityKids',
    icon: 'youtube',
    color: '#FF0000',
    ariaLabel: 'Subscribe to our YouTube channel',
    widgetEnabled: false,
    widgetType: 'channel',
    privacyMode: true,
  },
});

/**
 * Widget loading configuration
 * Controls how and when social media widgets are loaded
 */
const WIDGET_CONFIG = Object.freeze({
  // Loading strategy
  loadStrategy: 'lazy', // 'eager', 'lazy', 'manual'
  
  // Intersection Observer options for lazy loading
  intersectionOptions: {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
  },
  
  // Timeout for widget loading (ms)
  loadTimeout: 10000,
  
  // Retry configuration
  maxRetries: 2,
  retryDelay: 2000,
  
  // Privacy settings
  respectDoNotTrack: true,
  consentRequired: false,
  
  // Performance settings
  deferScriptLoading: true,
  useAsyncScripts: true,
  
  // Fallback settings
  showFallbackOnError: true,
  fallbackDelay: 3000,
});

/**
 * Facebook widget configuration
 */
const FACEBOOK_WIDGET_CONFIG = Object.freeze({
  appId: '', // Set via environment variable or leave empty for basic functionality
  version: 'v18.0',
  sdkUrl: 'https://connect.facebook.net/en_US/sdk.js',
  xfbml: true,
  autoLogAppEvents: false,
  
  // Page plugin settings
  pagePlugin: {
    width: 340,
    height: 500,
    tabs: 'timeline',
    hideCover: false,
    showFacepile: true,
    smallHeader: false,
    adaptContainerWidth: true,
  },
  
  // Privacy settings
  dataSaver: true,
  lazyLoad: true,
});

/**
 * Instagram widget configuration
 */
const INSTAGRAM_WIDGET_CONFIG = Object.freeze({
  // Instagram doesn't have official embed widgets
  // Using third-party or custom implementation
  embedType: 'custom', // 'custom', 'third-party'
  
  // Display settings
  postsToShow: 6,
  layout: 'grid', // 'grid', 'carousel', 'list'
  showCaptions: false,
  showLikes: true,
  
  // API settings (if using Instagram Basic Display API)
  apiEndpoint: 'https://graph.instagram.com/me/media',
  accessToken: '', // Set via environment variable
  
  // Fallback to static images
  useFallbackImages: true,
});

/**
 * Twitter widget configuration
 */
const TWITTER_WIDGET_CONFIG = Object.freeze({
  sdkUrl: 'https://platform.twitter.com/widgets.js',
  
  // Timeline settings
  timeline: {
    sourceType: 'profile',
    screenName: 'MakokoCommunity',
    chrome: 'noheader nofooter noborders',
    tweetLimit: 5,
    width: 340,
    height: 500,
    theme: 'light',
    linkColor: '#1DA1F2',
    borderColor: '#e1e8ed',
  },
  
  // Privacy settings
  dnt: true, // Do Not Track
  
  // Performance
  async: true,
  defer: true,
});

/**
 * LinkedIn widget configuration
 */
const LINKEDIN_WIDGET_CONFIG = Object.freeze({
  sdkUrl: 'https://platform.linkedin.com/in.js',
  
  // Company profile settings
  companyProfile: {
    id: '', // LinkedIn company ID
    format: 'inline',
    text: 'Follow Company',
  },
  
  // Privacy settings
  tracking: false,
});

/**
 * Widget state management
 */
class WidgetStateManager {
  constructor() {
    this.states = new Map();
    this.observers = new Map();
    this.loadAttempts = new Map();
  }

  /**
   * Get widget state
   * @param {string} platform - Platform identifier
   * @returns {string} Current state
   */
  getState(platform) {
    return this.states.get(platform) || WIDGET_STATE.IDLE;
  }

  /**
   * Set widget state
   * @param {string} platform - Platform identifier
   * @param {string} state - New state
   */
  setState(platform, state) {
    const oldState = this.states.get(platform);
    this.states.set(platform, state);
    
    // Notify observers
    const observers = this.observers.get(platform) || [];
    observers.forEach(callback => {
      try {
        callback(state, oldState);
      } catch (error) {
        console.error(`[SocialConfig] Observer error for ${platform}:`, error);
      }
    });
  }

  /**
   * Subscribe to state changes
   * @param {string} platform - Platform identifier
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(platform, callback) {
    if (!this.observers.has(platform)) {
      this.observers.set(platform, []);
    }
    
    this.observers.get(platform).push(callback);
    
    // Return unsubscribe function
    return () => {
      const observers = this.observers.get(platform);
      const index = observers.indexOf(callback);
      if (index > -1) {
        observers.splice(index, 1);
      }
    };
  }

  /**
   * Increment load attempt counter
   * @param {string} platform - Platform identifier
   * @returns {number} Current attempt count
   */
  incrementAttempts(platform) {
    const current = this.loadAttempts.get(platform) || 0;
    const next = current + 1;
    this.loadAttempts.set(platform, next);
    return next;
  }

  /**
   * Reset load attempts
   * @param {string} platform - Platform identifier
   */
  resetAttempts(platform) {
    this.loadAttempts.set(platform, 0);
  }

  /**
   * Get load attempts
   * @param {string} platform - Platform identifier
   * @returns {number} Attempt count
   */
  getAttempts(platform) {
    return this.loadAttempts.get(platform) || 0;
  }
}

/**
 * Global widget state manager instance
 */
const widgetStateManager = new WidgetStateManager();

/**
 * Check if Do Not Track is enabled
 * @returns {boolean} True if DNT is enabled
 */
function isDoNotTrackEnabled() {
  return (
    navigator.doNotTrack === '1' ||
    window.doNotTrack === '1' ||
    navigator.msDoNotTrack === '1'
  );
}

/**
 * Check if user has given consent for social media widgets
 * @returns {boolean} True if consent is given or not required
 */
function hasUserConsent() {
  // If consent is not required, return true
  if (!WIDGET_CONFIG.consentRequired) {
    return true;
  }
  
  // Check for consent in localStorage
  try {
    const consent = localStorage.getItem('social-media-consent');
    return consent === 'granted';
  } catch (error) {
    console.warn('[SocialConfig] Unable to check consent:', error);
    return false;
  }
}

/**
 * Check if widgets should be loaded based on privacy settings
 * @returns {boolean} True if widgets should be loaded
 */
function shouldLoadWidgets() {
  // Check Do Not Track setting
  if (WIDGET_CONFIG.respectDoNotTrack && isDoNotTrackEnabled()) {
    console.info('[SocialConfig] Widgets disabled due to Do Not Track');
    return false;
  }
  
  // Check user consent
  if (!hasUserConsent()) {
    console.info('[SocialConfig] Widgets disabled due to lack of consent');
    return false;
  }
  
  return true;
}

/**
 * Load external script with timeout and error handling
 * @param {string} url - Script URL
 * @param {Object} options - Loading options
 * @returns {Promise<void>}
 */
function loadScript(url, options = {}) {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = url;
    script.async = options.async !== false;
    script.defer = options.defer !== false;
    
    // Set timeout
    const timeout = setTimeout(() => {
      script.remove();
      reject(new Error(`Script load timeout: ${url}`));
    }, WIDGET_CONFIG.loadTimeout);
    
    script.onload = () => {
      clearTimeout(timeout);
      resolve();
    };
    
    script.onerror = () => {
      clearTimeout(timeout);
      script.remove();
      reject(new Error(`Script load error: ${url}`));
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Create fallback content for failed widget loads
 * @param {string} platform - Platform identifier
 * @returns {HTMLElement} Fallback element
 */
function createFallbackContent(platform) {
  const config = SOCIAL_PLATFORMS[platform];
  if (!config) {
    return null;
  }
  
  const container = document.createElement('div');
  container.className = 'social-widget-fallback p-6 bg-gray-50 rounded-lg text-center';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', `${config.name} fallback content`);
  
  container.innerHTML = `
    <div class="mb-4">
      <svg class="w-12 h-12 mx-auto text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      Connect with us on ${config.name}
    </h3>
    <p class="text-gray-600 mb-4">
      Follow us for updates, stories, and community impact.
    </p>
    <a 
      href="${config.url}" 
      target="_blank" 
      rel="noopener noreferrer"
      class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      aria-label="${config.ariaLabel}"
    >
      Visit ${config.name}
      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
      </svg>
    </a>
  `;
  
  return container;
}

/**
 * Get platform configuration
 * @param {string} platform - Platform identifier
 * @returns {Object|null} Platform configuration
 */
function getPlatformConfig(platform) {
  return SOCIAL_PLATFORMS[platform] || null;
}

/**
 * Get all enabled platforms
 * @returns {Array<Object>} Array of enabled platform configurations
 */
function getEnabledPlatforms() {
  return Object.entries(SOCIAL_PLATFORMS)
    .filter(([_key, config]) => config.widgetEnabled)
    .map(([key, config]) => ({ key, ...config }));
}

/**
 * Get widget configuration for platform
 * @param {string} platform - Platform identifier
 * @returns {Object|null} Widget configuration
 */
function getWidgetConfig(platform) {
  const configs = {
    facebook: FACEBOOK_WIDGET_CONFIG,
    instagram: INSTAGRAM_WIDGET_CONFIG,
    twitter: TWITTER_WIDGET_CONFIG,
    linkedin: LINKEDIN_WIDGET_CONFIG,
  };
  
  return configs[platform] || null;
}

/**
 * Export public API
 */
export {
  PLATFORMS,
  WIDGET_STATE,
  SOCIAL_PLATFORMS,
  WIDGET_CONFIG,
  FACEBOOK_WIDGET_CONFIG,
  INSTAGRAM_WIDGET_CONFIG,
  TWITTER_WIDGET_CONFIG,
  LINKEDIN_WIDGET_CONFIG,
  widgetStateManager,
  isDoNotTrackEnabled,
  hasUserConsent,
  shouldLoadWidgets,
  loadScript,
  createFallbackContent,
  getPlatformConfig,
  getEnabledPlatforms,
  getWidgetConfig,
};