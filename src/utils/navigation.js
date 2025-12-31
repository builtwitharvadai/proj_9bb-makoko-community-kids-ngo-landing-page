/**
 * Navigation Utility Functions
 * 
 * Provides smooth scrolling, mobile menu toggle, and active section highlighting
 * for the Makoko Community Kids NGO landing page navigation system.
 * 
 * @module utils/navigation
 * @version 1.0.0
 */

/**
 * Navigation state management
 */
class NavigationState {
  constructor() {
    this.mobileMenuOpen = false;
    this.activeSection = null;
    this.scrolling = false;
    this.observers = new Map();
    this.initialized = false;
  }

  /**
   * Set mobile menu state
   * @param {boolean} isOpen - Menu open state
   */
  setMobileMenuOpen(isOpen) {
    this.mobileMenuOpen = isOpen;
  }

  /**
   * Set active section
   * @param {string} sectionId - Section identifier
   */
  setActiveSection(sectionId) {
    this.activeSection = sectionId;
  }

  /**
   * Set scrolling state
   * @param {boolean} isScrolling - Scrolling state
   */
  setScrolling(isScrolling) {
    this.scrolling = isScrolling;
  }

  /**
   * Register an observer
   * @param {string} key - Observer key
   * @param {IntersectionObserver} observer - Observer instance
   */
  registerObserver(key, observer) {
    this.observers.set(key, observer);
  }

  /**
   * Clean up all observers
   */
  cleanup() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
    this.initialized = false;
  }
}

/**
 * Global navigation state instance
 */
const navigationState = new NavigationState();

/**
 * Configuration constants
 */
const CONFIG = Object.freeze({
  SCROLL_DURATION: 800,
  SCROLL_OFFSET: 80,
  INTERSECTION_THRESHOLD: 0.5,
  INTERSECTION_ROOT_MARGIN: '-80px 0px -50% 0px',
  MOBILE_BREAKPOINT: 768,
  DEBOUNCE_DELAY: 150,
  ANIMATION_EASING: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
});

/**
 * Logging utility with structured context
 * @param {string} level - Log level (info, warn, error)
 * @param {string} message - Log message
 * @param {Object} context - Additional context
 */
function log(level, message, context = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    module: 'navigation',
    message,
    ...context,
  };

  if (import.meta.env.MODE !== 'production') {
    const logMethod = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    logMethod('[NAVIGATION]', message, context);
  }

  return logEntry;
}

/**
 * Debounce function to limit execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Easing function for smooth scroll animation
 * @param {number} t - Time progress (0-1)
 * @returns {number} Eased value
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Get element's offset top relative to document
 * @param {HTMLElement} element - Target element
 * @returns {number} Offset top in pixels
 */
function getElementOffsetTop(element) {
  if (!element) {
    log('warn', 'getElementOffsetTop called with null element');
    return 0;
  }

  let offsetTop = 0;
  let currentElement = element;

  while (currentElement) {
    offsetTop += currentElement.offsetTop;
    currentElement = currentElement.offsetParent;
  }

  return offsetTop;
}

/**
 * Smooth scroll to a target element or position
 * @param {HTMLElement|number} target - Target element or Y position
 * @param {Object} options - Scroll options
 * @param {number} options.offset - Offset from target position
 * @param {number} options.duration - Animation duration in ms
 * @param {Function} options.onComplete - Callback on completion
 * @returns {Promise<void>} Resolves when scroll completes
 */
function smoothScrollTo(target, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const {
        offset = CONFIG.SCROLL_OFFSET,
        duration = CONFIG.SCROLL_DURATION,
        onComplete = null,
      } = options;

      const startPosition = window.pageYOffset;
      let targetPosition;

      if (typeof target === 'number') {
        targetPosition = target;
      } else if (target instanceof HTMLElement) {
        targetPosition = getElementOffsetTop(target) - offset;
      } else {
        throw new TypeError('Target must be HTMLElement or number');
      }

      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      navigationState.setScrolling(true);

      function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        const position = startPosition + distance * eased;

        window.scrollTo(0, position);

        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          navigationState.setScrolling(false);
          
          if (typeof onComplete === 'function') {
            onComplete();
          }

          log('info', 'Smooth scroll completed', {
            targetPosition,
            duration: elapsed,
          });

          resolve();
        }
      }

      requestAnimationFrame(animation);
    } catch (error) {
      navigationState.setScrolling(false);
      log('error', 'Smooth scroll failed', { error: error.message });
      reject(error);
    }
  });
}

/**
 * Toggle mobile menu with animation
 * @param {boolean} forceState - Force specific state (optional)
 * @returns {boolean} New menu state
 */
function toggleMobileMenu(forceState) {
  try {
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const body = document.body;

    if (!mobileMenuButton || !mobileMenu) {
      log('warn', 'Mobile menu elements not found', {
        hasButton: !!mobileMenuButton,
        hasMenu: !!mobileMenu,
      });
      return false;
    }

    const newState = forceState !== undefined ? forceState : !navigationState.mobileMenuOpen;
    navigationState.setMobileMenuOpen(newState);

    // Update ARIA attributes
    mobileMenuButton.setAttribute('aria-expanded', String(newState));
    mobileMenu.setAttribute('aria-hidden', String(!newState));

    // Toggle classes for animation
    if (newState) {
      mobileMenu.classList.remove('hidden');
      body.classList.add('overflow-hidden');
      
      // Trigger animation
      requestAnimationFrame(() => {
        mobileMenu.classList.add('opacity-100');
        mobileMenu.classList.remove('opacity-0');
      });

      log('info', 'Mobile menu opened');
    } else {
      mobileMenu.classList.add('opacity-0');
      mobileMenu.classList.remove('opacity-100');
      body.classList.remove('overflow-hidden');

      // Wait for animation to complete before hiding
      setTimeout(() => {
        if (!navigationState.mobileMenuOpen) {
          mobileMenu.classList.add('hidden');
        }
      }, 300);

      log('info', 'Mobile menu closed');
    }

    // Dispatch custom event
    const event = new CustomEvent('navigation:menu-toggle', {
      detail: { isOpen: newState },
    });
    window.dispatchEvent(event);

    return newState;
  } catch (error) {
    log('error', 'Failed to toggle mobile menu', { error: error.message });
    return navigationState.mobileMenuOpen;
  }
}

/**
 * Update active navigation link based on current section
 * @param {string} sectionId - Active section ID
 */
function updateActiveNavLink(sectionId) {
  try {
    if (!sectionId) {
      return;
    }

    const navLinks = document.querySelectorAll('[data-nav-link]');
    
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const targetId = href ? href.replace('#', '') : null;
      const isActive = targetId === sectionId;

      if (isActive) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    navigationState.setActiveSection(sectionId);

    log('info', 'Active nav link updated', { sectionId });
  } catch (error) {
    log('error', 'Failed to update active nav link', { error: error.message });
  }
}

/**
 * Initialize intersection observer for section highlighting
 * @returns {IntersectionObserver|null} Observer instance
 */
function initializeSectionObserver() {
  try {
    const sections = document.querySelectorAll('[data-section]');

    if (sections.length === 0) {
      log('warn', 'No sections found for observation');
      return null;
    }

    const observerOptions = {
      root: null,
      rootMargin: CONFIG.INTERSECTION_ROOT_MARGIN,
      threshold: CONFIG.INTERSECTION_THRESHOLD,
    };

    const observer = new IntersectionObserver((entries) => {
      if (navigationState.scrolling) {
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');
          updateActiveNavLink(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    navigationState.registerObserver('sections', observer);

    log('info', 'Section observer initialized', {
      sectionCount: sections.length,
    });

    return observer;
  } catch (error) {
    log('error', 'Failed to initialize section observer', { error: error.message });
    return null;
  }
}

/**
 * Handle navigation link click
 * @param {Event} event - Click event
 */
function handleNavLinkClick(event) {
  try {
    const link = event.currentTarget;
    const href = link.getAttribute('href');

    if (!href || !href.startsWith('#')) {
      return;
    }

    event.preventDefault();

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      log('warn', 'Target element not found', { targetId });
      return;
    }

    // Close mobile menu if open
    if (navigationState.mobileMenuOpen) {
      toggleMobileMenu(false);
    }

    // Smooth scroll to target
    smoothScrollTo(targetElement, {
      onComplete: () => {
        // Update URL without triggering scroll
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', href);
        }

        // Update active state
        updateActiveNavLink(targetId);

        // Focus target for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
      },
    });

    log('info', 'Navigation link clicked', { targetId });
  } catch (error) {
    log('error', 'Failed to handle nav link click', { error: error.message });
  }
}

/**
 * Handle window resize with debouncing
 */
const handleResize = debounce(() => {
  try {
    const isMobile = window.innerWidth < CONFIG.MOBILE_BREAKPOINT;

    // Close mobile menu on desktop
    if (!isMobile && navigationState.mobileMenuOpen) {
      toggleMobileMenu(false);
    }

    log('info', 'Window resized', {
      width: window.innerWidth,
      isMobile,
    });
  } catch (error) {
    log('error', 'Failed to handle resize', { error: error.message });
  }
}, CONFIG.DEBOUNCE_DELAY);

/**
 * Handle escape key to close mobile menu
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleEscapeKey(event) {
  if (event.key === 'Escape' && navigationState.mobileMenuOpen) {
    toggleMobileMenu(false);
    
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    if (mobileMenuButton) {
      mobileMenuButton.focus();
    }
  }
}

/**
 * Initialize navigation functionality
 * @returns {Object} Navigation API
 */
function initializeNavigation() {
  try {
    if (navigationState.initialized) {
      log('warn', 'Navigation already initialized');
      return getNavigationAPI();
    }

    // Initialize section observer
    initializeSectionObserver();

    // Set up navigation link click handlers
    const navLinks = document.querySelectorAll('[data-nav-link]');
    navLinks.forEach((link) => {
      link.addEventListener('click', handleNavLinkClick);
    });

    // Set up mobile menu button
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', () => toggleMobileMenu());
    }

    // Set up window resize handler
    window.addEventListener('resize', handleResize);

    // Set up escape key handler
    document.addEventListener('keydown', handleEscapeKey);

    // Handle initial hash in URL
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        setTimeout(() => {
          smoothScrollTo(targetElement);
        }, 100);
      }
    }

    navigationState.initialized = true;

    log('info', 'Navigation initialized successfully', {
      navLinkCount: navLinks.length,
      hasMobileMenu: !!mobileMenuButton,
    });

    // Dispatch initialization event
    const event = new CustomEvent('navigation:initialized');
    window.dispatchEvent(event);

    return getNavigationAPI();
  } catch (error) {
    log('error', 'Failed to initialize navigation', { error: error.message });
    throw error;
  }
}

/**
 * Get navigation API object
 * @returns {Object} Navigation API methods
 */
function getNavigationAPI() {
  return {
    smoothScrollTo,
    toggleMobileMenu,
    updateActiveNavLink,
    cleanup: () => {
      try {
        // Remove event listeners
        const navLinks = document.querySelectorAll('[data-nav-link]');
        navLinks.forEach((link) => {
          link.removeEventListener('click', handleNavLinkClick);
        });

        const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
        if (mobileMenuButton) {
          mobileMenuButton.removeEventListener('click', toggleMobileMenu);
        }

        window.removeEventListener('resize', handleResize);
        document.removeEventListener('keydown', handleEscapeKey);

        // Clean up observers
        navigationState.cleanup();

        log('info', 'Navigation cleaned up');
      } catch (error) {
        log('error', 'Failed to cleanup navigation', { error: error.message });
      }
    },
    getState: () => ({
      mobileMenuOpen: navigationState.mobileMenuOpen,
      activeSection: navigationState.activeSection,
      scrolling: navigationState.scrolling,
      initialized: navigationState.initialized,
    }),
  };
}

/**
 * Export navigation utilities
 */
export {
  initializeNavigation,
  smoothScrollTo,
  toggleMobileMenu,
  updateActiveNavLink,
};

export default initializeNavigation;