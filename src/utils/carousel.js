/**
 * Carousel Utility Module
 * 
 * Provides production-ready carousel functionality with comprehensive features:
 * - Navigation controls (previous/next buttons, indicators)
 * - Auto-play with configurable intervals
 * - Pause on hover/focus
 * - Touch/swipe support for mobile devices
 * - Keyboard navigation (arrow keys, tab)
 * - Full accessibility (ARIA attributes, screen reader support)
 * - Responsive behavior
 * - Performance optimized with RAF and passive listeners
 * 
 * @module utils/carousel
 * @version 1.0.0
 */

/**
 * Default configuration for carousel instances
 * @constant {Object}
 */
const DEFAULT_CONFIG = {
  autoPlay: true,
  autoPlayInterval: 5000,
  pauseOnHover: true,
  pauseOnFocus: true,
  loop: true,
  swipeThreshold: 50,
  transitionDuration: 500,
  enableKeyboard: true,
  enableTouch: true,
  enableIndicators: true,
  enableNavButtons: true,
  ariaLabel: 'Carousel',
  ariaLive: 'polite',
};

/**
 * Carousel class implementing full carousel functionality
 * with accessibility and mobile support
 */
class Carousel {
  /**
   * Creates a new Carousel instance
   * 
   * @param {HTMLElement} container - The carousel container element
   * @param {Object} options - Configuration options
   * @throws {Error} If container is invalid or required elements are missing
   */
  constructor(container, options = {}) {
    // Validate container
    if (!container || !(container instanceof HTMLElement)) {
      throw new Error('Carousel: Invalid container element provided');
    }

    this.container = container;
    this.config = { ...DEFAULT_CONFIG, ...options };
    
    // State management
    this.currentIndex = 0;
    this.isPlaying = this.config.autoPlay;
    this.isPaused = false;
    this.isTransitioning = false;
    this.autoPlayTimer = null;
    this.animationFrame = null;
    
    // Touch/swipe state
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartY = 0;
    this.touchEndY = 0;
    this.isDragging = false;
    
    // DOM references
    this.slides = [];
    this.track = null;
    this.prevButton = null;
    this.nextButton = null;
    this.indicators = [];
    this.indicatorContainer = null;
    
    // Bound methods for event listeners
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleIndicatorClick = this.handleIndicatorClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    
    // Initialize carousel
    this.init();
  }

  /**
   * Initialize the carousel
   * Sets up DOM structure, event listeners, and starts auto-play
   */
  init() {
    try {
      this.logInfo('Initializing carousel');
      
      // Find or create track element
      this.track = this.container.querySelector('[data-carousel-track]');
      if (!this.track) {
        throw new Error('Carousel: Track element not found. Add [data-carousel-track] attribute.');
      }
      
      // Get slides
      this.slides = Array.from(this.track.querySelectorAll('[data-carousel-slide]'));
      if (this.slides.length === 0) {
        throw new Error('Carousel: No slides found. Add [data-carousel-slide] attributes.');
      }
      
      // Setup accessibility
      this.setupAccessibility();
      
      // Setup navigation controls
      if (this.config.enableNavButtons) {
        this.setupNavigationButtons();
      }
      
      // Setup indicators
      if (this.config.enableIndicators) {
        this.setupIndicators();
      }
      
      // Setup keyboard navigation
      if (this.config.enableKeyboard) {
        this.setupKeyboardNavigation();
      }
      
      // Setup touch/swipe support
      if (this.config.enableTouch) {
        this.setupTouchSupport();
      }
      
      // Setup hover/focus pause
      if (this.config.pauseOnHover || this.config.pauseOnFocus) {
        this.setupPauseHandlers();
      }
      
      // Setup visibility change handler
      this.setupVisibilityHandler();
      
      // Initialize first slide
      this.goToSlide(0, false);
      
      // Start auto-play if enabled
      if (this.config.autoPlay) {
        this.startAutoPlay();
      }
      
      this.logInfo('Carousel initialized successfully', {
        slideCount: this.slides.length,
        autoPlay: this.config.autoPlay,
      });
      
      // Dispatch initialization event
      this.dispatchEvent('carousel:initialized', {
        slideCount: this.slides.length,
        currentIndex: this.currentIndex,
      });
    } catch (error) {
      this.logError('Failed to initialize carousel', error);
      throw error;
    }
  }

  /**
   * Setup accessibility attributes and structure
   */
  setupAccessibility() {
    // Container attributes
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', this.config.ariaLabel);
    this.container.setAttribute('aria-roledescription', 'carousel');
    
    // Track attributes
    this.track.setAttribute('role', 'list');
    this.track.setAttribute('aria-live', this.config.ariaLive);
    this.track.setAttribute('aria-atomic', 'false');
    
    // Slide attributes
    this.slides.forEach((slide, index) => {
      slide.setAttribute('role', 'listitem');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `Slide ${index + 1} of ${this.slides.length}`);
      slide.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
      slide.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
  }

  /**
   * Setup navigation buttons (previous/next)
   */
  setupNavigationButtons() {
    // Find or create previous button
    this.prevButton = this.container.querySelector('[data-carousel-prev]');
    if (this.prevButton) {
      this.prevButton.setAttribute('aria-label', 'Previous slide');
      this.prevButton.setAttribute('aria-controls', this.track.id || 'carousel-track');
      this.prevButton.addEventListener('click', this.handlePrevClick);
    }
    
    // Find or create next button
    this.nextButton = this.container.querySelector('[data-carousel-next]');
    if (this.nextButton) {
      this.nextButton.setAttribute('aria-label', 'Next slide');
      this.nextButton.setAttribute('aria-controls', this.track.id || 'carousel-track');
      this.nextButton.addEventListener('click', this.handleNextClick);
    }
    
    // Update button states
    this.updateNavigationButtons();
  }

  /**
   * Setup indicator dots for slide navigation
   */
  setupIndicators() {
    this.indicatorContainer = this.container.querySelector('[data-carousel-indicators]');
    
    if (!this.indicatorContainer) {
      this.logInfo('Indicator container not found, skipping indicators');
      return;
    }
    
    // Clear existing indicators
    this.indicatorContainer.innerHTML = '';
    this.indicators = [];
    
    // Create indicator for each slide
    this.slides.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.setAttribute('type', 'button');
      indicator.setAttribute('role', 'tab');
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
      indicator.setAttribute('aria-controls', this.track.id || 'carousel-track');
      indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      indicator.setAttribute('tabindex', index === 0 ? '0' : '-1');
      indicator.dataset.index = index;
      
      indicator.addEventListener('click', this.handleIndicatorClick);
      
      this.indicatorContainer.appendChild(indicator);
      this.indicators.push(indicator);
    });
    
    // Set role on container
    this.indicatorContainer.setAttribute('role', 'tablist');
    this.indicatorContainer.setAttribute('aria-label', 'Slide navigation');
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    this.container.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * Setup touch/swipe support for mobile devices
   */
  setupTouchSupport() {
    // Use passive listeners for better scroll performance
    this.track.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    this.track.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.track.addEventListener('touchend', this.handleTouchEnd, { passive: true });
  }

  /**
   * Setup pause on hover and focus handlers
   */
  setupPauseHandlers() {
    if (this.config.pauseOnHover) {
      this.container.addEventListener('mouseenter', this.handleMouseEnter);
      this.container.addEventListener('mouseleave', this.handleMouseLeave);
    }
    
    if (this.config.pauseOnFocus) {
      this.container.addEventListener('focusin', this.handleFocus);
      this.container.addEventListener('focusout', this.handleBlur);
    }
  }

  /**
   * Setup visibility change handler to pause when tab is hidden
   */
  setupVisibilityHandler() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Handle previous button click
   * @param {Event} event - Click event
   */
  handlePrevClick(event) {
    event.preventDefault();
    this.previous();
  }

  /**
   * Handle next button click
   * @param {Event} event - Click event
   */
  handleNextClick(event) {
    event.preventDefault();
    this.next();
  }

  /**
   * Handle indicator click
   * @param {Event} event - Click event
   */
  handleIndicatorClick(event) {
    event.preventDefault();
    const index = parseInt(event.currentTarget.dataset.index, 10);
    if (!isNaN(index)) {
      this.goToSlide(index);
    }
  }

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyDown(event) {
    // Only handle if focus is within carousel
    if (!this.container.contains(document.activeElement)) {
      return;
    }
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previous();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.next();
        break;
      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToSlide(this.slides.length - 1);
        break;
      default:
        break;
    }
  }

  /**
   * Handle touch start event
   * @param {TouchEvent} event - Touch event
   */
  handleTouchStart(event) {
    if (event.touches.length !== 1) return;
    
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.isDragging = true;
    
    // Pause auto-play during touch
    if (this.isPlaying) {
      this.pause();
    }
  }

  /**
   * Handle touch move event
   * @param {TouchEvent} event - Touch event
   */
  handleTouchMove(event) {
    if (!this.isDragging || event.touches.length !== 1) return;
    
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const deltaX = Math.abs(touchX - this.touchStartX);
    const deltaY = Math.abs(touchY - this.touchStartY);
    
    // Prevent default if horizontal swipe is detected
    if (deltaX > deltaY && deltaX > 10) {
      event.preventDefault();
    }
  }

  /**
   * Handle touch end event
   * @param {TouchEvent} event - Touch event
   */
  handleTouchEnd(event) {
    if (!this.isDragging) return;
    
    this.touchEndX = event.changedTouches[0].clientX;
    this.touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = Math.abs(this.touchEndY - this.touchStartY);
    
    // Check if horizontal swipe exceeds threshold
    if (Math.abs(deltaX) > this.config.swipeThreshold && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        this.previous();
      } else {
        this.next();
      }
    }
    
    this.isDragging = false;
    
    // Resume auto-play if it was playing
    if (this.config.autoPlay && !this.isPaused) {
      this.startAutoPlay();
    }
  }

  /**
   * Handle mouse enter event
   */
  handleMouseEnter() {
    if (this.isPlaying) {
      this.pause();
    }
  }

  /**
   * Handle mouse leave event
   */
  handleMouseLeave() {
    if (this.config.autoPlay && !this.isPaused) {
      this.startAutoPlay();
    }
  }

  /**
   * Handle focus event
   */
  handleFocus() {
    if (this.isPlaying) {
      this.pause();
    }
  }

  /**
   * Handle blur event
   */
  handleBlur() {
    // Only resume if no element in carousel has focus
    if (this.config.autoPlay && !this.isPaused && !this.container.contains(document.activeElement)) {
      this.startAutoPlay();
    }
  }

  /**
   * Handle visibility change event
   */
  handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else if (this.config.autoPlay && !this.isPaused) {
      this.startAutoPlay();
    }
  }

  /**
   * Navigate to previous slide
   */
  previous() {
    const newIndex = this.currentIndex - 1;
    if (newIndex < 0) {
      if (this.config.loop) {
        this.goToSlide(this.slides.length - 1);
      }
    } else {
      this.goToSlide(newIndex);
    }
  }

  /**
   * Navigate to next slide
   */
  next() {
    const newIndex = this.currentIndex + 1;
    if (newIndex >= this.slides.length) {
      if (this.config.loop) {
        this.goToSlide(0);
      }
    } else {
      this.goToSlide(newIndex);
    }
  }

  /**
   * Navigate to specific slide
   * @param {number} index - Target slide index
   * @param {boolean} animate - Whether to animate transition
   */
  goToSlide(index, animate = true) {
    // Validate index
    if (index < 0 || index >= this.slides.length) {
      this.logError('Invalid slide index', { index, slideCount: this.slides.length });
      return;
    }
    
    // Prevent transition if already transitioning
    if (this.isTransitioning) {
      return;
    }
    
    // No-op if already on target slide
    if (index === this.currentIndex) {
      return;
    }
    
    const previousIndex = this.currentIndex;
    this.currentIndex = index;
    this.isTransitioning = true;
    
    // Update slides
    this.updateSlides(previousIndex, index, animate);
    
    // Update navigation
    this.updateNavigationButtons();
    this.updateIndicators();
    
    // Dispatch change event
    this.dispatchEvent('carousel:change', {
      previousIndex,
      currentIndex: index,
      slideCount: this.slides.length,
    });
    
    // Reset transition flag after animation
    const transitionDuration = animate ? this.config.transitionDuration : 0;
    setTimeout(() => {
      this.isTransitioning = false;
    }, transitionDuration);
    
    // Restart auto-play timer
    if (this.isPlaying) {
      this.startAutoPlay();
    }
  }

  /**
   * Update slide visibility and attributes
   * @param {number} previousIndex - Previous slide index
   * @param {number} currentIndex - Current slide index
   * @param {boolean} animate - Whether to animate
   */
  updateSlides(previousIndex, currentIndex, animate) {
    // Hide previous slide
    const previousSlide = this.slides[previousIndex];
    if (previousSlide) {
      previousSlide.setAttribute('aria-hidden', 'true');
      previousSlide.setAttribute('tabindex', '-1');
    }
    
    // Show current slide
    const currentSlide = this.slides[currentIndex];
    if (currentSlide) {
      currentSlide.setAttribute('aria-hidden', 'false');
      currentSlide.setAttribute('tabindex', '0');
      
      // Announce to screen readers
      this.announceSlideChange(currentIndex);
    }
  }

  /**
   * Update navigation button states
   */
  updateNavigationButtons() {
    if (!this.config.loop) {
      // Disable previous button on first slide
      if (this.prevButton) {
        this.prevButton.disabled = this.currentIndex === 0;
        this.prevButton.setAttribute('aria-disabled', this.currentIndex === 0 ? 'true' : 'false');
      }
      
      // Disable next button on last slide
      if (this.nextButton) {
        this.nextButton.disabled = this.currentIndex === this.slides.length - 1;
        this.nextButton.setAttribute('aria-disabled', this.currentIndex === this.slides.length - 1 ? 'true' : 'false');
      }
    }
  }

  /**
   * Update indicator states
   */
  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      const isActive = index === this.currentIndex;
      indicator.setAttribute('aria-selected', isActive ? 'true' : 'false');
      indicator.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  }

  /**
   * Announce slide change to screen readers
   * @param {number} index - Current slide index
   */
  announceSlideChange(index) {
    const announcement = `Slide ${index + 1} of ${this.slides.length}`;
    
    // Create or update live region
    let liveRegion = this.container.querySelector('[data-carousel-live-region]');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('data-carousel-live-region', '');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      this.container.appendChild(liveRegion);
    }
    
    liveRegion.textContent = announcement;
  }

  /**
   * Start auto-play
   */
  startAutoPlay() {
    this.stopAutoPlay();
    
    this.isPlaying = true;
    this.autoPlayTimer = setTimeout(() => {
      this.animationFrame = requestAnimationFrame(() => {
        this.next();
      });
    }, this.config.autoPlayInterval);
  }

  /**
   * Stop auto-play
   */
  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    this.isPlaying = false;
  }

  /**
   * Pause auto-play temporarily
   */
  pause() {
    this.isPaused = true;
    this.stopAutoPlay();
  }

  /**
   * Resume auto-play
   */
  resume() {
    this.isPaused = false;
    if (this.config.autoPlay) {
      this.startAutoPlay();
    }
  }

  /**
   * Dispatch custom event
   * @param {string} eventName - Event name
   * @param {Object} detail - Event detail data
   */
  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: {
        ...detail,
        timestamp: Date.now(),
        carousel: this,
      },
      bubbles: true,
      cancelable: true,
    });
    
    this.container.dispatchEvent(event);
  }

  /**
   * Log informational message
   * @param {string} message - Log message
   * @param {*} data - Additional data
   */
  logInfo(message, data) {
    if (import.meta.env.MODE !== 'production') {
      console.log(`[Carousel] ${message}`, data || '');
    }
  }

  /**
   * Log error message
   * @param {string} message - Error message
   * @param {Error|Object} error - Error object or context
   */
  logError(message, error) {
    const errorContext = {
      message,
      timestamp: new Date().toISOString(),
      currentIndex: this.currentIndex,
      slideCount: this.slides.length,
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
    
    console.error('[Carousel Error]', errorContext);
  }

  /**
   * Destroy carousel and clean up resources
   */
  destroy() {
    try {
      this.logInfo('Destroying carousel');
      
      // Stop auto-play
      this.stopAutoPlay();
      
      // Remove event listeners
      if (this.prevButton) {
        this.prevButton.removeEventListener('click', this.handlePrevClick);
      }
      
      if (this.nextButton) {
        this.nextButton.removeEventListener('click', this.handleNextClick);
      }
      
      this.indicators.forEach((indicator) => {
        indicator.removeEventListener('click', this.handleIndicatorClick);
      });
      
      this.container.removeEventListener('keydown', this.handleKeyDown);
      this.track.removeEventListener('touchstart', this.handleTouchStart);
      this.track.removeEventListener('touchmove', this.handleTouchMove);
      this.track.removeEventListener('touchend', this.handleTouchEnd);
      this.container.removeEventListener('mouseenter', this.handleMouseEnter);
      this.container.removeEventListener('mouseleave', this.handleMouseLeave);
      this.container.removeEventListener('focusin', this.handleFocus);
      this.container.removeEventListener('focusout', this.handleBlur);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      
      // Clear references
      this.slides = [];
      this.indicators = [];
      this.track = null;
      this.prevButton = null;
      this.nextButton = null;
      this.indicatorContainer = null;
      
      this.logInfo('Carousel destroyed');
    } catch (error) {
      this.logError('Error destroying carousel', error);
    }
  }
}

/**
 * Factory function to create carousel instances
 * @param {HTMLElement|string} container - Container element or selector
 * @param {Object} options - Configuration options
 * @returns {Carousel} Carousel instance
 */
export function createCarousel(container, options = {}) {
  const element = typeof container === 'string' 
    ? document.querySelector(container)
    : container;
  
  if (!element) {
    throw new Error(`Carousel: Container not found: ${container}`);
  }
  
  return new Carousel(element, options);
}

/**
 * Initialize all carousels on the page
 * @param {string} selector - Selector for carousel containers
 * @param {Object} options - Default configuration options
 * @returns {Carousel[]} Array of carousel instances
 */
export function initializeCarousels(selector = '[data-carousel]', options = {}) {
  const containers = document.querySelectorAll(selector);
  const carousels = [];
  
  containers.forEach((container) => {
    try {
      const carousel = new Carousel(container, options);
      carousels.push(carousel);
    } catch (error) {
      console.error('[Carousel] Failed to initialize carousel', {
        container,
        error: error.message,
      });
    }
  });
  
  return carousels;
}

export default Carousel;