/**
 * Main Application Entry Point
 * 
 * Initializes the application, imports global styles, and sets up
 * the foundation for the Makoko Community Kids NGO landing page.
 * 
 * @module main
 * @version 1.0.0
 */

// Import global styles - Tailwind CSS base, components, and utilities
import './style.css';

// Import navigation components and utilities
import header from './components/Header.js';
import Footer from './components/Footer.js';
import { initializeNavigation } from './utils/navigation.js';

/**
 * Application initialization and configuration
 */
class Application {
  /**
   * Creates an instance of the Application
   */
  constructor() {
    this.initialized = false;
    this.startTime = performance.now();
    this.navigationAPI = null;
    this.footer = null;
    
    // Bind methods to maintain context
    this.init = this.init.bind(this);
    this.handleDOMContentLoaded = this.handleDOMContentLoaded.bind(this);
    this.handleError = this.handleError.bind(this);
    this.initializeComponents = this.initializeComponents.bind(this);
  }

  /**
   * Initialize the application
   * Sets up event listeners and performs initial setup
   */
  init() {
    try {
      // Set up global error handler
      window.addEventListener('error', this.handleError);
      window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));

      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', this.handleDOMContentLoaded);
      } else {
        // DOM is already ready
        this.handleDOMContentLoaded();
      }

      this.initialized = true;
      this.logInfo('Application initialization started');
    } catch (error) {
      this.logError('Failed to initialize application', error);
      throw error;
    }
  }

  /**
   * Handle DOM content loaded event
   * Performs setup that requires the DOM to be ready
   */
  handleDOMContentLoaded() {
    try {
      const loadTime = performance.now() - this.startTime;
      
      // Set up app root element if it exists
      const appRoot = document.querySelector('#app');
      if (appRoot) {
        appRoot.setAttribute('data-app-initialized', 'true');
      }

      // Initialize navigation components and functionality
      this.initializeComponents();

      // Log successful initialization
      this.logInfo(`Application ready in ${loadTime.toFixed(2)}ms`);

      // Dispatch custom event for application ready
      const readyEvent = new CustomEvent('app:ready', {
        detail: {
          loadTime,
          timestamp: Date.now(),
        },
      });
      window.dispatchEvent(readyEvent);

      // Performance mark for monitoring
      if (window.performance && window.performance.mark) {
        performance.mark('app-initialized');
      }
    } catch (error) {
      this.logError('Error during DOM content loaded handler', error);
    }
  }

  /**
   * Initialize navigation components and functionality
   * Sets up header, footer, and navigation utilities
   */
  initializeComponents() {
    try {
      // Header is already initialized via its own module
      // Just verify it's ready
      if (header && header.init) {
        this.logInfo('Header component ready');
      }

      // Initialize footer component
      const footerContainer = document.querySelector('[data-footer]');
      if (footerContainer) {
        this.footer = new Footer();
        this.footer.init();
        this.logInfo('Footer component initialized');
      }

      // Initialize navigation utilities
      this.navigationAPI = initializeNavigation();
      this.logInfo('Navigation utilities initialized');

      // Set up event listeners for navigation
      this.setupNavigationListeners();
    } catch (error) {
      this.logError('Failed to initialize components', error);
      throw error;
    }
  }

  /**
   * Set up event listeners for navigation functionality
   */
  setupNavigationListeners() {
    try {
      // Listen for navigation events
      window.addEventListener('navigation:menu-toggle', (event) => {
        this.logInfo('Mobile menu toggled', { isOpen: event.detail.isOpen });
      });

      window.addEventListener('navigation:initialized', () => {
        this.logInfo('Navigation system ready');
      });

      // Handle smooth scrolling for all anchor links
      document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (link && this.navigationAPI) {
          event.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            this.navigationAPI.smoothScrollTo(targetElement);
          }
        }
      });
    } catch (error) {
      this.logError('Failed to setup navigation listeners', error);
    }
  }

  /**
   * Global error handler
   * Catches and logs unhandled errors
   * 
   * @param {ErrorEvent} event - The error event
   */
  handleError(event) {
    this.logError('Unhandled error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });

    // Prevent default browser error handling in production
    if (this.isProduction()) {
      event.preventDefault();
    }
  }

  /**
   * Handle unhandled promise rejections
   * 
   * @param {PromiseRejectionEvent} event - The promise rejection event
   */
  handleUnhandledRejection(event) {
    this.logError('Unhandled promise rejection', {
      reason: event.reason,
      promise: event.promise,
    });

    // Prevent default browser handling in production
    if (this.isProduction()) {
      event.preventDefault();
    }
  }

  /**
   * Check if running in production environment
   * 
   * @returns {boolean} True if in production mode
   */
  isProduction() {
    return import.meta.env.MODE === 'production';
  }

  /**
   * Log informational message
   * 
   * @param {string} message - The message to log
   * @param {*} data - Additional data to log
   */
  logInfo(message, data) {
    if (!this.isProduction()) {
      console.log(`[APP] ${message}`, data || '');
    }
  }

  /**
   * Log error message with context
   * 
   * @param {string} message - The error message
   * @param {Error|Object} error - The error object or additional context
   */
  logError(message, error) {
    const errorContext = {
      message,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
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

    console.error('[APP ERROR]', errorContext);

    // In production, you might want to send errors to a logging service
    if (this.isProduction()) {
      // TODO: Integrate with error tracking service (e.g., Sentry)
      // this.sendErrorToService(errorContext);
    }
  }

  /**
   * Clean up resources and event listeners
   * Call this method when the application needs to be destroyed
   */
  destroy() {
    try {
      window.removeEventListener('error', this.handleError);
      window.removeEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
      document.removeEventListener('DOMContentLoaded', this.handleDOMContentLoaded);
      
      // Clean up navigation API
      if (this.navigationAPI && this.navigationAPI.cleanup) {
        this.navigationAPI.cleanup();
      }

      // Clean up footer
      if (this.footer && this.footer.destroy) {
        this.footer.destroy();
      }

      // Clean up header
      if (header && header.destroy) {
        header.destroy();
      }
      
      this.initialized = false;
      this.logInfo('Application destroyed');
    } catch (error) {
      this.logError('Error during application cleanup', error);
    }
  }
}

/**
 * Create and initialize the application instance
 */
const app = new Application();

// Initialize the application
try {
  app.init();
} catch (error) {
  console.error('[CRITICAL] Failed to start application:', error);
}

/**
 * Export the application instance for testing and external access
 */
export default app;

/**
 * Hot Module Replacement (HMR) support for development
 * Vite will inject this during development
 */
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('[HMR] Application module updated');
  });

  import.meta.hot.dispose(() => {
    app.destroy();
  });
}