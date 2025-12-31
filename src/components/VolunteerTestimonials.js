/**
 * Volunteer Testimonials Component
 * 
 * Displays testimonials from current and past volunteers showcasing their
 * experiences and impact. Implements carousel or grid layout for multiple
 * testimonials with full accessibility support.
 * 
 * Features:
 * - Responsive carousel/grid layout
 * - Volunteer photos with role information
 * - Quote display with attribution
 * - Auto-play with pause on hover
 * - Touch/swipe support for mobile
 * - Full keyboard navigation
 * - ARIA attributes for screen readers
 * 
 * @module components/VolunteerTestimonials
 */

import { createCarousel } from '../utils/carousel.js';
import { getIcon } from '../utils/icons.js';

/**
 * Volunteer testimonials data structure
 * @typedef {Object} VolunteerTestimonial
 * @property {string} id - Unique identifier
 * @property {string} name - Volunteer name
 * @property {string} role - Volunteer role/position
 * @property {string} quote - Testimonial quote
 * @property {string} image - Photo URL
 * @property {string} duration - Time volunteered
 * @property {string} location - Volunteer location
 */

/**
 * Default testimonials data
 * @constant {VolunteerTestimonial[]}
 */
const DEFAULT_TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'Sarah Johnson',
    role: 'Education Volunteer',
    quote: 'Working with the children in Makoko has been the most rewarding experience of my life. Seeing their faces light up when they learn something new makes every moment worthwhile. The community has taught me as much as I\'ve taught them.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    duration: '2 years',
    location: 'Lagos, Nigeria',
  },
  {
    id: 'testimonial-2',
    name: 'Michael Chen',
    role: 'Healthcare Volunteer',
    quote: 'The healthcare program has transformed lives in ways I never imagined. From basic health screenings to nutrition education, we\'re making a real difference. The resilience and gratitude of the community inspire me every day.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    duration: '1 year',
    location: 'United Kingdom',
  },
  {
    id: 'testimonial-3',
    name: 'Amara Okafor',
    role: 'Community Development Volunteer',
    quote: 'Being part of the community development initiatives has shown me the power of grassroots change. We\'re not just providing services; we\'re empowering families to build better futures. This work has changed my perspective on what\'s possible.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    duration: '3 years',
    location: 'Lagos, Nigeria',
  },
  {
    id: 'testimonial-4',
    name: 'David Martinez',
    role: 'Skills Training Volunteer',
    quote: 'Teaching vocational skills to young adults has been incredibly fulfilling. Watching them gain confidence and secure employment is amazing. The program doesn\'t just teach skills; it opens doors to new opportunities and dreams.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    duration: '18 months',
    location: 'United States',
  },
];

/**
 * Component configuration
 * @constant {Object}
 */
const CONFIG = {
  carouselEnabled: true,
  autoPlay: true,
  autoPlayInterval: 6000,
  pauseOnHover: true,
  enableTouch: true,
  enableKeyboard: true,
  transitionDuration: 500,
};

/**
 * Create testimonial card HTML
 * @param {VolunteerTestimonial} testimonial - Testimonial data
 * @returns {string} HTML string
 */
function createTestimonialCard(testimonial) {
  const quoteIcon = getIcon('quote');
  
  return `
    <div class="testimonial bg-white rounded-2xl shadow-soft p-8 h-full flex flex-col" data-testimonial-id="${testimonial.id}">
      <!-- Quote Icon -->
      <div class="flex justify-center mb-6">
        <div class="w-12 h-12 text-primary-400">
          ${quoteIcon}
        </div>
      </div>
      
      <!-- Quote Text -->
      <blockquote class="flex-grow mb-6">
        <p class="text-gray-700 text-lg leading-relaxed italic">
          "${testimonial.quote}"
        </p>
      </blockquote>
      
      <!-- Volunteer Info -->
      <div class="flex items-center gap-4 pt-6 border-t border-gray-200">
        <!-- Photo -->
        <div class="flex-shrink-0">
          <img 
            src="${testimonial.image}" 
            alt="${testimonial.name}"
            class="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
            loading="lazy"
          />
        </div>
        
        <!-- Details -->
        <div class="flex-grow">
          <h4 class="font-bold text-gray-900 text-lg">
            ${testimonial.name}
          </h4>
          <p class="text-primary-600 font-semibold text-sm">
            ${testimonial.role}
          </p>
          <div class="flex items-center gap-3 mt-1 text-xs text-gray-600">
            <span class="flex items-center gap-1">
              ${getIcon('clock', 'w-3 h-3')}
              ${testimonial.duration}
            </span>
            <span class="flex items-center gap-1">
              ${getIcon('location', 'w-3 h-3')}
              ${testimonial.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Create carousel layout HTML
 * @param {VolunteerTestimonial[]} testimonials - Array of testimonials
 * @returns {string} HTML string
 */
function createCarouselLayout(testimonials) {
  const slides = testimonials.map((testimonial) => `
    <div class="carousel-slide" data-carousel-slide>
      <div class="max-w-4xl mx-auto px-4">
        ${createTestimonialCard(testimonial)}
      </div>
    </div>
  `).join('');

  return `
    <div class="testimonials-carousel" data-carousel role="region" aria-label="Volunteer testimonials carousel">
      <!-- Carousel Track Container -->
      <div class="carousel-track-container relative overflow-hidden rounded-2xl">
        <div class="carousel-track flex transition-transform duration-500 ease-in-out" data-carousel-track>
          ${slides}
        </div>
      </div>
      
      <!-- Navigation Controls -->
      <div class="flex items-center justify-center gap-4 mt-8">
        <!-- Previous Button -->
        <button 
          type="button"
          class="carousel-btn w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-carousel-prev
          aria-label="Previous testimonial"
        >
          ${getIcon('chevronLeft', 'w-6 h-6')}
        </button>
        
        <!-- Indicators -->
        <div class="carousel-indicators flex gap-2" data-carousel-indicators role="tablist" aria-label="Testimonial navigation">
          <!-- Indicators will be generated by carousel utility -->
        </div>
        
        <!-- Next Button -->
        <button 
          type="button"
          class="carousel-btn w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-carousel-next
          aria-label="Next testimonial"
        >
          ${getIcon('chevronRight', 'w-6 h-6')}
        </button>
      </div>
      
      <!-- Screen Reader Live Region -->
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true" data-carousel-live-region></div>
    </div>
  `;
}

/**
 * Create grid layout HTML
 * @param {VolunteerTestimonial[]} testimonials - Array of testimonials
 * @returns {string} HTML string
 */
function createGridLayout(testimonials) {
  const cards = testimonials.map((testimonial) => `
    <div class="animate-fadeInUp" style="animation-delay: ${testimonials.indexOf(testimonial) * 100}ms">
      ${createTestimonialCard(testimonial)}
    </div>
  `).join('');

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      ${cards}
    </div>
  `;
}

/**
 * Create volunteer testimonials section
 * @param {Object} options - Configuration options
 * @param {VolunteerTestimonial[]} [options.testimonials] - Custom testimonials data
 * @param {boolean} [options.useCarousel] - Use carousel layout
 * @param {Object} [options.carouselConfig] - Carousel configuration
 * @returns {string} HTML string
 */
export function createVolunteerTestimonials(options = {}) {
  const {
    testimonials = DEFAULT_TESTIMONIALS,
    useCarousel = CONFIG.carouselEnabled,
    carouselConfig = {},
  } = options;

  // Validate testimonials data
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    console.error('[VolunteerTestimonials] Invalid testimonials data provided');
    return '';
  }

  const layout = useCarousel 
    ? createCarouselLayout(testimonials)
    : createGridLayout(testimonials);

  return `
    <section id="volunteer-testimonials" class="section-container bg-gradient-to-br from-gray-50 to-blue-50">
      <!-- Section Header -->
      <header class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Volunteer Stories
        </h2>
        <p class="text-xl text-gray-600 leading-relaxed">
          Hear from our amazing volunteers about their experiences making a difference in Makoko. 
          Their dedication and passion inspire us every day.
        </p>
      </header>
      
      <!-- Testimonials Content -->
      <div class="testimonials-content" data-testimonials-content>
        ${layout}
      </div>
      
      <!-- Call to Action -->
      <footer class="text-center mt-16">
        <p class="text-lg text-gray-700 mb-6">
          Ready to make a difference? Join our volunteer community today.
        </p>
        <a 
          href="#volunteer-application" 
          class="btn btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
        >
          <span>Apply to Volunteer</span>
          ${getIcon('arrowRight', 'w-5 h-5')}
        </a>
      </footer>
    </section>
  `;
}

/**
 * Initialize volunteer testimonials functionality
 * @param {HTMLElement|string} container - Container element or selector
 * @param {Object} options - Configuration options
 * @returns {Object|null} Carousel instance or null
 */
export function initVolunteerTestimonials(container, options = {}) {
  try {
    const element = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!element) {
      console.error('[VolunteerTestimonials] Container not found:', container);
      return null;
    }

    // Check if carousel layout is used
    const carouselElement = element.querySelector('[data-carousel]');
    if (!carouselElement) {
      console.info('[VolunteerTestimonials] Grid layout detected, no carousel initialization needed');
      return null;
    }

    // Merge configuration
    const config = {
      autoPlay: CONFIG.autoPlay,
      autoPlayInterval: CONFIG.autoPlayInterval,
      pauseOnHover: CONFIG.pauseOnHover,
      enableTouch: CONFIG.enableTouch,
      enableKeyboard: CONFIG.enableKeyboard,
      transitionDuration: CONFIG.transitionDuration,
      loop: true,
      ariaLabel: 'Volunteer testimonials',
      ...options.carouselConfig,
    };

    // Initialize carousel
    const carousel = createCarousel(carouselElement, config);

    // Add custom indicator styling
    const indicators = carouselElement.querySelectorAll('[data-carousel-indicators] button');
    indicators.forEach((indicator) => {
      indicator.classList.add(
        'w-3',
        'h-3',
        'rounded-full',
        'bg-gray-300',
        'hover:bg-primary-400',
        'transition-all',
        'duration-300'
      );
      
      // Update active indicator styling
      const updateIndicatorStyle = () => {
        const isActive = indicator.getAttribute('aria-selected') === 'true';
        if (isActive) {
          indicator.classList.remove('bg-gray-300');
          indicator.classList.add('bg-primary-600', 'w-8');
        } else {
          indicator.classList.remove('bg-primary-600', 'w-8');
          indicator.classList.add('bg-gray-300');
        }
      };

      // Initial styling
      updateIndicatorStyle();

      // Listen for carousel changes
      carouselElement.addEventListener('carousel:change', updateIndicatorStyle);
    });

    console.info('[VolunteerTestimonials] Carousel initialized successfully');

    return carousel;
  } catch (error) {
    console.error('[VolunteerTestimonials] Initialization failed:', {
      error: error.message,
      stack: error.stack,
    });
    return null;
  }
}

/**
 * Update testimonials dynamically
 * @param {HTMLElement|string} container - Container element or selector
 * @param {VolunteerTestimonial[]} testimonials - New testimonials data
 * @param {Object} options - Configuration options
 * @returns {Object|null} New carousel instance or null
 */
export function updateTestimonials(container, testimonials, options = {}) {
  try {
    const element = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!element) {
      console.error('[VolunteerTestimonials] Container not found:', container);
      return null;
    }

    // Find content container
    const contentContainer = element.querySelector('[data-testimonials-content]');
    if (!contentContainer) {
      console.error('[VolunteerTestimonials] Content container not found');
      return null;
    }

    // Generate new content
    const useCarousel = options.useCarousel !== undefined 
      ? options.useCarousel 
      : CONFIG.carouselEnabled;

    const newContent = useCarousel
      ? createCarouselLayout(testimonials)
      : createGridLayout(testimonials);

    // Update content
    contentContainer.innerHTML = newContent;

    // Reinitialize carousel if needed
    if (useCarousel) {
      return initVolunteerTestimonials(element, options);
    }

    console.info('[VolunteerTestimonials] Testimonials updated successfully');
    return null;
  } catch (error) {
    console.error('[VolunteerTestimonials] Update failed:', {
      error: error.message,
      stack: error.stack,
    });
    return null;
  }
}

export default {
  createVolunteerTestimonials,
  initVolunteerTestimonials,
  updateTestimonials,
};