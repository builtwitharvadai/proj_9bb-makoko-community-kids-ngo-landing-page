/**
 * Hero Section Component
 * 
 * Displays compelling NGO mission messaging with high-impact imagery,
 * call-to-action buttons, and responsive design optimized for all devices.
 * 
 * @module components/HeroSection
 * @version 1.0.0
 */

/**
 * Hero section configuration
 */
const HERO_CONFIG = Object.freeze({
  BACKGROUND_IMAGE: {
    URL: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
    ALT: 'Children in Makoko community playing and learning together',
    WEBP_URL: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&fm=webp',
    SIZES: '100vw',
    SRCSET: [
      { width: 640, url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=640&auto=format&fit=crop' },
      { width: 768, url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=768&auto=format&fit=crop' },
      { width: 1024, url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1024&auto=format&fit=crop' },
      { width: 1280, url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1280&auto=format&fit=crop' },
      { width: 1536, url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1536&auto=format&fit=crop' },
      { width: 2070, url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop' },
    ],
  },
  CONTENT: {
    HEADLINE: 'Empowering Makoko Children Through Education',
    MISSION: 'We believe every child in Makoko deserves access to quality education, healthcare, and opportunities to thrive. Join us in transforming lives and building a brighter future for the next generation.',
    CTA_PRIMARY: {
      TEXT: 'Donate Now',
      HREF: '#donate',
      ARIA_LABEL: 'Make a donation to support Makoko children',
    },
    CTA_SECONDARY: {
      TEXT: 'Volunteer',
      HREF: '#volunteer',
      ARIA_LABEL: 'Learn about volunteer opportunities',
    },
  },
  ANIMATION: {
    FADE_IN_DELAY: 100,
    STAGGER_DELAY: 150,
  },
  LOADING: {
    PRIORITY: 'high',
    FETCH_PRIORITY: 'high',
  },
});

/**
 * Logging utility with structured context
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} context - Additional context
 */
function log(level, message, context = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    module: 'HeroSection',
    message,
    ...context,
  };

  if (import.meta.env.MODE !== 'production') {
    const logMethod = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    logMethod('[HERO]', message, context);
  }

  return logEntry;
}

/**
 * Generate srcset attribute for responsive images
 * @param {Array<{width: number, url: string}>} sources - Image sources
 * @returns {string} Srcset attribute value
 */
function generateSrcset(sources) {
  try {
    if (!Array.isArray(sources) || sources.length === 0) {
      log('warn', 'Invalid sources for srcset generation', { sources });
      return '';
    }

    return sources
      .map(({ width, url }) => {
        if (!width || !url) {
          log('warn', 'Invalid source entry', { width, url });
          return null;
        }
        return `${url} ${width}w`;
      })
      .filter(Boolean)
      .join(', ');
  } catch (error) {
    log('error', 'Failed to generate srcset', { error: error.message });
    return '';
  }
}

/**
 * Create hero background image element with optimization
 * @returns {HTMLPictureElement} Picture element with optimized sources
 */
function createHeroImage() {
  try {
    const picture = document.createElement('picture');
    picture.className = 'absolute inset-0 w-full h-full';

    // WebP source for modern browsers
    const webpSource = document.createElement('source');
    webpSource.type = 'image/webp';
    webpSource.srcset = generateSrcset(
      HERO_CONFIG.BACKGROUND_IMAGE.SRCSET.map(({ width, url }) => ({
        width,
        url: url.replace(/&auto=format/, '&auto=format&fm=webp'),
      }))
    );
    webpSource.sizes = HERO_CONFIG.BACKGROUND_IMAGE.SIZES;
    picture.appendChild(webpSource);

    // Fallback JPEG source
    const jpegSource = document.createElement('source');
    jpegSource.type = 'image/jpeg';
    jpegSource.srcset = generateSrcset(HERO_CONFIG.BACKGROUND_IMAGE.SRCSET);
    jpegSource.sizes = HERO_CONFIG.BACKGROUND_IMAGE.SIZES;
    picture.appendChild(jpegSource);

    // Fallback img element
    const img = document.createElement('img');
    img.src = HERO_CONFIG.BACKGROUND_IMAGE.URL;
    img.alt = HERO_CONFIG.BACKGROUND_IMAGE.ALT;
    img.className = 'w-full h-full object-cover object-center';
    img.loading = 'eager';
    img.fetchPriority = HERO_CONFIG.LOADING.FETCH_PRIORITY;
    img.decoding = 'async';

    // Error handling for image loading
    img.addEventListener('error', (event) => {
      log('error', 'Hero image failed to load', {
        src: event.target.src,
        error: 'Image load error',
      });
    });

    img.addEventListener('load', () => {
      log('info', 'Hero image loaded successfully', {
        src: img.src,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      });
    });

    picture.appendChild(img);

    return picture;
  } catch (error) {
    log('error', 'Failed to create hero image', { error: error.message });
    throw error;
  }
}

/**
 * Create CTA button element
 * @param {Object} config - Button configuration
 * @param {string} config.text - Button text
 * @param {string} config.href - Button href
 * @param {string} config.ariaLabel - ARIA label
 * @param {boolean} isPrimary - Whether button is primary style
 * @returns {HTMLAnchorElement} Button element
 */
function createCTAButton(config, isPrimary = true) {
  try {
    const { text, href, ariaLabel } = config;

    if (!text || !href) {
      throw new Error('Button text and href are required');
    }

    const button = document.createElement('a');
    button.href = href;
    button.textContent = text;
    button.setAttribute('aria-label', ariaLabel || text);
    button.setAttribute('data-nav-link', '');
    button.className = isPrimary
      ? 'btn btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
      : 'btn btn-outline text-lg px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary-600 border-2 border-white text-white shadow-lg transition-all duration-300';

    // Track button clicks
    button.addEventListener('click', () => {
      log('info', 'CTA button clicked', {
        text,
        href,
        isPrimary,
      });
    });

    return button;
  } catch (error) {
    log('error', 'Failed to create CTA button', { error: error.message, config });
    throw error;
  }
}

/**
 * Create hero content container
 * @returns {HTMLDivElement} Content container element
 */
function createHeroContent() {
  try {
    const container = document.createElement('div');
    container.className = 'relative z-10 section-container flex items-center min-h-screen py-20';

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'max-w-4xl mx-auto text-center text-white';

    // Headline
    const headline = document.createElement('h1');
    headline.className = 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight opacity-0 animate-fadeInUp';
    headline.style.animationDelay = `${HERO_CONFIG.ANIMATION.FADE_IN_DELAY}ms`;
    headline.textContent = HERO_CONFIG.CONTENT.HEADLINE;
    contentWrapper.appendChild(headline);

    // Mission statement
    const mission = document.createElement('p');
    mission.className = 'text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed text-white/90 max-w-3xl mx-auto opacity-0 animate-fadeInUp';
    mission.style.animationDelay = `${HERO_CONFIG.ANIMATION.FADE_IN_DELAY + HERO_CONFIG.ANIMATION.STAGGER_DELAY}ms`;
    mission.textContent = HERO_CONFIG.CONTENT.MISSION;
    contentWrapper.appendChild(mission);

    // CTA buttons container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fadeInUp';
    ctaContainer.style.animationDelay = `${HERO_CONFIG.ANIMATION.FADE_IN_DELAY + HERO_CONFIG.ANIMATION.STAGGER_DELAY * 2}ms`;

    // Primary CTA
    const primaryCTA = createCTAButton(HERO_CONFIG.CONTENT.CTA_PRIMARY, true);
    ctaContainer.appendChild(primaryCTA);

    // Secondary CTA
    const secondaryCTA = createCTAButton(HERO_CONFIG.CONTENT.CTA_SECONDARY, false);
    ctaContainer.appendChild(secondaryCTA);

    contentWrapper.appendChild(ctaContainer);
    container.appendChild(contentWrapper);

    return container;
  } catch (error) {
    log('error', 'Failed to create hero content', { error: error.message });
    throw error;
  }
}

/**
 * Create and render hero section
 * @param {HTMLElement} container - Container element to render into
 * @returns {HTMLElement} Hero section element
 */
function createHeroSection(container) {
  try {
    if (!(container instanceof HTMLElement)) {
      throw new TypeError('Container must be an HTMLElement');
    }

    log('info', 'Creating hero section', {
      containerId: container.id,
    });

    // Create hero section element
    const heroSection = document.createElement('section');
    heroSection.id = 'hero-section';
    heroSection.className = 'relative w-full min-h-screen overflow-hidden';
    heroSection.setAttribute('data-section', '');
    heroSection.setAttribute('aria-label', 'Hero section with NGO mission');

    // Background image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'absolute inset-0 w-full h-full';
    imageContainer.setAttribute('aria-hidden', 'true');

    // Add background image
    const heroImage = createHeroImage();
    imageContainer.appendChild(heroImage);

    // Overlay gradient
    const overlay = document.createElement('div');
    overlay.className = 'absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-800/85 to-secondary-900/90';
    overlay.setAttribute('aria-hidden', 'true');
    imageContainer.appendChild(overlay);

    heroSection.appendChild(imageContainer);

    // Add content
    const content = createHeroContent();
    heroSection.appendChild(content);

    // Append to container
    container.appendChild(heroSection);

    // Add animation styles if not already present
    if (!document.getElementById('hero-animations')) {
      const style = document.createElement('style');
      style.id = 'hero-animations';
      style.textContent = `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `;
      document.head.appendChild(style);
    }

    log('info', 'Hero section created successfully', {
      sectionId: heroSection.id,
    });

    // Dispatch custom event
    const event = new CustomEvent('hero:rendered', {
      detail: { sectionId: heroSection.id },
    });
    window.dispatchEvent(event);

    return heroSection;
  } catch (error) {
    log('error', 'Failed to create hero section', { error: error.message });
    throw error;
  }
}

/**
 * Initialize hero section
 * @returns {Object} Hero section API
 */
function initializeHeroSection() {
  try {
    const container = document.getElementById('app');

    if (!container) {
      throw new Error('App container not found');
    }

    const heroSection = createHeroSection(container);

    log('info', 'Hero section initialized successfully');

    return {
      element: heroSection,
      destroy: () => {
        try {
          if (heroSection && heroSection.parentNode) {
            heroSection.parentNode.removeChild(heroSection);
            log('info', 'Hero section destroyed');
          }
        } catch (error) {
          log('error', 'Failed to destroy hero section', { error: error.message });
        }
      },
    };
  } catch (error) {
    log('error', 'Failed to initialize hero section', { error: error.message });
    throw error;
  }
}

export { createHeroSection, initializeHeroSection };
export default initializeHeroSection;