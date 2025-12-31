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

// Import hero section component
import { initializeHeroSection } from './components/HeroSection.js';

// Import About section components
import { initializeAboutSection } from './components/AboutSection.js';
import { initTeamSection } from './components/TeamSection.js';
import { initValuesSection } from './components/ValuesSection.js';

// Import Impact section components
import { createImpactSection, initializeImpactSection } from './components/ImpactSection.js';
import { initializeCounters } from './components/StatisticsCounter.js';
import { TestimonialsCarousel } from './components/TestimonialsCarousel.js';
import { initializePhotoGallery } from './components/PhotoGallery.js';
import { initializeLightbox } from './utils/lightbox.js';
import { TESTIMONIALS } from './data/impactContent.js';

// Import Programs section component
import { renderProgramsSection } from './components/ProgramsSection.js';

// Import Donation section components
import { createDonateSection } from './components/DonateSection.js';

// Import Contact section components
import { ContactSection } from './components/ContactSection.js';
import { initializeContactForm } from './components/ContactForm.js';
import createContactMap from './components/ContactMap.js';
import { initializeSocialMedia } from './components/SocialMedia.js';

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
    this.heroSection = null;
    this.aboutSection = null;
    this.teamSection = null;
    this.valuesSection = null;
    this.impactSection = null;
    this.statisticsCounters = [];
    this.testimonialsCarousel = null;
    this.photoGallery = null;
    this.lightbox = null;
    this.programsSection = null;
    this.donateSection = null;
    this.contactSection = null;
    this.contactForm = null;
    this.contactMap = null;
    this.socialMedia = null;
    
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

      // Initialize hero section component
      try {
        this.heroSection = initializeHeroSection();
        this.logInfo('Hero section initialized successfully');
        
        // Listen for hero section events
        window.addEventListener('hero:rendered', (event) => {
          this.logInfo('Hero section rendered', event.detail);
        });
      } catch (heroError) {
        this.logError('Failed to initialize hero section', heroError);
        // Continue initialization even if hero section fails
      }

      // Initialize About section components
      try {
        this.initializeAboutComponents();
        this.logInfo('About section components initialized successfully');
      } catch (aboutError) {
        this.logError('Failed to initialize About section components', aboutError);
        // Continue initialization even if About section fails
      }

      // Initialize Programs section components
      try {
        this.initializeProgramsComponents();
        this.logInfo('Programs section components initialized successfully');
      } catch (programsError) {
        this.logError('Failed to initialize Programs section components', programsError);
        // Continue initialization even if Programs section fails
      }

      // Initialize Impact section components
      try {
        this.initializeImpactComponents();
        this.logInfo('Impact section components initialized successfully');
      } catch (impactError) {
        this.logError('Failed to initialize Impact section components', impactError);
        // Continue initialization even if Impact section fails
      }

      // Initialize Donation section components
      try {
        this.initializeDonationComponents();
        this.logInfo('Donation section components initialized successfully');
      } catch (donationError) {
        this.logError('Failed to initialize Donation section components', donationError);
        // Continue initialization even if Donation section fails
      }

      // Initialize Contact section components
      try {
        this.initializeContactComponents();
        this.logInfo('Contact section components initialized successfully');
      } catch (contactError) {
        this.logError('Failed to initialize Contact section components', contactError);
        // Continue initialization even if Contact section fails
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
   * Initialize About section components
   * Sets up About section, Team section, and Values section
   */
  async initializeAboutComponents() {
    try {
      // Initialize main About section
      try {
        await initializeAboutSection('app');
        this.aboutSection = true;
        this.logInfo('About section initialized');
      } catch (error) {
        this.logError('Failed to initialize About section', error);
      }

      // Initialize Team section
      try {
        const appContainer = document.getElementById('app');
        if (appContainer) {
          await initTeamSection(appContainer);
          this.teamSection = true;
          this.logInfo('Team section initialized');
        }
      } catch (error) {
        this.logError('Failed to initialize Team section', error);
      }

      // Initialize Values section
      try {
        const appContainer = document.getElementById('app');
        if (appContainer) {
          const valuesContainer = document.createElement('div');
          valuesContainer.id = 'values-section-container';
          appContainer.appendChild(valuesContainer);
          
          this.valuesSection = initValuesSection('values-section-container');
          this.logInfo('Values section initialized');
        }
      } catch (error) {
        this.logError('Failed to initialize Values section', error);
      }

      // Listen for About section events
      window.addEventListener('about:rendered', (event) => {
        this.logInfo('About section rendered', event.detail);
      });
    } catch (error) {
      this.logError('Error initializing About components', error);
      throw error;
    }
  }

  /**
   * Initialize Programs section components
   * Sets up Programs section with program cards and interactive elements
   */
  async initializeProgramsComponents() {
    try {
      const appContainer = document.getElementById('app');
      if (!appContainer) {
        throw new Error('App container not found');
      }

      // Render Programs section
      try {
        renderProgramsSection('app');
        this.programsSection = true;
        this.logInfo('Programs section rendered');

        // Listen for program interaction events
        document.addEventListener('program-interaction', (event) => {
          this.logInfo('Program interaction detected', event.detail);
        });
      } catch (error) {
        this.logError('Failed to render Programs section', error);
        throw error;
      }

    } catch (error) {
      this.logError('Error initializing Programs components', error);
      throw error;
    }
  }

  /**
   * Initialize Impact section components
   * Sets up Impact section, statistics counters, testimonials carousel, photo gallery, and lightbox
   */
  async initializeImpactComponents() {
    try {
      const appContainer = document.getElementById('app');
      if (!appContainer) {
        throw new Error('App container not found');
      }

      // Create and append Impact section
      try {
        const impactSection = createImpactSection();
        appContainer.appendChild(impactSection);
        this.impactSection = impactSection;
        this.logInfo('Impact section created and appended');
      } catch (error) {
        this.logError('Failed to create Impact section', error);
        throw error;
      }

      // Initialize statistics counters with Intersection Observer
      try {
        initializeImpactSection();
        this.logInfo('Impact section counters initialized');
      } catch (error) {
        this.logError('Failed to initialize impact counters', error);
      }

      // Initialize advanced statistics counters
      try {
        this.statisticsCounters = initializeCounters('[data-counter-container]', {
          duration: 2000,
          easing: 'easeOutCubic',
          threshold: 0.3,
        });
        this.logInfo('Advanced statistics counters initialized', {
          count: this.statisticsCounters.length,
        });
      } catch (error) {
        this.logError('Failed to initialize advanced counters', error);
      }

      // Initialize testimonials carousel
      try {
        const carouselContainer = document.createElement('div');
        carouselContainer.id = 'testimonials-carousel-container';
        carouselContainer.className = 'section-container';
        
        const carouselSection = document.createElement('section');
        carouselSection.className = 'max-w-7xl mx-auto';
        
        const carouselTitle = document.createElement('h2');
        carouselTitle.className = 'text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12';
        carouselTitle.textContent = 'Voices from Our Community';
        
        carouselSection.appendChild(carouselTitle);
        carouselContainer.appendChild(carouselSection);
        appContainer.appendChild(carouselContainer);

        this.testimonialsCarousel = new TestimonialsCarousel({
          containerId: 'testimonials-carousel-container',
          testimonials: TESTIMONIALS,
          autoPlayInterval: 6000,
          autoPlay: true,
          loop: true,
        });
        
        this.logInfo('Testimonials carousel initialized', {
          testimonialCount: TESTIMONIALS.length,
        });
      } catch (error) {
        this.logError('Failed to initialize testimonials carousel', error);
      }

      // Initialize photo gallery with lightbox
      try {
        const gallery = await initializePhotoGallery();
        appContainer.appendChild(gallery);
        this.photoGallery = gallery;
        this.logInfo('Photo gallery initialized');

        // Initialize lightbox for gallery
        this.lightbox = initializeLightbox({
          gallerySelector: '#photo-gallery',
          imageSelector: 'img[data-lightbox-image]',
          enableZoom: true,
          enableKeyboard: true,
          enableTouch: true,
        });
        this.logInfo('Lightbox initialized for photo gallery');
      } catch (error) {
        this.logError('Failed to initialize photo gallery or lightbox', error);
      }

      // Listen for Impact section events
      window.addEventListener('impact:rendered', (event) => {
        this.logInfo('Impact section rendered', event.detail);
      });

      window.addEventListener('carousel:change', (event) => {
        this.logInfo('Carousel slide changed', event.detail);
      });

    } catch (error) {
      this.logError('Error initializing Impact components', error);
      throw error;
    }
  }

  /**
   * Initialize Donation section components
   * Sets up donation forms with Stripe and PayPal payment integrations
   */
  async initializeDonationComponents() {
    try {
      const appContainer = document.getElementById('app');
      if (!appContainer) {
        throw new Error('App container not found');
      }

      // Create and append Donation section
      try {
        const donateSection = createDonateSection();
        appContainer.appendChild(donateSection);
        this.donateSection = donateSection;
        this.logInfo('Donation section created and appended');

        // Listen for donation events
        window.addEventListener('donation:submitted', (event) => {
          this.logInfo('Donation submitted', event.detail);
        });

        window.addEventListener('donation:success', (event) => {
          this.logInfo('Donation successful', event.detail);
        });

        window.addEventListener('donation:error', (event) => {
          this.logError('Donation error', event.detail);
        });

        window.addEventListener('donation:cancelled', (event) => {
          this.logInfo('Donation cancelled', event.detail);
        });
      } catch (error) {
        this.logError('Failed to create Donation section', error);
        throw error;
      }

    } catch (error) {
      this.logError('Error initializing Donation components', error);
      throw error;
    }
  }

  /**
   * Initialize Contact section components
   * Sets up contact section with form, map, and social media integrations
   */
  async initializeContactComponents() {
    try {
      const appContainer = document.getElementById('app');
      if (!appContainer) {
        throw new Error('App container not found');
      }

      // Create and append Contact section
      try {
        const contactSectionHTML = ContactSection();
        const contactContainer = document.createElement('div');
        contactContainer.innerHTML = contactSectionHTML;
        appContainer.appendChild(contactContainer.firstElementChild);
        this.contactSection = true;
        this.logInfo('Contact section created and appended');

        // Initialize contact form with validation
        try {
          const formCleanup = initializeContactForm('#contact-form');
          this.contactForm = { cleanup: formCleanup };
          this.logInfo('Contact form initialized with validation');

          // Listen for contact form events
          document.addEventListener('contact:form-submitted', (event) => {
            this.logInfo('Contact form submitted successfully', event.detail);
          });

          document.addEventListener('contact:form-error', (event) => {
            this.logError('Contact form submission error', event.detail);
          });
        } catch (formError) {
          this.logError('Failed to initialize contact form', formError);
        }

        // Initialize Google Maps integration
        try {
          const mapContainer = document.querySelector('#contact .aspect-w-16');
          if (mapContainer) {
            const map = createContactMap();
            mapContainer.innerHTML = '';
            mapContainer.appendChild(map);
            this.contactMap = map;
            this.logInfo('Contact map initialized');

            // Listen for map events
            window.addEventListener('map:ready', (event) => {
              this.logInfo('Map loaded successfully', event.detail);
            });
          }
        } catch (mapError) {
          this.logError('Failed to initialize contact map', mapError);
          // Map failure is non-critical, continue with fallback
        }

        // Initialize social media integration
        try {
          const socialContainer = document.querySelector('#contact .grid.grid-cols-2.sm\\:grid-cols-4');
          if (socialContainer && socialContainer.parentElement) {
            const socialWrapper = socialContainer.parentElement;
            initializeSocialMedia(socialWrapper);
            this.socialMedia = true;
            this.logInfo('Social media integration initialized');
          }
        } catch (socialError) {
          this.logError('Failed to initialize social media integration', socialError);
        }

        // Listen for Contact section events
        window.addEventListener('contact:rendered', (event) => {
          this.logInfo('Contact section rendered', event.detail);
        });

      } catch (error) {
        this.logError('Failed to create Contact section', error);
        throw error;
      }

    } catch (error) {
      this.logError('Error initializing Contact components', error);
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

      // Clean up hero section
      if (this.heroSection && this.heroSection.destroy) {
        this.heroSection.destroy();
      }

      // Clean up footer
      if (this.footer && this.footer.destroy) {
        this.footer.destroy();
      }

      // Clean up header
      if (header && header.destroy) {
        header.destroy();
      }

      // Clean up Impact section components
      if (this.statisticsCounters && this.statisticsCounters.length > 0) {
        this.statisticsCounters.forEach(counter => {
          if (counter && counter.destroy) {
            counter.destroy();
          }
        });
        this.statisticsCounters = [];
      }

      if (this.testimonialsCarousel && this.testimonialsCarousel.destroy) {
        this.testimonialsCarousel.destroy();
        this.testimonialsCarousel = null;
      }

      if (this.lightbox && this.lightbox.destroy) {
        this.lightbox.destroy();
        this.lightbox = null;
      }

      if (this.impactSection && this.impactSection.parentNode) {
        this.impactSection.parentNode.removeChild(this.impactSection);
        this.impactSection = null;
      }

      // Clean up Programs section
      if (this.programsSection) {
        const programsElement = document.getElementById('programs');
        if (programsElement && programsElement.parentNode) {
          programsElement.parentNode.removeChild(programsElement);
        }
        this.programsSection = null;
      }

      // Clean up Donation section
      if (this.donateSection && this.donateSection.parentNode) {
        this.donateSection.parentNode.removeChild(this.donateSection);
        this.donateSection = null;
      }

      // Clean up Contact section components
      if (this.contactForm && this.contactForm.cleanup) {
        this.contactForm.cleanup();
        this.contactForm = null;
      }

      if (this.contactMap && this.contactMap.parentNode) {
        this.contactMap.parentNode.removeChild(this.contactMap);
        this.contactMap = null;
      }

      if (this.contactSection) {
        const contactElement = document.getElementById('contact');
        if (contactElement && contactElement.parentNode) {
          contactElement.parentNode.removeChild(contactElement);
        }
        this.contactSection = null;
      }

      this.socialMedia = null;
      
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