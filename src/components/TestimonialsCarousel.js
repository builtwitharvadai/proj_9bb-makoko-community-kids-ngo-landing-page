/**
 * TestimonialsCarousel Component
 * 
 * Responsive testimonials carousel with navigation controls, auto-play functionality,
 * and touch/swipe support. Displays quotes from beneficiaries and volunteers with photos.
 * 
 * Features:
 * - Auto-play with configurable interval
 * - Touch/swipe gesture support for mobile
 * - Keyboard navigation (arrow keys)
 * - Pause on hover/focus
 * - Responsive design with mobile optimization
 * - Accessible with ARIA labels and keyboard support
 * - Smooth transitions with CSS animations
 * 
 * @module TestimonialsCarousel
 */

export class TestimonialsCarousel {
  /**
   * Initialize testimonials carousel
   * @param {Object} config - Configuration options
   * @param {string} config.containerId - ID of container element
   * @param {Array<Object>} config.testimonials - Array of testimonial objects
   * @param {number} [config.autoPlayInterval=5000] - Auto-play interval in ms
   * @param {boolean} [config.autoPlay=true] - Enable auto-play
   * @param {boolean} [config.loop=true] - Enable infinite loop
   */
  constructor(config) {
    this.containerId = config.containerId;
    this.testimonials = config.testimonials || [];
    this.autoPlayInterval = config.autoPlayInterval || 5000;
    this.autoPlay = config.autoPlay !== false;
    this.loop = config.loop !== false;
    
    this.currentIndex = 0;
    this.autoPlayTimer = null;
    this.isTransitioning = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;
    
    this.container = null;
    this.carouselTrack = null;
    this.prevButton = null;
    this.nextButton = null;
    this.indicators = [];
    
    this.init();
  }

  /**
   * Initialize carousel component
   */
  init() {
    try {
      this.container = document.getElementById(this.containerId);
      
      if (!this.container) {
        console.error(`TestimonialsCarousel: Container with ID "${this.containerId}" not found`);
        return;
      }

      if (!this.testimonials || this.testimonials.length === 0) {
        console.warn('TestimonialsCarousel: No testimonials provided');
        this.renderEmptyState();
        return;
      }

      this.render();
      this.attachEventListeners();
      
      if (this.autoPlay) {
        this.startAutoPlay();
      }

      console.log(`TestimonialsCarousel: Initialized with ${this.testimonials.length} testimonials`);
    } catch (error) {
      console.error('TestimonialsCarousel: Initialization failed', error);
      this.renderErrorState();
    }
  }

  /**
   * Render carousel HTML structure
   */
  render() {
    const carouselHTML = `
      <div class="testimonials-carousel relative" role="region" aria-label="Testimonials Carousel">
        <!-- Carousel Track -->
        <div class="carousel-track-container overflow-hidden">
          <div class="carousel-track flex transition-transform duration-500 ease-in-out" 
               style="transform: translateX(0%)">
            ${this.testimonials.map((testimonial, index) => this.renderTestimonialSlide(testimonial, index)).join('')}
          </div>
        </div>

        <!-- Navigation Controls -->
        <div class="carousel-controls flex items-center justify-center gap-4 mt-8">
          <button 
            class="carousel-btn carousel-prev w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
            ${!this.loop && this.currentIndex === 0 ? 'disabled' : ''}>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Indicators -->
          <div class="carousel-indicators flex gap-2" role="tablist" aria-label="Testimonial indicators">
            ${this.testimonials.map((_, index) => `
              <button 
                class="indicator w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${index === 0 ? 'bg-primary-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}"
                data-index="${index}"
                role="tab"
                aria-label="Go to testimonial ${index + 1}"
                aria-selected="${index === 0 ? 'true' : 'false'}"
                tabindex="${index === 0 ? '0' : '-1'}">
              </button>
            `).join('')}
          </div>

          <button 
            class="carousel-btn carousel-next w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
            ${!this.loop && this.currentIndex === this.testimonials.length - 1 ? 'disabled' : ''}>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Auto-play Status (for screen readers) -->
        <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
          Showing testimonial ${this.currentIndex + 1} of ${this.testimonials.length}
        </div>
      </div>
    `;

    this.container.innerHTML = carouselHTML;
    
    this.carouselTrack = this.container.querySelector('.carousel-track');
    this.prevButton = this.container.querySelector('.carousel-prev');
    this.nextButton = this.container.querySelector('.carousel-next');
    this.indicators = Array.from(this.container.querySelectorAll('.indicator'));
  }

  /**
   * Render individual testimonial slide
   * @param {Object} testimonial - Testimonial data
   * @param {number} index - Slide index
   * @returns {string} HTML string
   */
  renderTestimonialSlide(testimonial, index) {
    const { name, role, quote, image, type } = testimonial;
    const typeLabel = type === 'beneficiary' ? 'Beneficiary' : 'Volunteer';
    const typeColor = type === 'beneficiary' ? 'bg-secondary-100 text-secondary-800' : 'bg-primary-100 text-primary-800';

    return `
      <div class="carousel-slide flex-shrink-0 w-full px-4" data-index="${index}">
        <div class="testimonial bg-white rounded-2xl shadow-soft p-8 max-w-4xl mx-auto">
          <div class="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <!-- Photo -->
            <div class="flex-shrink-0">
              <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary-100">
                ${image ? `
                  <img 
                    src="${this.escapeHtml(image)}" 
                    alt="${this.escapeHtml(name)}"
                    class="w-full h-full object-cover"
                    loading="lazy"
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23cbd5e1%22%3E%3Cpath d=%22M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z%22/%3E%3C/svg%3E'" />
                ` : `
                  <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                `}
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center md:text-left">
              <!-- Quote Icon -->
              <svg class="w-10 h-10 text-primary-200 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>

              <!-- Quote Text -->
              <blockquote class="text-gray-700 text-lg leading-relaxed mb-6">
                "${this.escapeHtml(quote)}"
              </blockquote>

              <!-- Author Info -->
              <div class="flex flex-col md:flex-row md:items-center gap-3">
                <div>
                  <div class="font-semibold text-gray-900 text-lg">${this.escapeHtml(name)}</div>
                  <div class="text-gray-600">${this.escapeHtml(role)}</div>
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${typeColor} md:ml-auto">
                  ${typeLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render empty state when no testimonials
   */
  renderEmptyState() {
    this.container.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p class="text-gray-600 text-lg">No testimonials available</p>
      </div>
    `;
  }

  /**
   * Render error state
   */
  renderErrorState() {
    this.container.innerHTML = `
      <div class="text-center py-12">
        <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-gray-600 text-lg">Failed to load testimonials</p>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.goToPrevious());
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.goToNext());
    }

    this.indicators.forEach((indicator) => {
      indicator.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index, 10);
        this.goToSlide(index);
      });
    });

    if (this.carouselTrack) {
      this.carouselTrack.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
      this.carouselTrack.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    }

    document.addEventListener('keydown', (e) => this.handleKeyboard(e));

    const carouselElement = this.container.querySelector('.testimonials-carousel');
    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', () => this.pauseAutoPlay());
      carouselElement.addEventListener('mouseleave', () => this.resumeAutoPlay());
      carouselElement.addEventListener('focusin', () => this.pauseAutoPlay());
      carouselElement.addEventListener('focusout', () => this.resumeAutoPlay());
    }
  }

  /**
   * Handle touch start event
   * @param {TouchEvent} e - Touch event
   */
  handleTouchStart(e) {
    this.touchStartX = e.changedTouches[0].screenX;
  }

  /**
   * Handle touch end event
   * @param {TouchEvent} e - Touch event
   */
  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].screenX;
    this.handleSwipe();
  }

  /**
   * Handle swipe gesture
   */
  handleSwipe() {
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) < this.minSwipeDistance) {
      return;
    }

    if (swipeDistance > 0) {
      this.goToNext();
    } else {
      this.goToPrevious();
    }
  }

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyboard(e) {
    if (!this.container.contains(document.activeElement)) {
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.goToPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.goToNext();
    }
  }

  /**
   * Go to previous slide
   */
  goToPrevious() {
    if (this.isTransitioning) return;

    let newIndex = this.currentIndex - 1;

    if (newIndex < 0) {
      if (this.loop) {
        newIndex = this.testimonials.length - 1;
      } else {
        return;
      }
    }

    this.goToSlide(newIndex);
  }

  /**
   * Go to next slide
   */
  goToNext() {
    if (this.isTransitioning) return;

    let newIndex = this.currentIndex + 1;

    if (newIndex >= this.testimonials.length) {
      if (this.loop) {
        newIndex = 0;
      } else {
        return;
      }
    }

    this.goToSlide(newIndex);
  }

  /**
   * Go to specific slide
   * @param {number} index - Target slide index
   */
  goToSlide(index) {
    if (this.isTransitioning || index === this.currentIndex) return;

    if (index < 0 || index >= this.testimonials.length) {
      console.warn(`TestimonialsCarousel: Invalid slide index ${index}`);
      return;
    }

    this.isTransitioning = true;
    this.currentIndex = index;

    const offset = -index * 100;
    this.carouselTrack.style.transform = `translateX(${offset}%)`;

    this.updateIndicators();
    this.updateNavigationButtons();
    this.updateAriaLive();

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);

    if (this.autoPlay) {
      this.resetAutoPlay();
    }
  }

  /**
   * Update indicator states
   */
  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      const isActive = index === this.currentIndex;
      
      if (isActive) {
        indicator.classList.remove('bg-gray-300', 'w-3', 'hover:bg-gray-400');
        indicator.classList.add('bg-primary-600', 'w-8');
        indicator.setAttribute('aria-selected', 'true');
        indicator.setAttribute('tabindex', '0');
      } else {
        indicator.classList.remove('bg-primary-600', 'w-8');
        indicator.classList.add('bg-gray-300', 'w-3', 'hover:bg-gray-400');
        indicator.setAttribute('aria-selected', 'false');
        indicator.setAttribute('tabindex', '-1');
      }
    });
  }

  /**
   * Update navigation button states
   */
  updateNavigationButtons() {
    if (!this.loop) {
      if (this.prevButton) {
        this.prevButton.disabled = this.currentIndex === 0;
      }
      if (this.nextButton) {
        this.nextButton.disabled = this.currentIndex === this.testimonials.length - 1;
      }
    }
  }

  /**
   * Update ARIA live region for screen readers
   */
  updateAriaLive() {
    const liveRegion = this.container.querySelector('[role="status"]');
    if (liveRegion) {
      liveRegion.textContent = `Showing testimonial ${this.currentIndex + 1} of ${this.testimonials.length}`;
    }
  }

  /**
   * Start auto-play
   */
  startAutoPlay() {
    if (!this.autoPlay || this.testimonials.length <= 1) return;

    this.autoPlayTimer = setInterval(() => {
      this.goToNext();
    }, this.autoPlayInterval);
  }

  /**
   * Pause auto-play
   */
  pauseAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  /**
   * Resume auto-play
   */
  resumeAutoPlay() {
    if (this.autoPlay && !this.autoPlayTimer) {
      this.startAutoPlay();
    }
  }

  /**
   * Reset auto-play timer
   */
  resetAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Destroy carousel and cleanup
   */
  destroy() {
    this.pauseAutoPlay();
    
    if (this.container) {
      this.container.innerHTML = '';
    }

    this.container = null;
    this.carouselTrack = null;
    this.prevButton = null;
    this.nextButton = null;
    this.indicators = [];
    
    console.log('TestimonialsCarousel: Destroyed');
  }
}

export default TestimonialsCarousel;