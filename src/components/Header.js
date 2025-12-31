/**
 * Header Component
 * 
 * Responsive header with NGO logo, navigation menu, and mobile hamburger menu.
 * Implements accessibility features with ARIA labels and keyboard navigation.
 * 
 * @module components/Header
 * @version 1.0.0
 */

/**
 * Header component class
 * Manages navigation state, mobile menu interactions, and accessibility
 */
class Header {
  /**
   * Creates an instance of Header
   */
  constructor() {
    this.mobileMenuOpen = false;
    this.scrolled = false;
    this.lastScrollY = 0;
    this.scrollThreshold = 50;
    
    // Bind methods to maintain context
    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  /**
   * Initialize the header component
   * Sets up event listeners and renders the header
   */
  init() {
    try {
      this.render();
      this.attachEventListeners();
      this.logInfo('Header component initialized');
    } catch (error) {
      this.logError('Failed to initialize header', error);
      throw error;
    }
  }

  /**
   * Render the header HTML structure
   */
  render() {
    const appRoot = document.querySelector('#app');
    if (!appRoot) {
      this.logError('App root element not found');
      return;
    }

    const headerHTML = `
      <header 
        id="main-header" 
        class="fixed top-0 left-0 right-0 z-fixed bg-white shadow-sm transition-all duration-300"
        role="banner"
      >
        <nav 
          class="section-container py-4"
          role="navigation"
          aria-label="Main navigation"
        >
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <div class="flex items-center">
              <a 
                href="#home" 
                class="flex items-center gap-3 text-primary-600 hover:text-primary-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
                aria-label="Makoko Community Kids NGO - Home"
              >
                <div class="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-md">
                  <span class="text-white font-bold text-xl" aria-hidden="true">MCK</span>
                </div>
                <div class="hidden sm:block">
                  <span class="font-display font-bold text-xl text-primary-900 block leading-tight">
                    Makoko Community Kids
                  </span>
                  <span class="text-sm text-neutral-600 block leading-tight">
                    Empowering Children, Building Futures
                  </span>
                </div>
              </a>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center gap-8">
              <ul class="flex items-center gap-6" role="list">
                <li>
                  <a 
                    href="#home" 
                    class="nav-link text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 underline-animated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    class="nav-link text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 underline-animated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#impact" 
                    class="nav-link text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 underline-animated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                  >
                    Impact
                  </a>
                </li>
                <li>
                  <a 
                    href="#programs" 
                    class="nav-link text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 underline-animated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                  >
                    Programs
                  </a>
                </li>
                <li>
                  <a 
                    href="#volunteer" 
                    class="nav-link text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 underline-animated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                  >
                    Volunteer
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    class="nav-link text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 underline-animated focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                  >
                    Contact
                  </a>
                </li>
              </ul>
              
              <!-- CTA Button -->
              <a 
                href="#donate" 
                class="btn btn-primary shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label="Donate to support our mission"
              >
                Donate
              </a>
            </div>

            <!-- Mobile Menu Button -->
            <button
              id="mobile-menu-button"
              type="button"
              class="lg:hidden p-2 text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <svg 
                class="w-6 h-6 transition-transform duration-300" 
                id="menu-icon-open"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                class="w-6 h-6 hidden transition-transform duration-300" 
                id="menu-icon-close"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Mobile Menu -->
          <div
            id="mobile-menu"
            class="lg:hidden hidden overflow-hidden transition-all duration-300 ease-in-out"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div class="pt-4 pb-3 space-y-1 border-t border-neutral-200 mt-4">
              <a 
                href="#home" 
                class="mobile-nav-link block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-current="page"
              >
                Home
              </a>
              <a 
                href="#about" 
                class="mobile-nav-link block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                About
              </a>
              <a 
                href="#impact" 
                class="mobile-nav-link block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Impact
              </a>
              <a 
                href="#programs" 
                class="mobile-nav-link block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Programs
              </a>
              <a 
                href="#volunteer" 
                class="mobile-nav-link block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Volunteer
              </a>
              <a 
                href="#contact" 
                class="mobile-nav-link block px-4 py-3 text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Contact
              </a>
              <div class="pt-2">
                <a 
                  href="#donate" 
                  class="btn btn-primary w-full justify-center shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  aria-label="Donate to support our mission"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    `;

    appRoot.insertAdjacentHTML('afterbegin', headerHTML);
  }

  /**
   * Attach event listeners to header elements
   */
  attachEventListeners() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', this.toggleMobileMenu);
    }

    // Close mobile menu when clicking nav links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', this.closeMobileMenu);
    });

    // Update active link on click
    allNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.updateActiveLink(e.currentTarget);
      });
    });

    // Scroll event for header shadow
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // Resize event for mobile menu cleanup
    window.addEventListener('resize', this.handleResize);

    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeyDown);

    // Click outside to close mobile menu
    document.addEventListener('click', this.handleClickOutside);
  }

  /**
   * Toggle mobile menu open/closed state
   */
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (!mobileMenu || !mobileMenuButton || !menuIconOpen || !menuIconClose) {
      this.logError('Mobile menu elements not found');
      return;
    }

    if (this.mobileMenuOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'true');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      // Focus first menu item for accessibility
      const firstLink = mobileMenu.querySelector('.mobile-nav-link');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    } else {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (this.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  /**
   * Handle scroll events for header styling
   */
  handleScroll() {
    const currentScrollY = window.scrollY;
    const header = document.getElementById('main-header');

    if (!header) return;

    if (currentScrollY > this.scrollThreshold) {
      if (!this.scrolled) {
        header.classList.add('shadow-md');
        this.scrolled = true;
      }
    } else {
      if (this.scrolled) {
        header.classList.remove('shadow-md');
        this.scrolled = false;
      }
    }

    this.lastScrollY = currentScrollY;
  }

  /**
   * Handle window resize events
   */
  handleResize() {
    // Close mobile menu on desktop breakpoint
    if (window.innerWidth >= 1024 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} event - The keyboard event
   */
  handleKeyDown(event) {
    // Close mobile menu on Escape key
    if (event.key === 'Escape' && this.mobileMenuOpen) {
      this.closeMobileMenu();
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      if (mobileMenuButton) {
        mobileMenuButton.focus();
      }
    }
  }

  /**
   * Handle clicks outside mobile menu
   * @param {MouseEvent} event - The click event
   */
  handleClickOutside(event) {
    if (!this.mobileMenuOpen) return;

    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');

    if (!mobileMenu || !mobileMenuButton) return;

    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnButton = mobileMenuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnButton) {
      this.closeMobileMenu();
    }
  }

  /**
   * Update active navigation link
   * @param {HTMLElement} clickedLink - The clicked navigation link
   */
  updateActiveLink(clickedLink) {
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    allNavLinks.forEach(link => {
      link.removeAttribute('aria-current');
    });

    clickedLink.setAttribute('aria-current', 'page');
  }

  /**
   * Clean up event listeners and resources
   */
  destroy() {
    try {
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

      if (mobileMenuButton) {
        mobileMenuButton.removeEventListener('click', this.toggleMobileMenu);
      }

      mobileNavLinks.forEach(link => {
        link.removeEventListener('click', this.closeMobileMenu);
      });

      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('keydown', this.handleKeyDown);
      document.removeEventListener('click', this.handleClickOutside);

      // Reset body overflow
      document.body.style.overflow = '';

      this.logInfo('Header component destroyed');
    } catch (error) {
      this.logError('Error during header cleanup', error);
    }
  }

  /**
   * Log informational message
   * @param {string} message - The message to log
   */
  logInfo(message) {
    if (import.meta.env.MODE !== 'production') {
      console.log(`[Header] ${message}`);
    }
  }

  /**
   * Log error message with context
   * @param {string} message - The error message
   * @param {Error|Object} error - The error object or additional context
   */
  logError(message, error) {
    const errorContext = {
      component: 'Header',
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

    console.error('[Header Error]', errorContext);
  }
}

/**
 * Create and initialize the header component
 */
const header = new Header();

/**
 * Initialize header when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    header.init();
  });
} else {
  header.init();
}

/**
 * Export the header instance
 */
export default header;

/**
 * Hot Module Replacement (HMR) support for development
 */
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log('[HMR] Header module updated');
  });

  import.meta.hot.dispose(() => {
    header.destroy();
  });
}