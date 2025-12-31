/**
 * Footer Component
 * 
 * Responsive footer with contact information, quick links, social media,
 * newsletter signup, and accessibility compliance for the Makoko Community Kids NGO.
 * 
 * @module components/Footer
 * @version 1.0.0
 */

/**
 * Footer component class
 * Manages footer rendering, newsletter form handling, and accessibility features
 */
class Footer {
  /**
   * Creates an instance of Footer
   */
  constructor() {
    this.initialized = false;
    this.newsletterForm = null;
    this.currentYear = new Date().getFullYear();
    
    // Bind methods to maintain context
    this.render = this.render.bind(this);
    this.handleNewsletterSubmit = this.handleNewsletterSubmit.bind(this);
    this.attachEventListeners = this.attachEventListeners.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  /**
   * Validate email address format
   * 
   * @param {string} email - Email address to validate
   * @returns {boolean} True if email is valid
   */
  validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Handle newsletter form submission
   * 
   * @param {Event} event - Form submit event
   */
  async handleNewsletterSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const messageContainer = form.querySelector('[data-message]');

    if (!emailInput || !submitButton) {
      this.logError('Newsletter form elements not found');
      return;
    }

    const email = emailInput.value.trim();

    // Validate email
    if (!this.validateEmail(email)) {
      this.showMessage(messageContainer, 'Please enter a valid email address', 'error');
      emailInput.focus();
      return;
    }

    // Disable form during submission
    emailInput.disabled = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';

    try {
      // Simulate API call - replace with actual newsletter service integration
      await this.subscribeToNewsletter(email);

      // Success feedback
      this.showMessage(messageContainer, 'Thank you for subscribing!', 'success');
      emailInput.value = '';
      
      // Re-enable form after delay
      setTimeout(() => {
        emailInput.disabled = false;
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
        this.clearMessage(messageContainer);
      }, 3000);

      this.logInfo('Newsletter subscription successful', { email });
    } catch (error) {
      // Error feedback
      this.showMessage(messageContainer, 'Subscription failed. Please try again.', 'error');
      
      // Re-enable form
      emailInput.disabled = false;
      submitButton.disabled = false;
      submitButton.textContent = 'Subscribe';

      this.logError('Newsletter subscription failed', error);
    }
  }

  /**
   * Subscribe email to newsletter service
   * 
   * @param {string} email - Email address to subscribe
   * @returns {Promise<void>}
   */
  async subscribeToNewsletter(email) {
    // Simulate API call with delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 1000);
    });
  }

  /**
   * Show message in message container
   * 
   * @param {HTMLElement} container - Message container element
   * @param {string} message - Message text
   * @param {string} type - Message type ('success' or 'error')
   */
  showMessage(container, message, type) {
    if (!container) return;

    container.textContent = message;
    container.className = `mt-2 text-sm ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
    container.setAttribute('role', 'alert');
    container.setAttribute('aria-live', 'polite');
  }

  /**
   * Clear message from container
   * 
   * @param {HTMLElement} container - Message container element
   */
  clearMessage(container) {
    if (!container) return;

    container.textContent = '';
    container.className = '';
    container.removeAttribute('role');
    container.removeAttribute('aria-live');
  }

  /**
   * Attach event listeners to footer elements
   */
  attachEventListeners() {
    // Newsletter form submission
    this.newsletterForm = document.querySelector('[data-newsletter-form]');
    if (this.newsletterForm) {
      this.newsletterForm.addEventListener('submit', this.handleNewsletterSubmit);
    }

    // Smooth scroll for internal links
    const footerLinks = document.querySelectorAll('footer a[href^="#"]');
    footerLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Set focus for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
        }
      });
    });
  }

  /**
   * Render the footer component
   * 
   * @returns {string} HTML string for footer
   */
  render() {
    return `
      <footer class="bg-gray-900 text-gray-300" role="contentinfo">
        <!-- Main Footer Content -->
        <div class="section-container">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            <!-- Organization Info -->
            <div class="space-y-4">
              <h3 class="text-xl font-bold text-white">
                Makoko Community Kids
              </h3>
              <p class="text-sm leading-relaxed">
                Empowering children in Makoko through education, healthcare, and community development programs.
              </p>
              <div class="space-y-2">
                <p class="text-sm flex items-start gap-2">
                  <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>Makoko Community, Lagos, Nigeria</span>
                </p>
                <p class="text-sm flex items-center gap-2">
                  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <a href="mailto:info@makokocommunitykids.org" class="underline-animated hover:text-white transition-colors">
                    info@makokocommunitykids.org
                  </a>
                </p>
                <p class="text-sm flex items-center gap-2">
                  <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a href="tel:+2341234567890" class="underline-animated hover:text-white transition-colors">
                    +234 123 456 7890
                  </a>
                </p>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white">
                Quick Links
              </h3>
              <nav aria-label="Footer navigation">
                <ul class="space-y-2">
                  <li>
                    <a href="#about" class="text-sm underline-animated hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#programs" class="text-sm underline-animated hover:text-white transition-colors">
                      Our Programs
                    </a>
                  </li>
                  <li>
                    <a href="#impact" class="text-sm underline-animated hover:text-white transition-colors">
                      Our Impact
                    </a>
                  </li>
                  <li>
                    <a href="#get-involved" class="text-sm underline-animated hover:text-white transition-colors">
                      Get Involved
                    </a>
                  </li>
                  <li>
                    <a href="#donate" class="text-sm underline-animated hover:text-white transition-colors">
                      Donate
                    </a>
                  </li>
                  <li>
                    <a href="#contact" class="text-sm underline-animated hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- Resources -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white">
                Resources
              </h3>
              <ul class="space-y-2">
                <li>
                  <a href="#annual-reports" class="text-sm underline-animated hover:text-white transition-colors">
                    Annual Reports
                  </a>
                </li>
                <li>
                  <a href="#financials" class="text-sm underline-animated hover:text-white transition-colors">
                    Financial Transparency
                  </a>
                </li>
                <li>
                  <a href="#news" class="text-sm underline-animated hover:text-white transition-colors">
                    News & Updates
                  </a>
                </li>
                <li>
                  <a href="#volunteer" class="text-sm underline-animated hover:text-white transition-colors">
                    Volunteer Opportunities
                  </a>
                </li>
                <li>
                  <a href="#faq" class="text-sm underline-animated hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#privacy" class="text-sm underline-animated hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <!-- Newsletter Signup -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white">
                Stay Connected
              </h3>
              <p class="text-sm">
                Subscribe to our newsletter for updates on our programs and impact.
              </p>
              <form data-newsletter-form class="space-y-3" novalidate>
                <div>
                  <label for="newsletter-email" class="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    aria-required="true"
                    class="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  class="w-full btn btn-primary text-sm"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
                <div data-message aria-live="polite"></div>
              </form>

              <!-- Social Media Links -->
              <div class="pt-4">
                <h4 class="text-sm font-semibold text-white mb-3">
                  Follow Us
                </h4>
                <div class="flex gap-4">
                  <a
                    href="https://facebook.com/makokocommunitykids"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-white transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/makokocommunitykids"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-white transition-colors"
                    aria-label="Follow us on Twitter"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/makokocommunitykids"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-white transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/makokocommunitykids"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gray-400 hover:text-white transition-colors"
                    aria-label="Follow us on LinkedIn"
                  >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-gray-800">
          <div class="section-container py-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p class="text-center md:text-left">
                &copy; ${this.currentYear} Makoko Community Kids. All rights reserved.
              </p>
              <div class="flex flex-wrap justify-center gap-6">
                <a href="#privacy" class="underline-animated hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" class="underline-animated hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#accessibility" class="underline-animated hover:text-white transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  /**
   * Initialize the footer component
   * Renders the footer and attaches event listeners
   */
  init() {
    try {
      const footerContainer = document.querySelector('[data-footer]');
      
      if (!footerContainer) {
        this.logError('Footer container not found');
        return;
      }

      // Render footer HTML
      footerContainer.innerHTML = this.render();

      // Attach event listeners
      this.attachEventListeners();

      this.initialized = true;
      this.logInfo('Footer component initialized successfully');
    } catch (error) {
      this.logError('Failed to initialize footer component', error);
      throw error;
    }
  }

  /**
   * Clean up resources and event listeners
   */
  destroy() {
    try {
      if (this.newsletterForm) {
        this.newsletterForm.removeEventListener('submit', this.handleNewsletterSubmit);
        this.newsletterForm = null;
      }

      this.initialized = false;
      this.logInfo('Footer component destroyed');
    } catch (error) {
      this.logError('Error during footer cleanup', error);
    }
  }

  /**
   * Log informational message
   * 
   * @param {string} message - The message to log
   * @param {*} data - Additional data to log
   */
  logInfo(message, data) {
    if (import.meta.env.MODE !== 'production') {
      console.log(`[Footer] ${message}`, data || '');
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
      component: 'Footer',
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

    console.error('[Footer Error]', errorContext);
  }
}

/**
 * Export the Footer class
 */
export default Footer;